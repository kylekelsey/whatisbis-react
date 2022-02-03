import React from "react";
import { TBC_BASE_URL } from "../../constants/constants";
import { Buffer } from "buffer";
import { Card, Row, Col } from "react-bootstrap";

class Item extends React.Component {
  render() {
    const item = this.props.item;
    const img = Buffer.from(this.props.item.icon.binary.data, "base64");
    return (
      item && (
        <div>
          <Card bg="dark">
            <Row>
              <a
                className={item.rarity}
                href={TBC_BASE_URL + item.wowheadId}
                data-wowhead={item.modifiers}
                style={{ textDecoration: "none" }}
              >
                <Col>
                  <img src={`data:image/png;base64,${img}`} />
                </Col>
                <Col> {item.name}</Col>
              </a>
            </Row>
          </Card>
        </div>
      )
    );
  }
}

Item.propTypes = {};

Item.defaultProps = {};

export default Item;
