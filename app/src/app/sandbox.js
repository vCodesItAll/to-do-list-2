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
  
    function TodoItem({ item, onToggle, onRemove }) {
      const handleToggle = () => {
        onToggle(item.id);
      };
    
      const handleRemove = () => {
        onRemove(item.id);
      };
    
      return (
        <div className="{styles.todoItem}">
          <input type="checkbox" checked={item.completed} onChange={handleToggle} />
          <span className={item.completed ? styles.completed : ''}>{item.text}</span>
          <button onClick={handleRemove}>Remove</button>
        </div>
      );
    }
  
    return (
      <div className="todo-list">
        <div className="filter-buttons">
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