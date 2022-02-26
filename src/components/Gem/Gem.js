import React from "react";
import { Buffer } from "buffer";
import { TBC_BASE_URL } from "../../constants/constants";

class Gem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: Buffer.from(props.gem.icon.data, "base64"),
      gemId: props.gem.wowheadId,
    };
  }

  render() {
    return (
      <div>
        <br />
        <a
          href={TBC_BASE_URL + "item=" + this.state.gemId}
          data-wowhead={"gems=" + this.state.gemId}
        >
          <img
            style={{ width: "25%" }}
            src={`data:image/png;base64,${this.state.icon}`}
          />
        </a>
      </div>
    );
  }
}

Gem.propTypes = {};

Gem.defaultProps = {};

export default Gem;
