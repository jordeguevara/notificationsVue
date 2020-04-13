<template>
   <div>
    <b-alert @dismissed="handleClose" variant="info" dismissible show>
     {{data.message}}
    </b-alert>
   </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InfoAlert',
  props: ['data','notifications'],
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
