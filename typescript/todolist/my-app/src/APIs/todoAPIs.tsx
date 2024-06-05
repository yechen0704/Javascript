const baseUrl = "http://localhost:3000/todos";

export const getTodos = (): Promise<any> => {
    return fetch(baseUrl)
        .then((res) => res.json());   
}

export const createTodo = (newTodo: any): Promise<any> => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
    }).then((res) => res.json()); 
};

export const updateTodo = (id: string, partialTodo: any): Promise<any> => {
    return fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partialTodo)
    }).then((res) => res.json()); 
};

    export const deleteTodo = (id: string): Promise<any> => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());
    };