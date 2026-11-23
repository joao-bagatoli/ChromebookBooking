import { ref, computed, watch } from 'vue';
import { useSectionStore } from '@/stores/section';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
const { defineProps, defineModel, } = {};
const visible = defineModel('visible', { default: false });
const props = defineProps();
const sectionStore = useSectionStore();
const toast = useToast();
const isLoading = ref(false);
const form = ref({ name: '', isActive: false, shift: '' });
const shiftOptions = ref([
    { label: 'Matutino', value: 'Morning' },
    { label: 'Vespertino', value: 'Afternoon' }
]);
watch(() => props.item, (newVal) => {
    if (newVal) {
        form.value.name = newVal.name;
        form.value.isActive = newVal.isActive ?? false;
        form.value.shift = newVal.shift || '';
    }
    else {
        clearForm();
    }
}, { immediate: true });
const isEditing = computed(() => props.item !== null && props.item !== undefined);
const dialogTitle = computed(() => isEditing.value ? 'Editar Turma' : 'Adicionar Turma');
function clearForm() {
    form.value.name = '';
    form.value.isActive = false;
    form.value.shift = '';
}
function closeDialog() {
    visible.value = false;
}
const handleSave = async () => {
    if (!form.value.name || !form.value.shift) {
        toast.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Informe o nome e o turno da turma.',
            life: 3000
        });
        return;
    }
    try {
        isLoading.value = true;
        if (isEditing.value) {
            await sectionStore.updateSection(props.item.id, {
                name: form.value.name,
                isActive: form.value.isActive,
                shift: form.value.shift
            });
            toast.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Turma atualizada com sucesso!',
                life: 3000
            });
        }
        else {
            await sectionStore.addSection(form.value.name, form.value.shift);
            toast.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Turma cadastrada com sucesso!',
                life: 3000
            });
        }
        clearForm();
        closeDialog();
    }
    catch {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível salvar a turma.',
            life: 3000
        });
    }
    finally {
        isLoading.value = false;
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
    __VLS_withDotValue(form, {});
    __VLS_withDotValue(isEditing, {});
    let __VLS_0;
    /** @ts-ignore @type { | typeof Dialog | typeof Dialog} */
    Dialog;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        visible: (__VLS_unwrap(visible, {})), modal: true, header: (__VLS_unwrap(dialogTitle, {})), ...{ style: ({ width: '30rem' }) },
    }));
    const __VLS_2 = __VLS_1({
        visible: (__VLS_unwrap(visible, {})),
        modal: true,
        header: (__VLS_unwrap(dialogTitle, {})),
        ...{ style: ({ width: '30rem' }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_3;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-container" },
    });
    /** @type {__VLS_StyleScopedClasses['form-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-group" },
    });
    /** @type {__VLS_StyleScopedClasses['form-group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: "sectionName",
    });
    let __VLS_6;
    /** @ts-ignore @type { | typeof InputText} */
    InputText;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        // @ts-ignore
        ...{ 'onKeyup': {} }, id: "sectionName", modelValue: (form.value.name), autocomplete: "off", disabled: (__VLS_unwrap(isLoading, {})),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onKeyup': {} },
        id: "sectionName",
        modelValue: (form.value.name),
        autocomplete: "off",
        disabled: (__VLS_unwrap(isLoading, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = {
        /** @type {typeof __VLS_11.keyup} */
        onKeyup: (__VLS_unwrap(handleSave, {})),
    };
    void __VLS_12;
    var __VLS_9;
    var __VLS_10;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-group" },
    });
    /** @type {__VLS_StyleScopedClasses['form-group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: "sectionShift",
    });
    let __VLS_13;
    /** @ts-ignore @type { | typeof Select} */
    Select;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        // @ts-ignore
        id: "sectionShift", modelValue: (form.value.shift), options: (__VLS_unwrap(shiftOptions, {})), optionLabel: "label", optionValue: "value", placeholder: "Selecione o turno", disabled: (__VLS_unwrap(isLoading, {})),
    }));
    const __VLS_15 = __VLS_14({
        id: "sectionShift",
        modelValue: (form.value.shift),
        options: (__VLS_unwrap(shiftOptions, {})),
        optionLabel: "label",
        optionValue: "value",
        placeholder: "Selecione o turno",
        disabled: (__VLS_unwrap(isLoading, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    if (isEditing.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "form-group inline-group" },
        });
        /** @type {__VLS_StyleScopedClasses['form-group']} */ ;
        /** @type {__VLS_StyleScopedClasses['inline-group']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            for: "active",
        });
        let __VLS_18;
        /** @ts-ignore @type { | typeof ToggleSwitch} */
        ToggleSwitch;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            // @ts-ignore
            id: "active", modelValue: (form.value.isActive), disabled: (__VLS_unwrap(isLoading, {})),
        }));
        const __VLS_20 = __VLS_19({
            id: "active",
            modelValue: (form.value.isActive),
            disabled: (__VLS_unwrap(isLoading, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    }
    {
        const { footer: __VLS_23 } = __VLS_nonNull(__VLS_3.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dialog-footer" },
        });
        /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
        let __VLS_24;
        /** @ts-ignore @type { | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
            // @ts-ignore
            ...{ 'onClick': {} }, label: "Cancelar", severity: "secondary", outlined: true, disabled: (__VLS_unwrap(isLoading, {})),
        }));
        const __VLS_26 = __VLS_25({
            ...{ 'onClick': {} },
            label: "Cancelar",
            severity: "secondary",
            outlined: true,
            disabled: (__VLS_unwrap(isLoading, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        let __VLS_29;
        const __VLS_30 = {
            /** @type {typeof __VLS_29.click} */
            onClick: (closeDialog),
        };
        void __VLS_30;
        var __VLS_27;
        var __VLS_28;
        let __VLS_31;
        /** @ts-ignore @type { | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
            // @ts-ignore
            ...{ 'onClick': {} }, label: "Salvar", loading: (__VLS_unwrap(isLoading, {})),
        }));
        const __VLS_33 = __VLS_32({
            ...{ 'onClick': {} },
            label: "Salvar",
            loading: (__VLS_unwrap(isLoading, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        let __VLS_36;
        const __VLS_37 = {
            /** @type {typeof __VLS_36.click} */
            onClick: (__VLS_unwrap(handleSave, {})),
        };
        void __VLS_37;
        var __VLS_34;
        var __VLS_35;
        // @ts-ignore
        [visible, dialogTitle, form, form, form, isLoading, isLoading, isLoading, isLoading, isLoading, handleSave, handleSave, shiftOptions, isEditing,];
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
