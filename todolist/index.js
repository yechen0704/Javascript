//const { create } = require("json-server");

// MVC - Model, View, Controller
const APIs = (() => {
    const baseURL = "http://localhost:3000/todos"
    const getTodos = () => {
        return fetch(baseURL).then((res) => res.json()); // Promise -> json
    };

    const createTodo = (newTodo) => {
        return fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo),
        }).then((res) => res.json());
    };

    const deleteTodo = (id) => {
        console.log("id", id);
        return fetch(`${baseURL}/${id}`, {method: "DELETE"}).then((res) => res.json());
    }

    return { getTodos, createTodo, deleteTodo};
})();

const Model = (() => {
    class State {
        #todos; // []
        #onchange;
        constructor() {
            this.#todos = [];
        }

        get todos() {
            return this.#todos;
        }
 
        set todos(newTodos) {
            this.#todos = newTodos;
            this.#onchange();
        }

        subscribe(cb) {
            this.#onchange = cb
        }
    }
    const { getTodos, createTodo, deleteTodo } = APIs;
    return {
        State,
        getTodos,
        createTodo,
        deleteTodo
    }
})();

const View = (() => {
    const todolistEl = document.querySelector(".todolist");
    const addBtnEle = document.querySelector(".todo__add-btn");
    const inputEle = document.querySelector(".todo__input");

    const getInputValue = () => {
        return inputEle.value;
    }

    const clearInput = () => {
        inputEle.value = "";
    }

    const renderTodos = (todos) => {
        let todosTemp = "";

        todos.forEach((todo) => {
            const content = todo.content;
            const liTemp = ` 
            <li id=${todo.id}>
                <span>${content}</span>
                <button class="todo__dlt-btn"> delete</button>
                <button class="todo_edit-btn">edit</button>
            </li>`;
            todosTemp += liTemp
        });
        todolistEl.innerHTML = todosTemp;
    }

    return { renderTodos, addBtnEle, todolistEl, getInputValue, clearInput }
})();

const Controller = ((view, model) => {
    // state instance
    const state = new model.State();

    const setUpAddHandler = () => {
        view.addBtnEle.addEventListener("click", (event) => {
            event.preventDefault();
            const inputValue = view.getInputValue();
            console.log(inputValue);
            const newTodo = {
                content: inputValue
            }
            console.log(newTodo);
            model.createTodo(newTodo).then((data) => {
                //console.log("data" + data);
                state.todos = [...state.todos, data];
                view.clearInput();
            }); 
        });
    };

    // event delegation
    const setUpDeleteHandler = () => {
        view.todolistEl.addEventListener("click", (event) => {
            // console.log(event.target);
            const element = event.target;
            if(element.className === "todo__dlt-btn"){
                const id = element.parentElement.getAttribute("id");
                console.log(id); 
                model.deleteTodo(id).then((data) => {
                    state.todos = state.todos.filter((item) => item.id !== id);
                });
            }
        })
    }

    // handle events
    const init = () => {
        model.getTodos().then(data => {
            state.todos = data;
            //view.renderTodos(data);
        });
    }
 
    const bootstrap = () => {
        init();
        state.subscribe(() => {
            view.renderTodos(state.todos);
        })
        setUpAddHandler(); // set event listener
        setUpDeleteHandler();
    }

    return {
        bootstrap,
    };
})(View, Model); // controller rely on View & Model module

Controller.bootstrap();

// const todolistEl = document.querySelector(".todolist");
// //// fetch request
// fetch("http://localhost:3000/todos")
//     .then((res) => res.json())
//     .then((res) => {
//         const todo = res[0];
// todolistEl.innerHTML = `
// <li>
//     <span>${todo.content}</span>
//     <button class="todo__dlt-btn"> delete</button>
//     <button class="todo_edit-btn">edit</button>
// </li>`
//     });


///// fetch post request
// fetch("http://localhost:3000/comments", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         id: "2",
//         body: "example",
//         postId: "2",
//     }),
// })
//     .then((res) => res.json())
//     .then((res) => console.log(res));