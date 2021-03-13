<template>
  <div>
    <addUser :mode="'add'" />
  </div>
</template>

<script>
import addUser from '../../components/users/addUser.vue';

export default {
  name: 'addmember',
  metaInfo: {
    title: 'افزودن کاربر',
  },
  components: { addUser },
};
</script>
