<template>
  <div>
    <passwords :mode="'edit'" />
    <div class="justify-center d-flex">
      <v-btn color="success" class="mr-4">
        {{ $t('save') }}
      </v-btn>
      <v-btn color="error" class="mr-4">{{ $t('resetForm') }} </v-btn>
    </div>
  </div>
</template>

<script>
import passwords from '../userControls/passwords.vue';

export default {
  name: 'changePassword',
  components: {
    passwords,
  },
};
</script>
