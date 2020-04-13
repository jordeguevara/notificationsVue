<template>
  <!-- :show="!item.read" -->
  <div v-if="notifications.show">
    <b-alert
      :show="notifications.active ? true: !item.read"
      v-for="item in notifications.alerts"
      :class="{read: item.read}"
      :key="item.id"
      @dismissed="handleClose(item)"
      :variant="item.type"
      dismissible
    >
      <div class="notification">
        <div class="notification__icon">
          <font-awesome-icon :icon="mapIcons(item.type)" />
        </div>
        <div class="notification__message">
          <p>{{item.message}}</p>
        </div>
      </div>
    </b-alert>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Notifications',
  computed: {
    ...mapGetters(['notifications']),
  },
  methods: {
    ...mapMutations(['updateNotifcation']),
    handleClose(item) {
      const updatedItem = {
        ...item,
        read: true,
      };
      this.updateNotifcation(updatedItem);
    },
    mapIcons(type) {
      switch (type) {
        case 'warning': return 'exclamation-circle';
        default: return ''; // TODO Map other icons;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/global.scss";

.alert-success,
.alert-warning,
.alert-info,
.alert-danger {
  background: $completed-color;
  border-color: $completed-color;
  color: $alt-font-color;
}

.read {
  background: $status-disabled;
  border: $status-disabled;
  color: $alt-font-color;
}

.notification {
  display: flex;
  flex: 1;
  flex-direction: row;
  &__icon {
    display: flex;
    min-width: 5%;
    justify-content: center;
    align-items: center;
  }
    &__message{
    display: flex;
    justify-content: center;
    width: 95%;
}

}
</style>
