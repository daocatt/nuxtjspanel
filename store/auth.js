export const state = () => ({
    token: '',
    appID: '',
    admin_name: '',
    admin_avatar: '',
    expired_time: '',
    route: '',
})

export const getters = {
    token(state) {
        return state.token
    },
    appID(state) {
        return state.appID
    },
    admin_name(state) {
        return state.admin_name
    },
    admin_avatar(state) {
        return state.admin_avatar
    },
    expired_time(state) {
        return state.expired_time
    },
    route(state) {
        return state.route
    },
}
  
export const mutations = {
    token(state, text) {
        state.token = text
    },
    appID(state, text) {
        state.appID = text
    },
    admin_name(state, text) {
        state.admin_name = text
    },
    admin_avatar(state, text) {
        state.admin_avatar = text
    },
    expired_time(state, text) {
        state.expired_time = text
    },
    route(state, text) {
        state.route = text
    },
}