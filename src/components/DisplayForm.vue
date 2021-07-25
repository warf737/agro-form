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
      },
      currentPage: 1
    };
  },
  computed: {
    fields() {
      let res = [];
      res.push({
        key: 'name',
        label: 'Поле',
        sortable: true
      });
      res.push({
        key: 'first-year',
        label: getYear(subYears(new Date(this.selected.year), 2)).toString(),
      });

      res.push({
        key: 'second-year',
        label: getYear(subYears(new Date(this.selected.year), 1)).toString(),
      });

      res.push({
        key: 'third-year',
        label: this.selected.year,
      });

      res.push({
        key: 'fourth-year',
        label: getYear(addYears(new Date(this.selected.year), 1)).toString(),
      });

      res.push({
        key: 'fifth-year',
        label: getYear(addYears(new Date(this.selected.year), 2)).toString(),
      });
      return res;
    },

    items() {
      // группируем данные по полям
      const temp = this.tableData.reduce((acc, item) => {
        if (acc[item.name]) {
          acc[item.name].push(item)
        } else {
          acc[item.name] = [item];
        }
        return acc
      }, {});

      // записываем в данные полей информацию о показываемых периодах
      let items = [];
      this.fields.forEach(field => {
        if (field.label !== 'Поле') {
          items.push({ key: field.key, label: field.label })
        }
      })

      // записываем в показываемые периоды данные по ним
      let res = [];
      for (const [key, values] of Object.entries(temp)) {
        let field = { name: key};

        items.forEach(({ key, label}) => {
          let newAr = [];
          newAr = values.filter(({ year }) => year === Number(label));
          field[key] = newAr.map(({ sowing }) => sowing) || [];
        });
        res.push(field);
      }


      // фильтруем по полю
      let filteredResult = [];


      if (this.selected.farmingField !== -1) {
        const ff = this.farmingFields.find(f => f.Id === this.selected.farmingField);
        filteredResult = res.filter(r => r.name === ff.Name);
      } else {
        filteredResult = res;
      }

      // фильтруем по культуре
      let tempResult = [];
      if (this.selected.plant !== -1) {
        const ff = this.plants.find(f => f.Id === this.selected.plant);
        tempResult = filteredResult.filter(fr => {
          for (let i in fr) {
            if (typeof fr[i] !== 'string') {
            const test = fr[i]?.find(plant => plant.name === ff.Name)
            if (test) {
              return fr
            }
            }
          }
        })

        filteredResult = tempResult.length > 0 ? tempResult : [];

      }
      return filteredResult;
    },
  },
  methods: {
    getTotalSquares(grades) {
      let factTotal = 0;
      let planTotal = 0;

      grades.forEach(({ square }) => {
        factTotal += square.fact;
        planTotal += square.plan;
      });

      return { fact : factTotal, plan: planTotal };
    },
    handleSelect(cell) {
      const year = this.items.find(field => field.key === cell.label)
      this.$emit('select-cell', {...cell, year: year });
    },
    handleEdit() {
      this.$emit('toggle-edit');
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    }
  },
};
</script>

