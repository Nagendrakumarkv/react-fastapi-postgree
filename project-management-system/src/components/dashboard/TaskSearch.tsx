import { useEffect, useRef } from 'react';

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
}

function TaskSearch({
  value,
  onChange
}: TaskSearchProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleClear() {
    onChange('');
    inputRef.current?.focus();
  }

  return (
    <div className="task-search">

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks by title..."
        aria-label="Search tasks by title"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="clear-search"
        >
          Clear
        </button>
      )}

    </div>
  );
}

export default TaskSearch;