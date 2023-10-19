"use client"
import { useState} from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import TodoList from './components/to-do-item';


function TodoForm({ onSubmit, onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
    setText('');
    onAdd();
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form>
      <input type="text" className="input-text" value={text} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

function Counter({ items }) {
  const remainingItems = items.filter((item) => !item.completed);
  return <div className="counter">{remainingItems.length} items remaining</div>;
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState(false);

  const handleSubmit = (text) => {
    // creates todo list item with ID based on current time, automatically set to incomplete
    const newItem = { id: Date.now(), text, completed: false };
    setItems([...items, newItem]);
    setShowItems(true);
  };

  const handleRemoveCompleted = () => {
    const activeItems = items.filter((item) => !item.completed);
    setItems(activeItems);
  };

  const handleToggleAll = () => {
    // changes all the todo items to completed
    const completedItems = items.map((item) => ({ ...item, completed: true }));
    // 
    setItems(completedItems);
  };

  return (
    <div className="grid">
      <TodoForm onSubmit={handleSubmit} onAdd={() => setShowItems(true)} />
      <Counter items={items} />
      <button onClick={handleToggleAll}>Completed All</button>
      <button onClick={handleRemoveCompleted}>Remove Completed</button>
      {showItems && <TodoList items={items} />}
    </div>
  );
};
