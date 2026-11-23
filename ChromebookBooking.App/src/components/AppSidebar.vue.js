import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import Button from 'primevue/button';
const authStore = useAuthStore();
const modules = authStore.profile?.modules || [];
const isCollapsed = ref(false);
function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
}
const moduleConfig = {
    Dashboard: { label: 'Início', icon: 'pi pi-home' },
    Schedule: { label: 'Agenda', icon: 'pi pi-calendar' },
    History: { label: 'Histórico', icon: 'pi pi-history' },
    Settings: { label: 'Configurações', icon: 'pi pi-cog' }
};
const menuItems = computed(() => {
    return modules.map(module => {
        const config = moduleConfig[module];
        return {
            route: module,
            label: config?.label,
            icon: config?.icon
        };
    });
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(isCollapsed, {});
    void {};
    /** @type {__VLS_StyleScopedClasses['app-sidebar']} */ ;
    /** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "app-sidebar" },
        ...{ class: ({ 'sidebar-collapsed': isCollapsed.value }) },
    });
    /** @type {__VLS_StyleScopedClasses['app-sidebar']} */ ;
    /** @type {__VLS_StyleScopedClasses['sidebar-collapsed']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sidebar-header" },
    });
    /** @type {__VLS_StyleScopedClasses['sidebar-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-desktop header-icon" },
        title: "Reservas Chromebooks",
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-desktop']} */ ;
    /** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "header-label" },
    });
    const __VLS_0 = __VLS_asFunctionalDirective(__VLS_directives.vShow, {});
    __VLS_0(__VLS_nonNull(null), { ...__VLS_directiveBindingRestFields, value: (!isCollapsed.value), }, ...__VLS_directiveHookArgsRest(__VLS_0));
    /** @type {__VLS_StyleScopedClasses['header-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
        ...{ class: "sidebar-content" },
    });
    /** @type {__VLS_StyleScopedClasses['sidebar-content']} */ ;
    const __VLS_1 = __VLS_tryAsConstant((__VLS_unwrap(menuItems, {})));
    for (const [item] of __VLS_vFor(__VLS_nonNull(__VLS_1))) {
        let __VLS_2;
        /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
        RouterLink;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent1(__VLS_2, new __VLS_2({
            // @ts-ignore
            key: (item.route), to: ({ name: item.route }), ...{ class: "nav-link" }, ...{ class: ({ 'nav-link-collapsed': isCollapsed.value }) }, activeClass: "active-link", title: (isCollapsed.value ? item.label : undefined),
        }));
        const __VLS_4 = __VLS_3({
            key: (item.route),
            to: ({ name: item.route }),
            ...{ class: "nav-link" },
            ...{ class: ({ 'nav-link-collapsed': isCollapsed.value }) },
            activeClass: "active-link",
            title: (isCollapsed.value ? item.label : undefined),
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
        /** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
        /** @type {__VLS_StyleScopedClasses['nav-link-collapsed']} */ ;
        var __VLS_5;
        const { default: __VLS_7 } = __VLS_nonNull(__VLS_5.slots);
        __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
            ...{ class: (item.icon) },
            ...{ class: "nav-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "nav-label" },
        });
        const __VLS_8 = __VLS_asFunctionalDirective(__VLS_directives.vShow, {});
        __VLS_8(__VLS_nonNull(null), { ...__VLS_directiveBindingRestFields, value: (!isCollapsed.value), }, ...__VLS_directiveHookArgsRest(__VLS_8));
        /** @type {__VLS_StyleScopedClasses['nav-label']} */ ;
        (item.label);
        // @ts-ignore
        [isCollapsed, isCollapsed, isCollapsed, isCollapsed, isCollapsed, menuItems,];
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sidebar-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['sidebar-footer']} */ ;
    let __VLS_9;
    /** @ts-ignore @type { | typeof Button | typeof Button} */
    Button;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent1(__VLS_9, new __VLS_9({
        // @ts-ignore
        ...{ 'onClick': {} }, icon: (isCollapsed.value ? 'pi pi-chevron-right' : 'pi pi-chevron-left'), severity: "secondary", text: true, rounded: true, 'aria-label': "Toggle Sidebar", pt: ({ icon: { style: 'font-size: 0.75rem;' } }),
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onClick': {} },
        icon: (isCollapsed.value ? 'pi pi-chevron-right' : 'pi pi-chevron-left'),
        severity: "secondary",
        text: true,
        rounded: true,
        'aria-label': "Toggle Sidebar",
        pt: ({
            icon: { style: 'font-size: 0.75rem;' }
        }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_14;
    const __VLS_15 = {
        /** @type {typeof __VLS_14.click} */
        onClick: (toggleCollapse),
    };
    void __VLS_15;
    var __VLS_12;
    var __VLS_13;
    // @ts-ignore
    [isCollapsed,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
