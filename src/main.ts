// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import {Todo} from "./models/Todo";
import Todos from "./components/Todos.vue";
import TodoComponent from "./components/TodoComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import App from "./App.vue";
import {filters} from "./utils/filters";
import {Visibility} from "./utils/enums";
import * as R from 'ramda';

Vue.use(Vuex);

let cpt = 0;

interface State {
  map: {
    newTodo: Todo,
    todos: Todo[],
    editedTodo: Todo,
    visibility: string,
    beforeEdit: Todo,
  };
}

const store = new Vuex.Store<State>({
  state: {
    map: {
      newTodo: new Todo(),
      todos: [],
      editedTodo: new Todo(),
      beforeEdit: new Todo(),
      visibility: 'all'
    },
  },
  mutations: {
    setNewTodo(state, todo: string) {
      state.map.newTodo = {
        ...state.map.newTodo,
        text: todo
      };
    },

    setVisibility(state, visibility: Visibility) {
      state.map.visibility = visibility;
    },

    setEditedTodo(state, todo: string) {
      state.map.editedTodo = {
        ...state.map.editedTodo,
        text: todo
      }
    },

    checkTodo(state, payload: { idTodo: string, value: boolean }) {
      const {idTodo, value} = payload;
      const ind = R.findIndex(R.propEq('id', idTodo))(state.map.todos);

      state.map.todos[ind] = {
        ...state.map.todos[ind],
        checked: value
      };

      state.map.todos = [...state.map.todos];
    },

    addTodo(state) {
      const value = state.map.newTodo.text !== '' && state.map.newTodo.text.trim();

      if (!value) {
        return;
      }

      cpt = cpt + 1;

      state.map.todos = [
        ...state.map.todos,
        new Todo({
          id: 'todo_' + cpt,
          text: value
        })
      ];

      state.map.newTodo = new Todo();
      state.map.todos = [...state.map.todos];
    },

    removeTodo(state, todo: Todo) {
      const ind = R.findIndex(R.propEq('id', todo.id))(state.map.todos);
      state.map.todos.splice(ind, 1);
      state.map.todos = [...state.map.todos];
    },

    editTodo(state, todo: Todo) {
      state.map.beforeEdit = todo;
      state.map.editedTodo = todo;
    },

    doneEdit(state, payload: {idTodo: string, value: string}) {
      const {idTodo, value} = payload;

      if (value === '') {
        return;
      }

      const ind = R.findIndex(R.propEq('id', idTodo))(state.map.todos);

      state.map.todos[ind] = {
        ...state.map.todos[ind],
        text: state.map.editedTodo.text.trim()
      };

      if (!state.map.todos[ind].text || state.map.todos[ind].text === '') {
        state.map.todos.splice(ind, 1)
      }

      state.map.editedTodo = new Todo();
      state.map.todos = [...state.map.todos];
    },

    cancelEdit(state) {
      state.map.editedTodo = new Todo();
    },

    removeCompleted(state) {
      state.map.todos = filters(Visibility.active, state.map.todos);
    },

    allDone(state, value: boolean) {
      state.map.todos.forEach((todo) => {
        todo.checked = value;
      });

      state.map.todos = [...state.map.todos];
    }
  },
  getters: {
    filteredTodos: (state): Todo[] => {
      return filters(state.map.visibility, state.map.todos);
    },

    remaining: (state): number => {
      return filters(Visibility.active, state.map.todos).length;
    },

    allDone: (state, getters): boolean => {
      return getters.remaining === 0;
    },
  }
});

Vue.component('todo', TodoComponent);
Vue.component('footer-component', FooterComponent);
Vue.directive('todo-focus', {
  inserted: (el, binding) => {
    if (binding.value) {
      el.focus()
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    Todos,
    TodoComponent
  },
  store,
  template: '<App/>',
  data: {
    name: 'Tuto'
  },
});
