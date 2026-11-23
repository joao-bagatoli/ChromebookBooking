import { onMounted, computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { getRoleSeverity, getRoleLabel } from '../../utils/userUtils';
import { useToast } from 'primevue/usetoast';
const { defineProps, defineEmits, } = {};
const props = defineProps();
const userStore = useUserStore();
const toast = useToast();
const emit = defineEmits(['edit']);
const loading = ref(true);
function getUserStatus(isActive) {
    return isActive ? 'Ativo' : 'Inativo';
}
function getUserStatusSeverity(isActive) {
    return isActive ? 'success' : 'danger';
}
function onEditUser(data) {
    emit('edit', data);
}
async function onDeleteUser(data) {
    toast.add({
        severity: 'info',
        summary: 'Aguarde',
        detail: 'Deletando o usuário...',
        life: 2000
    });
    try {
        await userStore.deleteUser(data.id);
        toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário deletado com sucesso!',
            life: 3000
        });
    }
    catch {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível deletar o usuário.',
            life: 3000
        });
    }
}
const filteredUsers = computed(() => {
    const query = props.search.toLowerCase();
    if (!query)
        return userStore.users;
    return userStore.users.filter((user) => {
        return user.email.toLowerCase().includes(query) || getRoleLabel(user.role).toLowerCase().includes(query);
    });
});
onMounted(async () => {
    loading.value = true;
    try {
        await userStore.loadUsers();
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
        value: (__VLS_unwrap(filteredUsers, {})), loading: (__VLS_unwrap(loading, {})), scrollable: true, scrollHeight: "calc(100vh - 260px)",
    }));
    const __VLS_2 = __VLS_1({
        value: (__VLS_unwrap(filteredUsers, {})),
        loading: (__VLS_unwrap(loading, {})),
        scrollable: true,
        scrollHeight: "calc(100vh - 260px)",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_3;
    const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
    let __VLS_6;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        // @ts-ignore
        field: "name", header: "Nome",
    }));
    const __VLS_8 = __VLS_7({
        field: "name",
        header: "Nome",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        // @ts-ignore
        field: "email", header: "E-mail",
    }));
    const __VLS_13 = __VLS_12({
        field: "email",
        header: "E-mail",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_16;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        // @ts-ignore
        field: "role", header: "Perfil",
    }));
    const __VLS_18 = __VLS_17({
        field: "role",
        header: "Perfil",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    var __VLS_19;
    const { default: __VLS_21 } = __VLS_nonNull(__VLS_19.slots);
    {
        const { body: __VLS_22 } = __VLS_nonNull(__VLS_19.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_22));
        let __VLS_23;
        /** @ts-ignore @type { | typeof Tag | typeof Tag} */
        Tag;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
            // @ts-ignore
            value: (__VLS_unwrap(getRoleLabel, {})(data.role)), severity: (__VLS_unwrap(getRoleSeverity, {})(data.role)), rounded: true,
        }));
        const __VLS_25 = __VLS_24({
            value: (__VLS_unwrap(getRoleLabel, {})(data.role)),
            severity: (__VLS_unwrap(getRoleSeverity, {})(data.role)),
            rounded: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        // @ts-ignore
        [filteredUsers, loading, getRoleLabel, getRoleSeverity,];
    }
    // @ts-ignore
    [];
    let __VLS_28;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
        // @ts-ignore
        field: "isActive", header: "Status",
    }));
    const __VLS_30 = __VLS_29({
        field: "isActive",
        header: "Status",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    var __VLS_31;
    const { default: __VLS_33 } = __VLS_nonNull(__VLS_31.slots);
    {
        const { body: __VLS_34 } = __VLS_nonNull(__VLS_31.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_34));
        let __VLS_35;
        /** @ts-ignore @type { | typeof Tag | typeof Tag} */
        Tag;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
            // @ts-ignore
            value: (getUserStatus(data.isActive)), severity: (getUserStatusSeverity(data.isActive)), rounded: true,
        }));
        const __VLS_37 = __VLS_36({
            value: (getUserStatus(data.isActive)),
            severity: (getUserStatusSeverity(data.isActive)),
            rounded: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    let __VLS_40;
    /** @ts-ignore @type { | typeof Column | typeof Column} */
    Column;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        // @ts-ignore
        header: "Ações",
    }));
    const __VLS_42 = __VLS_41({
        header: "Ações",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    var __VLS_43;
    const { default: __VLS_45 } = __VLS_nonNull(__VLS_43.slots);
    {
        const { body: __VLS_46 } = __VLS_nonNull(__VLS_43.slots);
        const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_46));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "table-actions" },
        });
        /** @type {__VLS_StyleScopedClasses['table-actions']} */ ;
        let __VLS_47;
        /** @ts-ignore @type { | typeof Button | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
            // @ts-ignore
            ...{ 'onClick': {} }, icon: "pi pi-pencil", text: true, rounded: true, severity: "secondary", arialLabel: "Editar", title: "Editar",
        }));
        const __VLS_49 = __VLS_48({
            ...{ 'onClick': {} },
            icon: "pi pi-pencil",
            text: true,
            rounded: true,
            severity: "secondary",
            arialLabel: "Editar",
            title: "Editar",
        }, ...__VLS_functionalComponentArgsRest(__VLS_48));
        let __VLS_52;
        const __VLS_53 = {
            /** @type {typeof __VLS_52.click} */
            onClick: (...[$event]) => {
                void $event;
                return (onEditUser(data));
                // @ts-ignore
                [];
            },
        };
        void __VLS_53;
        var __VLS_50;
        var __VLS_51;
        let __VLS_54;
        /** @ts-ignore @type { | typeof Button | typeof Button} */
        Button;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
            // @ts-ignore
            ...{ 'onClick': {} }, icon: "pi pi-trash", text: true, rounded: true, severity: "danger", arialLabel: "Excluir", title: "Excluir",
        }));
        const __VLS_56 = __VLS_55({
            ...{ 'onClick': {} },
            icon: "pi pi-trash",
            text: true,
            rounded: true,
            severity: "danger",
            arialLabel: "Excluir",
            title: "Excluir",
        }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        let __VLS_59;
        const __VLS_60 = {
            /** @type {typeof __VLS_59.click} */
            onClick: (...[$event]) => {
                void $event;
                return (onDeleteUser(data));
                // @ts-ignore
                [];
            },
        };
        void __VLS_60;
        var __VLS_57;
        var __VLS_58;
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
