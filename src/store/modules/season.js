const season = {
    namespaced: true,
    state: {
        notifications: []
    },
    getters: {
        getNotifications(state) {
            return state.notifications;
        }
    },
    mutations: {
        addNotification(state, notification) {
            state.notifications.push({ ...notification, id: Date.now() });
            if (state.notifications.length > 3) {
                state.notifications.shift(); // ลบอันแรกเมื่อมีมากกว่า 3 อัน
            }
        },
        removeNotification(state, id) {
            state.notifications = state.notifications.filter(notif => notif.id !== id);
        }
    },
    actions: {
        addNotification({ commit }, notification) {
            const id = Date.now();
            commit('addNotification', { ...notification, id });
            setTimeout(() => {
                commit('removeNotification', id);
                console.log('Notification removed');
            }, 3000); // แจ้งเตือนจะหายไปหลังจาก 5 วินาที
        }
    }

}

export default season;
