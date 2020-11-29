<template>
  <div>
    <addTag @addTag="addTag" />
    <tagsList
      :key="listKey"
      :data="tags"
      @banTag="banTag"
      @activeTag="activeTag"
      @editTag="editTag"
    />
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
    banTag(value) {
      const tag = {
        title: value.title,
        status: 'DEACTIVE',
      };
      this.tags.push(tag);
      this.listKey = +1;
    },
    activeTag(value) {
      const tag = {
        title: value.title,
        status: 'ACTIVE',
      };
      this.tags.push(tag);
      this.listKey = +1;
    },
    editTag(value) {
      const tag = {
        title: value,
        status: 'ACTIVE',
      };
      this.tags.push(tag);
      this.listKey = +1;
    },
  },
};
</script>
