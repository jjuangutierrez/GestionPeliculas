import { Outlet, Link, useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();

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

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/generos" ? "active fw-medium" : ""}`}
                  to="/generos"
                >
                  Géneros
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/directores" ? "active fw-medium" : ""}`}
                  to="/directores"
                >
                  Directores
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/productoras" ? "active fw-medium" : ""}`}
                  to="/productoras"
                >
                  Productoras
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/tipos" ? "active fw-medium" : ""}`}
                  to="/tipos"
                >
                  Tipos
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/media" ? "active fw-medium" : ""}`}
                  to="/media"
                >
                  Media
                </Link>
              </li>

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