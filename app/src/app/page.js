"use client"
import React, { useState, useEffect } from 'react';
import './globals.css';
import styles from './page.module.css';

function TodoList() {
  const [items, setItems] = useState([]);

  function addItem(text) {
    setItems([...items, { text, completed: false }]);
  }

  function removeItem(index) {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  }

  function toggleCompleted(index) {
    setItems([
      ...items.slice(0, index),
      { ...items[index], completed: !items[index].completed },
      ...items.slice(index + 1),
    ]);
  }

  function markAllCompleted() {
    setItems(items.map((item) => ({ ...item, completed: true })));
  }

  function removeCompleted() {
    setItems(items.filter((item) => !item.completed));
  }

  const remainingCount = items.filter((item) => !item.completed).length;

  return (
    <div>
      <TodoForm onSubmit={addItem} />
      <TodoFilter
        onMarkAllCompleted={markAllCompleted}
        onRemoveCompleted={removeCompleted}
        remainingCount={remainingCount}
      />
      <ul>
        {items.map((item, index) => (
          <TodoItem
            key={index}
            text={item.text}
            completed={item.completed}
            onToggleCompleted={() => toggleCompleted(index)}
            onRemove={() => removeItem(index)}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ text, completed, onToggleCompleted, onRemove }) {
  return (
    <li>
      <input type="checkbox" checked={completed} onChange={onToggleCompleted} />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
      <button className ="button" onClick={onRemove}>Remove</button>
    </li>
  );
}

function TodoForm({ onSubmit }) {
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(text);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
      <button className="button" type="submit">Add</button>
    </form>
  );
}

function TodoFilter({ onMarkAllCompleted, onRemoveCompleted, remainingCount }) {
  return (
    <div>
      <button className='button' onClick={onMarkAllCompleted}>Mark All Completed</button>
      <button className='button' onClick={onRemoveCompleted}>Remove Completed</button>
      <span>{remainingCount} items remaining</span>
    </div>
  );
}

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>To-Do List</h1>
      <RandomQuote />
      <TodoList />
    </div>
  );
}



function RandomQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    async function fetchQuote() {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    }
    fetchQuote();
  }, []);

  return (
    <div>
      <p>{quote}</p>
      <p>- {author}</p>
    </div>
  );
}



