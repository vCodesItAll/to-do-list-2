import React, { useState } from 'react';

function TodoItem({ text, completed, onToggle }) {
    return (
        <li onClick={onToggle} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {text}
        </li>
    );
}

function TodoList({ items, onToggle }) {
    return (
        <ul>
            {items.map((item) => (
                <TodoItem key={item.id} text={item.text} completed={item.completed} onToggle={() => onToggle(item.id)} />
            ))}
        </ul>
    );
}

function TodoForm({ onSubmit }) {
    const [text, setText] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(text);
        setText('');
    }

    function handleChange(event) {
        setText(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    );
}

function FilterButtons({ filter, onFilterChange }) {
    return (
        <div>
            <button onClick={() => onFilterChange('all')} style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}>
                All
            </button>
            <button onClick={() => onFilterChange('completed')} style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}>
                Completed
            </button>
            <button onClick={() => onFilterChange('active')} style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}>
                To-Do
            </button>
        </div>
    );
}

function TodoApp() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');

    function handleToggle(id) {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed };
                } else {
                    return item;
                }
            })
        );
    }

    function handleAdd(text) {
        setItems((prevItems) => [...prevItems, { id: Date.now(), text, completed: false }]);
    }

    function handleRemove(id) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    function handleToggleAll() {
        setItems((prevItems) =>
            prevItems.map((item) => {
                return { ...item, completed: true };
            })
        );
    }

    function handleResetCompleted() {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.completed) {
                    return { ...item, completed: false };
                } else {
                    return item;
                }
            })
        );
    }

    function handleFilterChange(filter) {
        setFilter(filter);
    }

    const filteredItems = items.filter((item) => {
        if (filter === 'completed') {
            return item.completed;
        } else if (filter === 'active') {
            return !item.completed;
        } else {
            return true;
        }
    });

    const remainingCount = items.filter((item) => !item.completed).length;

    return (
        <div>
            <h1>To-Do List</h1>
            <TodoForm onSubmit={handleAdd} />
            <FilterButtons filter={filter} onFilterChange={handleFilterChange} />
            <button onClick={handleToggleAll}>Completed All</button>
            <button onClick={handleResetCompleted}>Reset Completed</button>
            <p>{remainingCount} items remaining</p>
            <TodoList items={filteredItems} onToggle={handleToggle} />
        </div>
    );
}

export default TodoApp;
