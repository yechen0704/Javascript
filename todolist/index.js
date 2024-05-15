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

    return { getTodos, createTodo };
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
    const { getTodos, createTodo } = APIs;
    return {
        State,
        getTodos,
        createTodo,
    }
})();

const View = (() => {
    const todolistEl = document.querySelector(".todolist");
    const addBtnEle = document.querySelector(".todo__add-btn");
    const inputEle = document.querySelector(".todo__input");

    const getInputValue = () => {
        return inputEle.value;
    }
    const renderTodos = (todos) => {
        let todosTemp = "";

        todos.forEach((todo) => {
            const content = todo.content;
            const liTemp = ` 
            <li>
                <span>${content}</span>
                <button class="todo__dlt-btn"> delete</button>
                <button class="todo_edit-btn">edit</button>
            </li>`;
            todosTemp += liTemp
        });
        todolistEl.innerHTML = todosTemp;
    }

    return { renderTodos, addBtnEle, getInputValue }
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
            }); 
        });
    };

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