<script>
import { getYear, addYears, subYears } from 'date-fns';

export default {
  name: 'DisplayForm',
  props: {
    orgs: { type: Array, required: true },
    farmingFields: { type: Array, required: true },
    plants: { type: Array, required: true },
    years: { type: Array, required: true },
    tableData: { type: Array, required: true },
  },
  data () {
    return {
      selected: {
        org: -1,
        plant: -1,
        year: getYear(new Date()).toString(),
        farmingField: -1,

      }
    };
  },
  computed: {
    temp() {
      return this.tableData.reduce((acc, item) => {
        if (acc[item.name]) {
          acc[item.name].push(item)
        } else {
          acc[item.name] = [item];
        }
        return acc
      }, {})
      },


    items() {

      let items = [];

      this.tableFields.forEach(field => {
        if (field.label !== 'Поле') {
          items.push({ key: field.key, label: field.label })
        }
      })

      let res = [];
      let temp1 = {...this.temp};
      for (const [key, values] of Object.entries(temp1)) {
        let field = { name: key};

        items.forEach(({ key, label}) => {
          let newAr = [];
          newAr = values.filter(({ year }) => year === Number(label));
          field[key] = newAr.length > 0 ? newAr : '';
        });
        res.push(field);

      }

      return res;
    },


    tableFields() {
      let res = [];
      res.push({
        key: 'name',
        label: 'Поле',
        sortable: false
      });
      res.push({
        key: 'first-year',
        label: getYear(subYears(new Date(this.selected.year), 2)).toString()
      });

      res.push({
        key: 'second-year',
        label: getYear(subYears(new Date(this.selected.year), 1)).toString()
      });

      res.push({
        key: 'third-year',
        label: this.selected.year
      });

      res.push({
        key: 'fourth-year',
        label: getYear(addYears(new Date(this.selected.year), 1)).toString()
      });

      res.push({
        key: 'fifth-year',
        label: getYear(addYears(new Date(this.selected.year), 2)).toString()
      });
      return res;
    },
  },
  methods: {
    getSubTableData(year) {
      console.log('1', year);
    },
  },
};
</script>

<template>
  <div>
    <h2 class="df-title">СЕВООБОРОТ</h2>
    <section class="df-controls--wrapper">

      <article class="df-controls--control">
        <p class="control-title">Отделение</p>
        <el-select  v-model="selected.org" filterable placeholder="">
          <el-option
              v-for="(org, idx) in orgs"
              :key="idx"
              :label="org.Name"
              :value="org.Id">
          </el-option>
        </el-select>
      </article>

      <article class="df-controls--control">
        <p class="control-title">Культура</p>
        <el-select  v-model="selected.plant" filterable placeholder="">
          <el-option
              v-for="(plant, idx) in plants"
              :key="idx"
              :label="plant.Name"
              :value="plant.Id">
          </el-option>
        </el-select>
      </article>

      <article class="df-controls--control">
        <p class="control-title">Год</p>
        <el-select  v-model="selected.year" filterable placeholder="">
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
        <el-select  v-model="selected.farmingField" filterable placeholder="">
          <el-option
              v-for="(field, idx) in farmingFields"
              :key="idx"
              :label="field.Name"
              :value="field.Id">
          </el-option>
        </el-select>
      </article>

       <el-button class="control--edit-button">Редактировать</el-button>

    </section>

    <section class="df-table">

      <b-table hover :fields="tableFields" :items="items"></b-table>

      {{ items }}

    </section>
  </div>
</template>

<style lang="scss" scoped>
.df {
  &-title {
    padding-top: 15px;
    color: #d8a331;
    font-size: 20px;
    font-family: DINPro-Medium, sans-serif;
    width: 25%;
  }

  &-controls--wrapper {
    display: flex;
    margin-top: 10px;
    font-family: DINPro, sans-serif;
  }

  &-controls--control {
    display: flex;
    flex-direction: column;
    margin-right: 6px;

  }

  &-table {}

}


.control {
  &-title {
    margin: 0 auto 0 0;
    line-height: 1.42857143;
  }
  &--edit-button {
    margin-top: auto;
    margin-left: auto;
    height: 40px;
    background-color: #06aa9f;
  }
}
</style>


<style lang="scss">
.df-controls--wrapper {
  :nth-child(1) >.el-select {
    width: 175px;
  }
  :nth-child(2) >.el-select {
    width: 175px;
  }
  :nth-child(3) >.el-select {
    width: 77px;
  }
  :nth-child(4) >.el-select {
    width: 150px;
  }
}

.control--edit-button span {
  color: white;
}
</style>
