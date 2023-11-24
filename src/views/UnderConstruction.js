import React from "react";
import { Container, Button } from "shards-react";
//translate
import { FormattedMessage } from 'react-intl';

const UnderConstruction = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <img src="/images/underconstruction2.png" weight="180" height="180" alt=""/>
        {/*<h3>Under Construction</h3>*/}
        <p><FormattedMessage id="underconstruction.comingsoon" /></p>
        <Button href="/" pill>&larr; <FormattedMessage id="underconstruction.goback" /></Button>
      </div>
    </div>
  </Container>
);

export default UnderConstruction;
