<script>
import getYear from 'date-fns/getYear';

export default {
  name: 'DisplayForm',
  props: {
    orgs: { type: Array, require: true},
    farmingFields: { type: Array, require: true},
    plants: { type: Array, require: true},
    years: { type: Array, require: true},
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
  },
  methods: {},
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
