<script>
export default {
    name: 'EditForm',
    props: {
      years: { type: Array, required: true },
      farmingFields: { type: Array, required: true },
      editData: { type: Object, default: () => ({}) }
    },
    data() {
      return {
        selected: {
          year: this.editData.year || '',
          field: this.editData.field || '',
          input: '',
        }
      };
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
    <section class="df-controls--wrapper">

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
        <el-select  v-model="selected.field" filterable size="small">
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
        <el-input v-model="selected.input" size="small" class="control__square-input"></el-input>
      </article>

    </section>


    <el-button @click="handleClose">Назад</el-button>
  </div>
</template>

<style lang="scss">
.control__square-input .el-input__inner {
  background-color: #e6f6f5;
}
</style>
