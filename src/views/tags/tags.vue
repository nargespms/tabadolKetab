<template>
  <div>
    <addTag @addTag="addTag" />
    <tagsList :key="listKey" :data="tags" @banTag="banTag" />
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
    };
  },
  methods: {
    addTag(value) {
      // post to server
      const tag = {
        title: value,
        status: 'ACTIVE',
      };
      this.tags.push(tag);
    },
    banTag() {
      this.listKey = +1;
    },
  },
};
</script>
