<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
      to.params = {jwt: useCookie('jwt').value || '0', authorize: 'admin'};
    },
    'auth',
  ],
});

const wages = ["Kein Gehalt", "20€", "25€", "30€"];

async function addUser(credentials: any) {
  const name = credentials.name;
  const email = credentials.email;
  const admin = credentials.admin || false;
  const tutor = credentials.tutor || false;
  const student = credentials.student || false;
  const supporter = credentials.supporter || false;
  let wage_input = credentials.wage;
  let wage = 0;
  if(!tutor) {
    wage_input = "0€";
  }
  if(wage_input === "30€") {
    wage = 30;
  }
  else if(wage_input === "25€") {
    wage = 25;
  }
  else if(wage_input === "20€") {
    wage = 20;
  }
  else {
    wage = 0;
  }

  const {data: res} = await useFetch('/api/lessons/admin/addUser', {method: 'POST', body: {
      name: name, email: email, admin: admin, tutor: tutor,
      student: student, supporter: supporter, wage: wage}});
  console.log(res);
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
            type="select"
            name="wage"
            label="Stundenlohn"
            placeholder="Wähle den Stundenlohn aus"
            :options=wages
            help="Nur für Tutoren!"
            validation="required"
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
