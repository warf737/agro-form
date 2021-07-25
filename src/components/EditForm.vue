<script>
export default {
    name: 'EditForm',
    data () {
        return {};
    },
    methods: {
      handleClose() {
        this.$emit('toggle-edit');
      },
    },
};
</script>

<template>
  <div>
    <el-button @click="handleClose">Назад</el-button>
  </div>
</template>

<style lang="scss" scoped>
</style>
