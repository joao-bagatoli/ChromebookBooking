import { computed, ref } from 'vue';
import SelectButton from 'primevue/selectbutton';
const { defineProps, defineEmits, } = {};
const props = defineProps();
const emit = defineEmits();
// Paleta de matizes (hue) usada para diferenciar os professores
const TEACHER_HUES = [211, 145, 28, 275, 345, 175, 48, 320, 100, 0, 235, 195];
// Gera um número estável a partir de um texto (mesmo professor = mesmo número)
function hashString(value) {
    let hash = 0;
    for (let index = 0; index < value.length; index++) {
        hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
    }
    return hash;
}
// Devolve as cores do chip como variáveis CSS, sempre iguais para o mesmo professor
function getChipStyle(teacher) {
    const key = teacher.trim().toLowerCase();
    const hue = TEACHER_HUES[hashString(key) % TEACHER_HUES.length];
    return {
        '--chip-bg': `hsl(${hue} 80% 93%)`,
        '--chip-border': `hsl(${hue} 60% 70%)`,
        '--chip-text': `hsl(${hue} 55% 30%)`,
        '--chip-muted': `hsl(${hue} 35% 45%)`,
    };
}
const dayNumberFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
});
function formatDayNumber(date) {
    return dayNumberFormatter.format(date);
}
function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
// Texto exibido no chip apenas para reservas parciais
function reservationTypeLabel(booking) {
    const quantity = booking.chromebooksQuantity;
    return quantity ? `Parcial (${quantity})` : 'Parcial';
}
function canReserve(day, period) {
    const isLockedTime = props.isLocked(day, period);
    const hasAvailableCabinets = props.getAvailableCabinets(day, period).length > 0;
    const iAmAlreadyBooked = props.getBookings(day, period).some(b => b.isMine);
    return !isLockedTime && hasAvailableCabinets && !iAmAlreadyBooked;
}
function reserveLabel(day, period) {
    if (props.isLocked(day, period))
        return 'Indisponível';
    const iAmAlreadyBooked = props.getBookings(day, period).some(b => b.isMine);
    if (iAmAlreadyBooked)
        return 'Você já reservou este horário';
    return props.getAvailableCabinets(day, period).length ? 'Reservar gabinete' : 'Sem gabinetes';
}
const monthYearFormatter = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric'
});
const currentMonthYear = computed(() => {
    if (!props.weekDays || props.weekDays.length === 0)
        return '';
    const firstDayOfWeek = props.weekDays[0]?.date ?? null;
    if (!firstDayOfWeek)
        return '';
    const formatted = monthYearFormatter.format(firstDayOfWeek);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
});
const selectedShift = ref('Morning');
const shiftOptions = [
    { label: 'Matutino', value: 'Morning' },
    { label: 'Vespertino', value: 'Afternoon' },
];
const filteredPeriods = computed(() => {
    return props.periods.filter(period => period.shift === selectedShift.value);
});
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
    void {};
    /** @type {__VLS_StyleScopedClasses['calendar-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['day-heading']} */ ;
    /** @type {__VLS_StyleScopedClasses['day-heading']} */ ;
    /** @type {__VLS_StyleScopedClasses['day-heading']} */ ;
    /** @type {__VLS_StyleScopedClasses['day-heading']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-selected-day']} */ ;
    /** @type {__VLS_StyleScopedClasses['day-heading']} */ ;
    /** @type {__VLS_StyleScopedClasses['day-heading']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-past-day']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['period-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['period-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-past']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-past']} */ ;
    /** @type {__VLS_StyleScopedClasses['availability']} */ ;
    /** @type {__VLS_StyleScopedClasses['availability']} */ ;
    /** @type {__VLS_StyleScopedClasses['booking-chip']} */ ;
    /** @type {__VLS_StyleScopedClasses['booking-list']} */ ;
    /** @type {__VLS_StyleScopedClasses['cancel-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['reserve-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
    /** @type {__VLS_StyleScopedClasses['reserve-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['reserve-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['reserve-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['reserve-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-grid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "calendar-actions" },
        'aria-label': "Navegação da agenda",
    });
    /** @type {__VLS_StyleScopedClasses['calendar-actions']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "current-month-year" },
    });
    /** @type {__VLS_StyleScopedClasses['current-month-year']} */ ;
    (__VLS_unwrap(currentMonthYear, {}));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "nav-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['nav-actions']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof SelectButton} */
    SelectButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        modelValue: (__VLS_unwrap(selectedShift, {})), options: (__VLS_unwrap(shiftOptions, {})), optionLabel: "label", optionValue: "value", allowEmpty: (false), size: "small", 'aria-label': "Selecionar turno",
    }));
    const __VLS_2 = __VLS_1({
        modelValue: (__VLS_unwrap(selectedShift, {})),
        options: (__VLS_unwrap(shiftOptions, {})),
        optionLabel: "label",
        optionValue: "value",
        allowEmpty: (false),
        size: "small",
        'aria-label': "Selecionar turno",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "nav-buttons" },
    });
    /** @type {__VLS_StyleScopedClasses['nav-buttons']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                void $event;
                return (__VLS_unwrap(emit, {})('moveWeek', -1));
                // @ts-ignore
                [currentMonthYear, selectedShift, shiftOptions, emit,];
            } },
        ...{ class: "calendar-button icon-button" },
        type: "button",
        'aria-label': "Semana anterior",
    });
    /** @type {__VLS_StyleScopedClasses['calendar-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-angle-left" },
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-angle-left']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                void $event;
                return (__VLS_unwrap(emit, {})('goToToday'));
                // @ts-ignore
                [emit,];
            } },
        ...{ class: "calendar-button today-button" },
        type: "button",
    });
    /** @type {__VLS_StyleScopedClasses['calendar-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['today-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                void $event;
                return (__VLS_unwrap(emit, {})('moveWeek', 1));
                // @ts-ignore
                [emit,];
            } },
        ...{ class: "calendar-button icon-button" },
        type: "button",
        'aria-label': "Próxima semana",
    });
    /** @type {__VLS_StyleScopedClasses['calendar-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-angle-right" },
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-angle-right']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "calendar-shell" },
    });
    /** @type {__VLS_StyleScopedClasses['calendar-shell']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "calendar-grid calendar-heading" },
    });
    /** @type {__VLS_StyleScopedClasses['calendar-grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['calendar-heading']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "period-heading" },
    });
    /** @type {__VLS_StyleScopedClasses['period-heading']} */ ;
    const __VLS_5 = __VLS_tryAsConstant((props.weekDays));
    for (const [day] of __VLS_vFor(__VLS_nonNull(__VLS_5))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (day.key),
            ...{ class: "day-heading" },
            ...{ class: ({
                    'is-selected-day': day.isToday,
                    'is-past-day': day.isPast,
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['day-heading']} */ ;
        /** @type {__VLS_StyleScopedClasses['is-selected-day']} */ ;
        /** @type {__VLS_StyleScopedClasses['is-past-day']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (capitalize(day.label));
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (formatDayNumber(day.date));
        if (day.isToday) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
                ...{ class: "today-label" },
            });
            /** @type {__VLS_StyleScopedClasses['today-label']} */ ;
        }
        // @ts-ignore
        [];
    }
    const __VLS_6 = __VLS_tryAsConstant((__VLS_unwrap(filteredPeriods, {})));
    for (const [period] of __VLS_vFor(__VLS_nonNull(__VLS_6))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (period.id),
            ...{ class: "calendar-grid calendar-row" },
        });
        /** @type {__VLS_StyleScopedClasses['calendar-grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['calendar-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "period-cell" },
        });
        /** @type {__VLS_StyleScopedClasses['period-cell']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (period.label);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (period.time);
        const __VLS_7 = __VLS_tryAsConstant((props.weekDays));
        for (const [day] of __VLS_vFor(__VLS_nonNull(__VLS_7))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ onClick: (...[$event]) => {
                        void $event;
                        return (__VLS_unwrap(emit, {})('selectSlot', day, period));
                        // @ts-ignore
                        [emit, filteredPeriods,];
                    } },
                ...{ onKeydown: (...[$event]) => {
                        void $event;
                        return (__VLS_unwrap(emit, {})('selectSlot', day, period));
                        // @ts-ignore
                        [emit,];
                    } },
                key: (`${day.key}-${period.id}`),
                ...{ class: "calendar-cell" },
                ...{ class: ({
                        'has-selection': props.selectedSlot?.day.key === day.key &&
                            props.selectedSlot?.period.id === period.id,
                        'is-past': day.isPast,
                    }) },
                role: "button",
                tabindex: "0",
            });
            /** @type {__VLS_StyleScopedClasses['calendar-cell']} */ ;
            /** @type {__VLS_StyleScopedClasses['has-selection']} */ ;
            /** @type {__VLS_StyleScopedClasses['is-past']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "availability" },
                ...{ class: ({ occupied: props.getBookings(day, period).length > 0 }) },
            });
            /** @type {__VLS_StyleScopedClasses['availability']} */ ;
            /** @type {__VLS_StyleScopedClasses['occupied']} */ ;
            (props.getBookings(day, period).length);
            (props.totalCabinets);
            if (props.getBookings(day, period).length) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "booking-list" },
                });
                /** @type {__VLS_StyleScopedClasses['booking-list']} */ ;
                const __VLS_8 = __VLS_tryAsConstant((props.getBookings(day, period)));
                for (const [booking] of __VLS_vFor(__VLS_nonNull(__VLS_8))) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                        key: (booking.id),
                        ...{ class: "booking-chip" },
                        ...{ style: (getChipStyle(booking.teacher)) },
                    });
                    /** @type {__VLS_StyleScopedClasses['booking-chip']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                    (booking.className);
                    (booking.teacher);
                    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
                    (booking.cabinetName);
                    if (booking.discipline) {
                        __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
                        (booking.discipline);
                    }
                    if (booking.isPartial) {
                        __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
                        (reservationTypeLabel(booking));
                    }
                    if (booking.isMine && !day.isPast) {
                        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                            ...{ onClick: (...[$event]) => {
                                    void $event;
                                    if (!(props.getBookings(day, period).length))
                                        throw 0;
                                    if (!(booking.isMine && !day.isPast))
                                        throw 0;
                                    return (__VLS_unwrap(emit, {})('cancelBooking', booking.id));
                                    // @ts-ignore
                                    [emit,];
                                } },
                            ...{ class: "cancel-button" },
                            type: "button",
                        });
                        /** @type {__VLS_StyleScopedClasses['cancel-button']} */ ;
                    }
                    // @ts-ignore
                    [];
                }
                __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
                (props.getAvailableCabinets(day, period).length);
            }
            if (!day.isPast) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onClick: (...[$event]) => {
                            void $event;
                            if (!(!day.isPast))
                                throw 0;
                            return (__VLS_unwrap(emit, {})('openReservation', day, period));
                            // @ts-ignore
                            [emit,];
                        } },
                    ...{ class: "reserve-button" },
                    type: "button",
                    disabled: (!canReserve(day, period)),
                });
                /** @type {__VLS_StyleScopedClasses['reserve-button']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                    ...{ class: "pi pi-plus" },
                });
                /** @type {__VLS_StyleScopedClasses['pi']} */ ;
                /** @type {__VLS_StyleScopedClasses['pi-plus']} */ ;
                (reserveLabel(day, period));
            }
            if (day.isPast) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "past-label" },
                });
                /** @type {__VLS_StyleScopedClasses['past-label']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                    ...{ class: "pi pi-lock" },
                });
                /** @type {__VLS_StyleScopedClasses['pi']} */ ;
                /** @type {__VLS_StyleScopedClasses['pi-lock']} */ ;
            }
            else if (props.isLocked(day, period)) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "past-label" },
                });
                /** @type {__VLS_StyleScopedClasses['past-label']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                    ...{ class: "pi pi-clock" },
                });
                /** @type {__VLS_StyleScopedClasses['pi']} */ ;
                /** @type {__VLS_StyleScopedClasses['pi-clock']} */ ;
            }
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
    }
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
