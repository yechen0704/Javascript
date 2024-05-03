const todolistEl = document.querySelector(".todolist");

//// fetch request
fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((res) => {
        const todo = res[0];
        todolistEl.innerHTML = `
        <li>
            <span>${todo.content}</span>
            <button class="todo__dlt-btn"> delete</button>
            <button class="todo_edit-btn">edit</button>
        </li>`
    });


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