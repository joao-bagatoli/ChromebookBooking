import { supabase } from "../auth/supabase";
export default class AuthService {
    async loginWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
        if (error)
            throw error;
    }
    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw error;
    }
    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error)
            throw error;
        return data.session;
    }
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
}
