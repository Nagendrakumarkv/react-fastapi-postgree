const menuItems = [
  'Dashboard',
  'Projects',
  'Tasks',
  'Team Members',
  'Settings'
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">ProjectHub</h2>

      <nav>
        {menuItems.map((item) => (
          <div className="menu-item" key={item}>
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;