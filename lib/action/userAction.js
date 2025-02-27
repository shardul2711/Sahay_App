import supabase from "../../supabase/supabaseConfig";

export const signUpUser = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        const userId = data?.user?.id;

        if (!userId) {
            return { error: "User ID not found", success: false };
        }

        let { data: userData, error: userError } = await supabase
            .from("user")
            .select("*")
            .eq("userid", userId)
            .single();

        if (userData) {
            return { user: userData, role: "user", success: true };
        }

        let { data: providerData, error: providerError } = await supabase
            .from("provider")
            .select("*")
            .eq("providerid", userId)
            .single();

        if (providerData) {
            return { user: providerData, role: "provider", success: true };
        }

        return { error: "User not found in any table", success: false };
    } catch (error) {
        return { error: error.message, success: false };
    }
};