"use client"
import { useState} from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import TodoList from './components/to-do-item';
import TodoForm from './components/to-do-form';
import Counter from './components/counter';





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
