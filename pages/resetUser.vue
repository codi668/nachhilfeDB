<script setup lang="ts">

definePageMeta({
  middleware: [
    function (to, from) {
      to.params = {jwt: useCookie('jwt').value || '0', authorize: 'admin'};
    },
    'auth',
  ],
});

const { data: user_data } = await useFetch('/api/lessons/admin/getUser', {method: 'GET'});
const user_values = user_data._rawValue;
let user_names = [];
user_values.forEach((user: any) => {
  user_names.push(user.name);
});

async function resetUser(credentials: any) {
  let id;
  user_values.forEach((user: any) => {
    if(user.name === credentials.user) {
      id = user.id;
    }
  })

  if(confirm('"' + credentials.user + '" einen Passwort Reset Link schicken?')) {
    const {data: res} = await useFetch('/api/lessons/admin/resetUser', {method: 'POST', body: {
        id: id}});
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
}

</script>

<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="space-y-6 mx-5">
      <FormKit
          type="form"
          submit-label="Benutzer zurücksetzen"
          @submit="resetUser"
          novalidate="true"
      >
        <FormKit
            type="select"
            name="user"
            label="Benutzer"
            placeholder="Wähle einen Benutzer aus"
            :options=user_names
            validation="required"
        />
      </FormKit>
    </div>
  </div>
</template>
