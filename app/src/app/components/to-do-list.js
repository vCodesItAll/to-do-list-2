import React from 'react';

export default function TodoList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <input type="checkbox" checked={item.completed} />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}
