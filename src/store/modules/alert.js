const alert = {
    namespaced: true,
    state: {
        notifications: [],
        timeoutId: null
    },
    mutations: {
        setNotifications(state, notifications) {
            state.notifications = notifications;
        },
        clearNotifications(state) {
            state.notifications = [];
        },
        setTimeoutId(state, timeoutId) {
            state.timeoutId = timeoutId;
        },
        clearTimeoutId(state) {
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
                state.timeoutId = null;
            }
        }
    },
    actions: {
        addNotification({ commit, state }, notification) {
            commit('clearTimeoutId'); 
            commit('setNotifications', [{ ...notification, id: Date.now() }]);

            const timeoutId = setTimeout(() => {
                commit('clearNotifications');
                console.log('All notifications removed');
            }, 3000);

            commit('setTimeoutId', timeoutId); 
        }
    },
    getters: {
        getNotifications(state) {
            return state.notifications;
        }
    }
}

export default alert;
