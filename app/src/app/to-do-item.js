export function TodoItem({ item, onToggle, onRemove }) {
    const handleToggle = () => {
      onToggle(item.id);
    };
  
    const handleRemove = () => {
      onRemove(item.id);
    };
  
    return (
      <div className={styles.todoItem}>
        <input type="checkbox" checked={item.completed} onChange={handleToggle} />
        <span className={item.completed ? styles.completed : ''}>{item.text}</span>
        <button onClick={handleRemove}>Remove</button>
      </div>
    );
  }
