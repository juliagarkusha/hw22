class TodoFormView {
    static TODO_ITEM_TITLE = 'title';
    static TODO_ITEM_ID = 'id';

    constructor(options) {
        this.options = options;
        this.formEl = null;
    }

    appendTo(container) {
        const formHtml = this.initFormHtml();
        container.insertAdjacentHTML('beforeend', formHtml);

        this.formEl = container.querySelector("form");
        this.formEl.addEventListener('submit', this.onFormSubmit.bind(this))
    }

    onFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [];

        formData.forEach((item, name) => {
            data.push({ name, value: String(item) })
        })

        this.options.onSubmit(data.reduce((acc, field) => ({...acc, [field.name]: field.value}), {}));
        event.target.reset();
    }

    setFormData(todo) {
        const todoInputTitleEl = this.formEl.querySelector(`#${TodoFormView.TODO_ITEM_TITLE}`);
        const todoInputIDEl = this.formEl.querySelector(`#${TodoFormView.TODO_ITEM_ID}`);
        todoInputTitleEl.value = todo.title;
        todoInputIDEl.value = todo.id;
    }

    initFormHtml() {
        return `
            <form>
              <input id="${TodoFormView.TODO_ITEM_ID}" name="${TodoFormView.TODO_ITEM_ID}" type="hidden" />
              <input id="${TodoFormView.TODO_ITEM_TITLE}" name="${TodoFormView.TODO_ITEM_TITLE}" type="text" placeholder="Enter todo"/>
              <button>Save</button>
            </form>
        `
    }
}