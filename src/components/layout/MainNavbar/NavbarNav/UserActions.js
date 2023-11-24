import React from "react";
import { withRouter } from "../../../../actions/withRouter";
import {Nav, NavDropdown, Button, Form, Table} from 'react-bootstrap';
import {username_new} from '../../../../actions/userActions'
import { UserSession } from '@stacks/auth';
import { FormattedMessage } from 'react-intl';

const punycode = require('punycode/');

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userSession: new UserSession(),
      username: '',
      user: {},
      identityAddress: undefined,
      url:'https://gaia.blockstack.org/hub/',
      languaje: 'English',
      imagen: '',
      optionNetwork: '',
    };

  }

  UNSAFE_componentWillMount() {
    const { userSession } = this.state
    let stacksNetX = ''
    let serverStacksX = ''
    if (userSession.isUserSignedIn()) {
      const user = userSession.loadUserData()
      this.setState({ user })
      if (!localStorage["serverStacks"]) {
        serverStacksX = 'MainNet'
      }else{
        serverStacksX = localStorage.getItem('serverStacks')
      }
      if (serverStacksX === 'MainNet'){
         stacksNetX =  user.profile.stxAddress.mainnet
      }
      if (serverStacksX === 'TestNet'){
         stacksNetX =  user.profile.stxAddress.testnet
      }
    }
    const {username} = userSession.loadUserData();
    if (username === '' || username === undefined || username === null){
      username_new(stacksNetX).then(val => this.setState({username: val})) ;
    }else{
      this.setState({ username })
    }
    const {identityAddress} = userSession.loadUserData();
    this.setState({ identityAddress })
    const languageX = localStorage.getItem('language')
    if (languageX === undefined || languageX === ''){
      this.setState({ language: 'English' })
    }else{
      this.setState({ language: languageX })
    }

  }

  signOut = () => {
    const { userSession } = this.state;
    userSession.signUserOut();
    window.location = '/'
  }

  handleChangeMode = (e,colorDark) => {
    if (colorDark){
       localStorage.setItem('colorTheme','Blue')
    }else{
      localStorage.setItem('colorTheme','Dark')
    }
    window.location = '/'
  }

  render() {
    let person = ""
    let avatar = ""
    if (this.state.username !== ''){
       person = this.state.username
    }else{
       if (this.state.username === '' && (this.state.profileName !== '' && this.state.profileName!== null && this.state.profileName !== undefined)) {
         person = this.state.profileName
       }else{
         person = this.state.username
       }
    }

    const personX = punycode.toUnicode(person)

    return (
      <>
        <Nav.Item>
            <NavDropdown title={<span style={ this.props.colorDark ? {color: 'orange', fontSize:16} : {fontSize:16}}>{personX}</span>} id="nav-dropdown" >
              <NavDropdown.Item eventKey="4.1">
                  <div onClick={this.signOut}>
                      <i className="material-icons text-danger">&#xE879;</i><FormattedMessage id="useraction.logout" />
                  </div>
              </NavDropdown.Item>
            </NavDropdown>
        </Nav.Item>
        <Nav.Item>
            <div className="text-center" onClick={e=>this.handleChangeMode(e,this.props.colorDark)} style={{marginLeft:50, marginTop:7, maxWidth: "150px"}}>
              <strong style={{cursor: 'pointer'}}>
                <img src={this.props.iconMode} weight="30" height="30" alt=""/>
              </strong>
            </div>
        </Nav.Item>
      </>
    );
  }
}

export default withRouter(UserActions)
