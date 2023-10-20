"use client"
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TodoList from './components/to-do-list';
import TodoForm from './components/to-do-form';
import Counter from './components/counter';
import './globals.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [view, setView] = useState('all');

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
    setItems(completedItems);
  };

  const handleToggleItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  const getVisibleItems = () => {
    switch (view) {
      case 'completed':
        return items.filter((item) => item.completed);
      case 'todo':
        return items.filter((item) => !item.completed);
      default:
        return items;
    }
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="grid">
      <TodoForm onSubmit={handleSubmit} onAdd={() => setShowItems(true)} />
      <Counter items={items} />
      <div>
        <button onClick={() => handleViewChange('all')}>All</button>
        <button onClick={() => handleViewChange('completed')}>Completed</button>
        <button onClick={() => handleViewChange('todo')}>To-Do</button>
      </div>
      <button onClick={handleToggleAll}>Completed All</button>
      <button onClick={handleRemoveCompleted}>Remove Completed</button>
      {visibleItems.length > 0 ? (
        <TodoList items={visibleItems} onToggle={handleToggleItem} onRemove={handleRemoveItem} />
      ) : (
        <p>No items to display.</p>
      )}
    </div>
  );
};

