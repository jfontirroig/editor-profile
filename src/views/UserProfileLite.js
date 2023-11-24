import React from "react";
import { Nav, Container, Row, Col, Card } from 'react-bootstrap';

// blockstack
//import { UserSession } from 'blockstack';
import { UserSession } from '@stacks/auth';
import { Person } from '@stacks/profile';
import { Storage } from '@stacks/storage'
import { StacksTestnet, StacksMainnet } from '@stacks/network';

import axios from 'axios';

import { parseZoneFile } from 'zone-file'

import { Base64 } from 'js-base64';

import { FormattedMessage } from 'react-intl';

import {username_new} from '../actions/userActions'

import TituloPagina from "../components/common/TituloPagina";
import UserProfileName from "../components/user-profile-lite/UserProfileName";
import UserProfilePassword from "../components/user-profile-lite/UserProfilePassword";
import UserProfileAboutMe from "../components/user-profile-lite/UserProfileAboutMe";
import UserProfileSocialNetwork from "../components/user-profile-lite/UserProfileSocialNetwork";
import UserProfileEmailTelephone from "../components/user-profile-lite/UserProfileEmailTelephone";
import UserProfileStacksNetwork from "../components/user-profile-lite/UserProfileStacksNetwork";
import UserProfileVCard from "../components/user-profile-lite/UserProfileVCard";

import "../components/contracts/tab.css";
import classnames from 'classnames';

class UserProfileLite extends React.Component {
  constructor() {
    super();

    this.state = {
      userSession: new UserSession(),
      identityAddress: undefined,
      decentralizedID: undefined,
      name: undefined,
      avatar:'',
      avatar2: 'images/avatar.png',
      username: undefined,
      user: {},
      url: 'https://gaia.blockstack.org/hub/',
      url2: 'https://core.blockstack.org/v1/users/',
      url3: 'https://core.blockstack.org/v1/names/',
      url4: 'https://stacks-node-api.mainnet.stacks.co/v1/names/',
      error: undefined,
      exist: false,
      languaje: 'English',
      pubKey: '',
      zonefile_hash: '',
      status: '',
      jsonProfileUser: '',
      stacksNetX: '',
      serverStacksX: '',
      SMS: ' ',
      EMAIL: ' ',
      STX: ' ',
      BTC: ' ',
      KDA: ' ',
      ETH: ' ',
      aboutme: '',
      facebook: '',
      twitter: '',
      youtube: '',
      instagram: '',
      linkedin: '',
      pinterest: '',
      profileWebSite: '',
      smsScope: '',
      smsCountry: '',
      smsPrefix: '',
      emailScope: '',
      applicationsScope: '',
      stxScope: '',
      btcScope: '',
      colorDark: false,
      storageX: '',
      zonefileX: '',
      stxAddress2X: '',
      networkX: '',
      activeTab: '10',
      mode: 'Light',
      modeVcard: 'Active',
      background: '',
      checkedMode: false,
      checkedModeVcard: true,
      checkedModeVcardTelephone: false,
      checkedModeVcardEmail: false,
      checkedModeVcardSocialNetwork: false,
      checkedModeVcardWeb: false,
      checkedModeVcardId: false,
      checkedModeVcardNotes: false,
      profileName: '',
      profilePassword: '',
      settingProfileMode: 'Full',
      profile: '',
    };
  }

  UNSAFE_componentWillMount() {
    const languageX = localStorage.getItem('language')
    if (languageX === undefined || languageX === ''){
      this.setState({ language: 'English' })
    }else{
      this.setState({ language: languageX })
    }
    let colorThemeX = 'Blue'
    if (localStorage["colorTheme"]) {
      colorThemeX = localStorage.getItem('colorTheme')
      if (colorThemeX === 'Dark') {
         this.setState({colorDark: true})
      }
    }
    this.componentDidMount()
  }

