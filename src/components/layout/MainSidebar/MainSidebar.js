import React from "react";
import PropTypes from "prop-types";
import { Col } from "shards-react";

import MainNavbar from "../MainNavbar/MainNavbar";
import MainFooter from "../Footer/MainFooter";

class MainSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, noNavbar, noFooter } = this.props
    return (
      <React.Fragment>
            <Col className="main-content p-0"
                 style={ this.props.colorDark ? { backgroundColor:'#180b2a'} : {}}
                 lg={{ size: 12, offset: 0 }}
                 md={{ size: 12, offset: 0 }}
                 sm="12"
                 tag="main">
              {!noNavbar && <MainNavbar colorDark={this.props.colorDark} />}
              {children}
              {!noFooter && <MainFooter colorDark={this.props.colorDark} />}
            </Col>
      </React.Fragment>
    );
  }
}

MainSidebar.propTypes = {
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

export default MainSidebar;
