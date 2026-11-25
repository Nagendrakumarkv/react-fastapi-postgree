import type { Task, TaskStatus } from '../../types/task';

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

function TaskItem({
  task,
  onStatusChange,
  onDelete
}: TaskItemProps) {

  return (
    <div className="task-item">

      <div className="task-details">
        <strong>{task.title}</strong>

        <small>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </small>
      </div>

      <div className="task-actions">

        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(
              task.id,
              event.target.value as TaskStatus
            )
          }
          aria-label={`Status for ${task.title}`}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;