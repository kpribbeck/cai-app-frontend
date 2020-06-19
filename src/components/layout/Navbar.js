import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import { logout, authUserService } from "../../requests/UserRequests";

export const Navbar = ({ history }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
  }, []);

  const handleLogout = () => {
    logout();
    history.push("/log-in");
  };

  // this variable should hold links to users only
  // such as "New Story" "New Event"
  const authLinks = (
    <div>
      <li>
        <a href="/">Noticias</a>
      </li>
      <li>
        <a href="/events">Eventos</a>
      </li>
      <li>
        <a href="/proyects">Proyectos</a>
      </li>
      <li>
        <div className="dropdown">
          <div className="dropbtn">Venta y Servicios</div>
          <div className="dropdown-content">
            <a href="/objects">Ventas</a>
            <a href="/loans">Préstamos</a>
            <a href="/lost-founds">Cosas Perdidas</a>
          </div>
        </div>
      </li>
      <li style={{ float: "right" }}>
        <a id="li-image" href="/profile">
          {user && user.user.picture !== "" ? <img id="profile-pic" src={user.user.picture} /> : "Perfil"}
        </a>
      </li>
      <li style={{ float: "right" }}>
        <a onClick={handleLogout}>Log out</a>
      </li>
      <li style={{ float: "right" }}>
        <div className="dropdown">
          <div className="dropbtn">Nuevo</div>
          <div className="dropdown-content">
            <a href="/stories/new">Noticia</a>
            <a href="/events/new">Evento</a>
            <a href="/proyects/new">Proyecto</a>
            <a href="/objects/new">Objeto</a>
            <a href="/lost-founds/new">Objeto Perdido</a>
          </div>
        </div>
      </li>
      {user && user.user.is_admin === 1 && (
        <li style={{ float: "right" }}>
          <div className="dropdown">
            <div className="dropbtn">Solicitudes</div>
            <div className="dropdown-content">
              <a href="/users/requests/pending">Pendientes</a>
              <a href="/users/requests/rejected">Rechazadas</a>
            </div>
          </div>
        </li>
      )}
      {user && user.user.is_admin === 1 && (
        <li style={{ float: "right" }}>
          <a href="/users">Usuarios</a>
        </li>
      )}
    </div>
  );

  const guestLinks = (
    <div>
      <li>
        <a href="/">Noticias</a>
      </li>
      <li>
        <a href="/events">Eventos</a>
      </li>
      <li>
        <a href="/proyects">Proyectos</a>
      </li>
      <li>
        <div className="dropdown">
          <div className="dropbtn">Venta y Servicios</div>
          <div className="dropdown-content">
            <a href="/objects">Ventas</a>
            <a href="/loans">Préstamos</a>
            <a href="/lost-founds">Cosas Perdidas</a>
          </div>
        </div>
      </li>
      <li style={{ float: "right" }}>
        <a href="/sign-up">Registrarse</a>
      </li>
      <li style={{ float: "right" }}>
        <a href="/log-in">Ingresar</a>
      </li>
    </div>
  );

  return (
    <div>
      <ul>
        <li>
          <a href="/">CaiApp</a>
        </li>
        {user ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
