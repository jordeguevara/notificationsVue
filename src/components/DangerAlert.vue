<template>
  <b-alert @dismissed="handleClose" variant="danger" dismissible show>{{data.message}}</b-alert>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DangerAlert',
  props: ['data', 'notifications'],
  computed: {
    // updatedNotification() {
    //   return this.notifications
    //     .filter(val => val.type !== this.data.type)
    //     .concat(this.updatedData);
    // },
    updatedData() {
      return {
        ...this.data,
        read: true,
      };
    },
  },
  methods: {
    handleClose() {
      const { id } = this.updatedData;
      const url = `http://localhost:3000/notifications/${id}`;
      axios
        .put(url, this.updatedData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log('@error', error);
        });
    },
  },
};
</script>

<style scoped>
</style>
