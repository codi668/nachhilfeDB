<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
      to.params = {jwt: useCookie('jwt').value || '0'};
    },
    'auth',
  ],
});

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite();
})

const {data: info_data} = await useFetch('/api/user/info', {method: 'GET'});
const info_values = info_data.value;
const {data: admin_data} = await useFetch('/api/lessons/admin/get', {method: 'GET'});
const admin_values = admin_data.value;
const {data: tutor_data} = await useFetch('/api/lessons/tutor/get', {method: 'GET'});
const tutor_values = tutor_data.value;
const {data: student_data} = await useFetch('/api/lessons/student/get', {method: 'GET'});
const student_values = student_data.value;
const {data: supporter_data} = await useFetch('/api/lessons/supporter/get', {method: 'GET'});
const supporter_values = supporter_data.value;

if(!admin_values.hasOwnProperty('error')) {
  admin_values.forEach((element:any) => {
    element.year = (new Date(element.start_date).getUTCFullYear()) < 10 ? '0' + (new Date(element.start_date).getUTCFullYear()) : (new Date(element.start_date).getUTCFullYear());
    element.month = (new Date(element.start_date).getUTCMonth()+1) < 10 ? '0' + (new Date(element.start_date).getUTCMonth()+1) : (new Date(element.start_date).getUTCMonth()+1);
    element.day = (new Date(element.start_date).getUTCDate()) < 10 ? '0' + (new Date(element.start_date).getUTCDate()) : (new Date(element.start_date).getUTCDate());
    element.start_hour = (new Date(element.start_date).getUTCHours()) < 10 ? '0' + (new Date(element.start_date).getUTCHours()) : (new Date(element.start_date).getUTCHours());
    element.start_minute = (new Date(element.start_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.start_date).getUTCMinutes()) : (new Date(element.start_date).getUTCMinutes());
    element.end_hour = (new Date(element.end_date).getUTCHours()) < 10 ? '0' + (new Date(element.end_date).getUTCHours()) : (new Date(element.end_date).getUTCHours());
    element.end_minute = (new Date(element.end_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.end_date).getUTCMinutes()) : (new Date(element.end_date).getUTCMinutes());
  });
}

if(!tutor_values.hasOwnProperty('error')) {
  tutor_values.forEach((element:any) => {
    element.year = (new Date(element.start_date).getUTCFullYear()) < 10 ? '0' + (new Date(element.start_date).getUTCFullYear()) : (new Date(element.start_date).getUTCFullYear());
    element.month = (new Date(element.start_date).getUTCMonth()+1) < 10 ? '0' + (new Date(element.start_date).getUTCMonth()+1) : (new Date(element.start_date).getUTCMonth()+1);
    element.day = (new Date(element.start_date).getUTCDate()) < 10 ? '0' + (new Date(element.start_date).getUTCDate()) : (new Date(element.start_date).getUTCDate());
    element.start_hour = (new Date(element.start_date).getUTCHours()) < 10 ? '0' + (new Date(element.start_date).getUTCHours()) : (new Date(element.start_date).getUTCHours());
    element.start_minute = (new Date(element.start_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.start_date).getUTCMinutes()) : (new Date(element.start_date).getUTCMinutes());
    element.end_hour = (new Date(element.end_date).getUTCHours()) < 10 ? '0' + (new Date(element.end_date).getUTCHours()) : (new Date(element.end_date).getUTCHours());
    element.end_minute = (new Date(element.end_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.end_date).getUTCMinutes()) : (new Date(element.end_date).getUTCMinutes());
  });
}

if(!student_values.hasOwnProperty('error')) {
  student_values.forEach((element:any) => {
    element.year = (new Date(element.start_date).getUTCFullYear()) < 10 ? '0' + (new Date(element.start_date).getUTCFullYear()) : (new Date(element.start_date).getUTCFullYear());
    element.month = (new Date(element.start_date).getUTCMonth()+1) < 10 ? '0' + (new Date(element.start_date).getUTCMonth()+1) : (new Date(element.start_date).getUTCMonth()+1);
    element.day = (new Date(element.start_date).getUTCDate()) < 10 ? '0' + (new Date(element.start_date).getUTCDate()) : (new Date(element.start_date).getUTCDate());
    element.start_hour = (new Date(element.start_date).getUTCHours()) < 10 ? '0' + (new Date(element.start_date).getUTCHours()) : (new Date(element.start_date).getUTCHours());
    element.start_minute = (new Date(element.start_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.start_date).getUTCMinutes()) : (new Date(element.start_date).getUTCMinutes());
    element.end_hour = (new Date(element.end_date).getUTCHours()) < 10 ? '0' + (new Date(element.end_date).getUTCHours()) : (new Date(element.end_date).getUTCHours());
    element.end_minute = (new Date(element.end_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.end_date).getUTCMinutes()) : (new Date(element.end_date).getUTCMinutes());
  });
}

