<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
      to.params = {jwt: useCookie('jwt').value || '0', authorize: 'tutor'};
    },
    'auth',
  ],
});

const { data: student_data } = await useFetch('/api/lessons/tutor/getStudents', {method: 'GET'});
const student_values = student_data._rawValue;
let student_names = [];
student_values.forEach((student: any) => {
  student_names.push(student.name);
});

async function addLesson(credentials: any) {
  const student_name = credentials.student;
  let studentID;
  student_values.forEach((student: any) => {
    if(student.name === student_name) {
      studentID = student.id;
    }
  })
  const subject = credentials.subject;
  const date = credentials.date;
  const start_time = credentials.start_time;
  const end_time = credentials.end_time;

  const {data: res} = await useFetch('/api/lessons/tutor/addLesson', {method: 'POST', body: {
    student_name: student_name, studentID: studentID, subject: subject, date: date,
      start_time: start_time, end_time: end_time}});
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
          submit-label="Stunde hinzufügen"
          @submit="addLesson"
          novalidate="true"
      >
        <FormKit
            type="select"
            name="student"
            label="Schüler"
            placeholder="Wähle einen Schüler aus"
            :options=student_names
            validation="required"
        />
        <FormKit
            type="text"
            name="subject"
            label="Fach"
            validation="required"
        />
        <FormKit
            type="date"
            name="date"
            label="Datum"
            value="2023-09-01"
            validation="required"
        />
        <FormKit
            type="time"
            name="start_time"
            label="Startzeit"
            value="00:00"
            validation="required"
        />
        <FormKit
            type="time"
            name="end_time"
            label="Endzeit"
            value="00:00"
            validation="required"
        />
      </FormKit>
    </div>
  </div>
</template>
