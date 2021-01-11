<template>
  <div>
    <addTag @reloadList="getData" />
    <tagsList :key="listKey" @reloadList="getData" :data="data" />
  </div>
</template>

<script>
import addTag from '../../components/tags/addTag.vue';
import tagsList from '../../components/tags/tagsList.vue';

export default {
  name: 'tags',
  components: {
    addTag,
    tagsList,
  },
  data() {
    return {
      tags: [],
      listKey: 0,
      data: [],
    };
  },
  methods: {
    getData() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/tags/list').then(res => {
        this.data = res.data.result.docs;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
