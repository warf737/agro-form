<script>
import DisplayForm from './components/DisplayForm';
import EditForm from './components/EditForm';

export default {
  name: 'App',
  components: {
    DisplayForm,
    EditForm,
  },
    data() {
      return {
          isEditForm: false,
      }
    },
    methods: {
      handleChangeDisplayingMode() {
        this.isEditForm = !this.isEditForm;
      }
    },
}
</script>

<template>
  <div id="app">
    <display-form
      v-if="!isEditForm"
      @change-displaying="handleChangeDisplayingMode"
    />
    <edit-form v-else/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