<template>
  <div>
    <section class="df-controls--wrapper">

      <article class="df-controls--control">
        <p class="control-title">Отделение</p>
        <el-select  v-model="selected.org" filterable size="small">
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
        <el-select  v-model="selected.plant" filterable size="small">
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
        <el-select  v-model="selected.year" filterable size="small">
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
        <el-select  v-model="selected.farmingField" filterable size="small">
          <el-option
              v-for="(field, idx) in farmingFields"
              :key="idx"
              :label="field.Name"
              :value="field.Id">
          </el-option>
        </el-select>
      </article>

       <el-button
           class="control--edit-button"
           type="warning"
           size="small"
           @click="handleEdit"
       >
         Редактировать
       </el-button>

    </section>

    <section class="df-table">
      <b-table fixed :fields="fields" :items="items" class="mt-3" sort-by="name">

        <template #cell(first-year)="data">
          <el-button @click="handleSelect({ label:'first-year',  field: data.item.name, data: data.item['first-year'] })">
            <template v-for="(i, idx) in data.item['first-year']" >
              <div class="table-cell--data-wrapper" :key="idx">
                <p class="table-cell--title"> {{ i.name }}</p>
                <p>
                  <span class="data-plan">{{ `${getTotalSquares(i.grades).plan}` }}</span>
                  <span class="data-fact"> {{ ` / ${getTotalSquares(i.grades).fact}` }}</span>
                </p>
              </div>
            </template>
          </el-button>
        </template>

        <template #cell(second-year)="data">
          <el-button @click="handleSelect({ label:'second-year',  field: data.item.name, data: data.item['second-year'] })">
            <template v-for="(i, idx) in data.item['second-year']" >
              <div class="table-cell--data-wrapper" :key="idx">
                <p class="table-cell--title"> {{ i.name }}</p>
                <p>
                  <span class="data-plan">{{ `${getTotalSquares(i.grades).plan}` }}</span>
                  <span class="data-fact"> {{ ` / ${getTotalSquares(i.grades).fact}` }}</span>
                </p>
              </div>
            </template>
          </el-button>
        </template>

        <template #cell(third-year)="data">
          <el-button @click="handleSelect({ label:'third-year',  field: data.item.name, data: data.item['third-year'] })">
            <template v-for="(i, idx) in data.item['third-year']" >
              <div class="table-cell--data-wrapper" :key="idx">
                <p class="table-cell--title"> {{ i.name }}</p>
                <p>
                  <span class="data-plan">{{ `${getTotalSquares(i.grades).plan}` }}</span>
                  <span class="data-fact"> {{ ` / ${getTotalSquares(i.grades).fact}` }}</span>
                </p>
              </div>
            </template>
          </el-button>
        </template>

        <template #cell(fourth-year)="data">
          <el-button @click="handleSelect({ label:'fourth-year',  field: data.item.name, data: data.item['fourth-year'] })">
            <template v-for="(i, idx) in data.item['fourth-year']" >
              <div class="table-cell--data-wrapper" :key="idx">
                <p class="table-cell--title"> {{ i.name }}</p>
                <p>
                  <span class="data-plan">{{ `${getTotalSquares(i.grades).plan}` }}</span>
                  <span class="data-fact"> {{ ` / ${getTotalSquares(i.grades).fact}` }}</span>
                </p>
              </div>
            </template>
          </el-button>
        </template>

        <template #cell(fifth-year)="data">
          <el-button @click="handleSelect({ label:'fifth-year',  field: data.item.name, data: data.item['fifth-year'] })">
            <template v-for="(i, idx) in data.item['fifth-year']" >
              <div class="table-cell--data-wrapper" :key="idx">
                <p class="table-cell--title"> {{ i.name }}</p>
                <p>
                  <span class="data-plan">{{ `${getTotalSquares(i.grades).plan}` }}</span>
                  <span class="data-fact"> {{ ` / ${getTotalSquares(i.grades).fact}` }}</span>
                </p>
              </div>
            </template>
          </el-button>
        </template>

      </b-table>
    </section>


    <div class="df-pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
      </el-pagination>
    </div>


  </div>
</template>

<style lang="scss" scoped>
.df {

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

  &-pagination {
    display: flex;
  }
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

.table-cell {
  &--data-wrapper {
    display: flex;
    justify-content: space-between;
  }

}

tbody {
  .el-button {
    padding: 5px 5px !important;
    min-width: 150px;
    min-height: 50px;
    border: none !important;

    .table-cell--title{
      color: rgb(6, 170, 159) !important;
    }

    .table-cell--title, p {
      margin-bottom: 5px;
    }
  }
}

.data-fact {
  color: #06aa9f;
}

.data-plan {
  color: #d8a331;
}

.sr-only {
  display: none;
 }

.table {
  color: inherit !important;
}

.table > thead > tr > th:not(:first-child) div {
  font-family: DINPro-Medium, sans-serif !important;
  padding: 5px;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: grey;
  font-size: 17px;
  font-weight: normal;
}

.el-pagination {
  margin-left: auto;
}

.el-button {
  border: none !important;
}
</style>
