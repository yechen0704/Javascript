import DoubleSelect from "./components/DoubleSelect";
import "./App.css";
import { items } from "./items/items";

export default function App() {
  return (
    <div className="App">
      <DoubleSelect items={items} />
    </div>
  );
}


