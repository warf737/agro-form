<script>
import DisplayForm from './components/DisplayForm';
import EditForm from './components/EditForm';
import { FIELD_LIST,
         ORG_LIST,
         PLANTS_LIST,
         YEARS_LIST } from './constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    DisplayForm,
    EditForm,
  },
  FARMING_FIELDS: FIELD_LIST,
  ORGS: ORG_LIST,
  PLANTS: PLANTS_LIST,
  YEARS: YEARS_LIST,
  data() {
    return {
      isEditForm: false,
      editData: {},
    }
  },
  computed: {
    ...mapGetters([
        'tableData',
    ])
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    ...mapActions([
      'fetchTableData',
    ]),
    handleChangeDisplayingMode() {
      this.isEditForm = !this.isEditForm;
    },
    handleSelectCell(cell) {
      console.log('cell', cell);
      this.editData = cell;
    },
  },
}
</script>

<template>
  <div id="app">
    <main class="main">
      <display-form
        v-if="!isEditForm"
        :orgs="this.$options.ORGS"
        :farmingFields="this.$options.FARMING_FIELDS"
        :plants="this.$options.PLANTS"
        :years="this.$options.YEARS"
        :table-data="tableData"
        @change-displaying="handleChangeDisplayingMode"
        @select-cell="handleSelectCell"
      />
      <edit-form v-else/>
    </main>
  </div>
</template>

<style lang="scss">
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: DINPro, sans-serif;
  color: #008c83;
  font-weight: normal;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: auto;
  background-color: #fff !important;
}

.main {
  width: 1024px;
  height: 100%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
