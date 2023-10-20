export default function TodoList({ items, filter }) {
  // Initialize the state with the provided items; initially, it's not filtered.
  const [filteredItems, setFilteredItems] = useState(items);

  // Function to toggle the completed status of a todo item by its id.
  const handleToggle = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    // Set the filtered items to the updated items after toggling.
    setFilteredItems(updatedItems);
  };

  // Function to remove a todo item by its id.
  const handleRemove = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    // Set the filtered items to the updated items after removal.
    setFilteredItems(updatedItems);
  };

  // Function to handle filtering based on the "status" (All, Completed, To-Do).
  const handleFilter = (status) => {
    if (status === "All") {
      // If "All" is selected, show all items.
      setFilteredItems(items);
    } else if (status === "Completed") {
      // If "Completed" is selected, filter and show completed items.
      const completedItems = items.filter((item) => item.completed);
      setFilteredItems(completedItems);
    } else if (status === "To-Do") {
      // If "To-Do" is selected, filter and show uncompleted items.
      const activeItems = items.filter((item) => !item.completed);
      setFilteredItems(activeItems);
    }
  };

  // Inner component to render an individual todo item.
  function TodoItem({ item, onToggle, onRemove }) {
    const handleToggle = () => {
      onToggle(item.id);
    };

    const handleRemove = () => {
      onRemove(item.id);
    };

    return (
      <div className="{styles.todoItem}">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleToggle}
        />
        <span className={item.completed ? styles.completed : ""}>
          {item.text}
        </span>
        <button onClick={handleRemove}>Remove</button>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="filter-buttons">
        {/* Buttons to filter items based on "All," "Completed," or "To-Do." */}
        <button onClick={() => handleFilter("All")}>All</button>
        <button onClick={() => handleFilter("Completed")}>Completed</button>
        <button onClick={() => handleFilter("To-Do")}>To-Do</button>
      </div>
      {/* Map and render the filtered items using the TodoItem component. */}
      {filteredItems.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}
