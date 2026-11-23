import Card from 'primevue/card';
import Button from 'primevue/button';
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(authStore, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['login-container']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-panel']} */ ;
    /** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "login-container" },
    });
    /** @type {__VLS_StyleScopedClasses['login-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "left-panel" },
    });
    /** @type {__VLS_StyleScopedClasses['left-panel']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "overlay" },
    });
    /** @type {__VLS_StyleScopedClasses['overlay']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: "../assets/images/logo-joinville.svg",
        alt: "Prefeitura de Joinville",
        ...{ class: "city-logo" },
    });
    /** @type {__VLS_StyleScopedClasses['city-logo']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "right-panel" },
    });
    /** @type {__VLS_StyleScopedClasses['right-panel']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "content-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "page-title" },
    });
    /** @type {__VLS_StyleScopedClasses['page-title']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof Card | typeof Card} */
    Card;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    }));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_3;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    {
        const { content: __VLS_6 } = __VLS_nonNull(__VLS_3.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-content" },
        });
        /** @type {__VLS_StyleScopedClasses['card-content']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "welcome-title" },
        });
        /** @type {__VLS_StyleScopedClasses['welcome-title']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "instruction-text" },
        });
        /** @type {__VLS_StyleScopedClasses['instruction-text']} */ ;
        let __VLS_7;
        /** @ts-ignore @type { | typeof Button | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            // @ts-ignore
            ...{ 'onClick': {} }, ...{ class: "google-btn" }, severity: "secondary", outlined: true,
        }));
        const __VLS_9 = __VLS_8({
            ...{ 'onClick': {} },
            ...{ class: "google-btn" },
            severity: "secondary",
            outlined: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        let __VLS_12;
        const __VLS_13 = {
            /** @type {typeof __VLS_12.click} */
            onClick: (authStore.value.loginWithGoogle),
        };
        void __VLS_13;
        /** @type {__VLS_StyleScopedClasses['google-btn']} */ ;
        var __VLS_10;
        var __VLS_11;
        const { default: __VLS_14 } = __VLS_nonNull(__VLS_10.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            src: "../assets/images/google-logo.svg",
            alt: "Logo do Google",
            ...{ class: "google-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['google-icon']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "btn-text" },
        });
        /** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
        // @ts-ignore
        [authStore,];
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "restriction-text" },
        });
        /** @type {__VLS_StyleScopedClasses['restriction-text']} */ ;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    __VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
        ...{ class: "footer-text" },
    });
    /** @type {__VLS_StyleScopedClasses['footer-text']} */ ;
    // @ts-ignore
    [];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
