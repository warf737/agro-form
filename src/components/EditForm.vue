<script>
import {
  CULTURE_TABLE_FIELDS,
  PLANTS_AND_SORTS ,
  SORTS_TABLE_FIELDS,
  REPRODUCTION_LIST } from '../constants';
export default {
  name: 'EditForm',
  CULTURE_TABLE_FIELDS: CULTURE_TABLE_FIELDS,
  PLANTS_AND_SORTS: PLANTS_AND_SORTS,
  SORTS_TABLE_FIELDS: SORTS_TABLE_FIELDS,
  REPRODUCTION_LIST: REPRODUCTION_LIST,
  props: {
    years: { type: Array, required: true },
    farmingFields: { type: Array, required: true },
    editData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      // localData: this.editData,
      filters: {
        year: this.editData.year || '',
        field: this.editData.field || '',
        input: '',
      },
      selected: {
        grades: [],
      },
      modal: {
        isOpened: false,
        data: [],
        title: ''
      },
      // unsavedData: {
      //   oldData: [],
      //   newData: [],
      // },
    };
  },
  methods: {
    handleClose() {
      this.$emit('toggle-edit');
    },
    selectCulture({ type, data }) {
      if(type ===  this.selected.type && data.name === this.selected.name) {
        this.generateModalData({ type, data });
      } else {
        this.selected = {
          ...data,
          type: type,
        };
      }
    },
    generateModalData({ type, data }) {
      switch (type) {
        case 'culture':
          this.modal.data = this.$options.PLANTS_AND_SORTS.map(({ Name, Id }) => {
            return { name: Name, id: Id, active: Name === data.name };
        });
          this.modal.title = 'Культура';
          break;

          case 'sort':
            this.modal.data = [];
            this.modal.data = this.$options.PLANTS_AND_SORTS.find(({ Name }) => Name === this.selected.name)?.Values;
            this.modal.title = 'Сорт';
            break;
          case 'reproduction':
            this.modal.title = 'Репродукция';
            break;
          case 'square':
            this.modal.title = 'Площадь';
            break;
        default:
          console.log('default');
          break;
      }
      this.openModal();
    },
    openModal() {
      this.modal.isOpened = true;
    },
    closeModal() {
      this.modal.isOpened = false;
    },
    clearModal() {
      this.modal.data = [];
      this.modal.title = '';
      this.closeModal();
    },

    // selectModalItem(item) {
    //   this.unsavedData.oldData = this.modal.data.find(i => i.active);
    //   this.unsavedData.newData = item;
    // },
  },
};
</script>

<template>
  <form>
    <section class="df-controls--wrapper">

      <article class="df-controls--control">
        <p class="control-title">Год</p>
        <el-select  v-model="filters.year" filterable size="small">
          <el-option
              v-for="(year, idx) in years"
              :key="idx"
              :label="year.Name"
              :value="year.Name">
          </el-option>
        </el-select>
      </article>

      <article class="df-controls--control">
        <p class="control-title">Поле</p>
        <el-select  v-model="filters.field" filterable size="small">
          <el-option
              v-for="(field, idx) in farmingFields"
              :key="idx"
              :label="field.Name"
              :value="field.Id">
          </el-option>
        </el-select>
      </article>

      <article class="df-controls--control">
        <p class="control-title">Площадь, га</p>
        <el-input v-model="filters.input" size="small" class="control__square-input"></el-input>
      </article>

    </section>

    <section class="ef__main-wrapper">

    <div class="ef__culture-wrapper">
        <div class="ef__block-head">
          <h3 class="ef__block-title">Культура</h3>
          <div class="ef__buttons--group">
            <el-button size="small" class="ef__block-button" type="warning">Добавить</el-button>
            <el-button size="small" class="ef__block-button" type="warning">Удалить</el-button>
          </div>
        </div>


        <div class="ef__block-body">
          <b-list-group selectable>
            <h4 class="ef__block-body-title">Культура</h4>
            <b-list-group-item
                v-for="(data, index) in editData.data"
                :key="index"
                :class="{'selected-field' : data.name === selected.name }"
                @click="selectCulture({ data, type: 'culture' })"
            >
              <span>{{ data.name }}</span>
            </b-list-group-item>
          </b-list-group>
        </div>



      </div>
      <div class="ef__sort-wrapper">
        <div class="ef__block-head">
          <h3 class="ef__block-title">Сорта</h3>
          <div class="ef__buttons--group">
            <el-button size="small" class="ef__block-button" type="warning">Сохранить</el-button>
            <el-button size="small" class="ef__block-button" type="warning">Добавить</el-button>
            <el-button size="small" class="ef__block-button" type="warning">Удалить</el-button>
          </div>
        </div>




        <div class="ef__block-body">
          <b-table hover fixed :items="selected.grades" :fields="$options.SORTS_TABLE_FIELDS">

            <template #cell(name)="data">
              <div @click="generateModalData({ data, type: 'sort' })">{{ data.item.name }}</div>
            </template>
            <template #cell(reproduction)="data">
              <div @click="generateModalData({ data, type: 'reproduction' })">{{ data.item.reproduction }}</div>
            </template>

            <template #cell(square)="data">
              <div @click="generateModalData({ data, type: 'square' })">
                <span class="data-plan">{{ data.item.square.plan }}</span>
                <span class="data-fact"> {{` / ${data.item.square.fact }` }}</span>
              </div>
            </template>
          </b-table>
        </div>






      </div>
   </section>
    <el-button @click="handleClose">Назад</el-button>


    <el-dialog
        class="ef-modal"
        :title="modal.title"
        :visible.sync="modal.isOpened"
        width="40%"
        @closed="clearModal"
    >
      <ul class="ef-modal__list-wrapper" v-if="modal.title !== 'Площадь' ">
        <li v-for="(item, idx) in modal.data"
            :key="idx"
            :class="{ active: item.active  }"
            @click="selectModalItem(item)"
        >
          {{ item.name || item.Name }}
        </li>
      </ul>
        <span slot="footer" class="dialog-footer">

      </span>
    </el-dialog>


  </form>
