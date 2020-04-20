import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar as BootNavbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { withRouter } from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

  // this variable should hold links to users only
  // such as "New Story" "New Event"
  const authLinks = (
    <Fragment>
        <NavItem>
            <Link to="/" className="nav-link">
                Noticias
            </Link>
        </NavItem>
        <NavItem>
            <Link to="/events" className="nav-link">
                Eventos
            </Link>
        </NavItem>
        <NavItem>
            <Link to="/" className="nav-link">
                Proyectos
            </Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                Venta y Servicios
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                Ventas
                </DropdownItem>
                <DropdownItem>
                Inventario
                </DropdownItem>
                <DropdownItem>
                Cosas Perdidas
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
            <Link to="/" className="nav-link">
                Contáctanos
            </Link>
        </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
        <NavItem>
            <Link to="/" className="nav-link">
                Noticias
            </Link>
        </NavItem>
        <NavItem>
            <Link to="/events" className="nav-link">
                Eventos
            </Link>
        </NavItem>
        <NavItem>
            <Link to="/" className="nav-link">
                Proyectos
            </Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                Venta y Servicios
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                Ventas
                </DropdownItem>
                <DropdownItem>
                Inventario
                </DropdownItem>
                <DropdownItem>
                Cosas Perdidas
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
            <Link to="/" className="nav-link">
                Contáctanos
            </Link>
        </NavItem>
        <NavItem>
            <Link to="/register" className="nav-link">
                <i className="far fa-edit" /> Regístrate
            </Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                Nuevo
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    <Link to="/stories/new" className="nav-link">
                        Noticia
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    Evento
                </DropdownItem>
                <DropdownItem>
                    Proyecto
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </Fragment>
  );

  return (
    <Fragment>
      <BootNavbar
        className="navbar navbar-expand-md navbar-light"
        style={{ backgroundColor: "#ffc107" }}
      >

        <Link to="/" className="navbar-brand">
          CaiApp
        </Link>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <Fragment>{guestLinks} </Fragment>
          </Nav>
        </Collapse>

      </BootNavbar>
    </Fragment>
  );
};

export default withRouter(Navbar);