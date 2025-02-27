import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        const fetchSessionAndUser = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                setSession(data.session);

                if (data.session?.user) {
                    fetchUser(data.session.user.id);
                } else {
                    setUser(null);
                    setUserType("");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async (userId) => {
            try {
                let { data: userData, error: userError } = await supabase
                    .from("user")
                    .select("*")
                    .eq("userid", userId)
                    .single();

                if (userError && userError.code !== "PGRST116") throw userError;

                if (userData) {
                    setUser(userData);
                    setUserType("user");
                    return;
                }

                let { data: providerData, error: providerError } = await supabase
                    .from("provider")
                    .select("*")
                    .eq("providerid", userId)
                    .single();

                if (providerError) throw providerError;

                if (providerData) {
                    setUser(providerData);
                    setUserType("provider");
                } else {
                    setUser(null);
                    setUserType("");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchSessionAndUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            if (session?.user) {
                fetchUser(session.user.id);
            } else {
                setUser(null);
                setUserType("");
            }
        });

        return () => {
            authListener.subscription?.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, userType, session, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
