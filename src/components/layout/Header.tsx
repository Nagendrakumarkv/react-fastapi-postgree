interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <h2>{title}</h2>

      <div className="header-user">
        <span>NK</span>
        <div>
          <strong>Nagendra</strong>
          <small>Administrator</small>
        </div>
      </div>
    </header>
  );
}

export default Header;