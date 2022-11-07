export const state = () => ({
    routes: '',
})

export const getters = {
    routes(state) {
        return state.routes
    },
}
  
export const mutations = {
    routes(state, text) {
        state.routes = text;
    },
}