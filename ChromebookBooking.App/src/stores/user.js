import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
export const useUserStore = defineStore('user', () => {
    const serviceFactory = inject('serviceFactory');
    const userService = serviceFactory.createUserService();
    const users = ref([]);
    async function loadUsers() {
        try {
            users.value = await userService.getAllUsers();
        }
        catch (error) {
            console.error('Error loading users:', error);
            throw error;
        }
    }
    async function addUser(name, email, role, sectionIds) {
        try {
            const newUser = await userService.createUser(name, email, role, sectionIds);
            users.value.push(newUser);
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async function updateUser(id, payload) {
        try {
            await userService.updateUser(id, payload);
            const user = users.value.find(u => u.id == id);
            if (user) {
                user.name = payload.name;
                user.role = payload.role;
                user.isActive = payload.isActive;
            }
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    async function deleteUser(id) {
        try {
            await userService.deleteUser(id);
            users.value = users.value.filter(u => u.id !== id);
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
    return {
        users,
        loadUsers,
        addUser,
        updateUser,
        deleteUser
    };
});
