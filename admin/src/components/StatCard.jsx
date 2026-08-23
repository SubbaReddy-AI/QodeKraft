export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "purple",
  description,
}) {
  return (
    <article className={`stat-card stat-card-${color}`}>
      <div className="stat-card-icon">
        {Icon && <Icon size={24} />}
      </div>

      <div className="stat-card-content">
        <span>{title}</span>
        <strong>{value ?? 0}</strong>
        {description && <small>{description}</small>}
      </div>
    </article>
  );
}