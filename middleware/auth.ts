async function isAuthenticated(to: any, from: any) {
    const jwt = to.params.jwt;
    if(!jwt) return false;
    const { data } = await useFetch('/api/user/authenticate', {method: 'POST'});
    return !!data.value?.hasOwnProperty('sucess');
}

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!await isAuthenticated(to, from)) {
        return navigateTo('/');
    }
})