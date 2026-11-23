import { ref, watch, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import ToggleSwitch from 'primevue/toggleswitch';
import Checkbox from 'primevue/checkbox';
import { useToast } from 'primevue/usetoast';
import { useSectionStore } from '../../../stores/section';
const { defineProps, defineModel, } = {};
const visible = defineModel('visible', { default: false });
const props = defineProps();
const userStore = useUserStore();
const sectionStore = useSectionStore();
const toast = useToast();
const isLoading = ref(false);
const form = ref({
    name: '',
    email: '',
    role: 'Teacher',
    isActive: false,
    sectionIds: []
});
const roleOptions = ref([
    { label: 'Professor', value: 'Teacher' },
    { label: 'Admin', value: 'Admin' }
]);
const activeSections = computed(() => sectionStore.sections.filter(s => s.isActive));
function clearForm() {
    form.value.name = '';
    form.value.email = '';
    form.value.role = 'Teacher';
    form.value.isActive = false;
    form.value.sectionIds = [];
}
watch(() => props.item, (newVal) => {
    if (newVal) {
        form.value.name = newVal.name ?? '';
        form.value.email = newVal.email;
        form.value.role = newVal.role;
        form.value.isActive = newVal.isActive ?? false;
        form.value.sectionIds = newVal.sections?.map(s => s.id) || [];
    }
    else {
        clearForm();
    }
}, { immediate: true });
const isEditing = computed(() => props.item !== null && props.item !== undefined);
const dialogTitle = computed(() => isEditing.value ? 'Editar Usuário' : 'Adicionar Usuário');
function closeDialog() {
    visible.value = false;
}
const isTeacher = computed(() => form.value.role === 'Teacher');
const handleSave = async () => {
    if (!form.value.name && !isEditing.value) {
        toast.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Informe o nome do usuário.',
            life: 3000
        });
        return;
    }
    if (!form.value.email && !isEditing.value) {
        toast.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Informe o email do usuário.',
            life: 3000
        });
        return;
    }
    if (!form.value.role) {
        toast.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Informe o perfil do usuário.',
            life: 3000
        });
        return;
    }
    try {
        isLoading.value = true;
        const finalSectionIds = isTeacher.value ? form.value.sectionIds : [];
        if (isEditing.value) {
            await userStore.updateUser(props.item.id, {
                name: form.value.name,
                role: form.value.role,
                isActive: form.value.isActive,
                sectionIds: finalSectionIds
            });
            toast.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário atualizado com sucesso!',
                life: 3000
            });
        }
        else {
            await userStore.addUser(form.value.name, form.value.email, form.value.role, finalSectionIds);
            toast.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário cadastrado com sucesso!',
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
            detail: 'Não foi possível salvar o usuário.',
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
    __VLS_withDotValue(isLoading, {});
    __VLS_withDotValue(isTeacher, {});
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
        for: "name",
    });
    let __VLS_6;
    /** @ts-ignore @type { | typeof InputText} */
    InputText;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        // @ts-ignore
        id: "name", modelValue: (form.value.name), autocomplete: "off", disabled: (isLoading.value),
    }));
    const __VLS_8 = __VLS_7({
        id: "name",
        modelValue: (form.value.name),
        autocomplete: "off",
        disabled: (isLoading.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-group" },
    });
    /** @type {__VLS_StyleScopedClasses['form-group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: "email",
    });
    let __VLS_11;
    /** @ts-ignore @type { | typeof InputText} */
    InputText;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        // @ts-ignore
        id: "email", modelValue: (form.value.email), autocomplete: "off", disabled: (isLoading.value || isEditing.value),
    }));
    const __VLS_13 = __VLS_12({
        id: "email",
        modelValue: (form.value.email),
        autocomplete: "off",
        disabled: (isLoading.value || isEditing.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "input-hint" },
    });
    /** @type {__VLS_StyleScopedClasses['input-hint']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-group" },
    });
    /** @type {__VLS_StyleScopedClasses['form-group']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    let __VLS_16;
    /** @ts-ignore @type { | typeof SelectButton} */
    SelectButton;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        // @ts-ignore
        modelValue: (form.value.role), options: (__VLS_unwrap(roleOptions, {})), optionLabel: "label", optionValue: "value", disabled: (isLoading.value),
    }));
    const __VLS_18 = __VLS_17({
        modelValue: (form.value.role),
        options: (__VLS_unwrap(roleOptions, {})),
        optionLabel: "label",
        optionValue: "value",
        disabled: (isLoading.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    if (isTeacher.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "form-group" },
        });
        /** @type {__VLS_StyleScopedClasses['form-group']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "checkbox-group" },
        });
        /** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
        const __VLS_21 = __VLS_tryAsConstant((__VLS_unwrap(activeSections, {})));
        for (const [section] of __VLS_vFor(__VLS_nonNull(__VLS_21))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (section.id),
                ...{ class: "checkbox-item" },
            });
            /** @type {__VLS_StyleScopedClasses['checkbox-item']} */ ;
            let __VLS_22;
            /** @ts-ignore @type { | typeof Checkbox} */
            Checkbox;
            // @ts-ignore
            const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
                // @ts-ignore
                modelValue: (form.value.sectionIds), inputId: (`section_${section.id}`), value: (section.id), disabled: (isLoading.value),
            }));
            const __VLS_24 = __VLS_23({
                modelValue: (form.value.sectionIds),
                inputId: (`section_${section.id}`),
                value: (section.id),
                disabled: (isLoading.value),
            }, ...__VLS_functionalComponentArgsRest(__VLS_23));
            __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
                for: (`section_${section.id}`),
            });
            (section.name);
            // @ts-ignore
            [visible, dialogTitle, form, form, form, form, isLoading, isLoading, isLoading, isLoading, isEditing, roleOptions, isTeacher, activeSections,];
        }
    }
    if (isEditing.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "form-group inline-group" },
        });
        /** @type {__VLS_StyleScopedClasses['form-group']} */ ;
        /** @type {__VLS_StyleScopedClasses['inline-group']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            for: "active",
        });
        let __VLS_27;
        /** @ts-ignore @type { | typeof ToggleSwitch} */
        ToggleSwitch;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
            // @ts-ignore
            id: "active", modelValue: (form.value.isActive), disabled: (isLoading.value),
        }));
        const __VLS_29 = __VLS_28({
            id: "active",
            modelValue: (form.value.isActive),
            disabled: (isLoading.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    }
    {
        const { footer: __VLS_32 } = __VLS_nonNull(__VLS_3.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dialog-footer" },
        });
        /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
        let __VLS_33;
        /** @ts-ignore @type { | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
            // @ts-ignore
            ...{ 'onClick': {} }, label: "Cancelar", severity: "secondary", outlined: true, disabled: (isLoading.value),
        }));
        const __VLS_35 = __VLS_34({
            ...{ 'onClick': {} },
            label: "Cancelar",
            severity: "secondary",
            outlined: true,
            disabled: (isLoading.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        let __VLS_38;
        const __VLS_39 = {
            /** @type {typeof __VLS_38.click} */
            onClick: (closeDialog),
        };
        void __VLS_39;
        var __VLS_36;
        var __VLS_37;
        let __VLS_40;
        /** @ts-ignore @type { | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
            // @ts-ignore
            ...{ 'onClick': {} }, label: "Salvar", loading: (isLoading.value),
        }));
        const __VLS_42 = __VLS_41({
            ...{ 'onClick': {} },
            label: "Salvar",
            loading: (isLoading.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        let __VLS_45;
        const __VLS_46 = {
            /** @type {typeof __VLS_45.click} */
            onClick: (__VLS_unwrap(handleSave, {})),
        };
        void __VLS_46;
        var __VLS_43;
        var __VLS_44;
        // @ts-ignore
        [form, isLoading, isLoading, isLoading, isEditing, handleSave,];
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
