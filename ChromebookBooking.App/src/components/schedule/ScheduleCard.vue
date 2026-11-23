<script setup lang="ts">
  import { reactive, watch, computed } from 'vue'

  interface Period {
    id: number
    label: string
    time: string
  }

  interface Day {
    key: string
    label: string
    date: Date
    isPast: boolean
    isToday: boolean
  }

  interface Section {
    id: number
    name: string
  }

  interface ReservationDialog {
    day: Day
    period: Period
  }

  const props = defineProps<{
    reservationDialog: ReservationDialog
    sections: Section[]
    loggedTeacherName: string
    availableCabinets: {
      id: number
      name: string
    }[]
    saving: boolean
    error: string | null
  }>()

  const emit = defineEmits<{
    close: []
    confirm: [form: {
      sectionId: number
      discipline: string
      isPartial: boolean
      chromebooksQuantity: number | null
    }]
  }>()

  // Estado do formulário fica dentro do modal (não altera props)
  const form = reactive({
    sectionId: null as number | null,
    discipline: '',
    isPartial: false,
    chromebooksQuantity: null as number | null,
  })

  // Ao desligar a reserva parcial, limpa a quantidade
  watch(() => form.isPartial, (isPartial) => {
    if (!isPartial) form.chromebooksQuantity = null
  })

  // Quando é parcial, a quantidade precisa ser um inteiro maior que zero
  const quantityIsValid = computed(() => {
    if (!form.isPartial) return true
    const qty = form.chromebooksQuantity
    return qty !== null && Number.isInteger(qty) && qty > 0
  })

  const canSubmit = computed(() =>
    !!form.sectionId &&
    quantityIsValid.value &&
    props.availableCabinets.length > 0 &&
    !props.saving,
  )

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  function formatDate(date: Date) {
    return dateFormatter.format(date)
  }

  function submit() {
    if (!canSubmit.value) return

    emit('confirm', {
      sectionId: form.sectionId!,
      discipline: form.discipline,
      isPartial: form.isPartial,
      chromebooksQuantity: form.isPartial ? form.chromebooksQuantity : null,
    })
  }
</script>

<template>
  <div class="modal-backdrop"
       @click.self="emit('close')">

    <section class="reservation-modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="reservation-title">

      <header class="modal-header">

        <div>

          <h2 id="reservation-title">
            Nova Reserva
          </h2>

          <p>
            Reserve um gabinete
            para sua aula
          </p>

        </div>

        <button class="close-button"
                type="button"
                aria-label="Fechar"
                @click="emit('close')">

          <i class="pi pi-times"></i>

        </button>

      </header>

      <div class="reservation-details">

        <div class="detail-card">

          <span>
            Data
          </span>

          <strong>
            {{ formatDate(props.reservationDialog.day.date) }}
          </strong>

        </div>

        <div class="detail-card">

          <span>
            Horário
          </span>

          <strong>
            {{ props.reservationDialog.period.label }}
          </strong>

          <small>
            {{ props.reservationDialog.period.time }}
          </small>

        </div>

      </div>

      <div class="form-field">

        <label>
          Professor
        </label>

        <div class="teacher-field">

          <i class="pi pi-user"></i>

          <span>
            {{ props.loggedTeacherName }}
          </span>

        </div>

      </div>

      <div class="form-field">

        <label for="reservation-section">
          Turma
        </label>

        <select id="reservation-section"
                v-model.number="form.sectionId"
                :disabled="props.saving">

          <option :value="null">
            Selecione...
          </option>

          <option v-for="section in props.sections"
                  :key="section.id"
                  :value="section.id">
            {{ section.name }}
          </option>

        </select>

      </div>

      <div class="form-field">

        <label for="reservation-discipline">
          Disciplina
          <span>
            (opcional)
          </span>
        </label>

        <input id="reservation-discipline"
               v-model="form.discipline"
               type="text"
               placeholder="Ex: Matemática"
               :disabled="props.saving" />

      </div>

      <div class="form-field">

        <label class="switch-row"
               for="reservation-partial">

          <span class="switch-text">
            Reserva parcial
            <small>
              Reservar apenas parte dos chromebooks do gabinete
            </small>
          </span>

          <input id="reservation-partial"
                 v-model="form.isPartial"
                 class="switch-input"
                 type="checkbox"
                 role="switch"
                 :disabled="props.saving" />

        </label>

      </div>

      <div v-if="form.isPartial"
           class="form-field">

        <label for="reservation-quantity">
          Quantidade de chromebooks
        </label>

        <input id="reservation-quantity"
               v-model.number="form.chromebooksQuantity"
               type="number"
               min="1"
               step="1"
               placeholder="Ex: 15"
               :disabled="props.saving" />

        <small v-if="form.chromebooksQuantity !== null && !quantityIsValid"
               class="field-error">
          Informe uma quantidade maior que zero.
        </small>

      </div>

      <div class="assignment-info">

        <i class="pi pi-sparkles"></i>

        <span>

          O sistema associará
          automaticamente
          um gabinete disponível
          para você.

        </span>

      </div>

      <p v-if="props.availableCabinets.length === 0"
         class="no-cabinets-message">
        Não há gabinetes
        disponíveis neste horário.
      </p>

      <p v-if="props.error"
         class="error-message"
         role="alert">
        {{ props.error }}
      </p>

      <footer class="modal-footer">

        <button class="secondary-modal-button"
                type="button"
                :disabled="props.saving"
                @click="emit('close')">
          Cancelar
        </button>

        <button class="primary-modal-button"
                type="button"
                :disabled="!canSubmit"
                @click="submit">
          {{ props.saving ? 'Reservando...' : 'Confirmar Reserva' }}
        </button>

      </footer>

    </section>

  </div>
