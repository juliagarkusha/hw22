class TodoListView {
    static TODO_ITEM_CLASS = 'todo_item';

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

        this.onToggleStatus(id);

        if(action === 'edit') {
            this.onEdit(id);
        }

        if(action === 'delete') {
            this.onDelete(id);
        }
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
        const oldTodoEl = this.getTodoElById(id)
    //    const todoHtml = this.generateTodoHtml(todo);
//
    //    oldTodoEl.outerHTML = todoHtml;
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
       const done = todo.done ? 'done' : '';

        return `
            <li class="${TodoListView.TODO_ITEM_CLASS}" data-id="${todo.id}">
                <span class="title--${done}">${todo.title}</span>
                <button class="editBtn" data-action="edit" data-id="${todo.id}">Edit</button>
                <button class="deleteBtn" data-action="delete" data-id="${todo.id}">Delete</button>
            </li>
        `;
    }

    initRootHtml() {
        const rootEl = document.createElement('div');
        rootEl.setAttribute('id', 'todoList');

        return rootEl;
    }
}