import React from "react";
import { withRouter } from "react-router-dom";

//import { UserSession } from 'blockstack';
import { UserSession } from '@stacks/auth';
import { Storage } from '@stacks/storage'

import {username_new} from '../../../../actions/userActions'

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: new UserSession(),
      username: '',
      user: {}
    }
  }

  componentDidMount() {
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
      this.setState({username })
    }
    const {identityAddress} = userSession.loadUserData();
    this.setState({ identityAddress })
  }

  signOut = () => {
    const { userSession } = this.state;
    userSession.signUserOut();
    window.location = '/'
    //const path = '/logout'
    //this.props.history.push(path);

  }

  render() {

    return (

        <div className="text-center"
             onClick={this.signOut}
             style={{marginLeft:30, marginTop:11, maxWidth: "30px"}}
        >
             <strong style={{cursor: 'pointer'}} onClick={this.signOut}><img src="images/logout.png" weight="30" height="30" alt="Logout"/></strong>
        </div>

    );
  }
}

export default withRouter(Logout)