if(!supporter_values.hasOwnProperty('error')) {
  supporter_values.forEach((element:any) => {
    element.year = (new Date(element.start_date).getUTCFullYear()) < 10 ? '0' + (new Date(element.start_date).getUTCFullYear()) : (new Date(element.start_date).getUTCFullYear());
    element.month = (new Date(element.start_date).getUTCMonth()+1) < 10 ? '0' + (new Date(element.start_date).getUTCMonth()+1) : (new Date(element.start_date).getUTCMonth()+1);
    element.day = (new Date(element.start_date).getUTCDate()) < 10 ? '0' + (new Date(element.start_date).getUTCDate()) : (new Date(element.start_date).getUTCDate());
    element.start_hour = (new Date(element.start_date).getUTCHours()) < 10 ? '0' + (new Date(element.start_date).getUTCHours()) : (new Date(element.start_date).getUTCHours());
    element.start_minute = (new Date(element.start_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.start_date).getUTCMinutes()) : (new Date(element.start_date).getUTCMinutes());
    element.end_hour = (new Date(element.end_date).getUTCHours()) < 10 ? '0' + (new Date(element.end_date).getUTCHours()) : (new Date(element.end_date).getUTCHours());
    element.end_minute = (new Date(element.end_date).getUTCMinutes()) < 10 ? '0' + (new Date(element.end_date).getUTCMinutes()) : (new Date(element.end_date).getUTCMinutes());
  });
}


let show = useCookie('view').value || '';
if(show !== "supporter" && show !== "student" && show !== "tutor" && show !== "admin")
  show = getFirstShow(info_values) || '';
if(!info_values.admin && show === "admin")
  show = getFirstShow(info_values) || '';
else if(!info_values.tutor && show === "tutor")
  show = getFirstShow(info_values) || '';
else if(!info_values.student && show === "student")
  show = getFirstShow(info_values) || '';
else if(!info_values.supporter && show === "supporter")
  show = getFirstShow(info_values) || '';
else if(show === '')
  show = getFirstShow(info_values) || '';
useCookie('view').value = show;

function getFirstShow(info_values:any) {
  if(info_values.admin) {
    return "admin";
  }
  if(info_values.tutor) {
    return "tutor";
  }
  if(info_values.student) {
    return "student";
  }
  if(info_values.supporter) {
    return "supporter";
  }
}

function setShowValue(val: string) {
  show = val;
  useCookie('view').value = val;
}

function signOut() {
  useCookie('jwt').value = '';
  navigateTo('/');
}

async function paid_lesson(id: string) {
  if(confirm("Diese Stunde als bezahlt setzen?")) {
    const {data: paid_res} = await useFetch('/api/lessons/tutor/paid', {method: 'POST', body: {id: id}});

    if(paid_res.value?.hasOwnProperty('error')) {
      alert("Anderer Fehler");
    }
    else {
      alert("Erfolgreich!");
      location.href = "/dashboard";
    }
  }
}

async function cancel_lesson(id: string) {
  if(confirm("Diese Stunde canceln?")) {
    const {data: cancel_res} = await useFetch('/api/lessons/tutor/cancel', {method: 'POST', body: {id: id}});
    if(cancel_res.value?.hasOwnProperty('error')) {
      alert("Anderer Fehler");
    }
    else {
      alert("Erfolgreich!");
      location.href = "/dashboard";
    }
  }
}

async function request_support(id: string) {
  if(confirm("Förderung beantragen?")) {
    const {data: request_res} = await useFetch('/api/lessons/student/request', {method: 'POST', body: {id: id}});
    if(request_res.value?.hasOwnProperty('error')) {
      alert("Anderer Fehler");
    }
    else {
      alert("Erfolgreich!");
      location.href = "/dashboard";
    }
  }
}
</script>

