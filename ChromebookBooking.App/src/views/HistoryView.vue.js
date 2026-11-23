import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Badge from 'primevue/badge';
import { FilterMatchMode } from '@primevue/core/api';
import { useBookingStore } from '@/stores/booking';
import { formatDate } from '@/utils/date';
const bookingStore = useBookingStore();
const loading = ref(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const fetchBookings = async () => {
    loading.value = true;
    try {
        await bookingStore.fetchAll();
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    fetchBookings();
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(bookingStore, {});
    __VLS_withDotValue(filters, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "view-header" },
    });
    /** @type {__VLS_StyleScopedClasses['view-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "view-title" },
    });
    /** @type {__VLS_StyleScopedClasses['view-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "view-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['view-subtitle']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "table-card" },
    });
    /** @type {__VLS_StyleScopedClasses['table-card']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof DataTable | typeof DataTable} */
    DataTable;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        filters: (filters.value), value: (bookingStore.value.allBookings), loading: (__VLS_unwrap(loading, {})), dataKey: "id", globalFilterFields: (['teacherName', 'sectionName', 'classPeriodName']), responsiveLayout: "scroll", stripedRows: true,
    }));
    const __VLS_2 = __VLS_1({
        filters: (filters.value),
        value: (bookingStore.value.allBookings),
        loading: (__VLS_unwrap(loading, {})),
        dataKey: "id",
        globalFilterFields: (['teacherName', 'sectionName', 'classPeriodName']),
        responsiveLayout: "scroll",
        stripedRows: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_3;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    {
        const { header: __VLS_6 } = __VLS_nonNull(__VLS_3.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "table-toolbar" },
        });
        /** @type {__VLS_StyleScopedClasses['table-toolbar']} */ ;
        let __VLS_7;
        /** @ts-ignore @type { | typeof IconField | typeof IconField} */
        IconField;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            // @ts-ignore
            iconPosition: "left",
        }));
        const __VLS_9 = __VLS_8({
            iconPosition: "left",
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        var __VLS_10;
        const { default: __VLS_12 } = __VLS_nonNull(__VLS_10.slots);
        let __VLS_13;
        /** @ts-ignore @type { | typeof InputIcon} */
        InputIcon;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
            // @ts-ignore
            ...{ class: "pi pi-search" },
        }));
        const __VLS_15 = __VLS_14({
            ...{ class: "pi pi-search" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        /** @type {__VLS_StyleScopedClasses['pi']} */ ;
        /** @type {__VLS_StyleScopedClasses['pi-search']} */ ;
        let __VLS_18;
        /** @ts-ignore @type { | typeof InputText} */
        InputText;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            // @ts-ignore
            modelValue: (filters.value.global.value), placeholder: "Buscar professor, turma, aula...", ...{ class: "search-input" },
        }));
        const __VLS_20 = __VLS_19({
            modelValue: (filters.value.global.value),
            placeholder: "Buscar professor, turma, aula...",
            ...{ class: "search-input" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
        // @ts-ignore
        [filters, filters, bookingStore, loading,];
        // @ts-ignore
        [];
    }
    {
        const { empty: __VLS_23 } = __VLS_nonNull(__VLS_3.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "empty-state" },
        });
        /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.i)({
            ...{ class: "pi pi-inbox empty-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['pi']} */ ;
        /** @type {__VLS_StyleScopedClasses['pi-inbox']} */ ;
        /** @type {__VLS_StyleScopedClasses['empty-icon']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        // @ts-ignore
        [];
    }
    let __VLS_24;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        // @ts-ignore
        field: "date", header: "Data", sortable: true, ...{ style: {} },
    }));
    const __VLS_26 = __VLS_25({
        field: "date",
        header: "Data",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_27;
    const { default: __VLS_29 } = __VLS_nonNull(__VLS_27.slots);
    {
        const { body: __VLS_30 } = __VLS_nonNull(__VLS_27.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_30));
        (__VLS_unwrap(formatDate, {})(data.date));
        // @ts-ignore
        [formatDate,];
    }
    // @ts-ignore
    [];
    let __VLS_31;
    /** @ts-ignore @type { | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        // @ts-ignore
        field: "classPeriodName", header: "Aula", sortable: true, ...{ style: {} },
    }));
    const __VLS_33 = __VLS_32({
        field: "classPeriodName",
        header: "Aula",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    let __VLS_36;
    /** @ts-ignore @type { | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        // @ts-ignore
        field: "sectionName", header: "Turma", sortable: true, ...{ style: {} },
    }));
    const __VLS_38 = __VLS_37({
        field: "sectionName",
        header: "Turma",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_41;
    /** @ts-ignore @type { | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
        // @ts-ignore
        field: "teacherName", header: "Professor", sortable: true, ...{ style: {} },
    }));
    const __VLS_43 = __VLS_42({
        field: "teacherName",
        header: "Professor",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_46;
    /** @ts-ignore @type { | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        // @ts-ignore
        field: "subject", header: "Disciplina", sortable: true, ...{ style: {} },
    }));
    const __VLS_48 = __VLS_47({
        field: "subject",
        header: "Disciplina",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    let __VLS_51;
    /** @ts-ignore @type { | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
        // @ts-ignore
        field: "cabinetName", header: "Gabinete", sortable: true, ...{ style: {} },
    }));
    const __VLS_53 = __VLS_52({
        field: "cabinetName",
        header: "Gabinete",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    let __VLS_56;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
        // @ts-ignore
        field: "isPartial", header: "Tipo", sortable: true, ...{ style: {} },
    }));
    const __VLS_58 = __VLS_57({
        field: "isPartial",
        header: "Tipo",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    var __VLS_59;
    const { default: __VLS_61 } = __VLS_nonNull(__VLS_59.slots);
    {
        const { body: __VLS_62 } = __VLS_nonNull(__VLS_59.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_62));
        let __VLS_63;
        /** @ts-ignore @type { | typeof Badge} */
        Badge;
        // @ts-ignore
        const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
            // @ts-ignore
            value: (data.isPartial ? 'Parcial' : 'Integral'), severity: (data.isPartial ? 'warn' : 'info'),
        }));
        const __VLS_65 = __VLS_64({
            value: (data.isPartial ? 'Parcial' : 'Integral'),
            severity: (data.isPartial ? 'warn' : 'info'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_64));
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    let __VLS_68;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
        // @ts-ignore
        field: "chromebooksQuantity", header: "Qtd. Chromebooks", sortable: true, ...{ style: {} },
    }));
    const __VLS_70 = __VLS_69({
        field: "chromebooksQuantity",
        header: "Qtd. Chromebooks",
        sortable: true,
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    var __VLS_71;
    const { default: __VLS_73 } = __VLS_nonNull(__VLS_71.slots);
    {
        const { body: __VLS_74 } = __VLS_nonNull(__VLS_71.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_74));
        let __VLS_75;
        /** @ts-ignore @type { | typeof Badge} */
        Badge;
        // @ts-ignore
        const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
            // @ts-ignore
            value: (data.chromebooksQuantity ?? 0), severity: "secondary", size: "large",
        }));
        const __VLS_77 = __VLS_76({
            value: (data.chromebooksQuantity ?? 0),
            severity: "secondary",
            size: "large",
        }, ...__VLS_functionalComponentArgsRest(__VLS_76));
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    // @ts-ignore
    [];
    // @ts-ignore
    [];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
