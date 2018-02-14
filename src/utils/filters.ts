import {Todo} from "../models/Todo";
import {Visibility} from "./enums";


export function filters(visibility: string, todos: Todo[]): Todo[] {
  switch (visibility) {
    case Visibility.all:
      return todos;

    case Visibility.active:
      return todos.filter(function (todo) {
        return !todo.checked;
      });

    case Visibility.completed:
      return todos.filter(function (todo) {
        return todo.checked;
      });

    default:
      return todos;
  }
}
