import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    notifications: {
      show: false,
      active: false,
      filter: null,
      alerts: [],
      count: 0,
    },
  },
  getters: {
    notifications: state => state.notifications,
  },
  mutations: {
    setNotifications: (state, payload) => {
      const ids = state.notifications.alerts.map(val => val.id);
      const newNotifications = payload.filter(val => !ids.includes(val.id));
      state.notifications.alerts.push(...newNotifications);
      if (!state.notifications.active) {
        state.notifications.count = state.notifications.alerts.filter(val => !val.read).length;
      } else {
        state.notifications.count = state.notifications.alerts.length;
      }
      state.notifications.count = state.notifications.alerts.filter(val => !val.read).length;
    },
    setAllNotifications: (state, payload,filter) => { //showAll
      const ids = state.notifications.alerts.map(val => val.id);
      const newNotifications = payload.filter(val => !ids.includes(val.id));
      state.notifications.alerts.push(...newNotifications);
      state.notifications.count = state.notifications.alerts.filter(val => !val.read).length;
      state.notifications.active = true;
    },
    setUnreadNotifications: (state, payload) => { //showUnread
      const ids = state.notifications.alerts.map(val => val.id);
      const newNotifications = payload.filter(val => !ids.includes(val.id));
      state.notifications.alerts.push(...newNotifications);
      state.notifications.count = state.notifications.alerts.filter(val => !val.read).length;
      state.notifications.active = false;
    },
    updateNotifcation: (state, payload) => {
      const foundIndex = state.notifications.alerts.findIndex(
        x => x.id === payload.id,
      );
      state.notifications.alerts[foundIndex] = payload;
      state.notifications.count = state.notifications.alerts.filter(
        val => !val.read,
      ).length;
      // sstate.notifications.alerts = state.notifications.alerts.filter(val => !val.read);
    },
    toggleNotifications: (state) => {
      if (state.notifications.show) {
        state.notifications.show = false;
      } else {
        state.notifications.show = true;
      }
    },
    showNotifications: (state) => {
      state.notifications.show = true;
    },
    hideNotifications: (state) => {
      state.notifications.show = false;
    },
  },
  actions: {
    setNotifications: (context) => {
      const url = 'http://localhost:3000/notifications';
      axios.get(url).then((response) => {
        context.commit('setNotifications', response.data);
      });
    },
    setUnreadNotifications: (context) => {
      const url = 'http://localhost:3000/notifications';
      axios.get(url).then((response) => {
        context.commit('setUnreadNotifications', response.data);
      });
      // context.commit('setUnreadNotifications', context.getters.notifications.alerts);
    },
    setAllNotifications: (context) => {
      context.commit('setAllNotifications',context.getters.notifications.alerts);
    },
    toggleNotifications: (context) => {
      context.commit('toggleNotifications');
    },
    showNotifications: (context) => {
      context.commit('showNotifications');
    },
    hideNotifications: (context) => {
      context.commit('hideNotifications');
    },
  },
});

export default store;
