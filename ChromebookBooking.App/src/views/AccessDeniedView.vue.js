import { useRouter } from 'vue-router';
import Button from 'primevue/button';
const router = useRouter();
const goBack = () => {
    router.back();
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    void {};
    /** @type {__VLS_StyleScopedClasses['icon-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "denied-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['denied-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "denied-content" },
    });
    /** @type {__VLS_StyleScopedClasses['denied-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "icon-container" },
    });
    /** @type {__VLS_StyleScopedClasses['icon-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-lock" },
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-lock']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "title" },
    });
    /** @type {__VLS_StyleScopedClasses['title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.br)({});
    let __VLS_0;
    /** @ts-ignore @type { | typeof Button} */
    Button;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        ...{ 'onClick': {} }, label: "Voltar", icon: "pi pi-arrow-left", ...{ class: "action-button" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        label: "Voltar",
        icon: "pi pi-arrow-left",
        ...{ class: "action-button" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.click} */
        onClick: (__VLS_unwrap(goBack, {})),
    };
    void __VLS_6;
    /** @type {__VLS_StyleScopedClasses['action-button']} */ ;
    var __VLS_3;
    var __VLS_4;
    // @ts-ignore
    [goBack,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
