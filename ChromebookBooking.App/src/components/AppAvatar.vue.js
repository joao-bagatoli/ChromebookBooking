import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import Avatar from 'primevue/avatar';
import Popover from 'primevue/popover';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { getRoleSeverity, getRoleLabel } from '../utils/userUtils';
const op = ref();
const authStore = useAuthStore();
const userAvatar = computed(() => {
    return authStore.user?.user_metadata?.avatar_url || authStore.user?.user_metadata?.picture || null;
});
const userName = computed(() => {
    return authStore.user?.user_metadata?.full_name || authStore.user?.user_metadata?.name || null;
});
const userEmail = computed(() => authStore.user?.email || null);
const userRole = computed(() => authStore.profile?.role || null);
function toggleMenu(event) {
    op.value.toggle(event);
}
function handleLogout() {
    authStore.logout();
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(userAvatar, {});
    void {};
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "avatar-container" },
    });
    /** @type {__VLS_StyleScopedClasses['avatar-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (toggleMenu) },
        ...{ class: "avatar-wrapper" },
        'aria-haspopup': "true",
        'aria-controls': "user_popover",
    });
    /** @type {__VLS_StyleScopedClasses['avatar-wrapper']} */ ;
    if (userAvatar.value) {
        let __VLS_0;
        /** @ts-ignore @type { | typeof Avatar | typeof Avatar} */
        Avatar;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            // @ts-ignore
            image: (userAvatar.value), shape: "circle", ...{ class: "avatar-trigger" }, pt: ({ image: { referrerpolicy: 'no-referrer' } }), title: (__VLS_unwrap(userEmail, {})),
        }));
        const __VLS_2 = __VLS_1({
            image: (userAvatar.value),
            shape: "circle",
            ...{ class: "avatar-trigger" },
            pt: ({ image: { referrerpolicy: 'no-referrer' } }),
            title: (__VLS_unwrap(userEmail, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['avatar-trigger']} */ ;
    }
    else {
        let __VLS_5;
        /** @ts-ignore @type { | typeof Avatar | typeof Avatar} */
        Avatar;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
            // @ts-ignore
            icon: "pi pi-user", shape: "circle", ...{ class: "avatar-trigger" }, title: (__VLS_unwrap(userEmail, {})),
        }));
        const __VLS_7 = __VLS_6({
            icon: "pi pi-user",
            shape: "circle",
            ...{ class: "avatar-trigger" },
            title: (__VLS_unwrap(userEmail, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        /** @type {__VLS_StyleScopedClasses['avatar-trigger']} */ ;
    }
    let __VLS_10;
    /** @ts-ignore @type { | typeof Popover | typeof Popover} */
    Popover;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        // @ts-ignore
        ref: "op", id: "user_popover",
    }));
    const __VLS_12 = __VLS_11({
        ref: "op",
        id: "user_popover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    var __VLS_13;
    const { default: __VLS_15 } = __VLS_nonNull(__VLS_13.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-profile-menu" },
    });
    /** @type {__VLS_StyleScopedClasses['user-profile-menu']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-info" },
    });
    /** @type {__VLS_StyleScopedClasses['user-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "user-identity" },
    });
    /** @type {__VLS_StyleScopedClasses['user-identity']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "user-name" },
    });
    /** @type {__VLS_StyleScopedClasses['user-name']} */ ;
    (__VLS_unwrap(userName, {}));
    let __VLS_16;
    /** @ts-ignore @type { | typeof Tag | typeof Tag} */
    Tag;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        // @ts-ignore
        value: (__VLS_unwrap(getRoleLabel, {})(__VLS_unwrap(userRole, {}))), severity: (__VLS_unwrap(getRoleSeverity, {})(__VLS_unwrap(userRole, {}))), ...{ class: "tag-font" }, rounded: true,
    }));
    const __VLS_18 = __VLS_17({
        value: (__VLS_unwrap(getRoleLabel, {})(__VLS_unwrap(userRole, {}))),
        severity: (__VLS_unwrap(getRoleSeverity, {})(__VLS_unwrap(userRole, {}))),
        ...{ class: "tag-font" },
        rounded: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    /** @type {__VLS_StyleScopedClasses['tag-font']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "user-email" },
    });
    /** @type {__VLS_StyleScopedClasses['user-email']} */ ;
    (__VLS_unwrap(userEmail, {}));
    let __VLS_21;
    /** @ts-ignore @type { | typeof Button | typeof Button} */
    Button;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        // @ts-ignore
        ...{ 'onClick': {} }, label: "Sair", icon: "pi pi-sign-out", severity: "secondary", text: true, size: "small", ...{ class: "logout-btn" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        label: "Sair",
        icon: "pi pi-sign-out",
        severity: "secondary",
        text: true,
        size: "small",
        ...{ class: "logout-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_26;
    const __VLS_27 = {
        /** @type {typeof __VLS_26.click} */
        onClick: (handleLogout),
    };
    void __VLS_27;
    /** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
    var __VLS_24;
    var __VLS_25;
    // @ts-ignore
    [userAvatar, userAvatar, userEmail, userEmail, userEmail, userName, getRoleLabel, userRole, userRole, getRoleSeverity,];
    // @ts-ignore
    [];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
