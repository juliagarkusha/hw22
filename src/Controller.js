class Controller {
    constructor(rootEl) {
        this.rootEl = rootEl;

        this.todoListCollection = new TodoListCollection();

        this.todoFormView = new TodoFormView({
            onSubmit: (todo) => {
                this.save(todo);
            }
        });

        this.todoListView = new TodoListView({
            onEdit: (id) => this.todoFormView.setFormData(this.todoListCollection.get(id)),
            onDelete: (id) => this.delete(id),
            onToggleStatus: (id) => this.toggleStatus(id),
        });

        this.todoFormView.appendTo(this.rootEl);
        this.todoListView.appendTo(this.rootEl);

        this.todoListCollection.fetch().then(list => {
            this.todoListView.renderList(list);
        })
    }

    save(todo) {
        this.todoListCollection
            .save(todo)
            .then((newTodo) => {
                if (todo.id) {
                    this.todoListView.replaceTodo(newTodo.id, newTodo);
                } else {
                    this.todoListView.renderItem(newTodo);
                }
            });
    }

    delete(id) {
        this.todoListCollection
            .delete(id)
            .then(() => {
                this.todoListView.remove(id);
            })
    }

    toggleStatus(id) {
        this.todoListCollection
            .toggleStatus(id)
            .then((newTodoItem) => {
                this.todoListView.replaceTodo(id, newTodoItem);
            })
    }
}