<template>
  <b-container>
    <b-dropdown @click="showAlerts" split variant="link" toggle-class="text-decoration-none">
      <template v-slot:button-content>
        <b-icon class="NotificationIcon" stacked icon="bell" variant="secondary" scale="0.75"  />
        <b-badge v-if="alerts > 0" variant="primary">{{alerts}}</b-badge>
      </template>
      <b-dropdown-item :disabled="alerts === 0 ? true:false" @click="handleSelectedDropDownItem('unread')">Unread</b-dropdown-item>
      <b-dropdown-item @click="handleSelectedDropDownItem('all')">View All</b-dropdown-item>
    </b-dropdown>
    <Notifications />
  </b-container>
</template>

<script>
import Notifications from '@/components/Notifications';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  components: {
    Notifications,
  },
  mounted() {
    this.$store.dispatch('setNotifications');
    this.pollNotificationInterval = setInterval(() => {
      this.$store.dispatch('setNotifications');
    }, 1500);
  },
  data() {
    return {
      pollNotificationInterval: null,
    };
  },
  computed: {
    ...mapGetters(['notifications', 'allAlerts', 'undreadAlerts']),
    alerts() {
      return this.notifications.count;
    },
  },
  beforeDestroy() {
    clearInterval(this.pollNotificationInterval);
  },
  methods: {
    ...mapActions(['setUnreadNotifications','setNotifications', 'toggleNotifications', 'showNotifications', 'hideNotifications', 'setAllNotifications']),
    showAlerts() {
      this.$store.dispatch('toggleNotifications');
    },
    handleSelectedDropDownItem(name) {
      if (name === 'all') {
        this.$store.dispatch('setAllNotifications');
        // setFilter 
      } else {
        this.$store.dispatch('setUnreadNotifications');
      }
      this.$store.dispatch('showNotifications');
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/global.scss";
.notfication {
  background: transparent;
  width: 30px;
  height: 30px;
}
.bg {
  background: lightgray;
}
.NotificationIcon {
  // background: #fff;
  height: 50px;
  width: 50px;
}

.btn .badge {
  position: absolute;
  /* top: -1px; */
  left: 41px;
  bottom: 32px;
  top: unset;
}

#notification-btn {
  padding-right: 0;
  // background: #fff;//
  // position: relative;//
  // height: 30px;//
  // width: 30px;//
  padding-top: 4px;
  &:focus {
    box-shadow: none;
  }
}

.badge-primary {
  // position: absolute; //
  color: $primary-font-color;
  background-color: $primary-color;
}
</style>
