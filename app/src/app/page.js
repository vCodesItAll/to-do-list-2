"use client"
import { useState} from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.css';





function TodoList({ items, filter }) {
  const [filteredItems, setFilteredItems] = useState(items);

  const handleToggle = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setFilteredItems(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setFilteredItems(updatedItems);
  };

  const handleFilter = (status) => {
    if (status === 'All') {
      setFilteredItems(items);
    } else if (status === 'Completed') {
      const completedItems = items.filter((item) => item.completed);
      setFilteredItems(completedItems);
    } else if (status === 'To-Do') {
      const activeItems = items.filter((item) => !item.completed);
      setFilteredItems(activeItems);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleFilter('All')}>All</button>
        <button onClick={() => handleFilter('Completed')}>Completed</button>
        <button onClick={() => handleFilter('To-Do')}>To-Do</button>
      </div>
      {filteredItems.map((item) => (
        <TodoItem key={item.id} item={item} onToggle={handleToggle} onRemove={handleRemove} />
      ))}
    </div>
  );
}

function TodoForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
    setText('');
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

function Counter({ items }) {
  const remainingItems = items.filter((item) => !item.completed);
  return <div>{remainingItems.length} items remaining</div>;
}

export default function Home() {
  const [items, setItems] = useState([]);

  const handleSubmit = (text) => {
    // creates todo list item with ID based on current time, automatically set to incomplete
    const newItem = { id: Date.now(), text, completed: false };
    setItems([...items, newItem]);
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



      <div className={styles.grid}>
        <TodoForm onSubmit={handleSubmit} />
        <Counter items={items} />
        <button onClick={handleToggleAll}>Completed All</button>
        <button onClick={handleRemoveCompleted}>Remove Completed</button>
        <TodoList items={items} />
      </div>
  );
};
