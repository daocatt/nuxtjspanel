export const state = () => ({
    deviceType: '',
})

export const getters = {
    getDeviceType(state) {
        return state.deviceType
    },
}
  
export const mutations = {
    deviceType(state, text) {
        state.deviceType = text
    },
}