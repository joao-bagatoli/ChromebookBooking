import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import UserPanel from '@/components/settings/UserPanel.vue';
import SectionPanel from '@/components/settings/SectionPanel.vue';
import CabinetPanel from '@/components/settings/CabinetPanel.vue';
import UserDialog from '@/components/settings/dialogs/UserDialog.vue';
import SectionDialog from '@/components/settings/dialogs/SectionDialog.vue';
import CabinetDialog from '@/components/settings/dialogs/CabinetDialog.vue';
import { ref, shallowRef, computed } from 'vue';
const settingPanels = shallowRef([
    {
        key: 'users',
        title: 'Usuários',
        component: UserPanel,
        addLabel: 'Adicionar Usuário',
        dialogComponent: UserDialog
    },
    {
        key: 'sections',
        title: 'Turmas',
        component: SectionPanel,
        addLabel: 'Adicionar Turma',
        dialogComponent: SectionDialog
    },
    {
        key: 'cabinets',
        title: 'Gabinetes',
        component: CabinetPanel,
        addLabel: 'Adicionar Gabinete',
        dialogComponent: CabinetDialog
    }
]);
const activePanel = ref('users');
const isDialogVisible = ref(false);
const itemToEdit = ref(null);
const searchQuery = ref('');
const currentActiveSettings = computed(() => {
    return settingPanels.value.find(p => p.key === activePanel.value);
});
const addButtonLabel = computed(() => currentActiveSettings.value?.addLabel);
const activeDialogComponent = computed(() => currentActiveSettings.value?.dialogComponent);
const handleAdd = () => {
    itemToEdit.value = null;
    isDialogVisible.value = true;
};
const handleEdit = (item) => {
    itemToEdit.value = item;
    isDialogVisible.value = true;
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(activePanel, {});
    __VLS_withDotValue(activeDialogComponent, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['tabs-container']} */ ;
    /** @type {__VLS_StyleScopedClasses['tabs-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "settings-container" },
    });
    /** @type {__VLS_StyleScopedClasses['settings-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "settings-header" },
    });
    /** @type {__VLS_StyleScopedClasses['settings-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "view-title" },
    });
    /** @type {__VLS_StyleScopedClasses['view-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "view-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['view-subtitle']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
    let __VLS_0;
    /** @ts-ignore @type { | typeof IconField | typeof IconField} */
    IconField;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    }));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_3;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    let __VLS_6;
    /** @ts-ignore @type { | typeof InputIcon} */
    InputIcon;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        // @ts-ignore
        ...{ class: "pi pi-search" },
    }));
    const __VLS_8 = __VLS_7({
        ...{ class: "pi pi-search" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-search']} */ ;
    let __VLS_11;
    /** @ts-ignore @type { | typeof InputText} */
    InputText;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        // @ts-ignore
        modelValue: (__VLS_unwrap(searchQuery, {})), placeholder: "Pesquisar...", size: "small",
    }));
    const __VLS_13 = __VLS_12({
        modelValue: (__VLS_unwrap(searchQuery, {})),
        placeholder: "Pesquisar...",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    // @ts-ignore
    [searchQuery,];
    let __VLS_16;
    /** @ts-ignore @type { | typeof Button} */
    Button;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        // @ts-ignore
        ...{ 'onClick': {} }, label: (__VLS_unwrap(addButtonLabel, {})), icon: "pi pi-plus", size: "small",
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onClick': {} },
        label: (__VLS_unwrap(addButtonLabel, {})),
        icon: "pi pi-plus",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_21;
    const __VLS_22 = {
        /** @type {typeof __VLS_21.click} */
        onClick: (__VLS_unwrap(handleAdd, {})),
    };
    void __VLS_22;
    var __VLS_19;
    var __VLS_20;
    let __VLS_23;
    /** @ts-ignore @type { | typeof Tabs | typeof Tabs} */
    Tabs;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        // @ts-ignore
        ...{ 'onUpdate:value': {} }, value: (activePanel.value), ...{ class: "tabs-container" },
    }));
    const __VLS_25 = __VLS_24({
        ...{ 'onUpdate:value': {} },
        value: (activePanel.value),
        ...{ class: "tabs-container" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    let __VLS_28;
    const __VLS_29 = {
        /** @type {typeof __VLS_28.'update:value'} */
        'onUpdate:value': ((val) => activePanel.value = String(val)),
    };
    void __VLS_29;
    /** @type {__VLS_StyleScopedClasses['tabs-container']} */ ;
    var __VLS_26;
    var __VLS_27;
    const { default: __VLS_30 } = __VLS_nonNull(__VLS_26.slots);
    let __VLS_31;
    /** @ts-ignore @type { | typeof TabList | typeof TabList} */
    TabList;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    // @ts-ignore
    }));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    var __VLS_34;
    const { default: __VLS_36 } = __VLS_nonNull(__VLS_34.slots);
    const __VLS_37 = __VLS_tryAsConstant((__VLS_unwrap(settingPanels, {})));
    for (const [panel] of __VLS_vFor(__VLS_nonNull(__VLS_37))) {
        let __VLS_38;
        /** @ts-ignore @type { | typeof Tab | typeof Tab} */
        Tab;
        // @ts-ignore
        const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
            // @ts-ignore
            key: (panel.key), value: (panel.key),
        }));
        const __VLS_40 = __VLS_39({
            key: (panel.key),
            value: (panel.key),
        }, ...__VLS_functionalComponentArgsRest(__VLS_39));
        var __VLS_41;
        const { default: __VLS_43 } = __VLS_nonNull(__VLS_41.slots);
        (panel.title);
        // @ts-ignore
        [addButtonLabel, handleAdd, activePanel, activePanel, settingPanels,];
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    let __VLS_44;
    /** @ts-ignore @type { | typeof TabPanels | typeof TabPanels} */
    TabPanels;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    // @ts-ignore
    }));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    var __VLS_47;
    const { default: __VLS_49 } = __VLS_nonNull(__VLS_47.slots);
    const __VLS_50 = __VLS_tryAsConstant((__VLS_unwrap(settingPanels, {})));
    for (const [panel] of __VLS_vFor(__VLS_nonNull(__VLS_50))) {
        let __VLS_51;
        /** @ts-ignore @type { | typeof TabPanel | typeof TabPanel} */
        TabPanel;
        // @ts-ignore
        const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
            // @ts-ignore
            key: (panel.key), value: (panel.key),
        }));
        const __VLS_53 = __VLS_52({
            key: (panel.key),
            value: (panel.key),
        }, ...__VLS_functionalComponentArgsRest(__VLS_52));
        var __VLS_54;
        const { default: __VLS_56 } = __VLS_nonNull(__VLS_54.slots);
        const __VLS_57 = (panel.component);
        // @ts-ignore
        const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
            // @ts-ignore
            ...{ 'onEdit': {} }, search: (__VLS_unwrap(searchQuery, {})),
        }));
        const __VLS_59 = __VLS_58({
            ...{ 'onEdit': {} },
            search: (__VLS_unwrap(searchQuery, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_58));
        let __VLS_62;
        const __VLS_63 = {
            /** @type {typeof __VLS_62.edit} */
            onEdit: (__VLS_unwrap(handleEdit, {})),
        };
        void __VLS_63;
        var __VLS_60;
        var __VLS_61;
        // @ts-ignore
        [searchQuery, settingPanels, handleEdit,];
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    // @ts-ignore
    [];
    if (activeDialogComponent.value) {
        const __VLS_64 = (activeDialogComponent.value);
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
            // @ts-ignore
            visible: (__VLS_unwrap(isDialogVisible, {})), item: (__VLS_unwrap(itemToEdit, {})),
        }));
        const __VLS_66 = __VLS_65({
            visible: (__VLS_unwrap(isDialogVisible, {})),
            item: (__VLS_unwrap(itemToEdit, {})),
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    }
    // @ts-ignore
    [activeDialogComponent, activeDialogComponent, isDialogVisible, itemToEdit,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
