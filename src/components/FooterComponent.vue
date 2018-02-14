<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import { pluralize } from '../utils'
  import { Visibility } from '../utils/enums'

  @Component
  export default class FooterComponent extends Vue {
    pluralize = pluralize;
    Visibility = Visibility;

    removeCompleted(): void {
      this.$store.commit('removeCompleted');
    }

    setVisibility(visibility: Visibility): void {
      this.$store.commit('setVisibility', visibility);
    }
  }
</script>

<template>
  <footer class="footer" v-show="$store.state.map.todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ $store.getters.remaining }}</strong> {{ pluralize($store.getters.remaining) }} left
    </span>
    <ul class="filters">
      <li><a @click="setVisibility(Visibility.all)" :class="{ selected: $store.state.map.visibility === Visibility.all }">All</a></li>
      <li><a @click="setVisibility(Visibility.active)" :class="{ selected: $store.state.map.visibility === Visibility.active }">Active</a></li>
      <li><a @click="setVisibility(Visibility.completed)" :class="{ selected: $store.state.map.visibility === Visibility.completed }">Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="$store.state.map.todos.length > $store.getters.remaining">
      Clear completed
    </button>
  </footer>
</template>

