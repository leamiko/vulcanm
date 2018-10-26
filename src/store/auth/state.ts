
export const state = {
    auth: (sessionStorage.getItem('access') || localStorage.getItem('access')) !== null,
    authError: {}
};