class TodoListView {
    static TODO_ITEM_CLASS = 'todo__item';
    static TODO_TITLE_CLASS = 'todo__title';
    static TODO_TITLE_DONE_CLASS = 'todo__title--done';
    static TODO_ACTIONS_CLASS = 'todo__actions';

    constructor(options) {
        const { onEdit, onDelete, onToggleStatus } = options;
        this.rootEl = this.initRootHtml();
        this.onEdit = onEdit;
        this.onDelete = onDelete;
        this.onToggleStatus = onToggleStatus;

        this.bindEvents();
    }

    bindEvents() {
        this.rootEl.addEventListener('click', this.onRootElClick.bind(this));
    }

    onRootElClick(event) {
        const todoEl = this.getTodoEl(event.target);
        const id = this.getTodoElId(todoEl);
        const action = event.target.dataset.action;

        if(!todoEl) {
            return;
        }

        if(action === 'edit') {
            this.onEdit(id);
            return;
        }

        if(action === 'delete') {
            this.onDelete(id);
            return;
        }

        this.onToggleStatus(id);
    }

    appendTo(container) {
        container.append(this.rootEl);
    }

    renderList(list) {
        this.rootEl.innerHTML = '';

        list.forEach(item => this.renderItem(item));
    }

    renderItem(todo) {
        const itemHtml = this.initTodoItemHtml(todo);

        this.rootEl.insertAdjacentHTML('beforeend', itemHtml);
    }

    remove(id) {
        const todoEl = this.getTodoElById(id)

        todoEl.remove();
    }
    
    replaceTodo(id, todo) {
       const oldTodoEl = this.getTodoElById(id);
       const title = oldTodoEl.querySelector(`.${TodoListView.TODO_TITLE_CLASS}`);
        title.innerText = todo.title;
        if (todo.done) {
            title.classList.add(TodoListView.TODO_TITLE_DONE_CLASS);
        } else {
            title.classList.remove(TodoListView.TODO_TITLE_DONE_CLASS);
        }
    }

    getTodoEl(el) {
        return el.closest(`.${TodoListView.TODO_ITEM_CLASS}`);
    }

    getTodoElId(todoEl) {
        return todoEl.dataset.id;
    }

    getTodoElById(id) {
        return this.rootEl.querySelector(`[data-id="${id}"]`);
    }

    initTodoItemHtml(todo) {
       const done = todo.done ? 'todo__title--done' : '';

        return `
            <li class="${TodoListView.TODO_ITEM_CLASS}" data-id="${todo.id}">
                <span class="${TodoListView.TODO_TITLE_CLASS} ${done}">${todo.title}</span>
                <div class="${TodoListView.TODO_ACTIONS_CLASS}">
                    <button class="btn-primary" data-action="edit" data-id="${todo.id}">Edit</button>
                    <button class="btn-danger" data-action="delete" data-id="${todo.id}">Delete</button>
                </div>
            </li>
        `;
    }

    initRootHtml() {
        const rootEl = document.createElement('div');
        rootEl.setAttribute('id', 'todoList');

        return rootEl;
    }
}