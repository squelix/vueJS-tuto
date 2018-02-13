// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import {Todo} from "./models/Todo";

Vue.use(Vuex);

interface State {
  map: {
    todos: Todo[],
  };
}

const store = new Vuex.Store<State>({
  state: {
    map: {
      todos: []
    },
  },
  mutations: {
    addTodo(state, todo: string) {
      state.map.todos = [...state.map.todos, new Todo(todo)];
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});
