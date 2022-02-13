import React from "react";
import { Container } from "react-bootstrap";
import { Buffer } from "buffer";
import { TBC_BASE_URL } from "../../constants/constants";

class Enchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: Buffer.from(props.icon.binary.data, "base64"),
      enchantId: props.enchant,
      spellId: props.icon.wowheadId,
    };
  }
  render() {
    return (
      <div>
        <br />
        <Container>
          <a
            // className={this.state.item.rarity}
            href={TBC_BASE_URL + this.state.spellId}
            data-wowhead={"ench=" + this.state.enchantId}
          >
            <img src={`data:image/png;base64,${this.state.icon}`} />
          </a>
        </Container>
      </div>
    );
  }
}

Enchant.propTypes = {};

Enchant.defaultProps = {};

export default Enchant;
