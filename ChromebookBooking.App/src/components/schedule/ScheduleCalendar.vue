<script setup>
import { Calendar, Willow } from "@svar-ui/vue-calendar";



const day = (d, h, m = 0) => new Date(2026, 7, d, h, m); 

const events = [
  { id: 1, start: day(27, 7, 30), end: day(27, 8, 20), text: "1ºA · Maria",   turma: "1ºA", professor: "Maria", capacity: 5 },
  { id: 2, start: day(27, 7, 30), end: day(27, 8, 20), text: "1ºB · João",    turma: "1ºB", professor: "João",  capacity: 5 },
  { id: 3, start: day(27, 7, 30), end: day(27, 8, 20), text: "2ºA · Ana",     turma: "2ºA", professor: "Ana",   capacity: 5 },

  { id: 4, start: day(27, 8, 20), end: day(27, 9, 10), text: "2ºB · Maria",   turma: "2ºB", professor: "Maria", capacity: 5 },

  { id: 5, start: day(28, 9, 30), end: day(28, 10, 20), text: "1ºA · João",   turma: "1ºA", professor: "João",   capacity: 5 },
  { id: 6, start: day(28, 9, 30), end: day(28, 10, 20), text: "3ºA · Carlos", turma: "3ºA", professor: "Carlos", capacity: 5 },

  { id: 7, start: day(29, 7, 30), end: day(29, 8, 20), text: "1ºB · Maria",   turma: "1ºB", professor: "Maria", capacity: 5 },

  { id: 8, start: day(1 + 31, 10, 20), end: day(1 + 31, 11, 10), text: "2ºB · Carlos", turma: "2ºB", professor: "Carlos", capacity: 5 },
];


function cellCss(ctx) {
  const { date, section } = ctx;
  if (!date || section !== "timeGrid") return "";

  const sameSlot = events.filter(
    (e) => e.start.getTime() === date.getTime()
  );

  if (sameSlot.length === 0) return "cell-empty";
  if (sameSlot.length >= sameSlot[0].capacity) return "cell-full";
  return "cell-partial";
}

</script>

<template>
  <Willow>
    <Calendar
      :events="events"
      :date="day(27, 0, 0)"
      view="week"
      :views="[
        {
          id: 'week',
          sections: {
            timeGrid: {
              yScale: { startHour: 7, endHour: 12, step: 50, snapStep: 10 },
            },
          },
        },
      ]"
      :cellCss="cellCss"
      readonly
    />
  </Willow>
</template>

<style>
.cell-empty {
  background: #eafaf0;
}
.cell-partial {
  background: #fff4e5;
}
.cell-full {
  background: #eaf1fb;
}
</style>
