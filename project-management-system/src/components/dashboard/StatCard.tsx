interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

function StatCard({
  title,
  value,
  description
}: StatCardProps) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>

      <h1>{value}</h1>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;