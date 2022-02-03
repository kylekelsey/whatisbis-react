import React from "react";
import { Container } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <div><br/>
        <Container>
          <p>
            This is a React project to display Best in Slot items for Classic
            WoW!
          </p>
        </Container>
      </div>
    );
  }
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
