import { useState } from 'react';

// Define a functional component called TodoForm that accepts two props: onSubmit and onAdd.
export default function TodoForm({ onSubmit, onAdd }) {
  // Create a state variable 'text' and a function 'setText' to manage the input text.
  const [text, setText] = useState('');

  // Define a function 'handleSubmit' to handle the form submission.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    onSubmit(text); // Call the 'onSubmit' prop function with the current 'text'.
    setText(''); // Clear the input text after submission.
    onAdd(); // Call the 'onAdd' prop function.
  };

  // Define a function 'handleChange' to update the 'text' state as the input text changes.
  const handleChange = (event) => {
    setText(event.target.value); // Update 'text' with the value of the input field.
  };

  // Render a form element containing an input field and a submit button.
  return (
    <form>
      {/* Input field for entering to-do items with id 'potato' and CSS class 'input-text'. */}
      <input type="text" id="potato" className="input-text" value={text} onChange={handleChange} />
      {/* Button to submit the form. */}
      <button type="submit">Add</button>
    </form>
  );
}
