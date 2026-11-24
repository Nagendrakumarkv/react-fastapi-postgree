import StatCard from '../../components/dashboard/StatCard';

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard-heading">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's your project summary.</p>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Projects"
          value={12}
          description="Across all teams"
        />

        <StatCard
          title="Active Tasks"
          value={28}
          description="Currently in progress"
        />

        <StatCard
          title="Completed Tasks"
          value={86}
          description="Successfully completed"
        />

        <StatCard
          title="Team Members"
          value={15}
          description="Working together"
        />

      </div>
    </main>
  );
}

export default Dashboard;