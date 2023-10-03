<script setup lang="ts">
let pending = false;
async function signIn(credentials: any) {
  const { data: res } = await useFetch('/api/user/login', {method: 'POST', body: {email: credentials.email,
      password: credentials.password}});

  if(res.value?.hasOwnProperty('error')) {
    const error = res.value.error;
    if(error === "check input") {
      alert("Überprüfe die Eingabe");
    }
    else if(error === "invalid login") {
      alert("Falscher Benutzer und Passwort");
    }
    else {
      alert("Anderer Fehler");
    }
  }
  else if(useCookie('jwt').value) {
    navigateTo("/dashboard");
  }
  else {
    alert("Anderer Fehler");
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="/img/database.png" alt="NachhilfeDB" />
      <h2 class="mt-10 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900">Nachhilfe Management System</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6 mx-5">
        <FormKit
            type="form"
            submit-label="Anmelden"
            @submit="signIn"
            novalidate="true"
        >
          <FormKit
              type="email"
              name="email"
              label="Email Addresse"
              help="vorname.nachname@htlstp.at"
              validation="required|email"
          />

          <FormKit
              type="password"
              name="password"
              label="Passwort"
              help='Passwort vergessen? Email an benedikt.walter@htlstp.at'
              validation="required"
          />
        </FormKit>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Noch nicht registriert?
        {{ ' ' }}
        <a href="mailto:benedikt.walter@htlstp.at" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Schreib uns eine Email</a>
      </p>
    </div>
  </div>
</template>

<style>
</style>
