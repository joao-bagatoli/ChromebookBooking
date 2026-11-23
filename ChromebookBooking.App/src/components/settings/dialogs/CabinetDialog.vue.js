import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import { useToast } from 'primevue/usetoast';
import { useCabinetStore } from '../../../stores/cabinet';
const { defineProps, defineModel, } = {};
const visible = defineModel('visible', {
    default: false
});
const props = defineProps();
const cabinetStore = useCabinetStore();
const toast = useToast();
const cabinetName = ref('');
const isActive = ref(true);
const loading = ref(false);
const errorMessage = ref('');
const isEditing = () => {
    return props.cabinet !== null && props.cabinet !== undefined;
};
watch(() => props.cabinet, (cabinet) => {
    if (cabinet) {
        cabinetName.value = cabinet.name;
        isActive.value = Boolean(cabinet.isActive);
    }
    else {
        cabinetName.value = '';
        isActive.value = true;
    }
    errorMessage.value = '';
}, {
    immediate: true,
    deep: true
});
const resetForm = () => {
    cabinetName.value = '';
    isActive.value = true;
    errorMessage.value = '';
};
const closeDialog = () => {
    visible.value = false;
    resetForm();
};
const handleCancel = () => {
    if (loading.value)
        return;
    closeDialog();
};
const handleSave = async () => {
    const name = cabinetName.value.trim();
    if (!name) {
        errorMessage.value = 'Informe o nome do gabinete.';
        return;
    }
    try {
        loading.value = true;
        errorMessage.value = '';
        if (props.cabinet) {
            await cabinetStore.updateCabinet(props.cabinet.id, name, isActive.value);
            toast.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Gabinete atualizado com sucesso!',
                life: 3000
            });
        }
        else {
            await cabinetStore.createCabinet(name);
            toast.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Gabinete cadastrado com sucesso!',
                life: 3000
            });
        }
        closeDialog();
    }
    catch (error) {
        console.error('Erro ao salvar gabinete:', error);
        if (isEditing()) {
            errorMessage.value = 'Não foi possível atualizar o gabinete.';
        }
        else {
            errorMessage.value = 'Não foi possível criar o gabinete.';
        }
    }
    finally {
        loading.value = false;
    }
};
const __VLS_defaultModels = {
    'visible': false,
};
void __VLS_defaultModels;
let __VLS_modelEmit;
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(errorMessage, {});
    __VLS_withDotValue(cabinetName, {});
    void {};
    let __VLS_0;
    /** @ts-ignore @type { | typeof Dialog | typeof Dialog} */
    Dialog;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        visible: (__VLS_unwrap(visible, {})), modal: true, draggable: (false), header: (__VLS_unwrap(isEditing, {})() ? 'Editar Gabinete' : 'Adicionar Gabinete'), ...{ style: ({ width: '100%', maxWidth: '28rem' }) }, breakpoints: ({ '640px': '90vw' }), ...{ class: "mx-3" },
    }));
    const __VLS_2 = __VLS_1({
        visible: (__VLS_unwrap(visible, {})),
        modal: true,
        draggable: (false),
        header: (__VLS_unwrap(isEditing, {})() ? 'Editar Gabinete' : 'Adicionar Gabinete'),
        ...{ style: ({ width: '100%', maxWidth: '28rem' }) },
        breakpoints: ({ '640px': '90vw' }),
        ...{ class: "mx-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['mx-3']} */ ;
    var __VLS_3;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-column gap-3 mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-column gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: "cabinetName",
        ...{ class: "font-medium text-sm text-700" },
    });
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-700']} */ ;
    let __VLS_6;
    /** @ts-ignore @type { | typeof InputText} */
    InputText;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        // @ts-ignore
        ...{ 'onKeyup': {} }, id: "cabinetName", modelValue: (cabinetName.value), ...{ class: "w-full" }, placeholder: "Ex: Gabinete A-102", autocomplete: "off", disabled: (__VLS_unwrap(loading, {})),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onKeyup': {} },
        id: "cabinetName",
        modelValue: (cabinetName.value),
        ...{ class: "w-full" },
        placeholder: "Ex: Gabinete A-102",
        autocomplete: "off",
        disabled: (__VLS_unwrap(loading, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = {
        /** @type {typeof __VLS_11.keyup} */
        onKeyup: (__VLS_unwrap(handleSave, {})),
    };
    void __VLS_12;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    var __VLS_9;
    var __VLS_10;
    if (__VLS_unwrap(isEditing, {})()) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "cabinetActive" },
        });
        /** @type {__VLS_StyleScopedClasses['cabinetActive']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            for: "cabinetActive",
        });
        let __VLS_13;
        /** @ts-ignore @type { | typeof InputSwitch} */
        InputSwitch;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
            // @ts-ignore
            id: "cabinetActive", modelValue: (__VLS_unwrap(isActive, {})), disabled: (__VLS_unwrap(loading, {})),
        }));
        const __VLS_15 = __VLS_14({
            id: "cabinetActive",
            modelValue: (__VLS_unwrap(isActive, {})),
            disabled: (__VLS_unwrap(loading, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    if (errorMessage.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
            ...{ class: "text-red-500" },
        });
        /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
        (errorMessage.value);
    }
    {
        const { footer: __VLS_18 } = __VLS_nonNull(__VLS_3.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex justify-content-end gap-2 pt-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-content-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
        let __VLS_19;
        /** @ts-ignore @type { | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
            // @ts-ignore
            ...{ 'onClick': {} }, type: "button", label: "Cancelar", severity: "secondary", text: true, disabled: (__VLS_unwrap(loading, {})),
        }));
        const __VLS_21 = __VLS_20({
            ...{ 'onClick': {} },
            type: "button",
            label: "Cancelar",
            severity: "secondary",
            text: true,
            disabled: (__VLS_unwrap(loading, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        let __VLS_24;
        const __VLS_25 = {
            /** @type {typeof __VLS_24.click} */
            onClick: (__VLS_unwrap(handleCancel, {})),
        };
        void __VLS_25;
        var __VLS_22;
        var __VLS_23;
        let __VLS_26;
        /** @ts-ignore @type { | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
            // @ts-ignore
            ...{ 'onClick': {} }, type: "button", label: "Salvar", loading: (__VLS_unwrap(loading, {})), disabled: (!cabinetName.value.trim()),
        }));
        const __VLS_28 = __VLS_27({
            ...{ 'onClick': {} },
            type: "button",
            label: "Salvar",
            loading: (__VLS_unwrap(loading, {})),
            disabled: (!cabinetName.value.trim()),
        }, ...__VLS_functionalComponentArgsRest(__VLS_27));
        let __VLS_31;
        const __VLS_32 = {
            /** @type {typeof __VLS_31.click} */
            onClick: (__VLS_unwrap(handleSave, {})),
        };
        void __VLS_32;
        var __VLS_29;
        var __VLS_30;
        // @ts-ignore
        [visible, isEditing, isEditing, cabinetName, cabinetName, loading, loading, loading, loading, handleSave, handleSave, isActive, errorMessage, errorMessage, handleCancel,];
    }
    // @ts-ignore
    [];
    // @ts-ignore
    [];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
