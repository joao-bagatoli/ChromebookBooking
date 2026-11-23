import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import AppSidebar from './AppSidebar.vue';
import AppAvatar from './AppAvatar.vue';
const authStore = useAuthStore();
const isAdmin = computed(() => authStore.profile?.role === 'Admin');
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(isAdmin, {});
    void {};
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layout-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['layout-wrapper']} */ ;
    if (isAdmin.value) {
        const __VLS_0 = AppSidebar;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        }));
        const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "main-content" },
    });
    /** @type {__VLS_StyleScopedClasses['main-content']} */ ;
    const __VLS_5 = AppAvatar;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    // @ts-ignore
    }));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_10;
    /** @ts-ignore @type { | typeof __VLS_components.RouterView | typeof __VLS_components.RouterView} */
    RouterView;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    // @ts-ignore
    }));
    const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
    // @ts-ignore
    [isAdmin,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
