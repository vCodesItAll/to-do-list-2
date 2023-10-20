"use client"
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TodoList from './components/to-do-list';
import TodoForm from './components/to-do-form';
import Counter from './components/counter';
import DarkModeToggle from './components/dark-mode-toggle';

export default function Home() {
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState(false);

  const handleSubmit = (text) => {
    // creates todo list item with ID based on current time, automatically set to incomplete
    const newItem = { id: Date.now(), text, completed: false };
    const updatedItems = [...items, newItem];
    console.log(updatedItems);
    setItems(updatedItems);
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

  const handleDarkModeToggle = () => {
    const html = document.documentElement;
    html.dataset.bsTheme = html.dataset.bsTheme === "dark" ? "light" : "dark";
  };

  return (
    <div className="grid">
      <TodoForm onSubmit={handleSubmit} onAdd={() => setShowItems(true)} />
      <Counter items={items} />
      <button onClick={handleToggleAll}>Completed All</button>
      <button onClick={handleRemoveCompleted}>Remove Completed</button>
      <DarkModeToggle onClick={handleDarkModeToggle} />
      {showItems && <TodoList items={items} />}
    </div>
  );
};

