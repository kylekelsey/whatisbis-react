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
      setPieces: [],
      class: "",
      spec: "",
      icon: "",
      rarity: "",
      setPieceTemp: "",
      gemNameTemp: "",
      gemIconTemp: "",
      gemWowheadIdTemp: "",
      isEnchanted: false,
      isGemmed: false,
      classes: [],
      specs: [],
    };
  }

  componentDidMount() {
    this.getClasses();
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

  getClasses = () => {
    axios
      .get("/api/classes")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          this.setState({
            classes: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  getSpecs = (event) => {
    this.state.classes.forEach((className) => {
      if (className.name === event.target.value) {
        this.setState({ specs: className.specs });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.saveItem(this.state);
  };

  handleItemChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setTemporarySetPieces = (event) => {
    this.setState({ setPieceTemp: event.target.value });
  };

  handleSetPieceChange = () => {
    this.setState({
      setPieces: [...this.state.setPieces, this.state.setPieceTemp],
      setPieceTemp: "",
    });
  };

  getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  handleFileInputChange = (e) => {
    console.log(e);
    this.getBase64(e.target.files[0])
      .then((result) => {
        this.setState({
          icon: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEnchantChange = (event) => {
    if (event.target.name === "binary") {
      this.setState({
        enchant: {
          ...this.state.enchant,
          binary: Buffer.from(event.target.value, "base64"),
        },
      });
    } else {
      this.setState({
        enchant: {
          ...this.state.enchant,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  handleGemNameChange = (event) => {
    this.setState({ gemNameTemp: event.target.value });
  };
  handleGemIconChange = (event) => {
    this.setState({ gemIconTemp: Buffer.from(event.target.value, "base64") });
  };
  handleGemWowheadIdChange = (event) => {
    this.setState({ gemWowheadIdTemp: event.target.value });
  };

  handleAddGem = () => {
    this.setState({
      gems: [
        ...this.state.gems,
        {
          name: this.state.gemNameTemp,
          icon: this.state.gemIconTemp,
          wowheadId: this.state.gemWowheadIdTemp,
        },
      ],
      gemNameTemp: "",
      gemIconTemp: "",
      gemWowheadIdTemp: "",
    });
  };

  setIsGemmed = (event) => {
    if (event.target.checked) {
      this.setState({ isGemmed: event.target.checked, gems: [] });
    } else {
      this.setState({ isGemmed: event.target.checked, gems: undefined });
    }
  };

  setIsEnchanted = (event) => {
    if (event.target.checked) {
      this.setState({ isEnchanted: event.target.checked, enchant: {} });
    } else {
      this.setState({ isEnchanted: event.target.checked, enchant: undefined });
    }
  };

  handleClassChange = (event) => {
    this.setState({ class: event.target.value });
  };

  handleSpecChange = (event) => {
    this.setState({ spec: event.target.value });
  };

  render() {
    return (
      <div>
        <br />
        <Container>
          <Row>
            <Col xl={4}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="form">
                  <input
                    onChange={this.setIsEnchanted}
                    checked={this.state.isEnchanted}
                    type="checkbox"
                  />
                  <label>Enchanted?</label>
                  <br />
                  <input
                    onChange={this.setIsGemmed}
                    checked={this.state.isGemmed}
                    type="checkbox"
                  />
                  <label>Gems?</label>
                  <br />
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleItemChange}
                    name="name"
                  />
                  <Form.Label>wowheadId</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleItemChange}
                    name="wowheadId"
                  />
                  <Form.Label>setPieces</Form.Label>
                  <br />
                  <textarea
                    readOnly
                    value={this.state.setPieces.join(",")}
                  ></textarea>
                  <br />
                  <Form.Control
                    type="text"
                    name="setPieces"
                    onChange={this.setTemporarySetPieces}
                  />
                  <br />
                  <Button onClick={this.handleSetPieceChange}>Add</Button>
                  <br />
                  <Form.Label>class</Form.Label>
                  <Form.Select
                    type="select"
                    onChange={(e) => {
                      this.getSpecs(e);
                      this.handleClassChange(e);
                    }}
                    name="class"
                  >
                    {this.state.classes.map((className) => {
                      return (
                        <option key={className.name}>{className.name}</option>
                      );
                    })}
                  </Form.Select>
                  <Form.Label>spec</Form.Label>
                  <Form.Select
                    type="select"
                    onChange={this.handleSpecChange}
                    name="spec"
                  >
                    {this.state.specs.map((spec) => {
                      return <option key={spec}>{spec}</option>;
                    })}
                  </Form.Select>
                  <Form.Label>icon</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={this.handleFileInputChange}
                    name="icon"
                  />
                  <Form.Label>rarity</Form.Label>
                  <Form.Select
                    type="select"
                    onChange={this.handleItemChange}
                    name="rarity"
                  >
                    <option>q4</option>
                    <option>q3</option>
                  </Form.Select>
                  {this.state.isEnchanted ? (
                    <React.Fragment>
                      <Form.Label> enchant name</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={this.handleEnchantChange}
                        name="name"
                      />
                      <Form.Label> enchant icon</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={this.handleEnchantChange}
                        name="icon"
                      />
                      <Form.Label> enchant wowheadId</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={this.handleEnchantChange}
                        name="wowheadId"
                      />

                      <Form.Label> enchant spell</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={this.handleEnchantChange}
                        name="enchantSpell"
                      />
                    </React.Fragment>
                  ) : null}
                  {this.state.isGemmed ? (
                    <React.Fragment>
                      <Form.Label> gem name</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={this.handleGemNameChange}
                        name="name"
                      />
                      <Form.Label> gem icon</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={this.handleGemIconChange}
                        name="icon"
                      />
                      <Form.Label> gem wowheadId</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={this.handleGemWowheadIdChange}
                        name="wowheadId"
                      />
                      <textarea
                        readOnly
                        value={JSON.stringify(this.state.gems)}
                      ></textarea>
                      <Button onClick={this.handleAddGem}>Add</Button>
                    </React.Fragment>
                  ) : null}
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
