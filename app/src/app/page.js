"use client";
// Import the 'useState' function from the 'react' library.
import { useState } from "react";

// Import the Bootstrap CSS file to apply Bootstrap styles.
import "bootstrap/dist/css/bootstrap.css";

// Import components for the to-do list, to-do form, and counter.
import TodoList from "./components/to-do-list";
import TodoForm from "./components/to-do-form";
import Counter from "./components/counter";

// Import the global CSS file 'globals.css' to apply global styles.
import "./globals.css";

// Define the main functional component called Home.
export default function Home() {
  // Create state variables 'items' and 'setItems' to manage the to-do list items.
  const [items, setItems] = useState([]);

  // Create state variables 'showItems' and 'setShowItems' to control the visibility of items.
  const [showItems, setShowItems] = useState(false);

  // Create state variables 'view' and 'setView' to manage the view mode (All, Completed, To-Do).
  const [view, setView] = useState("all");

  // Define a function 'handleSubmit' to handle the submission of a new to-do item.
  const handleSubmit = (text) => {
    // Create a new to-do item with a unique ID, text, and initially marked as incomplete.
    const newItem = { id: Date.now(), text, completed: false };
    // Create a new array with the updated items.
    const updatedItems = [...items, newItem];
    console.log(updatedItems); // Log the updated items to the console.
    setItems(updatedItems); // Set the state with the updated items.
    setShowItems(true); // Show the items.
  };

  // Define a function 'handleRemoveCompleted' to remove completed to-do items.
  const handleRemoveCompleted = () => {
    // Filter and keep only the uncompleted to-do items.
    const activeItems = items.filter((item) => !item.completed);
    setItems(activeItems); // Set the state with the uncompleted items.
  };

  // Define a function 'handleToggleAll' to mark all to-do items as completed.
  const handleToggleAll = () => {
    // Map and change the completed status of all to-do items to 'true.'
    const completedItems = items.map((item) => ({ ...item, completed: true }));
    setItems(completedItems); // Set the state with the completed items.
  };

  // Define a function 'handleToggleItem' to toggle the completion status of a specific to-do item by its ID.
  const handleToggleItem = (id) => {
    // Map and update the completion status of the specified to-do item.
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems); // Set the state with the updated items.
  };

  // Define a function 'handleRemoveItem' to remove a specific to-do item by its ID.
  const handleRemoveItem = (id) => {
    // Filter and keep only the to-do items that do not match the specified ID.
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems); // Set the state with the updated items.
  };

  // Define a function 'handleViewChange' to change the view mode (All, Completed, To-Do).
  const handleViewChange = (view) => {
    setView(view); // Set the 'view' state to the selected view mode.
  };

  // Define a function 'getVisibleItems' to filter items based on the selected view mode.
  const getVisibleItems = () => {
    switch (view) {
      case "completed":
        return items.filter((item) => item.completed);
      case "todo":
        return items.filter((item) => !item.completed);
      default:
        return items;
    }
  };

  // Get the visible items based on the selected view mode.
  const visibleItems = getVisibleItems();

  // Render the main content within a 'div' element with the CSS class 'grid'.
  return (
    <div className="grid">
      {/* Render the 'TodoForm' component for adding new items. */}
      <TodoForm onSubmit={handleSubmit} onAdd={() => setShowItems(true)} />
      {/* Render the 'Counter' component to display the count of remaining items. */}
      <Counter items={items} />
      <div>
        {/* Buttons to switch between view modes (All, Completed, To-Do). */}
        <button onClick={() => handleViewChange("all")}>All</button>
        <button onClick={() => handleViewChange("completed")}>Completed</button>
        <button onClick={() => handleViewChange("todo")}>To-Do</button>
      </div>
      {/* Button to mark all items as completed. */}
      <button onClick={handleToggleAll}>Completed All</button>
      {/* Button to remove completed items. */}
      <button onClick={handleRemoveCompleted}>Remove Completed</button>
      {/* Render the 'TodoList' component to display to-do items based on the view. */}
      {visibleItems.length > 0 ? (
        // If there are visible items, render the 'TodoList' component.
        <TodoList
          items={visibleItems}
          onToggle={handleToggleItem}
          onRemove={handleRemoveItem}
        />
      ) : (
        // If there are no visible items, display a message indicating no items to display.
        <p>No items to display.</p>
      )}
    </div>
  );
}
