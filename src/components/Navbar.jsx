import { useAtom } from "jotai";
import { userAtom } from "../states";

export default function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  return (
    <nav className="navbar navbar-expand-lg bg-white ">
      <div className="container-fluid d-flex">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                User Settings
              </a>
            </li>
            {user.admin ? (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Section
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/users">
                      Users
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <></>
            )}

            <li className="nav-item">
              <a className="nav-link" href="#">
                Stats
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
