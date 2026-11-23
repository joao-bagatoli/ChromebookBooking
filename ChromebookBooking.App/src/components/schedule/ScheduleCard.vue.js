import { reactive, watch, computed } from 'vue';
const { defineProps, defineEmits, } = {};
const props = defineProps();
const emit = defineEmits();
// Estado do formulário fica dentro do modal (não altera props)
const form = reactive({
    sectionId: null,
    discipline: '',
    isPartial: false,
    chromebooksQuantity: null,
});
// Ao desligar a reserva parcial, limpa a quantidade
watch(() => form.isPartial, (isPartial) => {
    if (!isPartial)
        form.chromebooksQuantity = null;
});
// Quando é parcial, a quantidade precisa ser um inteiro maior que zero
const quantityIsValid = computed(() => {
    if (!form.isPartial)
        return true;
    const qty = form.chromebooksQuantity;
    return qty !== null && Number.isInteger(qty) && qty > 0;
});
const canSubmit = computed(() => !!form.sectionId &&
    quantityIsValid.value &&
    props.availableCabinets.length > 0 &&
    !props.saving);
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});
function formatDate(date) {
    return dateFormatter.format(date);
}
function submit() {
    if (!canSubmit.value)
        return;
    emit('confirm', {
        sectionId: form.sectionId,
        discipline: form.discipline,
        isPartial: form.isPartial,
        chromebooksQuantity: form.isPartial ? form.chromebooksQuantity : null,
    });
}
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
    __VLS_withDotValue(quantityIsValid, {});
    __VLS_withDotValue(canSubmit, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
    /** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
    /** @type {__VLS_StyleScopedClasses['close-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['detail-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['detail-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['detail-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['switch-text']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['switch-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['switch-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['switch-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['switch-input']} */ ;
    /** @type {__VLS_StyleScopedClasses['teacher-field']} */ ;
    /** @type {__VLS_StyleScopedClasses['assignment-info']} */ ;
    /** @type {__VLS_StyleScopedClasses['secondary-modal-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['secondary-modal-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['secondary-modal-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['primary-modal-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['primary-modal-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['primary-modal-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['reservation-modal']} */ ;
    /** @type {__VLS_StyleScopedClasses['reservation-details']} */ ;
    /** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
    /** @type {__VLS_StyleScopedClasses['secondary-modal-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['primary-modal-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                void $event;
                return (__VLS_unwrap(emit, {})('close'));
                // @ts-ignore
                [emit,];
            } },
        ...{ class: "modal-backdrop" },
    });
    /** @type {__VLS_StyleScopedClasses['modal-backdrop']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "reservation-modal" },
        role: "dialog",
        'aria-modal': "true",
        'aria-labelledby': "reservation-title",
    });
    /** @type {__VLS_StyleScopedClasses['reservation-modal']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "modal-header" },
    });
    /** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        id: "reservation-title",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                void $event;
                return (__VLS_unwrap(emit, {})('close'));
                // @ts-ignore
                [emit,];
            } },
        ...{ class: "close-button" },
        type: "button",
        'aria-label': "Fechar",
    });
    /** @type {__VLS_StyleScopedClasses['close-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-times" },
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-times']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "reservation-details" },
    });
    /** @type {__VLS_StyleScopedClasses['reservation-details']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-card" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (formatDate(props.reservationDialog.day.date));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-card" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (props.reservationDialog.period.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    (props.reservationDialog.period.time);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-field" },
    });
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "teacher-field" },
    });
    /** @type {__VLS_StyleScopedClasses['teacher-field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-user" },
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-user']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (props.loggedTeacherName);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-field" },
    });
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: "reservation-section",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
        id: "reservation-section",
        value: (form.value.sectionId),
        disabled: (props.saving),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        value: (null),
    });
    const __VLS_0 = __VLS_tryAsConstant((props.sections));
    for (const [section] of __VLS_vFor(__VLS_nonNull(__VLS_0))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            key: (section.id),
            value: (section.id),
        });
        (section.name);
        // @ts-ignore
        [form,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-field" },
    });
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: "reservation-discipline",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        id: "reservation-discipline",
        value: (form.value.discipline),
        type: "text",
        placeholder: "Ex: Matemática",
        disabled: (props.saving),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "form-field" },
    });
    /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "switch-row" },
        for: "reservation-partial",
    });
    /** @type {__VLS_StyleScopedClasses['switch-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "switch-text" },
    });
    /** @type {__VLS_StyleScopedClasses['switch-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        id: "reservation-partial",
        ...{ class: "switch-input" },
        type: "checkbox",
        role: "switch",
        disabled: (props.saving),
    });
    (form.value.isPartial);
    /** @type {__VLS_StyleScopedClasses['switch-input']} */ ;
    if (form.value.isPartial) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "form-field" },
        });
        /** @type {__VLS_StyleScopedClasses['form-field']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            for: "reservation-quantity",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            id: "reservation-quantity",
            type: "number",
            min: "1",
            step: "1",
            placeholder: "Ex: 15",
            disabled: (props.saving),
        });
        (form.value.chromebooksQuantity);
        if (form.value.chromebooksQuantity !== null && !quantityIsValid.value) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
                ...{ class: "field-error" },
            });
            /** @type {__VLS_StyleScopedClasses['field-error']} */ ;
        }
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "assignment-info" },
    });
    /** @type {__VLS_StyleScopedClasses['assignment-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-sparkles" },
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-sparkles']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    if (props.availableCabinets.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "no-cabinets-message" },
        });
        /** @type {__VLS_StyleScopedClasses['no-cabinets-message']} */ ;
    }
    if (props.error) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "error-message" },
            role: "alert",
        });
        /** @type {__VLS_StyleScopedClasses['error-message']} */ ;
        (props.error);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
        ...{ class: "modal-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                void $event;
                return (__VLS_unwrap(emit, {})('close'));
                // @ts-ignore
                [emit, form, form, form, form, form, quantityIsValid,];
            } },
        ...{ class: "secondary-modal-button" },
        type: "button",
        disabled: (props.saving),
    });
    /** @type {__VLS_StyleScopedClasses['secondary-modal-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (submit) },
        ...{ class: "primary-modal-button" },
        type: "button",
        disabled: (!canSubmit.value),
    });
    /** @type {__VLS_StyleScopedClasses['primary-modal-button']} */ ;
    (props.saving ? 'Reservando...' : 'Confirmar Reserva');
    // @ts-ignore
    [canSubmit,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
