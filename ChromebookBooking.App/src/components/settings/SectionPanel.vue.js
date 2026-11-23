import { onMounted, computed, ref } from 'vue';
import { useSectionStore } from '@/stores/section';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
const { defineProps, defineEmits, } = {};
const props = defineProps();
const sectionStore = useSectionStore();
const emit = defineEmits(['edit']);
const toast = useToast();
const loading = ref(true);
function getSectionStatus(isActive) {
    return isActive ? 'Ativa' : 'Inativa';
}
function getSectionStatusSeverity(isActive) {
    return isActive ? 'success' : 'danger';
}
function getShiftLabel(shift) {
    if (shift === 'Morning')
        return 'Matutino';
    if (shift === 'Afternoon')
        return 'Vespertino';
    return 'Não definido';
}
function getShiftSeverity(shift) {
    if (shift === 'Morning')
        return 'info';
    if (shift === 'Afternoon')
        return 'warn';
    return 'secondary';
}
function onEditSection(data) {
    emit('edit', data);
}
async function onDeleteSection(data) {
    toast.add({
        severity: 'info',
        summary: 'Aguarde',
        detail: 'Deletando a turma...',
        life: 2000
    });
    try {
        await sectionStore.deleteSection(data.id);
        toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Turma deletada com sucesso!',
            life: 3000
        });
    }
    catch {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível deletar a turma.',
            life: 3000
        });
    }
}
const filteredSections = computed(() => {
    const query = props.search.toLowerCase();
    if (!query)
        return sectionStore.sections;
    return sectionStore.sections.filter((section) => {
        return section.name.toLowerCase().includes(query);
    });
});
onMounted(async () => {
    loading.value = true;
    try {
        await sectionStore.loadSections();
    }
    finally {
        loading.value = false;
    }
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_0;
    /** @ts-ignore @type { | typeof DataTable | typeof DataTable} */
    DataTable;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        value: (__VLS_unwrap(filteredSections, {})), loading: (__VLS_unwrap(loading, {})), scrollable: true, scrollHeight: "calc(100vh - 260px)",
    }));
    const __VLS_2 = __VLS_1({
        value: (__VLS_unwrap(filteredSections, {})),
        loading: (__VLS_unwrap(loading, {})),
        scrollable: true,
        scrollHeight: "calc(100vh - 260px)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_3;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    {
        const { empty: __VLS_6 } = __VLS_nonNull(__VLS_3.slots);
        // @ts-ignore
        [filteredSections, loading,];
    }
    let __VLS_7;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        // @ts-ignore
        field: "name", header: "Turma",
    }));
    const __VLS_9 = __VLS_8({
        field: "name",
        header: "Turma",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        // @ts-ignore
        field: "shift", header: "Turno",
    }));
    const __VLS_14 = __VLS_13({
        field: "shift",
        header: "Turno",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    var __VLS_15;
    const { default: __VLS_17 } = __VLS_nonNull(__VLS_15.slots);
    {
        const { body: __VLS_18 } = __VLS_nonNull(__VLS_15.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_18));
        if (data.shift) {
            let __VLS_19;
            /** @ts-ignore @type { | typeof Tag | typeof Tag} */
            Tag;
            // @ts-ignore
            const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
                // @ts-ignore
                value: (getShiftLabel(data.shift)), severity: (getShiftSeverity(data.shift)), rounded: true,
            }));
            const __VLS_21 = __VLS_20({
                value: (getShiftLabel(data.shift)),
                severity: (getShiftSeverity(data.shift)),
                rounded: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-gray-500" },
            });
            /** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
        }
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    let __VLS_24;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        // @ts-ignore
        field: "isActive", header: "Status",
    }));
    const __VLS_26 = __VLS_25({
        field: "isActive",
        header: "Status",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_27;
    const { default: __VLS_29 } = __VLS_nonNull(__VLS_27.slots);
    {
        const { body: __VLS_30 } = __VLS_nonNull(__VLS_27.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_30));
        let __VLS_31;
        /** @ts-ignore @type { | typeof Tag | typeof Tag} */
        Tag;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
            // @ts-ignore
            value: (getSectionStatus(data.isActive)), severity: (getSectionStatusSeverity(data.isActive)), rounded: true,
        }));
        const __VLS_33 = __VLS_32({
            value: (getSectionStatus(data.isActive)),
            severity: (getSectionStatusSeverity(data.isActive)),
            rounded: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    let __VLS_36;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        // @ts-ignore
        header: "Ações",
    }));
    const __VLS_38 = __VLS_37({
        header: "Ações",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_39;
    const { default: __VLS_41 } = __VLS_nonNull(__VLS_39.slots);
    {
        const { body: __VLS_42 } = __VLS_nonNull(__VLS_39.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_42));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "table-actions" },
        });
        /** @type {__VLS_StyleScopedClasses['table-actions']} */ ;
        let __VLS_43;
        /** @ts-ignore @type { | typeof Button | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
            // @ts-ignore
            ...{ 'onClick': {} }, icon: "pi pi-pencil", text: true, rounded: true, severity: "secondary", 'aria-label': "Editar", title: "Editar",
        }));
        const __VLS_45 = __VLS_44({
            ...{ 'onClick': {} },
            icon: "pi pi-pencil",
            text: true,
            rounded: true,
            severity: "secondary",
            'aria-label': "Editar",
            title: "Editar",
        }, ...__VLS_functionalComponentArgsRest(__VLS_44));
        let __VLS_48;
        const __VLS_49 = {
            /** @type {typeof __VLS_48.click} */
            onClick: (...[$event]) => {
                void $event;
                return (onEditSection(data));
                // @ts-ignore
                [];
            },
        };
        void __VLS_49;
        var __VLS_46;
        var __VLS_47;
        let __VLS_50;
        /** @ts-ignore @type { | typeof Button | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
            // @ts-ignore
            ...{ 'onClick': {} }, icon: "pi pi-trash", text: true, rounded: true, severity: "danger", 'aria-label': "Excluir", title: "Excluir",
        }));
        const __VLS_52 = __VLS_51({
            ...{ 'onClick': {} },
            icon: "pi pi-trash",
            text: true,
            rounded: true,
            severity: "danger",
            'aria-label': "Excluir",
            title: "Excluir",
        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
        let __VLS_55;
        const __VLS_56 = {
            /** @type {typeof __VLS_55.click} */
            onClick: (...[$event]) => {
                void $event;
                return (onDeleteSection(data));
                // @ts-ignore
                [];
            },
        };
        void __VLS_56;
        var __VLS_53;
        var __VLS_54;
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
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
