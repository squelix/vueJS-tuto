export class Todo {
  id: string;
  text: string;
  checked: boolean;

  constructor(data?: { id?: string, text?: string, checked?: boolean }){
    data = data || {};
    this.text = data['text'] || '';
    this.id = data['id'] || '';
    this.checked = data['checked'] || false;
  }
}
