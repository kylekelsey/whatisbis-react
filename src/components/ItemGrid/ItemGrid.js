import React from "react";
import axios from "axios";
import Item from "../Item/Item";
import { Card, Row, Col, Container } from "react-bootstrap";

class ItemGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getItems(this.props.class, this.props.spec);
  }

  componentDidUpdate(prevProps) {
    if (this.props.spec !== prevProps.spec) {
      this.componentDidMount();
    }
  }

  getItems(className, spec) {
    axios
      .get(`/api/items/${className}/${spec}`)
      .then((res) => {
        if (res.data) {
          this.setState({
            items: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    // return this.state.items.length > 0
    //   ? this.state.items.map((item) => {
    //       return <Item item={item} key={item.wowheadId} />;
    //     })
    //   : null;
    return (
      this.state.items.length > 0 && (
        <Container>
          {Array.from({ length: 2 }).map((_, idx) => {
            if (idx % 2 == 0 || idx == 0) {
              return (
                <Row xs={1} md={3} className="g-4" key={this.state.items[idx].name + "-row"}>
                  <Col key={this.state.items[idx].name + "-col"}>
                    <Card key={this.state.items[idx].name}>
                      <Item
                        item={this.state.items[idx]}
                        key={this.state.items[idx].wowheadId}
                      />
                    </Card>
                  </Col>
                  <Col key={"blank-col" + idx}>
                    <Card key={"blank-card" + idx}></Card>
                  </Col>
                  <Col key={this.state.items[idx + 1].name + "-col"}>
                    <Card key={this.state.items[idx + 1].name}>
                      <Item
                        item={this.state.items[idx + 1]}
                        key={this.state.items[idx + 1].wowheadId}
                      />
                    </Card>
                  </Col>
                </Row>
              );
            }
          })}
        </Container>
      )
    );
  }
}

ItemGrid.propTypes = {};

ItemGrid.defaultProps = {};

export default ItemGrid;
