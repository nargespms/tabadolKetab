<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <password @setPassword="setPassword" />
      </v-col>
      <v-col cols="12" md="6">
        <confirmPassword :password="password" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import password from './passwordsCom/password.vue';
import confirmPassword from './passwordsCom/confirmPassword.vue';

export default {
  name: 'Passwords',
  components: {
    password,
    confirmPassword,
  },
  data() {
    return {
      password: '',
    };
  },
  methods: {
    setPassword(value) {
      this.password = value;
    },
  },
};
</script>
