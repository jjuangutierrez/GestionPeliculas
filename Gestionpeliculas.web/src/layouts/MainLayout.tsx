import { Outlet, Link, useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();

  const navLinks = [
    { to: "/generos", label: "Géneros" },
    { to: "/directores", label: "Directores" },
    { to: "/productoras", label: "Productoras" },
    { to: "/tipos", label: "Tipos" },
    { to: "/media", label: "Media" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-xl">
          <Link className="navbar-brand fw-semibold" to="/">
            Gestión de Películas
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navLinks.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <Link
                    className={`nav-link ${
                      location.pathname === to ? "active fw-medium" : ""
                    }`}
                    to={to}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="bg-light min-vh-100 py-4">
        <div className="container-xl">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default MainLayout;