<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
      to.params = {jwt: useCookie('jwt').value || '0', authorize: 'tutor'};
    },
    'auth',
  ],
});

const lessonID = Object.fromEntries((new URLSearchParams(window.location.search)).entries()).id || '';
const {data: res} = await useFetch('/api/lessons/tutor/getLesson', {method: 'POST', body: {
    lessonID: lessonID}});
const date = res.value.start_date.substring(0, 10);
const start_time = res.value.start_date.substring(11, 16);
const end_time = res.value.end_date.substring(11, 16);

async function editLesson(credentials: any) {
  const lessonID = Object.fromEntries((new URLSearchParams(window.location.search)).entries()).id || '';
  const student_name = credentials.student;

  const date = credentials.date;
  const start_time = credentials.start_time;
  const end_time = credentials.end_time;

  const {data: res} = await useFetch('/api/lessons/tutor/editLesson', {method: 'POST', body: {
      lessonID: lessonID, date: date, start_time: start_time, end_time: end_time}});
  if(!res.value?.hasOwnProperty('error')) {
    alert("Erfolgreich!");
    navigateTo('/dashboard');
  }
  else {
    if(res.value?.error === "check input") {
      alert("Eingabe überprüfen");
    }
    else if(res.value?.error === "not authenticated" || res.value?.error === "not authorized") {
      alert("Bitte erneut anmelden");
      navigateTo("/");
    }
    else {
      alert("Anderer Fehler");
    }
  }
}

</script>

<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="space-y-6 mx-5">
      <FormKit
          type="form"
          submit-label="Stunde bearbeiten"
          @submit="editLesson"
          novalidate="true"
      >
        <FormKit
            type="date"
            name="date"
            label="Datum"
            v-model="date"
            validation="required"
        />
        <FormKit
            type="time"
            name="start_time"
            label="Startzeit"
            v-model="start_time"
            validation="required"
        />
        <FormKit
            type="time"
            name="end_time"
            label="Endzeit"
            v-model="end_time"
            validation="required"
        />
      </FormKit>
    </div>
  </div>
</template>
