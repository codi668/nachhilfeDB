<script setup lang="ts">
async function signIn() {
  let email:string = document.getElementById('email')?.value;
  let password:string = document.getElementById('password')?.value;

  const { data: res } = await useFetch('/api/user/login', {method: 'POST', body: {email: email, password: password}});

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
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Adresse</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required="" class="pl-3 block w-full rounded-md ring-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Passwort</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Passwort vergessen?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required="" class="pl-3 block w-full rounded-md ring-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button id="sign-in" @click="signIn" class="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Anmelden</button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Noch nicht registriert?
        {{ ' ' }}
        <a href="mailto:benedikt.walter@htlstp.at" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Schreib uns eine Email</a>
      </p>
    </div>
  </div>
</template>
