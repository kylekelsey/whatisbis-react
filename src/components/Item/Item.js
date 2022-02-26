import React from "react";
import { TBC_BASE_URL } from "../../constants/constants";
import { Buffer } from "buffer";
import { Card, Row, Col } from "react-bootstrap";
import Gem from "../Gem/Gem";
import Enchant from "../Enchant/Enchant";
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      itemIcon: Buffer.from(props.item.icon.data, "base64"),
      enchantIcon: props.item.enchantIcon
        ? Buffer.from(props.item.enchantIcon.binary.data, "base64")
        : null,
    };
    console.log(props);
  }

  constructModifierString(item) {
    let modifierString = "";
    let isEnchant = false;
    let isGems = false;
    if (item.enchant) {
      isEnchant = true;
      modifierString += `ench=${item.enchant.enchantSpell}`;
    }
    if (item.gems) {
      isGems = true;
      let gemArray = [];
      item.gems.map((gem) => {
        gemArray.push(gem.wowheadId);
      });

      if (isEnchant) {
        modifierString += "&gems=" + gemArray.join(":");
      } else {
        modifierString += "gems=" + gemArray.join(":");
      }
    }
    if (item.setPieces) {
      if (isEnchant || isGems) {
        modifierString += "&pcs=" + item.setPieces.join(":");
      } else {
        modifierString += "pcs=" + item.setPieces.join(":");
      }
    }
    console.log(modifierString);
    return modifierString;
  }

  render() {
    return (
      this.state.item && (
        <div>
          {/* <Card bg="dark"> */}
          <Row>
            <Col>
              {this.state.item.enchant ? (
                <Enchant enchant={this.state.item.enchant} />
              ) : null}
            </Col>
            <Col>
              <a
                className={this.state.item.rarity}
                href={TBC_BASE_URL + "item=" + this.state.item.wowheadId}
                data-wowhead={this.constructModifierString(this.state.item)}
              >
                <img src={`data:image/png;base64,${this.state.itemIcon}`} />
              </a>
            </Col>
            <Col>
              <a
                className={this.state.item.rarity}
                href={TBC_BASE_URL + "item=" + this.state.item.wowheadId}
                data-wowhead={this.constructModifierString(this.state.item)}
                style={{ textDecoration: "none" }}
              >
                {this.state.item.name}
              </a>
              {this.state.item.gems
                ? this.state.item.gems.map((gem, i) => {
                    return <Gem gem={gem} key={i} />;
                  })
                : null}
            </Col>
          </Row>
          {/* </Card> */}
        </div>
      )
    );
  }
}

Item.propTypes = {};

Item.defaultProps = {};

export default Item;
