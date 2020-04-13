<template>
    <b-alert
      show
      dismissible
      variant="warning"
      @dismissed="handleClose"
    >
      {{data.message}}
      <!-- <b-progress
       :show="dismissCountDown"
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress> -->
    </b-alert>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WarningAlert',
  props: ['data', 'notifications'],
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
    };
  },
  computed: {
    updatedNotification() {
      return this.notifications
        .filter(val => val.type !== this.data.type)
        .concat(this.updatedData);
    },
    updatedData() {
      return {
        ...this.data,
        read: true,
      };
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    handleClose() {
      const { id } = this.updatedData;
      const url = `http://localhost:3000/notifications/${id}`;
      axios
        .put(url, this.updatedData)
        .then((response) => {
          console.log(response); //TODO: update app state here 
        })
        .catch((error) => {
          console.log('@error', error); //FIXME:add error handling
        });
    },
  },
  mounted() {
    this.showAlert();
  },
};

</script>

<style scoped>
</style>
