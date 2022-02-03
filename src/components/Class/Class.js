import React from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ItemGrid from "../ItemGrid/ItemGrid";
import Navtabs from "../Tabs/Navtabs";
import axios from "axios";

export function withRouter(Children) {
  return (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return <Children {...props} searchParams={searchParams} />;
  };
}

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: this.props.searchParams.get("name").toLowerCase(),
      spec: this.props.searchParams.get("spec").toLowerCase(),
      specs: [],
    };
  }

  componentDidMount() {
    this.getSpecs(this.state.className);
  }

  componentDidUpdate(prevProps) {
    const className = this.props.searchParams.get("name").toLowerCase();
    const spec = this.props.searchParams.get("spec").toLowerCase();
    if (this.props.searchParams !== prevProps.searchParams) {
      this.setState({
        className: className,
        spec: spec,
      });
      this.getSpecs(className);
    }
  }

  getSpecs = (className) => {
    axios
      .get(`/api/specs/${className}`)
      .then((res) => {
        if (res.data) {
          this.setState({ specs: res.data.specs });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <div>
          Class Component for {this.state.className} for spec {this.state.spec}
          {this.state.specs ? <Navtabs specs={this.state.specs} /> : null}
          <ItemGrid class={this.state.className} spec={this.state.spec} />
        </div>
      </Container>
    );
  }
}

Class.propTypes = {};

Class.defaultProps = {};

export default withRouter(Class);