  componentDidMount() {
    const {userSession} = this.state
    let stacksNetX = ''
    let serverStacksX = ''
    let networkX = ''
    if (userSession.isUserSignedIn()) {
      const user = userSession.loadUserData()
      if (!localStorage["serverStacks"]) {
        serverStacksX = 'MainNet'
      }else{
        serverStacksX = localStorage.getItem('serverStacks')
      }
      if (serverStacksX === 'MainNet'){
	       stacksNetX =  user.profile.stxAddress.mainnet
         networkX = new StacksMainnet()
      }
      if (serverStacksX === 'TestNet'){
	       stacksNetX =  user.profile.stxAddress.testnet
         networkX = new StacksTestnet()
      }

      this.setState({ user })
      this.setState({ stacksNetX })
      this.setState({ serverStacksX })
      this.setState({ networkX })
    }

    const {identityAddress} = userSession.loadUserData();
    const {decentralizedID} = userSession.loadUserData();
    const {name} = userSession.loadUserData().profile;

    this.setState({ identityAddress, decentralizedID, name })


    const {username} = userSession.loadUserData();
    if (username === '' || username === undefined || username === null){
      username_new(stacksNetX).then(val => this.setState({username: val},()=>{this.getData(val,identityAddress)})) ;
    }else{
      this.setState({ username },()=>{this.getData(username,identityAddress)})
    }
  }

  onMouseEnterHandler = (i) =>{
    this.setState({setItemInfo: i})
  }

  onMouseLeaveHandler = (i) => {
  }


  handleChangeOption(optSearch) {
      this.getData(this.state.username,this.state.identityAddress)
      this.setState({
        selectedConfiguration: optSearch,
        jsonBlockstack: [],
        displayMasterFile: false,
        displayOther: false,
        displayIoTDevice: false,
        displayIoTDevice2: false,
        modifying: false,
      });
      if (optSearch==="NameId"){
        this.setState({activeTab: '1'});
      }
      if (optSearch==="Password"){
        this.setState({activeTab: '7'});
      }
      if (optSearch==="Description"){
        this.setState({activeTab: '2'});
      }
      if (optSearch==="SocialNetwork"){
        this.setState({activeTab: '3'});
      }
      if (optSearch==="EmailPhone"){
        this.setState({activeTab: '4'});
      }
      if (optSearch==="StacksNetwork"){
        this.setState({activeTab: '5'});
      }
      if (optSearch==="Vcard"){
        this.setState({activeTab: '6'});
      }
  }

