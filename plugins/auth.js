export default ({ app, store }) => {
    
    const token = localStorage.getItem('auth_token') || '';
    const appID = localStorage.getItem('appID') || '';
    const expiredTime = localStorage.getItem('expired_time') || 0;

    store.commit("auth/token", token);
    store.commit("auth/appID", appID);
    store.commit("auth/expired_time", expiredTime);

    console.log('============== token of ' + appID + ' ==============');
    
    
}