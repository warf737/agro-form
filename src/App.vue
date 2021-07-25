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
      editData: null,
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
      if (this.editData) {
        this.isEditForm = !this.isEditForm;
      } else {
        this.$message({
          message: 'Для редактирования необходимо выбрать ячейку',
          type: 'warning'
        });
      }
    },
    handleSelectCell(cell) {
      this.editData = cell;
    },
    handleClearForm() {
      this.editData = null;
    }
  },
}
</script>

<template>
  <div id="app">
    <main class="main">
      <h2 class="form-title">СЕВООБОРОТ</h2>
      <display-form
          v-if="!isEditForm"
          :orgs="this.$options.ORGS"
          :farmingFields="this.$options.FARMING_FIELDS"
          :plants="this.$options.PLANTS"
          :years="this.$options.YEARS"
          :table-data="tableData"
          @toggle-edit="handleChangeDisplayingMode"
          @select-cell="handleSelectCell"
          @clear-form="handleClearForm"
      />
      <edit-form
          v-else
          @toggle-edit="handleChangeDisplayingMode"/>
    </main>
  </div>
</template>

<style lang="scss">
#app {
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

td {
  vertical-align: middle !important;
}

.form-title {
  padding-top: 15px;
  color: #d8a331;
  font-size: 20px;
  font-family: DINPro-Medium, sans-serif;
  width: 25%;
  text-align: left;
}
</style>
