import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

import { DEFAULT_TABLE_DATA } from './mock';

export default new Vuex.Store({
  actions: {
    fetchTableData ({ commit }) {
      axios.get('https://jsonplaceholder.typicode.com/posts',) // имитация запроса на сервер
        .then(() => {
          if (!localStorage.getItem('tableData')) {
            localStorage.setItem('tableData', JSON.stringify(DEFAULT_TABLE_DATA));
          }
          const tableData = JSON.parse(localStorage.getItem('tableData'));
          commit('SET_TABLE_DATA', tableData);
        })
        .catch((e) => {
          console.log(e);
        })
    },
  },
  mutations: {
    SET_TABLE_DATA: (state, payload) => {
      state.tableData = payload;
    },
  },
  state: {
    tableData: []
  },
  getters: {
    tableData: state => state.tableData,
  },
  modules: {
  }
});
