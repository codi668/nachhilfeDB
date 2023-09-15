<script setup lang="ts">

import {fastForward} from "@formkit/icons";

definePageMeta({
  middleware: [
    function (to, from) {
      to.params = {jwt: useCookie('jwt').value || '0', authorize: 'admin'};
    },
    'auth',
  ],
});

async function addUser(credentials: any) {
  const name = credentials.name;
  const email = credentials.email;
  const admin = credentials.admin || false;
  const tutor = credentials.tutor || false;
  const student = credentials.student || false;
  const supporter = credentials.supporter || false;

  const {data: res} = await useFetch('/api/lessons/admin/addUser', {method: 'POST', body: {
      name: name, email: email, admin: admin, tutor: tutor,
      student: student, supporter: supporter}});
  console.log(res);
  if(!res.value?.hasOwnProperty('error')) {
    alert("Erfolgreich!");
    navigateTo('/dashboard');
  }
  else {
    if(res.value?.error === "check input") {
      alert("Eingabe überprüfen");
    }
    else if(res.value?.error === "not authenticated" || res.value?.error) {
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
          submit-label="Benutzer anlegen"
          @submit="addUser"
          novalidate="true"
      >
        <FormKit
            type="text"
            name="name"
            label="Name"
            help="Vorname Nachname"
            validation="required"
        />
        <FormKit
            type="email"
            name="email"
            label="Email"
            help="vorname.nachname@htlstp.at"
            validation="required|email"
        />
        <FormKit
            type="checkbox"
            name="admin"
            label="Admin"
            help="Admin Rechte (nicht empfohlen!)"
        />
        <FormKit
            type="checkbox"
            name="tutor"
            label="Tutor"
            help="Tutor Rechte"
        />
        <FormKit
            type="checkbox"
            name="student"
            label="Student"
            help="Student Rechte"
        />
        <FormKit
            type="checkbox"
            name="supporter"
            label="Supporter"
            help="Supporter Rechte (nicht empfohlen!)"
        />
      </FormKit>
    </div>
  </div>
</template>