<template>
  <div class="p-8 flex flex-col items-center">

    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="w-80 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Optionen <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg></button>
    <div id="dropdown" class="z-10 w-80 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>{{ info_values.email }}</div>
        <div class="font-medium truncate">{{ info_values.name }}</div>
      </div>
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-if="info_values.admin" @click="setShowValue('admin')">
          <a href="#" v-if="show==='admin'" class="block px-4 py-2 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Admin</a>
          <a href="#" v-else class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Admin</a>
        </li>
        <li v-if="info_values.tutor" @click="setShowValue('tutor')">
          <a href="#" v-if="show==='tutor'" class="block px-4 py-2 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Tutor</a>
          <a href="#" v-else class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Tutor</a>
        </li>
        <li v-if="info_values.student" @click="setShowValue('student')">
          <a href="#" v-if="show==='student'" class="block px-4 py-2 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Student</a>
          <a href="#" v-else class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Student</a>
        </li>
        <li v-if="info_values.supporter" @click="setShowValue('supporter')">
          <a href="#" v-if="show==='supporter'" class="block px-4 py-2 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Supporter</a>
          <a href="#" v-else class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Supporter</a>
        </li>
      </ul>
      <div class="py-2">
        <a @click="signOut" class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
      </div>
    </div>
  </div>

  <ul v-if="show==='admin'" role="list" class="divide-y divide-gray-100">
    <div>
      <button id="add-user" @click="add_user" class="cursor-pointer rounded-md bg-indigo-600 ml-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Benutzer anlegen</button>
      <button id="del-user" @click="del_user" class="cursor-pointer rounded-md bg-indigo-600 ml-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Benutzer löschen</button>
    </div>
    <li v-for="lesson in admin_values" :key="lesson.id" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4 ml-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ lesson.student_name }}</p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ lesson.tutor_name }}</p>
        </div>
      </div>
      <div class="shrink-0 sm:flex sm:flex-col sm:items-end mr-4">
        <p class="text-sm leading-6 text-gray-900">
          {{ lesson.day }}.{{ lesson.month }}.{{ lesson.year }}
        </p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ lesson.start_hour }}:{{ lesson.start_minute }} - {{ lesson.end_hour }}:{{ lesson.end_minute }}
        </p>
      </div>
    </li>
  </ul>

  <ul v-else-if="show==='tutor'" role="list" class="divide-y divide-gray-100">
    <div>
      <button @click="navigateTo('/addLesson')" id="add-lesson" class="cursor-pointer rounded-md bg-indigo-600 ml-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Stunde anlegen</button>
    </div>
    <li v-for="lesson in tutor_values" :key="lesson.id" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4 ml-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ lesson.student_name }}</p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ lesson.subject }}</p>
        </div>
      </div>
      <button id="cancel-lesson" @click="cancel_lesson(lesson.id)" class="cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">cancel</button>
      <button id="paid-lesson" @click="paid_lesson(lesson.id)" class="cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">paid</button>
      <div class="shrink-0 sm:flex sm:flex-col sm:items-end mr-4">
        <p class="text-sm leading-6 text-gray-900">
          {{ lesson.day }}.{{ lesson.month }}.{{ lesson.year }}
        </p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ lesson.start_hour }}:{{ lesson.start_minute }} - {{ lesson.end_hour }}:{{ lesson.end_minute }}
        </p>
      </div>
    </li>
  </ul>

  <ul v-else-if="show==='student'" role="list" class="divide-y divide-gray-100">
    <li v-for="lesson in student_values" :key="lesson.id" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4 ml-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ lesson.tutor_name }}</p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ lesson.subject }}</p>
        </div>
      </div>
      <div v-if="lesson.paid===true && lesson.req_support===false">
        <button id="cancel-lesson" @click="request_support(lesson.id)" class="cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">request</button>
      </div>
      <div v-if="lesson.req_support===true">
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">requested</p>
      </div>
      <div class="shrink-0 sm:flex sm:flex-col sm:items-end mr-4">
        <p class="text-sm leading-6 text-gray-900">
          {{ lesson.day }}.{{ lesson.month }}.{{ lesson.year }}
        </p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ lesson.start_hour }}:{{ lesson.start_minute }} - {{ lesson.end_hour }}:{{ lesson.end_minute }}
        </p>
      </div>
    </li>
  </ul>

  <ul v-else-if="show==='supporter'" role="list" class="divide-y divide-gray-100">
    <li v-for="lesson in supporter_values" :key="lesson.id" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4 ml-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ lesson.student_name }}</p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ lesson.tutor_name }}</p>
        </div>
      </div>
      <div class="shrink-0 sm:flex sm:flex-col sm:items-end mr-4">
        <p class="text-sm leading-6 text-gray-900">
          {{ lesson.day }}.{{ lesson.month }}.{{ lesson.year }}
        </p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          {{ lesson.start_hour }}:{{ lesson.start_minute }} - {{ lesson.end_hour }}:{{ lesson.end_minute }}
        </p>
      </div>
    </li>
  </ul>

</template>
