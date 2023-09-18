<script setup lang="ts">
async function resetPassword(credentials: any) {
  const password1 = credentials.password1;
  const password2 = credentials.password2;
  const resetToken = Object.fromEntries((new URLSearchParams(window.location.search)).entries()).resetToken || undefined;

  const { data: res } = await useFetch('/api/user/reset', {method: 'POST', body: {password1: password1,
      password2: password2, reset_token: resetToken}});

  if(res.value?.hasOwnProperty('error')) {
    const error = res.value.error;
    if(error === "check input") {
      alert("Überprüfe die Eingabe");
    }
    else if(error === "wrong link") {
      alert("Falscher Link");
    }
    else {
      alert("Anderer Fehler");
    }
  }
  else if(useCookie('jwt').value) {
    alert("Erfolgreich!");
    navigateTo('/dashboard');
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
      <h2 class="mt-10 text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900">Nachhilfe Datenbank</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6 mx-5">
        <FormKit
            type="form"
            submit-label="Neues Passwort setzen"
            @submit="resetPassword"
            novalidate="true"
        >
          <FormKit
              type="password"
              name="password1"
              label="Neues Passwort"
              help='min. 8 Zeichen, min. 1 GROSS- und kleinbuchstabe, min. 1 Zahl, min. 1 Symbol'
              validation="required|length:8|contains_lowercase|contains_uppercase|contains_numeric|contains_symbol"
          />
          <FormKit
              type="password"
              name="password2"
              label="Neues Passwort wiederholen"
              validation="required|length:8|contains_lowercase|contains_uppercase|contains_numeric|contains_symbol"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
