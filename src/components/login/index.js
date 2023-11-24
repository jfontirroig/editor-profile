import React, { Component } from 'react';
import { Card, Content } from 'react-bulma-components';
import { Table } from 'reactstrap';
import axios from 'axios';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Collapse,
    Tooltip,
    Button,
} from "shards-react";

import Loader from '../loader'

//translate
import { FormattedMessage } from 'react-intl';

import Signin from './signin'

import './stylelanding.css';

const API = 'https://core.blockstack.org/v1/node/ping'

class Login extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);

        this.state = {
            open: false,
            loadingUser: false,
            status: '',
            dataping: null,
            isLoading: false,
            error: null,
            detail: false,
            colorX: 'white',
            youtubeX: false,
        }
    }

    componentDidMount() {
        axios.get(API)
            .then(result => {
                this.setState({
                    dataping: result,
                    status: result.status,
                    isLoading: true
                })
            })
            .catch(error => {
                this.setState({
                    error,
                    isLoading: false
                })
            });
    }

    toggleNavbar() {
        this.setState({
            ...this.state,
            ...{
                collapseOpen: !this.state.collapseOpen
            }
        });
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    signIn = (e) => {

        const { userSession } = this.props

        e.preventDefault()
        //userSession.redirectToSignIn()
        this.setState({ loadingUser: true })
    }

    detail = (e) => {
      this.setState({ detail: !this.state.detail })
    }

    back = (e) => {
      if (this.props.language === 'es'){
        window.location = 'https://welcome.xck.app'
      }else{
        window.location = 'https://welcome.xck.app/english'
      }
    }

    onMouseEnterHandler = () => {
      this.setState({ colorX: 'orange' })
    }

    onMouseLeaveHandler = () => {
      this.setState({ colorX: 'white' })
    }

    displayButtonsTabRed(){
    }

    videoYoutube =(e) => {
      e.preventDefault()
      this.setState({ youtubeX: !this.state.youtubeX })
    }

    render() {
        const { loadingUser } = this.state;
        const detailX = this.state.detail
        let urlImg = 'images/background_profile.png'

        let originWelcome = false
        const originWelcomeX = localStorage.getItem('landingPage')
        if (originWelcomeX === 'Yes'){
          originWelcome = true
        }

        return (
            <>
                  <div className="bienvenidos bg-fondosection1">
                      <div id='body'>
                          <div className="section slider bg-fondologin" >
                              <div className="container">
                                  <div className="row">
                                     <div className="col-lg-12 m-auto">
                                          <div><img src="images/isotipo2.png" height="110" alt="" /></div>
                                          <br /><br />
                                          <div className="block">
                                              <br />
                                              <Button
                                                outline pill
                                                theme="light"
                                                id="TooltipBlockstack"
                                                style={{ color: 'orange', width: 300, height: 60, marginBottom: 10,textTransform: 'uppercase' }}
                                                onClick={e=>this.signIn(e)}><FormattedMessage id="login.detail3" />
                                              </Button>
                                              <h6>
                                                <a
                                                  onMouseEnter={()=>this.onMouseEnterHandler()}
                                                  onMouseLeave={()=>this.onMouseLeaveHandler()}
                                                  style={{color: this.state.colorX}}
                                                  href="https://domains.paradigma.global" target="_blank" rel="noopener noreferrer"><FormattedMessage id="profile.claim" />
                                                </a>
                                              </h6>
                                              <br />
                                              <br />
                                              <br />
                                              <br />
                                          </div>
                                     </div>
                                     <br /><br />
                                  </div>
                              </div>
                          </div>
                          <br></br>

                  </div>
              </div>
              { loadingUser ? <Signin language={this.props.language}/> : null }
           </>
        );
    }
}

export default Login;