</template>

<style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgb(15 23 42 / 0.64);
  }

  .reservation-modal {
    width: min(100%, 26rem);
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    padding: 1.3rem;
    border: 1px solid var(--p-surface-200);
    border-radius: 0.6rem;
    background: var(--p-surface-0);
    box-shadow: 0 1.5rem 3rem rgb(15 23 42 / 0.2);
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.15rem;
  }

    .modal-header h2 {
      margin: 0;
      color: var(--p-surface-900);
      font-size: 1.15rem;
      font-weight: 700;
    }

    .modal-header p {
      margin: 0.25rem 0 0;
      color: var(--p-surface-500);
      font-size: 0.7rem;
    }

  .close-button {
    display: grid;
    width: 1.8rem;
    height: 1.8rem;
    place-items: center;
    border: 0;
    border-radius: 0.3rem;
    color: var(--p-surface-500);
    background: transparent;
    cursor: pointer;
  }

    .close-button:hover {
      color: var(--p-surface-800);
      background: var(--p-surface-100);
    }

  .reservation-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    margin-bottom: 1.1rem;
  }

  .detail-card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.65rem;
    border-radius: 0.35rem;
    background: var(--p-surface-50);
  }

    .detail-card span,
    .detail-card small {
      color: var(--p-surface-500);
      font-size: 0.63rem;
    }

    .detail-card strong {
      color: var(--p-surface-800);
      font-size: 0.74rem;
    }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.9rem;
  }

    .form-field label {
      color: var(--p-surface-700);
      font-size: 0.72rem;
      font-weight: 600;
    }

      .form-field label span {
        color: var(--p-surface-400);
        font-weight: 400;
      }

    .form-field input,
    .form-field select {
      width: 100%;
      height: 2.25rem;
      padding: 0 0.7rem;
      border: 1px solid var(--p-surface-200);
      border-radius: 0.35rem;
      outline: 0;
      color: var(--p-surface-700);
      background: var(--p-surface-0);
      font: inherit;
      font-size: 0.72rem;
    }

      .form-field input::placeholder {
        color: var(--p-surface-400);
      }

      .form-field input:focus,
      .form-field select:focus {
        border-color: #6ea4df;
        box-shadow: 0 0 0 2px rgb(78 141 211 / 0.12);
      }

      .form-field input:disabled,
      .form-field select:disabled {
        background: var(--p-surface-50);
        cursor: not-allowed;
      }

  /* Switch de reserva parcial */
  .switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
  }

  .form-field .switch-text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    color: var(--p-surface-700);
    font-weight: 600;
  }

    .form-field .switch-text small {
      color: var(--p-surface-500);
      font-size: 0.63rem;
      font-weight: 400;
    }

  .form-field .switch-input {
    appearance: none;
    flex-shrink: 0;
    position: relative;
    width: 2.2rem;
    height: 1.25rem;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: var(--p-surface-300);
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

    .form-field .switch-input::after {
      content: '';
      position: absolute;
      top: 0.15rem;
      left: 0.15rem;
      width: 0.95rem;
      height: 0.95rem;
      border-radius: 50%;
      background: white;
      transition: transform 0.15s ease;
    }

    .form-field .switch-input:checked {
      background: #287be5;
    }

      .form-field .switch-input:checked::after {
        transform: translateX(0.95rem);
      }

    .form-field .switch-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

  .field-error {
    color: #c0392b;
    font-size: 0.64rem;
  }

  .teacher-field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    min-height: 2.25rem;
    padding: 0 0.7rem;
    border: 1px solid var(--p-surface-200);
    border-radius: 0.35rem;
    color: var(--p-surface-700);
    background: var(--p-surface-50);
    font-size: 0.72rem;
  }

    .teacher-field i {
      color: var(--p-primary-500);
    }

  .assignment-info {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.7rem;
    border: 1px solid #d9e6f7;
    border-radius: 0.35rem;
    color: #4d79a8;
    background: #f4f8fd;
    font-size: 0.66rem;
    line-height: 1.4;
  }

    .assignment-info i {
      margin-top: 0.05rem;
      color: #4e8dd3;
    }

  .no-cabinets-message {
    margin: 0.65rem 0 0;
    color: #c77929;
    font-size: 0.68rem;
  }

  .error-message {
    margin: 0.65rem 0 0;
    color: #c0392b;
    font-size: 0.68rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.55rem;
    margin-top: 1.2rem;
  }

  .secondary-modal-button,
  .primary-modal-button {
    min-height: 2.2rem;
    padding: 0 0.85rem;
    border-radius: 0.35rem;
    font: inherit;
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
  }

  .secondary-modal-button {
    border: 1px solid var(--p-surface-200);
    color: var(--p-surface-600);
    background: var(--p-surface-0);
  }

    .secondary-modal-button:hover:not(:disabled) {
      background: var(--p-surface-50);
    }

    .secondary-modal-button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

  .primary-modal-button {
    border: 1px solid #2f80ed;
    color: white;
    background: #287be5;
  }

    .primary-modal-button:hover:not(:disabled) {
      background: #1d6dcc;
    }

    .primary-modal-button:disabled {
      border-color: var(--p-surface-200);
      color: var(--p-surface-400);
      background: var(--p-surface-100);
      cursor: not-allowed;
    }

  @media (max-width: 700px) {
    .reservation-modal {
      width: min( calc(100vw - 2rem), 26rem );
    }

    .reservation-details {
      grid-template-columns: 1fr;
    }

    .modal-footer {
      flex-direction: column-reverse;
    }

    .secondary-modal-button,
    .primary-modal-button {
      width: 100%;
    }
  }
</style>