  getData = (username,identityAddress) => {
    const {userSession} = this.state
    const storage = new Storage({ userSession });
    const options = { decrypt: false, verify: false }
    let zonefile_hash = ''
    let status = ''
    let stxAddress2X = ''
    var nameLookupURL = "https://stacks-node-api.mainnet.stacks.co/v1/names/" + username;
    axios.get(nameLookupURL)
      .then(result => {
        this.setState({zonefile_hash: result.data.zonefile_hash})
        this.setState({status: result.data.status})
        this.setState({stxAddress2X: result.data.address})
        this.setState({STX: result.data.address})
        this.setState({BTC: ''})
        const {zonefile} = result.data
        const zonefile1 = zonefile.split('"')
        const zonefile2 = zonefile1[1]
        const zonefile3 = zonefile2.replace(/\\/g,'')
        const zonefile4 = zonefile3.replace('.json/','.json')
        axios.get(zonefile4)
         .then(result => {
              const jsonBlockstack1 = result.data[0].decodedToken.payload.claim
              this.setState({profile: result.data[0]})
              if (jsonBlockstack1.name !== undefined){this.setState({profileName: jsonBlockstack1.name})}else{this.setState({profileName: ''})}
              if (jsonBlockstack1.accessCode !== undefined){this.setState({profilePassword: jsonBlockstack1.accessCode})}else{this.setState({profilePassword: ''})}
              if (jsonBlockstack1.description !== undefined){this.setState({aboutme: jsonBlockstack1.description})}else{this.setState({aboutme: ''})}

              if (jsonBlockstack1.sameAs !== undefined) {
                this.setState({facebook: jsonBlockstack1.sameAs[0]})
                this.setState({twitter: jsonBlockstack1.sameAs[1]})
                this.setState({youtube: jsonBlockstack1.sameAs[2]})
                this.setState({instagram: jsonBlockstack1.sameAs[3]})
                this.setState({linkedin: jsonBlockstack1.sameAs[4]})
                this.setState({pinterest: jsonBlockstack1.sameAs[5]})
                this.setState({profileWebSite: jsonBlockstack1.sameAs[6]})
              }

              if (jsonBlockstack1.email !== undefined){this.setState({EMAIL: jsonBlockstack1.email})}else{this.setState({EMAIL: ''})}
              if (jsonBlockstack1.telephone !== undefined){this.setState({SMS: jsonBlockstack1.telephone})}else{this.setState({SMS: ''})}
              if (jsonBlockstack1.telephoneCountry !== undefined){this.setState({smsCountry: jsonBlockstack1.telephoneCountry})}else{this.setState({smsCountry: ''})}
              if (jsonBlockstack1.telephonePrefix !== undefined){this.setState({smsPrefix: jsonBlockstack1.telephonePrefix})}else{this.setState({smsPrefix: ''})}

              if (jsonBlockstack1.duns !== undefined){this.setState({applications: jsonBlockstack1.duns})}else{this.setState({applications: ''})}

              if (jsonBlockstack1.potentialAction !== undefined) {
                this.setState({emailScope: jsonBlockstack1.potentialAction[0]})
                this.setState({smsScope: jsonBlockstack1.potentialAction[1]})
                this.setState({applicationsScope: jsonBlockstack1.potentialAction[2]})
                this.setState({stxScope: jsonBlockstack1.potentialAction[3]})
                this.setState({btcScope: jsonBlockstack1.potentialAction[4]})
              }

              if (jsonBlockstack1.contactPoint !== undefined) {
                if (jsonBlockstack1.contactPoint[0] === 'Active'){this.setState({checkedModeVcard: true})}else{this.setState({checkedModeVcard: false})}
                if (jsonBlockstack1.contactPoint[1] === 'true'){this.setState({checkedModeVcardTelephone: true})}else{this.setState({checkedModeVcardTelephone: false})}
                if (jsonBlockstack1.contactPoint[2] === 'true'){this.setState({checkedModeVcardEmail: true})}else{this.setState({checkedModeVcardEmail: false})}
                if (jsonBlockstack1.contactPoint[3] === 'true'){this.setState({checkedModeVcardSocialNetwork: true})}else{this.setState({checkedModeVcardSocialNetwork: false})}
                if (jsonBlockstack1.contactPoint[4] === 'true'){this.setState({checkedModeVcardWeb: true})}else{this.setState({checkedModeVcardWeb: false})}
                if (jsonBlockstack1.contactPoint[5] === 'true'){this.setState({checkedModeVcardId: true})}else{this.setState({checkedModeVcardId: false})}
                if (jsonBlockstack1.contactPoint[6] === 'true'){this.setState({checkedModeVcardNotes: true})}else{this.setState({checkedModeVcardNotes: false})}
              }else{
                this.setState({checkedModeVcard: false})
                this.setState({checkedModeVcardTelephone: false})
                this.setState({checkedModeVcardEmail: false})
                this.setState({checkedModeVcardSocialNetwork: false})
                this.setState({checkedModeVcardWeb: false})
                this.setState({checkedModeVcardId: false})
                this.setState({checkedModeVcardNotes: false})
              }
          })
         .catch(error => {
           console.log(error)
          });
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const avatar2 = 'images/avatar.png'
    let urlImg = 'images/background_profile.png'
    if (this.state.background !== ''){
       urlImg = this.state.background
    }
    let titleX = ''
    let subtitleX = ''
    let languageX = 'en'
    if (this.state.language === 'English'){ titleX = "My Profile"; languageX = 'en'}
    if (this.state.language === 'French'){ titleX = "Profil"; languageX = 'fr' }
    if (this.state.language === 'Spanish'){ titleX = "Mi Perfil"; languageX = 'es' }
    if (this.state.language === 'Portuguese'){ titleX = "Perfil"; languageX = 'pt' }
    if (this.state.language === 'Swedish'){ titleX = "Profil"; languageX = 'sv' }
    if (this.state.language === 'Netherlands'){ titleX = "Profiel"; languageX = 'nl' }
    if (this.state.language === 'Russian'){ titleX = "профайл"; languageX = 'ru' }
    if (this.state.language === 'Japanese'){ titleX = "私のプロフィール"; languageX = 'jp' }
    if (this.state.language === 'Chinese'){ titleX = "我的簡歷"; languageX = 'cn' }
    if (this.state.language === 'German'){ titleX = "Profil"; languageX = 'de' }
    if (this.state.language === 'Italian'){ titleX = "Profilo"; languageX = 'it' }

    let orderProfile1X = false
    let orderProfile2X = false
    let orderProfile3X = false
    let orderProfile4X = false
    let orderProfile5X = false
    let orderProfile6X = false
    let orderProfile7X = false
    if (this.state.activeTab === '1'){orderProfile1X = true}
    if (this.state.activeTab === '2'){orderProfile2X = true}
    if (this.state.activeTab === '3'){orderProfile3X = true}
    if (this.state.activeTab === '4'){orderProfile4X = true}
    if (this.state.activeTab === '5'){orderProfile5X = true}
    if (this.state.activeTab === '6'){orderProfile6X = true}
    if (this.state.activeTab === '7'){orderProfile7X = true}

    return (
        <Container fluid className="main-content-container px-4" style={ this.state.colorDark ? { backgroundColor:'#060a0f'} : {backgroundColor:'#8d949e'}}>
          <Row noGutters className="page-header py-4">
            <TituloPagina title={titleX} subtitle={subtitleX} md="12" className="ml-sm-auto mr-sm-auto" />
          </Row>

          <Card style={ this.state.colorDark ? { backgroundColor:'#0b151d', color: 'White'} : {color: 'Black', backgroundColor:"#F2EACE" }} >
            <Row>
              <Col md="1"></Col>
              <Col md="10">
                <br></br>

                <Nav tabs fill className="myTab" style={ this.state.colorDark ? {backgroundColor:'#0b151d'} : {}}>
                  <Nav.Item>
                    <Nav.Link
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => this.handleChangeOption("NameId")}
                    >
                      <FormattedMessage id="profile.tab.nameid" />
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className={classnames({ active: this.state.activeTab === '7' })}
                      onClick={() => this.handleChangeOption("Password")}
                    >
                      <FormattedMessage id="profile.tab.password" />
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => this.handleChangeOption("Description")}
                    >
                      <FormattedMessage id="profile.tab.description" />
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => this.handleChangeOption("SocialNetwork")}
                    >
                      <FormattedMessage id="profile.tab.socialnetwork" />
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className={classnames({ active: this.state.activeTab === '4' })}
                      onClick={() => this.handleChangeOption("EmailPhone")}
                    >
                      <FormattedMessage id="profile.tab.emailphone" />
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className={classnames({ active: this.state.activeTab === '5' })}
                      onClick={() => this.handleChangeOption("StacksNetwork")}
                    >
                      <FormattedMessage id="profile.tab.stacksnetwork" />
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className={classnames({ active: this.state.activeTab === '6' })}
                      onClick={() => this.handleChangeOption("Vcard")}
                    >
                      <FormattedMessage id="profile.tab.vcard" />
                    </Nav.Link>
                  </Nav.Item>

                </Nav>
              </Col>
              <Col md="1"></Col>
            </Row>
            <Row>&nbsp;</Row>
          </Card>
            <Row>
              <Col lg="2"></Col>
              <Col lg="8">
                {orderProfile1X ?
                  <UserProfileName
                      username={this.state.username}
                      url={this.state.url}
                      identityAddress={this.state.identityAddress}
                      zonefile_hash={this.state.zonefile_hash}
                      person={this.state.person}
                      profileName={this.state.profileName}
                      aboutme={this.state.aboutme}
                      facebook={this.state.facebook}
                      twitter={this.state.twitter}
                      youtube={this.state.youtube}
                      instagram={this.state.instagram}
                      linkedin={this.state.linkedin}
                      pinterest={this.state.pinterest}
                      profileWebSite={this.state.profileWebSite}
                      colorDark={ this.state.colorDark}
                      activeTab={this.state.activeTab}
                      profile={this.state.profile}
                      STX={this.state.stacksNetX}
                      description={this.state.description}
                      networkX={this.state.networkX}
                  />
                : null }
                {orderProfile2X ?
                  <UserProfileAboutMe
                      username={this.state.username}
                      url={this.state.url}
                      identityAddress={this.state.identityAddress}
                      zonefile_hash={this.state.zonefile_hash}
                      person={this.state.person}
                      profileName={this.state.profileName}
                      aboutme={this.state.aboutme}
                      facebook={this.state.facebook}
                      twitter={this.state.twitter}
                      youtube={this.state.youtube}
                      instagram={this.state.instagram}
                      linkedin={this.state.linkedin}
                      pinterest={this.state.pinterest}
                      profileWebSite={this.state.profileWebSite}
                      colorDark={ this.state.colorDark}
                      activeTab={this.state.activeTab}
                      profile={this.state.profile}
                      STX={this.state.stacksNetX}
                      description={this.state.description}
                      networkX={this.state.networkX}
                  />
                : null }
                {orderProfile3X ?
                  <UserProfileSocialNetwork
                      username={this.state.username}
                      url={this.state.url}
                      identityAddress={this.state.identityAddress}
                      zonefile_hash={this.state.zonefile_hash}
                      person={this.state.person}
                      profileName={this.state.profileName}
                      aboutme={this.state.aboutme}
                      facebook={this.state.facebook}
                      twitter={this.state.twitter}
                      youtube={this.state.youtube}
                      instagram={this.state.instagram}
                      linkedin={this.state.linkedin}
                      pinterest={this.state.pinterest}
                      profileWebSite={this.state.profileWebSite}
                      colorDark={ this.state.colorDark}
                      activeTab={this.state.activeTab}
                      profile={this.state.profile}
                      STX={this.state.stacksNetX}
                      description={this.state.description}
                      networkX={this.state.networkX}
                  />
                : null }
                {orderProfile4X ?
                  <UserProfileEmailTelephone
                      username={this.state.username}
                      userSession={this.state.userSession}
                      publicKey={this.state.pubKey}
                      identityAddress={this.state.identityAddress}
                      decentralizedID={this.state.decentralizedID}
                      zonefile_hash={this.state.zonefile_hash}
                      SMS={this.state.SMS}
                      EMAIL={this.state.EMAIL}
                      STX={this.state.stacksNetX}
                      BTC={this.state.BTC}
                      stacksNetX={this.state.stacksNetX}
                      serverStacksX={this.state.serverStacksX}
                      smsScope={this.state.smsScope}
                      emailScope={this.state.emailScope}
                      smsCountry={this.state.smsCountry}
                      smsPrefix={this.state.smsPrefix}
                      stxScope={this.state.stxScope}
                      btcScope={this.state.btcScope}
                      applicationsScope={this.state.applicationsScope}
                      activeTab={this.state.activeTab}
                      mode={this.state.mode}
                      modeVcard={this.state.modeVcard}
                      background={this.state.background}
                      checkedMode={this.state.checkedMode}
                      checkedModeVcard={this.state.checkedModeVcard}
                      checkedModeVcardTelephone={this.state.checkedModeVcardTelephone}
                      checkedModeVcardEmail={this.state.checkedModeVcardEmail}
                      checkedModeVcardSocialNetwork={this.state.checkedModeVcardSocialNetwork}
                      checkedModeVcardWeb={this.state.checkedModeVcardWeb}
                      checkedModeVcardId={this.state.checkedModeVcardId}
                      checkedModeVcardNotes={this.state.checkedModeVcardNotes}
                      settingProfileMode={this.state.settingProfileMode}
                      colorDark={ this.state.colorDark}
                      networkX={this.state.networkX}
                  />
                : null }
                {orderProfile5X ?
                  <UserProfileStacksNetwork
                      username={this.state.username}
                      userSession={this.state.userSession}
                      publicKey={this.state.pubKey}
                      identityAddress={this.state.identityAddress}
                      decentralizedID={this.state.decentralizedID}
                      zonefile_hash={this.state.zonefile_hash}
                      SMS={this.state.SMS}
                      EMAIL={this.state.EMAIL}
                      STX={this.state.stacksNetX}
                      BTC={this.state.BTC}
                      stacksNetX={this.state.stacksNetX}
                      serverStacksX={this.state.serverStacksX}
                      smsScope={this.state.smsScope}
                      emailScope={this.state.emailScope}
                      smsCountry={this.state.smsCountry}
                      smsPrefix={this.state.smsPrefix}
                      stxScope={this.state.stxScope}
                      btcScope={this.state.btcScope}
                      applicationsScope={this.state.applicationsScope}
                      activeTab={this.state.activeTab}
                      mode={this.state.mode}
                      modeVcard={this.state.modeVcard}
                      background={this.state.background}
                      checkedMode={this.state.checkedMode}
                      checkedModeVcard={this.state.checkedModeVcard}
                      checkedModeVcardTelephone={this.state.checkedModeVcardTelephone}
                      checkedModeVcardEmail={this.state.checkedModeVcardEmail}
                      checkedModeVcardSocialNetwork={this.state.checkedModeVcardSocialNetwork}
                      checkedModeVcardWeb={this.state.checkedModeVcardWeb}
                      checkedModeVcardId={this.state.checkedModeVcardId}
                      checkedModeVcardNotes={this.state.checkedModeVcardNotes}
                      settingProfileMode={this.state.settingProfileMode}
                      colorDark={ this.state.colorDark}
                      networkX={this.state.networkX}
                  />
                : null }
                {orderProfile6X ?
                  <UserProfileVCard
                      username={this.state.username}
                      userSession={this.state.userSession}
                      publicKey={this.state.pubKey}
                      identityAddress={this.state.identityAddress}
                      decentralizedID={this.state.decentralizedID}
                      zonefile_hash={this.state.zonefile_hash}
                      SMS={this.state.SMS}
                      EMAIL={this.state.EMAIL}
                      STX={this.state.stacksNetX}
                      BTC={this.state.BTC}
                      stacksNetX={this.state.stacksNetX}
                      serverStacksX={this.state.serverStacksX}
                      smsScope={this.state.smsScope}
                      emailScope={this.state.emailScope}
                      smsCountry={this.state.smsCountry}
                      smsPrefix={this.state.smsPrefix}
                      stxScope={this.state.stxScope}
                      btcScope={this.state.btcScope}
                      applicationsScope={this.state.applicationsScope}
                      activeTab={this.state.activeTab}
                      mode={this.state.mode}
                      modeVcard={this.state.modeVcard}
                      background={this.state.background}
                      checkedMode={this.state.checkedMode}
                      checkedModeVcard={this.state.checkedModeVcard}
                      checkedModeVcardTelephone={this.state.checkedModeVcardTelephone}
                      checkedModeVcardEmail={this.state.checkedModeVcardEmail}
                      checkedModeVcardSocialNetwork={this.state.checkedModeVcardSocialNetwork}
                      checkedModeVcardWeb={this.state.checkedModeVcardWeb}
                      checkedModeVcardId={this.state.checkedModeVcardId}
                      checkedModeVcardNotes={this.state.checkedModeVcardNotes}
                      settingProfileMode={this.state.settingProfileMode}
                      colorDark={ this.state.colorDark}
                      networkX={this.state.networkX}
                  />
                : null }
                {orderProfile7X ?
                  <UserProfilePassword
                      username={this.state.username}
                      url={this.state.url}
                      identityAddress={this.state.identityAddress}
                      zonefile_hash={this.state.zonefile_hash}
                      person={this.state.person}
                      profileName={this.state.profileName}
                      profilePassword={this.state.profilePassword}
                      aboutme={this.state.aboutme}
                      facebook={this.state.facebook}
                      twitter={this.state.twitter}
                      youtube={this.state.youtube}
                      instagram={this.state.instagram}
                      linkedin={this.state.linkedin}
                      pinterest={this.state.pinterest}
                      profileWebSite={this.state.profileWebSite}
                      colorDark={ this.state.colorDark}
                      activeTab={this.state.activeTab}
                      profile={this.state.profile}
                      STX={this.state.stacksNetX}
                      description={this.state.description}
                      networkX={this.state.networkX}
                  />
                : null }
              </Col>
              <Col lg="2"></Col>
            </Row>
        </Container>
    )
  }
};

export default UserProfileLite;
