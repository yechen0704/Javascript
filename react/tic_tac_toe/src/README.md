# Hook

1. useState : A function used to update the state. When the setState function is called, React updates the state and re-renders the component.

2. useEffect : Used to perform side effects in function components

- On Mount: When the component is first rendered into the DOM, the effect function in `useEffect` is executed. This is equivalent to the `componentDidMount` lifecycle method in class components
- On Dependency Changes: If a dependency array is specified, the side effect function will be re-executed when the dependent variables change. This is equivalent to the `componentDidUpdate` lifecycle method in class components
- On component unmount: When a component is unmounted from the DOM, if `useEffect` returns a function, this function will be executed when the component is unmounted. This is equivalent to the `componentWillUnmount` lifecycle method in class components.
- `setInterval()` : Used to periodically call a function or execute a piece of code. It allows you to repeat an operation at a specified time interval

```javascript
setInterval(callback, delay[, ...args]);
// callback : The function to be called periodically or the code to be executed.
// delay : time interval, in milliseconds, indicating how often the callback is executed
// args : optional arguments passed to the callback function (if any)
```

3. useRef : Used to create a mutable reference object in a function component. It is similar to the ref object created in a class component and can be used to access DOM elements or store arbitrary mutable values.
```javascript
const inputRef = useRef();
```
4. useCallback
5. useMemo & react.memo
6. useContext : If you need to share a value across multiple levels of the component tree (such as user identity information, themes, language settings, etc.), you can use React's context to achieve this. With context, you can provide values ​​at the top level and then use useContext to access them anywhere.

```javascript
const MyContext = React.createContext(defaultValue); // Create a context object

<MyContext.Provider value={value}>{/* child component */}</MyContext.Provider>; // Place the value you want to share as a context provider somewhere in the component tree.

const contextValue = useContext(MyContext); // Use the useContext hook in any child component to get the value from the context.
```

6. useReducer
