import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Buffer } from "buffer";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      wowheadId: "",
      enchantment: "",
      setPieces: [],
      class: "",
      spec: "",
      icon: "",
      rarity: "",
      gems: [],
      enchantIcon: { name: "", binary: "", wowheadId: "" },
      temp: "",
    };
  }
  saveItem = (item) => {
    axios
      .post(`/api/items`, item)
      .then((res) => {
        if (res.data) {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.saveItem(this.state);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSetPieceChange = () => {
    this.setState({
      setPieces: [...this.state.setPieces, this.state.temp],
      temp: "",
    });
  };

  setSetPieces = (event) => {
    this.setState({ temp: event.target.value });
  };

  handleIconChange = (event) => {
    this.setState({ icon: Buffer.from(event.target.value, "base64") });
  };

  handleEnchantIconChange = (event) => {
    if (event.target.name === "binary") {
      this.setState({
        enchantIcon: {
          ...this.state.enchantIcon,
          binary: Buffer.from(event.target.value, "base64"),
        },
      });
    } else {
      this.setState({
        enchantIcon: {
          ...this.state.enchantIcon,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  render() {
    return (
      <div>
        <br />
        <Container>
          <Row>
            <Col xl={3}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="form">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    name="name"
                  />
                  <Form.Label>wowheadId</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    name="wowheadId"
                  />
                  <Form.Label>enchantment</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    name="enchantment"
                  />
                  <Form.Label>setPieces</Form.Label>
                  <textarea
                    readOnly
                    value={this.state.setPieces.join(",")}
                  ></textarea>
                  <Form.Control
                    type="text"
                    name="setPieces"
                    onChange={this.setSetPieces}
                  />
                  <Button onClick={this.handleSetPieceChange}>Add</Button>
                  <br />
                  <Form.Label>class</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    name="class"
                  />
                  <Form.Label>spec</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    name="spec"
                  />
                  <Form.Label>icon</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleIconChange}
                    name="icon"
                  />
                  <Form.Label>rarity</Form.Label>
                  <Form.Select
                    type="select"
                    onChange={this.handleChange}
                    name="rarity"
                  >
                    <option>q3</option>
                    <option>q4</option>
                  </Form.Select>
                  <Form.Label> enchantIcon name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleEnchantIconChange}
                    name="name"
                  />
                  <Form.Label> enchantIcon icon</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleEnchantIconChange}
                    name="binary"
                  />
                  <Form.Label> enchantIcon wowheadId</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleEnchantIconChange}
                    name="wowheadId"
                  />
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Admin.propTypes = {};

Admin.defaultProps = {};

export default Admin;
