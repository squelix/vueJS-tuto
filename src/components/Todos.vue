<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Todos extends Vue {

    setNewTodo(event: any): void {
      const { value } = event.target;
      this.$store.commit('setNewTodo', value);
    }

    addTodo(): void {
      this.$store.commit('addTodo');
    }

    allDone(event: any): void {
      const { checked } = event.target;
      this.$store.commit('allDone', checked);
    }
  }
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        @input="setNewTodo"
        :value="$store.state.map.newTodo.text"
        @keyup.enter="addTodo"
      >
    </header>

    <section class="main" v-show="$store.state.map.todos.length && $store.state.map.todos.length > 0" v-cloak>
      <input
        class="toggle-all"
        type="checkbox"
        @change="allDone"
        :value="$store.getters.allDone"
      >

      <ul class="todo-list">
        <todo
          v-for="todo in $store.getters.filteredTodos"
          v-bind:todo="todo"
        />
      </ul>
    </section>

    <footer-component />
  </section>

</template>
