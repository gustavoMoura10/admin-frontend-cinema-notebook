import "../style/components/Sidebar.css";
export default function Sidebar() {
  return (
    <nav className="aside nav d-flex flex-column bg-white ">
      <a className="nav-link active" aria-current="page" href="#">
        Active
      </a>
      <a className="nav-link" href="#">
        Link
      </a>
      <a className="nav-link" href="#">
        Link
      </a>
      <a className="nav-link disabled" aria-disabled="true">
        Disabled
      </a>
    </nav>
  );
}
