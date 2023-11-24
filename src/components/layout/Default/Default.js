import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row } from "shards-react";

import MainSidebar from "../MainSidebar/MainSidebar";

class DefaultLayout extends Component {
    constructor(props) {
      super(props);

      this.state = {
        colorDark: false,
      };
    }

    UNSAFE_componentWillMount() {
      let colorThemeX = 'Blue'
      if (localStorage["colorTheme"]) {
        colorThemeX = localStorage.getItem('colorTheme')
        if (colorThemeX === 'Dark') {
           this.setState({colorDark: true})
        }
      }
    }

    render() {
        const { children, noNavbar, noFooter } = this.props
        return (
          <Container fluid style={ this.state.colorDark ? { backgroundColor:'#060a0f'} : {}}>
            <Row>
                <MainSidebar children={children} noNavbar={noNavbar} noFooter={noFooter} colorDark={this.state.colorDark} />
            </Row>
          </Container>
        )
    }
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default DefaultLayout;
