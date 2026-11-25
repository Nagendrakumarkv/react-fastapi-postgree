import { useState, type FormEvent } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {

  const [title, setTitle] = useState('');

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask(trimmedTitle);

    setTitle('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a new task..."
        maxLength={120}
      />

      <button type="submit" disabled={!title.trim()}>
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;