<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
      to.params = {jwt: useCookie('jwt').value || '0', authorize: 'tutor'};
    },
    'auth',
  ],
});

const {data: tutor_data} = await useFetch('/api/lessons/tutor/getStudents', {method: 'GET'});
const students = tutor_data.value;
let selectedStudent = '';

async function addLesson() {
  const subject = document.getElementById('fach')?.value;
  const date = document.getElementById('datum')?.value;
  const start_time = document.getElementById('start_time')?.value;
  const end_time = document.getElementById('end_time')?.value;
  const {data: res} = await useFetch('/api/lessons/tutor/addLesson', {method: 'POST', body: {
    student_name: selectedStudent.name, studentID: selectedStudent.id, subject: subject, date: date,
      start_time: start_time, end_time: end_time}});
  if(res.value?.hasOwnProperty('error')) {
    if(res.value?.error === "check input") {
      alert("Eingabe überprüfen");
    }
    else {
      alert("Anderer Fehler");
    }
  }
  else {
    alert("Erfolgreich!");
    navigateTo('/dashboard');
  }
}

</script>

<template>

  <div class="p-10 grid gap-6 mb-6 md:grid-cols-6">
    <div>
      <label for="students" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student:</label>
      <select id="student" v-model="selectedStudent" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option v-for="student in students" :value="student">{{ student.name }}</option>
      </select>
    </div>
    <div>
      <label for="fach" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fach: </label>
      <input type="text" id="fach" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mathe" required>
    </div>
    <div>
      <label for="datum" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Datum:</label>
      <input type="date" id="datum" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="2023-09-01" min="2023-09-01" max="2035-09-01"/>
    </div>
    <div>
      <label for="datum" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start:</label>
      <input type="time" id="start_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="10:00"/>
    </div>
    <div>
      <label for="datum" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End:</label>
      <input type="time" id="end_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="11:00"/>
    </div>
    <button type="submit" @click="addLesson" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </div>

</template>
