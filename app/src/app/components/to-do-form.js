import { useState} from 'react';
 
export default function TodoForm({ onSubmit, onAdd }) {
    const [text, setText] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(text);
      setText('');
      onAdd();
    };
  
    const handleChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <form>
        <input type="text" id="potato" className="input-text" value={text} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    );
  }