</template>


<style lang="scss" scoped>
.ef {
  &__block-title {
    color: #d8a331;
    font-size: 18px;
    font-family: DINPro-Medium, sans-serif;
    border-bottom: 2px solid #d8a331;
    height: 40px;
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }
  &__main-wrapper {
    display: flex;
    margin-top: 42px;
  }

  &__block-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  &__block-body {
    margin-top: 10px;
    height: 400px;
    overflow: scroll;
    border-bottom: 1px solid lightgray;
  }
  &__block-body-title {
    text-align: left;
    overflow: hidden;
    font-size: 17px;
    margin-bottom: 0;
    padding-bottom: 15px;
    border-bottom: solid 2px #06aa9f;
  }

  &__buttons--group {
    display: flex;
  }
  &__culture-wrapper{
    width: 33%;
    margin-right: 20px;
  }
  &__sort-wrapper{
    width: 66%;
  }
}

.selected-field {
  background-color: #f8dfa8;
}
</style>

<style lang="scss">

.control__square-input .el-input__inner {
  background-color: #e6f6f5;
}

.ef__block-head {
  .el-button {
    background-color: #06aa9f;
    color: white;
    padding: 6px 12px;
    margin-left: 10px;
  }
}
.list-group-item {
  border: none !important;
  border-bottom: solid 1px #06aa9f !important;
  text-align: left;
}


.ef__block-body > .table  > thead > tr > th {
  padding-bottom: 0;
}
.ef__block-body > .table > thead > tr > th > div {
  font-family: DINPro, sans-serif;
  font-weight: 500;
  text-align: left;
  color: #008c83;
  font-size: 14px;
  padding-bottom: 0;
  padding-left: 0;
}
.ef__block-body > .table  > tbody > tr > td {
  color: #5a5a5a
}

.ef__block-body > .table  > tbody > tr > td:hover {
  text-decoration: underline;
  text-decoration-color: #06aa9f;
  cursor: pointer;
}


.ef-modal {


  .el-dialog {
    text-align: left;
  }

  .el-dialog__header {
    background-color: #06aa9f;
  }

  .el-dialog__header  > .el-dialog__title {
    color: white;
    font-size: 16px;
    font-family: DINPro-Medium, sans-serif;
  }

  .el-dialog > .el-dialog__body {
    max-height: 250px;
    overflow: scroll;
    word-break: break-word;
  }

  &__list-wrapper {
    column-count: 2;
    column-gap: 1em;
  }

  &__list-wrapper li:hover {
    color: #06aa9f;
    text-decoration: underline;
    cursor: pointer;
  }

  &__list-wrapper .active {
    color: #06aa9f;
    text-decoration: underline;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }

  .el-dialog__footer {
    background-color: #06aa9f;
  }

}
</style>
