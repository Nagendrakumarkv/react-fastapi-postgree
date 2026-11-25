import { useState } from 'react';

import type {
  Task,
  TaskStatus,
  TaskFilter
} from '../../types/task';

import StatCard from '../../components/dashboard/StatCard';
import TaskForm from '../../components/dashboard/TaskForm';
import TaskList from '../../components/dashboard/TaskList';

// Temporary demo data.
// We'll replace this with FastAPI data on Day 6.
const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Develop login page',
    status: 'Completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Build dashboard UI',
    status: 'In Progress',
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Integrate REST APIs',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

function Dashboard() {

  // Main task state
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Current task filter
  const [filter, setFilter] = useState<TaskFilter>('All');

  // Add new task
  function handleAddTask(title: string) {

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks
    ]);
  }

  // Update task status
  function handleStatusChange(
    id: string,
    status: TaskStatus
  ) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  }

  // Delete task
  function handleDeleteTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  // Calculate dashboard statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length;

  const activeTasks = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pending'
  ).length;

  // Filter tasks based on selected status
  const filteredTasks = tasks.filter((task) =>
    filter === 'All' || task.status === filter
  );

  return (
    <main className="dashboard">

      <div className="dashboard-heading">
        <h1>Dashboard Overview</h1>
        <p>Manage and track your team's tasks.</p>
      </div>

      {/* Dashboard Statistics */}

      <div className="stats-grid">

        <StatCard
          title="Total Tasks"
          value={totalTasks}
          description="All assigned tasks"
        />

        <StatCard
          title="In Progress"
          value={activeTasks}
          description="Currently working"
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          description="Successfully completed"
        />

        <StatCard
          title="Pending"
          value={pendingTasks}
          description="Waiting to start"
        />

      </div>

      {/* Task Management */}

      <section className="task-section">

        <div className="task-heading">
          <div>
            <h2>Task Management</h2>
            <p>Create and manage your tasks.</p>
          </div>
        </div>

        <TaskForm onAddTask={handleAddTask} />

        {/* Task Filters */}

        <div className="task-filters">

          {(['All', 'Pending', 'In Progress', 'Completed'] as const)
            .map((status) => (

              <button
                key={status}
                type="button"
                className={
                  filter === status
                    ? 'filter-button active'
                    : 'filter-button'
                }
                onClick={() => setFilter(status)}
              >
                {status}
              </button>

            ))}

        </div>

        {/* Task List */}

        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />

      </section>

    </main>
  );
}

export default Dashboard;