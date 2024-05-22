const URL = "http://localhost:3000";

export const getCart = () => {
    // define your method to get cart data
    return fetch(`${URL}/cart`).then((res) => res.json());
};

export const getInventory = () => {
    // define your method to get inventory data
    return fetch(`${URL}/inventory`).then((res) => res.json());
};

export const addToCart = (inventoryItem) => {
    // define your method to add an item to cart
    return fetch(`${URL}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inventoryItem),
    }).then((res) => res.json());
};

export const updateCart = (id, info) => {
    // define your method to update an item in cart

    return fetch(`${URL}/cart/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    }).then((res) => res.json());
};

export const deleteFromCart = (id) => {
    // define your method to delete an item in cart
    return fetch(`${URL}/cart/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
};

export const checkout = () => {
    // you don't need to add anything here
    return getCart().then((data) =>
        Promise.all(data.map((item) => deleteFromCart(item.id)))
    );
};