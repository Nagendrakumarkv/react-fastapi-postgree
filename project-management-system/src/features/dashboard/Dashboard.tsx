import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';

import type {
  Task,
  TaskStatus,
  TaskFilter
} from '../../types/task';

import useDebounce from '../../hooks/useDebounce';

import StatCard from '../../components/dashboard/StatCard';
import TaskForm from '../../components/dashboard/TaskForm';
import TaskList from '../../components/dashboard/TaskList';
import TaskSearch from '../../components/dashboard/TaskSearch';

// Initial demo tasks
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
  },
  {
    id: 'task-4',
    title: 'Implement authentication',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

function Dashboard() {

  // 1. Task state
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // 2. Status filter
  const [filter, setFilter] = useState<TaskFilter>('All');

  // 3. Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // 4. Debounced search value
  const debouncedSearch = useDebounce(searchTerm, 500);

  // 5. Update browser title
  useEffect(() => {

    document.title =
      `ProjectHub | ${tasks.length} Tasks`;

  }, [tasks.length]);

  // 6. Add task
  const handleAddTask = useCallback((title: string) => {

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

  }, []);

  // 7. Update task status
  const handleStatusChange = useCallback((
    id: string,
    status: TaskStatus
  ) => {

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );

  }, []);

  // 8. Delete task
  const handleDeleteTask = useCallback((id: string) => {

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

  }, []);

  // 9. Calculate statistics using useMemo
  const statistics = useMemo(() => {

    return {
      total: tasks.length,

      completed: tasks.filter(
        (task) => task.status === 'Completed'
      ).length,

      active: tasks.filter(
        (task) => task.status === 'In Progress'
      ).length,

      pending: tasks.filter(
        (task) => task.status === 'Pending'
      ).length
    };

  }, [tasks]);

  // 10. Filter tasks using useMemo
  const filteredTasks = useMemo(() => {

    const normalizedSearch = debouncedSearch
      .trim()
      .toLowerCase();

    return tasks.filter((task) => {

      const matchesStatus =
        filter === 'All' || task.status === filter;

      const matchesSearch =
        task.title.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;

    });

  }, [tasks, filter, debouncedSearch]);

  // 11. Update search value
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <main className="dashboard">

      <div className="dashboard-heading">
        <h1>Dashboard Overview</h1>
        <p>Manage and track your team's tasks.</p>
      </div>

      {/* Dashboard statistics */}

      <div className="stats-grid">

        <StatCard
          title="Total Tasks"
          value={statistics.total}
          description="All assigned tasks"
        />

        <StatCard
          title="In Progress"
          value={statistics.active}
          description="Currently working"
        />

        <StatCard
          title="Completed"
          value={statistics.completed}
          description="Successfully completed"
        />

        <StatCard
          title="Pending"
          value={statistics.pending}
          description="Waiting to start"
        />

      </div>

      {/* Task management */}

      <section className="task-section">

        <div className="task-heading">
          <h2>Task Management</h2>
          <p>Create, search and manage tasks.</p>
        </div>

        {/* Create task */}

        <TaskForm onAddTask={handleAddTask} />

        {/* Search tasks */}

        <TaskSearch
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Filter tasks */}

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

        {/* Display tasks */}

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