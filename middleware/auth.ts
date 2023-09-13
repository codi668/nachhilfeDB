async function isAuthenticated(to: any, from: any) {
    const { jwt, authorize } = to.params;
    if(!jwt) return false;
    if(!authorize) {
        const { data } = await useFetch('/api/user/authenticate', {method: 'POST'});
        return data.value?.hasOwnProperty('sucess');
    }
    else {
        const { data } = await useFetch('/api/user/authorize', {method: 'POST', body: {authorize: authorize}});
        return data.value?.hasOwnProperty('sucess');
    }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!await isAuthenticated(to, from)) {
        return navigateTo('/');
    }
})