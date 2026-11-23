import { onMounted, ref, computed } from 'vue';
import { useCabinetStore } from '@/stores/cabinet';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import CabinetDialog from '@/components/settings/dialogs/CabinetDialog.vue';
import { useToast } from 'primevue/usetoast';
const { defineProps, } = {};
const props = defineProps();
const cabinetStore = useCabinetStore();
const dialogVisible = ref(false);
const selectedCabinet = ref(null);
const toast = useToast();
const columns = [
    { field: 'name', header: 'Nome' },
    { field: 'isActive', header: 'Status' },
    { field: 'action', header: 'Ações' }
];
function getCabinetStatus(isActive) {
    return isActive ? 'Ativo' : 'Inativo';
}
function getCabinetStatusSeverity(isActive) {
    return isActive ? 'success' : 'danger';
}
const filteredCabinets = computed(() => {
    const query = props.search.toLowerCase();
    if (!query)
        return cabinetStore.cabinets;
    return cabinetStore.cabinets.filter((cabinet) => {
        return cabinet.name.toLowerCase().includes(query);
    });
});
onMounted(async () => {
    await cabinetStore.getAllCabinets();
});
const editCabinet = (cabinet) => {
    selectedCabinet.value = { ...cabinet };
    dialogVisible.value = true;
};
const deleteCabinet = async (cabinet) => {
    try {
        await cabinetStore.deleteCabinet(cabinet.id);
        toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Gabinete deletado com sucesso!',
            life: 3000
        });
    }
    catch {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível deletar o gabinete.',
            life: 3000
        });
    }
};
const handleDialogClose = () => {
    if (!dialogVisible.value) {
        selectedCabinet.value = null;
    }
};
const __VLS_ctx = {
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "table-container" },
    });
    /** @type {__VLS_StyleScopedClasses['table-container']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof Toast} */
    Toast;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        position: "bottom-right",
    }));
    const __VLS_2 = __VLS_1({
        position: "bottom-right",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    /** @ts-ignore @type { | typeof DataTable | typeof DataTable} */
    DataTable;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        // @ts-ignore
        value: (__VLS_unwrap(filteredCabinets, {})), responsiveLayout: "scroll", ...{ class: "custom-table" },
    }));
    const __VLS_7 = __VLS_6({
        value: (__VLS_unwrap(filteredCabinets, {})),
        responsiveLayout: "scroll",
        ...{ class: "custom-table" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
    var __VLS_8;
    const { default: __VLS_10 } = __VLS_nonNull(__VLS_8.slots);
    const __VLS_11 = __VLS_tryAsConstant((__VLS_unwrap(columns, {})));
    for (const [col, index] of __VLS_vFor(__VLS_nonNull(__VLS_11))) {
        let __VLS_12;
        /** @ts-ignore @type { | typeof Column | typeof Column} */
        Column;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
            // @ts-ignore
            key: (index), field: (col.field), header: (col.header),
        }));
        const __VLS_14 = __VLS_13({
            key: (index),
            field: (col.field),
            header: (col.header),
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        var __VLS_15;
        const { default: __VLS_17 } = __VLS_nonNull(__VLS_15.slots);
        {
            const { body: __VLS_18 } = __VLS_nonNull(__VLS_15.slots);
            const [slotProps] = __VLS_vSlot(__VLS_nonNull(__VLS_18));
            if (col.field === 'action') {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "table-actions" },
                });
                /** @type {__VLS_StyleScopedClasses['table-actions']} */ ;
                let __VLS_19;
                /** @ts-ignore @type { | typeof Button} */
                Button;
                // @ts-ignore
                const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
                    // @ts-ignore
                    ...{ 'onClick': {} }, icon: "pi pi-pencil", severity: "secondary", text: true, rounded: true,
                }));
                const __VLS_21 = __VLS_20({
                    ...{ 'onClick': {} },
                    icon: "pi pi-pencil",
                    severity: "secondary",
                    text: true,
                    rounded: true,
                }, ...__VLS_functionalComponentArgsRest(__VLS_20));
                let __VLS_24;
                const __VLS_25 = {
                    /** @type {typeof __VLS_24.click} */
                    onClick: (...[$event]) => {
                        void $event;
                        if (!(col.field === 'action'))
                            throw 0;
                        return (__VLS_unwrap(editCabinet, {})(slotProps.data));
                        // @ts-ignore
                        [filteredCabinets, columns, editCabinet,];
                    },
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
                    ...{ 'onClick': {} }, icon: "pi pi-trash", severity: "danger", text: true, rounded: true,
                }));
                const __VLS_28 = __VLS_27({
                    ...{ 'onClick': {} },
                    icon: "pi pi-trash",
                    severity: "danger",
                    text: true,
                    rounded: true,
                }, ...__VLS_functionalComponentArgsRest(__VLS_27));
                let __VLS_31;
                const __VLS_32 = {
                    /** @type {typeof __VLS_31.click} */
                    onClick: (...[$event]) => {
                        void $event;
                        if (!(col.field === 'action'))
                            throw 0;
                        return (__VLS_unwrap(deleteCabinet, {})(slotProps.data));
                        // @ts-ignore
                        [deleteCabinet,];
                    },
                };
                void __VLS_32;
                var __VLS_29;
                var __VLS_30;
            }
            else if (col.field === 'isActive') {
                let __VLS_33;
                /** @ts-ignore @type { | typeof Tag | typeof Tag} */
                Tag;
                // @ts-ignore
                const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
                    // @ts-ignore
                    value: (getCabinetStatus(slotProps.data.isActive)), severity: (getCabinetStatusSeverity(slotProps.data.isActive)), rounded: true,
                }));
                const __VLS_35 = __VLS_34({
                    value: (getCabinetStatus(slotProps.data.isActive)),
                    severity: (getCabinetStatusSeverity(slotProps.data.isActive)),
                    rounded: true,
                }, ...__VLS_functionalComponentArgsRest(__VLS_34));
            }
            else {
                (slotProps.data[col.field]);
            }
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    const __VLS_38 = CabinetDialog;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
        // @ts-ignore
        ...{ 'onUpdate:visible': {} }, visible: (__VLS_unwrap(dialogVisible, {})), cabinet: (__VLS_unwrap(selectedCabinet, {})),
    }));
    const __VLS_40 = __VLS_39({
        ...{ 'onUpdate:visible': {} },
        visible: (__VLS_unwrap(dialogVisible, {})),
        cabinet: (__VLS_unwrap(selectedCabinet, {})),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    let __VLS_43;
    const __VLS_44 = {
        /** @type {typeof __VLS_43.'update:visible'} */
        'onUpdate:visible': (__VLS_unwrap(handleDialogClose, {})),
    };
    void __VLS_44;
    var __VLS_41;
    var __VLS_42;
    // @ts-ignore
    [dialogVisible, selectedCabinet, handleDialogClose,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
