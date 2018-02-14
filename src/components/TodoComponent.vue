<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {Todo} from "../models/Todo";

  @Component
  export default class TodoComponent extends Vue {

    @Prop()
    todo: Todo;

    checkElem(event: any): void {
      const {checked} = event.target;
      this.$store.commit('checkTodo',{idTodo: this.todo.id, value: checked});
    }

    setEditedTodo(event: any): void {
      const { value } = event.target;
      this.$store.commit('setEditedTodo', value);
    }

    dbClickEvent(): void {
      this.$store.commit('editTodo', this.todo);
    }

    removeTodo(): void {
      this.$store.commit('removeTodo', this.todo);
    }

    cancelEdit(): void {
      this.$store.commit('cancelEdit');
    }

    doneEdit(): void {
      this.$store.commit('doneEdit', {idTodo: this.todo.id, value: this.$store.state.map.editedTodo.text});
    }

    compareId(): boolean {
      return !!(this.todo && this.todo.id !== '' && this.$store.state.map.editedTodo && this.$store.state.map.editedTodo.id !== '' && this.todo.id === this.$store.state.map.editedTodo.id);

    }

  }
</script>

<template>
  <li
    class="todo"
    :class="{ completed: todo.checked, editing: compareId() }"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        @change="checkElem"
        :checked="todo.checked"
      >
      <label @dblclick="dbClickEvent()">{{ todo.text }}</label>
      <button class="destroy" @click="removeTodo()"></button>
    </div>
    <input class="edit" type="text"
           v-todo-focus="compareId()"
           @blur="cancelEdit()"
           @keyup.enter="doneEdit()"
           @keyup.esc="cancelEdit()"
           @input="setEditedTodo"
           :value="$store.state.map.editedTodo ? $store.state.map.editedTodo.text : ''"
    >
  </li>
</template>
