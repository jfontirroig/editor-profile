import React from "react";
import { withRouter } from "../../actions/withRouter";
import PropTypes from "prop-types";
import {Card,CardHeader,ListGroup,Row,Col,Form,Button,InputGroup} from "react-bootstrap";
import {Divider,Typography,TextField,Grid,Dialog,DialogContent,DialogActions,DialogTitle,DialogContentText,Button as ButtonMaterialUI} from '@material-ui/core';
import { Table } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { UserSession } from '@stacks/auth';
import { Storage } from '@stacks/storage'
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import * as jose from 'jose'
import ImageUploader from 'react-images-upload';
import ReactImageFallback from "react-image-fallback";
import { Base64 } from 'js-base64';
import {updateProfileStacksNetwork} from "../../clarity/clarityfunctions"

const Prefix = require('./CountryDialPhoneCodes.json');

class UserProfileStacksNetwork  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: new UserSession(),
      username: '',
      user: {},
      jsonBlockstack: undefined,
      status: false,
      value: '',
      copied: false,
      prefixX: '',
      smsPrefix: '',
      smsCountry: '',
      dialogOpen: false,
      dialogOpenVcard: false,
      dialogMessage: '',
      dialogTitle: '',
      mode: 'Light',
      modeVcard: 'Active',
      stringModeVcard: 'VCARD Active',
      background: '',
      checkedMode: false,
      checkedModeVcard: true,
      checkedModeVcardTelephone: false,
      checkedModeVcardEmail: false,
      checkedModeVcardSocialNetwork: false,
      checkedModeVcardWeb: false,
      checkedModeVcardId: false,
      checkedModeVcardNotes: false,
      pictures: '',
      profileAvatar: '',
      newavatar: true,
      file64ProfileAvatar: '',
      smsScope: '',
      emailScope: '',
      applicationsScope: '',
      stxScope: '',
      btcScope: '',
    }
  }

  c03STX = React.createRef();
  c03STXScope = React.createRef();
  c03BTC = React.createRef();
  c03BitcoinScope = React.createRef();

  componentDidMount() {
    this.c03STXScope.current.value = this.props.stxScope
    this.c03BitcoinScope.current.value = this.props.btcScope
    this.setState({ prefixX: this.props.smsPrefix, smsPrefix: this.props.smsPrefix, smsCountry: this.props.smsCountry });
    this.setState({ smsScope: this.props.smsScope, emailScope: this.props.emailScope, applicationsScope: this.props.applicationsScope, stxScope: this.props.stxScope, btcScope: this.props.btcScope });
  }

  nuevoProfileNetwork = e => {
    updateProfileStacksNetwork(
           this.props.networkX,
           this.props.storageX,
           this.state.emailScope,
           this.state.smsScope,
           this.state.applicationsScope,
           this.c03STXScope.current.value,
           this.c03BitcoinScope.current.value)
     .then()
  }

  copyText = (e,crypto) => {
    let value=''
    if (crypto==='stx'){if (this.c03STX.current.value.length > 0){value=this.c03STX.current.value}else{value=this.props.STX}}
    if (crypto==='btc'){if (this.c03BTC.current.value.length > 0){value=this.c03BTC.current.value}else{value=this.props.BTC}}
    if (crypto==='kda'){if (this.c04KDA.current.value.length > 0){value=this.c04KDA.current.value}else{value=this.props.KDA}}
    if (crypto==='eth'){if (this.c05ETH.current.value.length > 0){value=this.c05ETH.current.value}else{value=this.props.ETH}}
    this.setState({value})
    return(
      <CopyToClipboard
         text={value}
         onCopy={() => this.setState({copied: true})}>
      </CopyToClipboard>
    )
  }

  copyToClipBoard = async () => {
    let value=this.props.stacksNetX
    try {
      await navigator.clipboard.writeText(value);
      this.setState({copied: true})
    } catch (err) {
      this.setState({copied: false})
    }
  };

  copyToClipBoard2 = async () => {
    let value=this.props.BTC
    if (this.props.BTC === undefined){value= this.props.identityAddress}
    try {
      await navigator.clipboard.writeText(value);
      this.setState({copied: true})
    } catch (err) {
      this.setState({copied: false})
    }
  };

  render() {
    const { userSession } = this.props
    const identityAddress = 'did:btc-addr:'+this.props.identityAddress
    const identityAddressStack = 'did:stack:v2:'+this.props.STX
    const zonefile_hash = this.props.zonefile_hash

    let STX = this.props.stacksNetX
    let BTC = this.props.BTC
    let {KDA} = this.props
    let {ETH} = this.props
    if (STX === undefined){STX=''}
    if (BTC === undefined){BTC= this.props.identityAddress}
    if (KDA === undefined){KDA=''}
    if (ETH === undefined){ETH=''}
    let existSTX = false
    let existBTC = false
    let existKDA = false
    let existETH = false
    if (STX.length > 0){existSTX = true}
    if (BTC.length > 0){existBTC = true}
    if (KDA.length > 0){existKDA = true}
    if (ETH.length > 0){existETH = true}

    let stacksNetX2 = ''
    if (this.props.serverStacksX==='MainNet'){
       stacksNetX2 = 'mainnet'
    }
    if (this.props.serverStacksX==='TestNet'){
       stacksNetX2 = 'testnet'
    }

    let editstxnetwork = true

    return (
      <Card small className="mb-4" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
        <ListGroup flush>
          <ListGroup.Item className="p-3" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* Email Notifications */}
                    <Col md="12" className="form-group">
                      <label htmlFor="feServerSTX" style={ this.props.colorDark ? {color:'#c6c6c6'} : {color:'#1a1a1a'}}><FormattedMessage id="useraccountdetail.serverStacks" /></label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon1">
                            <img src="images/red2.png" weight="30" height="30" alt="" title="STX" />
                        </InputGroup.Text>
                        <Form.Control
                          id="feServerSTX"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                          disabled={true}
                          placeholder={this.props.serverStacksX}
                          aria-describedby="basic-addon2"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row form>
                    {/* STX */}
                    <Col md="12" className="form-group">
                      <label htmlFor="feIdentityAddress" style={ this.props.colorDark ? {color:'#c6c6c6'} : {color:'#1a1a1a'}}><FormattedMessage id="useraccountdetail.addressStacks" /></label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon1">
                          <strong style={{cursor: 'pointer'}}><a href={`https://explorer.stacks.co/address/${STX}/?chain=${stacksNetX2}`} target="_blank" rel="noopener noreferrer">
                              <img src="images/stacks-stx-logo.png" weight="30" height="30" alt="" title="STX" /></a>
                          </strong>
                        </InputGroup.Text>
                        <Form.Control
                          id="feIdentityAddress"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                          ref={this.c03STX}
                          disabled={true}
                          onChange={() => {this.setState({value:'', copied: false})}}
                          placeholder={existSTX ? STX : "STX Address"}
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon3">
                          <strong style={{cursor: 'pointer'}}  onClick={()=>this.copyToClipBoard()}>
                              { this.props.colorDark ?
                                 <img src="images/copypasteGrey.png" weight="25" height="25" alt=""/>
                              :
                                 <img src="images/copypaste.png" weight="25" height="25" alt=""/>
                              }
                          </strong>
                        </InputGroup.Text>
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon4">
                          <Form.Select
                              id="scope"
                              style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                              ref={this.c03STXScope}
                              disabled={!editstxnetwork}
                          >
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Private">Private</option>
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Public">Public</option>
                          </Form.Select>
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row form>
                    {/* STX */}
                    <Col md="12" className="form-group">
                      <label htmlFor="feIdentityAddress" style={ this.props.colorDark ? {color:'#c6c6c6'} : {color:'#1a1a1a'}}><FormattedMessage id="useraccountdetail.addressBitcoin" /></label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon1">
                           <img src="images/bitcoin-btc-logo.png" weight="30" height="30" alt="" title="BTC" />
                        </InputGroup.Text>
                        <Form.Control
                          id="feIdentityAddress"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                          ref={this.c03BTC}
                          disabled={true}
                          onChange={() => {this.setState({value:'', copied: false})}}
                          placeholder={existBTC ? BTC : "BTC Address"}
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon3">
                          <strong style={{cursor: 'pointer'}}  onClick={()=>this.copyToClipBoard2()}>
                              { this.props.colorDark ?
                                 <img src="images/copypasteGrey.png" weight="25" height="25" alt=""/>
                              :
                                 <img src="images/copypaste.png" weight="25" height="25" alt=""/>
                              }
                          </strong>
                        </InputGroup.Text>
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon4">
                          <Form.Select
                              id="scope"
                              style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                              disabled={!editstxnetwork}
                              ref={this.c03BitcoinScope}
                          >
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Private">Private</option>
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Public">Public</option>
                          </Form.Select>
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Button theme="success" onClick={e=>this.nuevoProfileNetwork(e)}><FormattedMessage id="alert.confirm" /></Button>
                </Form>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup flush>
          <ListGroup.Item className="p-4 text-center" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
            <Card small className="mb-4" style={ this.props.colorDark ? { backgroundColor:'#0b151d', opacity: 0.5 } : {opacity: 0.5}}>
              <Row>
                <Col md="1"></Col>
                <Col md="10">
                  <Form>
                    <Row form>
                      <Col md="12" className="form-group text-center">
                      </Col>
                    </Row>
                    <Row form>
                      {/* Identity Address Stack*/}
                      <Col md="12" className="form-group text-center">
                        <label style={{ color: 'grey', fontSize:16 }} htmlFor="feIdentityAddress"><FormattedMessage id="useraccountdetail.identityaddress" /></label>
                        <Form.Control
                          id="feIdentityAddressStack"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color:'white', textAlign: 'center'} : {textAlign: 'center'}}
                          value={identityAddressStack}
                          disabled={true}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Identity Address */}
                      <Col md="12" className="form-group text-center">
                        <label style={{ color: 'grey', fontSize:16 }} htmlFor="feIdentityAddress"><FormattedMessage id="useraccountdetail.identityaddress" /></label>
                        <Form.Control
                          id="feIdentityAddress"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color:'white', textAlign: 'center'} : {textAlign: 'center'}}
                          value={identityAddress}
                          disabled={true}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Hash ZoneFile */}
                      <Col md="12" className="form-group text-center">
                        <label style={{ color: 'grey', fontSize:16 }} htmlFor="feHashZoneFile"><FormattedMessage id="useraccountdetail.hashzoneFile" /></label>
                        <Form.Control
                          id="feHashZoneFile"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color:'white', textAlign: 'center'} : {textAlign: 'center'}}
                          disabled={true}
                          value={zonefile_hash}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md="1"></Col>
              </Row>
            </Card>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }
};

UserProfileStacksNetwork.propTypes = {
  title: PropTypes.string
};

UserProfileStacksNetwork.defaultProps = {
  title: "Account Details"
};

export default withRouter(UserProfileStacksNetwork);
