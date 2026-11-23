import { defineStore } from 'pinia';
import { ref } from 'vue';
import AuthService from '../services/AuthService';
import { router } from '../router';
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const session = ref(null);
    const profile = ref(null);
    const loading = ref(false);
    const authService = new AuthService();
    async function init() {
        loading.value = true;
        session.value = await authService.getSession();
        user.value = session.value?.user ?? null;
        authService.onAuthStateChange((_event, newSession) => {
            session.value = newSession;
            user.value = newSession?.user ?? null;
        });
        loading.value = false;
    }
    async function loginWithGoogle() {
        await authService.loginWithGoogle();
    }
    async function logout() {
        await authService.logout();
        user.value = null;
        session.value = null;
        profile.value = null;
        router.push({ name: 'Login' });
    }
    function getToken() {
        return session.value?.access_token ?? null;
    }
    async function getLoggedUser(userService) {
        if (!user.value)
            return;
        try {
            profile.value = await userService.getLoggedUser();
        }
        catch (error) {
            console.error('Error validating access:', error);
            profile.value = null;
        }
    }
    function getDefaultModule() {
        const modules = profile.value?.modules || [];
        if (modules.includes('Dashboard')) {
            return 'Dashboard';
        }
        if (modules.includes('Schedule')) {
            return 'Schedule';
        }
        return 'AccessDenied';
    }
    function canAccessModule(module) {
        const modules = profile.value?.modules || [];
        return modules.includes(module);
    }
    return {
        user,
        session,
        profile,
        loading,
        init,
        loginWithGoogle,
        logout,
        getToken,
        getLoggedUser,
        getDefaultModule,
        canAccessModule
    };
});
