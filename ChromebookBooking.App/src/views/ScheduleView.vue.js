import { inject, computed, onMounted, ref, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useBookingStore } from '../stores/booking';
import { useToast } from 'primevue/usetoast';
import ScheduleCalendar from '../components/schedule/ScheduleCalendar.vue';
import ScheduleCard from '../components/schedule/ScheduleCard.vue';
const MINIMUM_DAYS = 2;
const TOTAL_CABINETS = 5;
const authStore = useAuthStore();
const bookingStore = useBookingStore();
const toast = useToast();
const serviceFactory = inject('serviceFactory');
const sectionService = serviceFactory.createSectionService();
const classPeriodService = serviceFactory.createClassPeriodService();
const loggedTeacherName = computed(() => {
    const fullName = authStore.user?.user_metadata?.full_name ?? 'Usuário Logado';
    return fullName.split(' ')[0] || 'Usuário';
});
const loggedEmail = computed(() => authStore.user?.email?.toLowerCase() ?? '');
const sections = ref([]);
const periods = ref([]);
const loadError = ref(null);
const today = new Date();
today.setHours(0, 0, 0, 0);
const selectedDate = ref(new Date(today));
const selectedSlot = ref(null);
const reservationDialog = ref(null);
function formatTime(time) {
    return time.slice(0, 5);
}
function normalizeDate(date) {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
}
function getDateKey(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
    ].join('-');
}
function isSameDate(first, second) {
    return (first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate());
}
function isDateBefore(first, second) {
    return normalizeDate(first).getTime() < normalizeDate(second).getTime();
}
function addDays(date, amount) {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
}
const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });
const weekDays = computed(() => {
    const selected = normalizeDate(selectedDate.value);
    const dayOfWeek = selected.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = addDays(selected, mondayOffset);
    const result = [];
    for (let index = 0; index < 5; index++) {
        const currentDate = addDays(monday, index);
        result.push({
            key: getDateKey(currentDate),
            label: weekdayFormatter.format(currentDate),
            date: currentDate,
            isPast: isDateBefore(currentDate, today),
            isToday: isSameDate(currentDate, today),
        });
    }
    return result;
});
watch(() => weekDays.value[0].key, () => {
    const days = weekDays.value;
    bookingStore.fetchWeek(days[0].key, days[days.length - 1].key);
}, { immediate: true });
onMounted(async () => {
    try {
        const [loadedSections, classPeriods] = await Promise.all([
            sectionService.getAllSections(),
            classPeriodService.getAllClassPeriods(),
        ]);
        sections.value = loadedSections;
        console.log('classPeriods', classPeriods);
        periods.value = classPeriods.map(classPeriod => ({
            id: classPeriod.id,
            label: classPeriod.name,
            time: `${formatTime(classPeriod.startTime)}–${formatTime(classPeriod.endTime)}`,
            shift: classPeriod.shift,
        }));
    }
    catch (e) {
        loadError.value =
            e instanceof Error ? e.message : 'Não foi possível carregar turmas e horários.';
    }
});
function isTooSoon(day) {
    const earliestDate = addDays(normalizeDate(new Date()), MINIMUM_DAYS);
    return isDateBefore(day.date, earliestDate);
}
function isLocked(day) {
    return day.isPast || isTooSoon(day);
}
function getBookings(day, period) {
    return bookingStore.getBookings(day.key, period.id).map(booking => ({
        id: booking.id,
        className: booking.sectionName,
        teacher: booking.teacherName ?? booking.teacherEmail,
        cabinetId: booking.cabinetId,
        cabinetName: booking.cabinetName,
        discipline: booking.subject ?? undefined,
        isPartial: booking.isPartial,
        chromebooksQuantity: booking.chromebooksQuantity ?? null,
        isMine: booking.teacherEmail.toLowerCase() === loggedEmail.value,
    }));
}
function getAvailableCabinets(day, period) {
    const reservedCabinetIds = new Set(getBookings(day, period).map(booking => booking.cabinetId));
    const available = [];
    for (let cabinetId = 1; cabinetId <= TOTAL_CABINETS; cabinetId++) {
        if (!reservedCabinetIds.has(cabinetId)) {
            available.push({
                id: cabinetId,
                name: `Gabinete ${String(cabinetId).padStart(2, '0')}`,
            });
        }
    }
    return available;
}
function moveWeek(amount) {
    selectedDate.value = addDays(selectedDate.value, amount * 7);
    selectedSlot.value = null;
}
function goToToday() {
    selectedDate.value = new Date(today);
    selectedSlot.value = null;
}
function selectSlot(day, period) {
    if (day.isPast)
        return;
    selectedSlot.value = { day, period };
}
function openReservation(day, period) {
    if (isLocked(day))
        return;
    if (getAvailableCabinets(day, period).length === 0)
        return;
    selectedSlot.value = { day, period };
    bookingStore.clearError();
    reservationDialog.value = { day, period };
}
function closeReservation() {
    reservationDialog.value = null;
    bookingStore.clearError();
}
async function confirmReservation(form) {
    if (!reservationDialog.value)
        return;
    const teacherId = authStore.profile?.id;
    if (!teacherId) {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Usuário não identificado. Faça login novamente.',
            life: 4000
        });
        return;
    }
    if (form.isPartial && (!form.chromebooksQuantity || form.chromebooksQuantity <= 0)) {
        toast.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'Informe a quantidade de chromebooks para a reserva parcial.',
            life: 4000
        });
        return;
    }
    const { day, period } = reservationDialog.value;
    try {
        await bookingStore.book({
            date: day.key,
            classPeriodId: period.id,
            teacherId,
            sectionId: form.sectionId,
            isPartial: form.isPartial,
            chromebooksQuantity: form.isPartial ? form.chromebooksQuantity : null,
            subject: form.discipline.trim() || null,
        });
        reservationDialog.value = null;
        toast.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Reserva realizada com sucesso.',
            life: 3000
        });
    }
    catch {
        // O modal de reserva continua aberto para o professor tentar de novo
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: bookingStore.error ?? 'Não foi possível realizar a reserva.',
            life: 4000
        });
    }
}
async function cancel(bookingId) {
    if (!window.confirm('Cancelar esta reserva?'))
        return;
    toast.add({
        severity: 'info',
        summary: 'Cancelando',
        detail: 'Cancelando a sua reserva, aguarde...',
        life: 3000
    });
    try {
        await bookingStore.cancel(bookingId);
        toast.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Reserva cancelada com sucesso.',
            life: 3000
        });
    }
    catch {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível cancelar a reserva.',
            life: 4000
        });
    }
}
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
const __VLS_template = () => {
    __VLS_withDotValue(loadError, {});
    __VLS_withDotValue(reservationDialog, {});
    __VLS_withDotValue(bookingStore, {});
    void {};
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "schedule-page" },
    });
    /** @type {__VLS_StyleScopedClasses['schedule-page']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "schedule-header" },
    });
    /** @type {__VLS_StyleScopedClasses['schedule-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "view-title" },
    });
    /** @type {__VLS_StyleScopedClasses['view-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "view-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['view-subtitle']} */ ;
    const __VLS_0 = ScheduleCalendar;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        // @ts-ignore
        ...{ 'onMoveWeek': {} }, ...{ 'onGoToToday': {} }, ...{ 'onSelectSlot': {} }, ...{ 'onOpenReservation': {} }, ...{ 'onCancelBooking': {} }, weekDays: (__VLS_unwrap(weekDays, {})), periods: (__VLS_unwrap(periods, {})), selectedSlot: (__VLS_unwrap(selectedSlot, {})), totalCabinets: (__VLS_unwrap(TOTAL_CABINETS, {})), getBookings: (getBookings), getAvailableCabinets: (getAvailableCabinets), isLocked: (isLocked),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onMoveWeek': {} },
        ...{ 'onGoToToday': {} },
        ...{ 'onSelectSlot': {} },
        ...{ 'onOpenReservation': {} },
        ...{ 'onCancelBooking': {} },
        weekDays: (__VLS_unwrap(weekDays, {})),
        periods: (__VLS_unwrap(periods, {})),
        selectedSlot: (__VLS_unwrap(selectedSlot, {})),
        totalCabinets: (__VLS_unwrap(TOTAL_CABINETS, {})),
        getBookings: (getBookings),
        getAvailableCabinets: (getAvailableCabinets),
        isLocked: (isLocked),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.moveWeek} */
        onMoveWeek: (moveWeek),
    };
    void __VLS_6;
    const __VLS_7 = {
        /** @type {typeof __VLS_5.goToToday} */
        onGoToToday: (goToToday),
    };
    void __VLS_7;
    const __VLS_8 = {
        /** @type {typeof __VLS_5.selectSlot} */
        onSelectSlot: (selectSlot),
    };
    void __VLS_8;
    const __VLS_9 = {
        /** @type {typeof __VLS_5.openReservation} */
        onOpenReservation: (openReservation),
    };
    void __VLS_9;
    const __VLS_10 = {
        /** @type {typeof __VLS_5.cancelBooking} */
        onCancelBooking: (cancel),
    };
    void __VLS_10;
    var __VLS_3;
    var __VLS_4;
    if (loadError.value) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "page-error" },
        });
        /** @type {__VLS_StyleScopedClasses['page-error']} */ ;
        (loadError.value);
    }
    if (reservationDialog.value) {
        const __VLS_11 = ScheduleCard;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
            // @ts-ignore
            ...{ 'onClose': {} }, ...{ 'onConfirm': {} }, reservationDialog: (reservationDialog.value), sections: (__VLS_unwrap(sections, {})), loggedTeacherName: (__VLS_unwrap(loggedTeacherName, {})), availableCabinets: (getAvailableCabinets(reservationDialog.value.day, reservationDialog.value.period)), saving: (bookingStore.value.saving), error: (null),
        }));
        const __VLS_13 = __VLS_12({
            ...{ 'onClose': {} },
            ...{ 'onConfirm': {} },
            reservationDialog: (reservationDialog.value),
            sections: (__VLS_unwrap(sections, {})),
            loggedTeacherName: (__VLS_unwrap(loggedTeacherName, {})),
            availableCabinets: (getAvailableCabinets(reservationDialog.value.day, reservationDialog.value.period)),
            saving: (bookingStore.value.saving),
            error: (null),
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        let __VLS_16;
        const __VLS_17 = {
            /** @type {typeof __VLS_16.close} */
            onClose: (closeReservation),
        };
        void __VLS_17;
        const __VLS_18 = {
            /** @type {typeof __VLS_16.confirm} */
            onConfirm: (confirmReservation),
        };
        void __VLS_18;
        var __VLS_14;
        var __VLS_15;
    }
    // @ts-ignore
    [weekDays, periods, selectedSlot, TOTAL_CABINETS, loadError, loadError, reservationDialog, reservationDialog, reservationDialog, reservationDialog, sections, loggedTeacherName, bookingStore,];
    return {};
};
void [__VLS_template];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
