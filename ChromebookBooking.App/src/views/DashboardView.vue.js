import { onMounted, computed } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import Badge from 'primevue/badge';
const dashboardStore = useDashboardStore();
onMounted(() => {
    dashboardStore.getCabinetsOverview();
    dashboardStore.getTodayBookings();
});
const currentClassText = computed(() => {
    return dashboardStore.cabinetsOverview?.currentClassPeriod?.name || 'Carregando...';
});
const getCabinetStatusConfig = (status) => {
    switch (status) {
        case 'Available':
            return { label: 'Livre', severity: 'success', class: 'status-available' };
        case 'Booked':
            return { label: 'Em uso', severity: 'warn', class: 'status-booked' };
        case 'Inactive':
            return { label: 'Inativo', severity: 'secondary', class: 'status-inactive' };
        default:
            return { label: 'Desconhecido', severity: 'info', class: '' };
    }
};
const totalCabinets = computed(() => {
    return dashboardStore.cabinetsOverview?.cabinets?.length || 5;
});
// Agrupa as reservas pelo período da aula
const groupedBookings = computed(() => {
    if (!dashboardStore.todayBookings)
        return [];
    const groups = new Map();
    dashboardStore.todayBookings.forEach((booking) => {
        const periodKey = booking.classPeriodName;
        if (!groups.has(periodKey)) {
            groups.set(periodKey, {
                periodName: periodKey,
                periodId: booking.classPeriodId,
                // timeText: booking.startTime && booking.endTime ? `${booking.startTime} - ${booking.endTime}` : '8:30 - 9:15',
                bookings: []
            });
        }
        if (booking.cabinetName) {
            groups.get(periodKey).bookings.push(booking);
        }
    });
    // Retorna ordenado pelo ID do período para aparecer na ordem certa (1ª, 2ª, 3ª aula)
    return Array.from(groups.values()).sort((a, b) => a.periodId - b.periodId);
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(dashboardStore, {});
    __VLS_withDotValue(groupedBookings, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['icon-container']} */ ;
    /** @type {__VLS_StyleScopedClasses['class-info']} */ ;
    /** @type {__VLS_StyleScopedClasses['class-info']} */ ;
    /** @type {__VLS_StyleScopedClasses['card-footer']} */ ;
    /** @type {__VLS_StyleScopedClasses['schedule-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['period-info']} */ ;
    /** @type {__VLS_StyleScopedClasses['period-info']} */ ;
    /** @type {__VLS_StyleScopedClasses['schedule-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['capacity-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dashboard-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['dashboard-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "page-header" },
    });
    /** @type {__VLS_StyleScopedClasses['page-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "view-title" },
    });
    /** @type {__VLS_StyleScopedClasses['view-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "view-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['view-subtitle']} */ ;
    if (dashboardStore.value.isLoadingOverview) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "loading-state" },
        });
        /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
            ...{ class: "pi pi-spin pi-spinner loading-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['pi']} */ ;
        /** @type {__VLS_StyleScopedClasses['pi-spin']} */ ;
        /** @type {__VLS_StyleScopedClasses['pi-spinner']} */ ;
        /** @type {__VLS_StyleScopedClasses['loading-icon']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "current-class-banner" },
        });
        /** @type {__VLS_StyleScopedClasses['current-class-banner']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "icon-container" },
        });
        /** @type {__VLS_StyleScopedClasses['icon-container']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
            ...{ class: "pi pi-book" },
            ...{ class: ({ 'text-blue-500': dashboardStore.value.cabinetsOverview?.currentClassPeriod?.isClassTime }) },
        });
        /** @type {__VLS_StyleScopedClasses['pi']} */ ;
        /** @type {__VLS_StyleScopedClasses['pi-book']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "class-info" },
        });
        /** @type {__VLS_StyleScopedClasses['class-info']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "label" },
        });
        /** @type {__VLS_StyleScopedClasses['label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
            ...{ class: "value" },
        });
        /** @type {__VLS_StyleScopedClasses['value']} */ ;
        (__VLS_unwrap(currentClassText, {}));
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "cabinets-grid" },
        });
        /** @type {__VLS_StyleScopedClasses['cabinets-grid']} */ ;
        const __VLS_0 = __VLS_tryAsConstant((dashboardStore.value.cabinetsOverview?.cabinets));
        for (const [cabinet] of __VLS_vFor(__VLS_nonNull(__VLS_0))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (cabinet.id),
                ...{ class: "cabinet-card" },
                ...{ class: (__VLS_unwrap(getCabinetStatusConfig, {})(cabinet.status).class) },
            });
            /** @type {__VLS_StyleScopedClasses['cabinet-card']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "card-header" },
            });
            /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "cabinet-name" },
            });
            /** @type {__VLS_StyleScopedClasses['cabinet-name']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                ...{ class: "pi pi-desktop" },
            });
            /** @type {__VLS_StyleScopedClasses['pi']} */ ;
            /** @type {__VLS_StyleScopedClasses['pi-desktop']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (cabinet.name);
            let __VLS_1;
            /** @ts-ignore @type { | typeof Badge} */
            Badge;
            // @ts-ignore
            const __VLS_2 = __VLS_asFunctionalComponent1(__VLS_1, new __VLS_1({
                // @ts-ignore
                value: (__VLS_unwrap(getCabinetStatusConfig, {})(cabinet.status).label), severity: (__VLS_unwrap(getCabinetStatusConfig, {})(cabinet.status).severity),
            }));
            const __VLS_3 = __VLS_2({
                value: (__VLS_unwrap(getCabinetStatusConfig, {})(cabinet.status).label),
                severity: (__VLS_unwrap(getCabinetStatusConfig, {})(cabinet.status).severity),
            }, ...__VLS_functionalComponentArgsRest(__VLS_2));
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "card-body" },
            });
            /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
            if (cabinet.status === 'Available') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            }
            else if (cabinet.status === 'Booked') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            }
            else {
                __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            }
            if (cabinet.status === 'Available') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-footer" },
                });
                /** @type {__VLS_StyleScopedClasses['card-footer']} */ ;
                if (dashboardStore.value.cabinetsOverview?.currentClassPeriod?.isClassTime) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
                }
                else {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
                }
            }
            // @ts-ignore
            [dashboardStore, dashboardStore, dashboardStore, dashboardStore, currentClassText, getCabinetStatusConfig, getCabinetStatusConfig, getCabinetStatusConfig,];
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "schedule-section" },
        });
        /** @type {__VLS_StyleScopedClasses['schedule-section']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "schedule-card" },
        });
        /** @type {__VLS_StyleScopedClasses['schedule-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "schedule-title" },
        });
        /** @type {__VLS_StyleScopedClasses['schedule-title']} */ ;
        if (dashboardStore.value.isLoadingBookings) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "loading-state-small" },
            });
            /** @type {__VLS_StyleScopedClasses['loading-state-small']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
                ...{ class: "pi pi-spin pi-spinner" },
            });
            /** @type {__VLS_StyleScopedClasses['pi']} */ ;
            /** @type {__VLS_StyleScopedClasses['pi-spin']} */ ;
            /** @type {__VLS_StyleScopedClasses['pi-spinner']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "schedule-list" },
            });
            /** @type {__VLS_StyleScopedClasses['schedule-list']} */ ;
            if (groupedBookings.value.length === 0) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "schedule-row empty-row" },
                });
                /** @type {__VLS_StyleScopedClasses['schedule-row']} */ ;
                /** @type {__VLS_StyleScopedClasses['empty-row']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "bookings-tags" },
                });
                /** @type {__VLS_StyleScopedClasses['bookings-tags']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "empty-text" },
                });
                /** @type {__VLS_StyleScopedClasses['empty-text']} */ ;
            }
            const __VLS_6 = __VLS_tryAsConstant((groupedBookings.value));
            for (const [group] of __VLS_vFor(__VLS_nonNull(__VLS_6))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    key: (group.periodName),
                    ...{ class: "schedule-row" },
                });
                /** @type {__VLS_StyleScopedClasses['schedule-row']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "period-info" },
                });
                /** @type {__VLS_StyleScopedClasses['period-info']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "period-name" },
                });
                /** @type {__VLS_StyleScopedClasses['period-name']} */ ;
                (group.periodName);
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "bookings-tags" },
                });
                /** @type {__VLS_StyleScopedClasses['bookings-tags']} */ ;
                if (group.bookings.length === 0) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                        ...{ class: "empty-text" },
                    });
                    /** @type {__VLS_StyleScopedClasses['empty-text']} */ ;
                }
                else {
                    const __VLS_7 = __VLS_tryAsConstant((group.bookings));
                    for (const [booking] of __VLS_vFor(__VLS_nonNull(__VLS_7))) {
                        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                            key: (booking.id),
                            ...{ class: "booking-tag" },
                        });
                        /** @type {__VLS_StyleScopedClasses['booking-tag']} */ ;
                        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
                        (booking.cabinetName);
                        (booking.teacherName || '');
                        (booking.sectionName);
                        // @ts-ignore
                        [dashboardStore, groupedBookings, groupedBookings,];
                    }
                }
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "capacity-info" },
                });
                /** @type {__VLS_StyleScopedClasses['capacity-info']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "fraction" },
                });
                /** @type {__VLS_StyleScopedClasses['fraction']} */ ;
                (group.bookings.length);
                (__VLS_unwrap(totalCabinets, {}));
                // @ts-ignore
                [totalCabinets,];
            }
        }
    }
    // @ts-ignore
    [];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
