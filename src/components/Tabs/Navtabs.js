import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

function Navtabs(props) {
  let navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [key, setKey] = useState(
    capitalizeFirstLetter(searchParams.get("spec"))
  );

  useEffect(() => {
    // Update the document title using the browser API
    setKey(searchParams.get("spec"));
  }, [searchParams]);

  function changeSpec(key) {
    setKey(key);
    navigate(
      `${location.pathname}${
        location.search.split("&")[0]
      }&spec=${key.toLowerCase()}`
    );
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => changeSpec(k)}
        className="mb-3"
      >
        {props.specs.map((spec) => {
          return <Tab eventKey={spec} title={spec} key={spec}></Tab>;
        })}
      </Tabs>
      <p>THE ACTIVE TAB is {key}</p>
    </Container>
  );
}

export default Navtabs;
