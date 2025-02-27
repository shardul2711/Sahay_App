import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const fetchSessionAndUser = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                setSession(data.session);

                setUserType(session?.user?.user_metadata?.options?.data?.user_type);

                if (userType = "provider") {
                    await fetchProviderUser(data.session.user.id);
                }
                if (userType = "user") {
                    await fetchUser(data.session.user.id);
                }
                else {
                    setUser(null);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async (userId) => {
            try {
                const { data, error } = await supabase
                    .from("user")
                    .select("*")
                    .eq("userid", userId)
                    .single();

                if (error) throw error;

                setUser(data);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchProviderUser = async (userId) => {
            try {
                const { data, error } = await supabase
                    .from("provider")
                    .select("*")
                    .eq("providerid", userId)
                    .single();
                if (error) throw error;
                setUser(data);
            } catch (error) {
                setError(error.message);
            }

        }
        fetchSessionAndUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            if (session?.user) {
                fetchUser(session.user.id);
            } else {
                setUser(null);
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