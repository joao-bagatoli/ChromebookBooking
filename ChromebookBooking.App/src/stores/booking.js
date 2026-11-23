import { inject, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { isAxiosError } from 'axios';
export const useBookingStore = defineStore('booking', () => {
    const serviceFactory = inject('serviceFactory');
    const service = serviceFactory.createBookingService();
    // Reservas da semana exibida no calendário
    const bookings = ref([]);
    // Todas as reservas (sem filtro de período)
    const allBookings = ref([]);
    const loading = ref(false);
    const saving = ref(false);
    const error = ref(null);
    const currentRange = ref(null);
    // { '2026-10-20': { 1: [booking, ...], 2: [...] } }
    const grouped = computed(() => {
        const map = {};
        for (const b of bookings.value) {
            const day = (map[b.date] ??= {});
            (day[b.classPeriodId] ??= []).push(b);
        }
        return map;
    });
    function getBookings(dayKey, periodId) {
        return grouped.value[dayKey]?.[periodId] ?? [];
    }
    // Extrai a mensagem enviada pelo backend (ProblemDetails.detail / message)
    // em vez do texto genérico do Axios ("Request failed with status code 400")
    function messageOf(e) {
        if (isAxiosError(e)) {
            const data = e.response?.data;
            if (typeof data === 'string' && data.trim())
                return data;
            if (data && typeof data === 'object') {
                const message = data.detail ?? data.message ?? data.title;
                if (message)
                    return message;
            }
            if (!e.response)
                return 'Não foi possível conectar ao servidor.';
        }
        return e instanceof Error ? e.message : 'Erro inesperado';
    }
    function clearError() {
        error.value = null;
    }
    async function fetchAll() {
        loading.value = true;
        error.value = null;
        try {
            const result = await service.getBookings();
            allBookings.value = Array.isArray(result) ? result : [];
        }
        catch (e) {
            error.value = messageOf(e);
        }
        finally {
            loading.value = false;
        }
    }
    async function fetchWeek(start, end) {
        currentRange.value = { start, end };
        loading.value = true;
        error.value = null;
        try {
            const result = await service.getWeeklyBookings(start, end);
            // ignora resposta de uma semana que já deixou de ser a atual
            if (currentRange.value?.start === start) {
                // protege contra resposta fora do formato esperado
                bookings.value = Array.isArray(result) ? result : [];
            }
        }
        catch (e) {
            error.value = messageOf(e);
        }
        finally {
            loading.value = false;
        }
    }
    async function refresh() {
        if (currentRange.value) {
            await fetchWeek(currentRange.value.start, currentRange.value.end);
        }
    }
    async function run(action) {
        saving.value = true;
        error.value = null;
        try {
            await action();
            await refresh();
        }
        catch (e) {
            error.value = messageOf(e);
            throw e;
        }
        finally {
            saving.value = false;
        }
    }
    const book = (payload) => run(() => service.book(payload));
    const cancel = (id) => run(() => service.cancel(id));
    return {
        bookings,
        allBookings,
        loading,
        saving,
        error,
        getBookings,
        clearError,
        fetchAll,
        fetchWeek,
        refresh,
        book,
        cancel,
        weeklyBookings: bookings,
        getWeeklyBookings: fetchWeek,
        createBooking: book,
        cancelBooking: cancel,
    };
});
