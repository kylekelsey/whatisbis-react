import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";

class Header extends React.Component {
  state = {
    classes: [],
  };
  componentDidMount() {
    this.getClasses();
  }

  getClasses = () => {
    axios
      .get("/api/classes")
      .then((res) => {
        if (res.data) {
          this.setState({
            classes: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">WhatIsBis</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdownMenu title="Class" id="basic-nav-dropdown">
                  {this.state.classes.map((cl) => {
                    return (
                      <DropdownSubmenu
                        as={Link}
                        title={this.capitalizeFirstLetter(cl.name)}
                        key={cl.name + "-container"}
                        style={{ color: cl.color }}
                      >
                        {cl.specs.map((spec) => {
                          return (
                            <NavDropdown.Item
                              as={Link}
                              to={`/class?name=${cl.name.toLowerCase()}&spec=${spec.toLowerCase()}`}
                              state={cl.specs}
                              key={cl.name + spec}
                            >
                              {spec}
                            </NavDropdown.Item>
                          );
                        })}
                      </DropdownSubmenu>
                    );
                  })}
                </NavDropdownMenu>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
