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
import {updateProfileVCard } from "../../clarity/clarityfunctions"

const Prefix = require('./CountryDialPhoneCodes.json');

class UserProfileVCard  extends React.Component {
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

  componentDidMount() {
    this.setState({ mode: this.props.mode, modeVcard: this.props.modeVcard, background: this.props.background });
    this.setState({ checkedMode: this.props.checkedMode, checkedModeVcard: this.props.checkedModeVcard, checkedModeVcardTelephone: this.props.checkedModeVcardTelephone });
    this.setState({ checkedModeVcardEmail: this.props.checkedModeVcardEmail, checkedModeVcardSocialNetwork: this.props.checkedModeVcardSocialNetwork, checkedModeVcardWeb: this.props.checkedModeVcardWeb });
    this.setState({ checkedModeVcardId: this.props.checkedModeVcardId, checkedModeVcardNotes: this.props.checkedModeVcardNotes });
    if (this.props.modeVcard){
      this.setState({ stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({ stringModeVcard: 'VCARD Inactive'})
    }
  }

  handleDialogVcard = (type, action, mode, telephone, email, socialnetwork, web, id, notes) => {
      if (action === 'confirm') {
        this.setState({ dialogOpenVcard: false });
        this.nuevoVcardProfile(mode,telephone,email,socialnetwork,web,id,notes)
      }
      if (action === 'cancel') {
        this.setState({ dialogOpenVcard: false });
      }
  }

  handleChangeMode = (e,modeX) => {
    if (modeX === false){
       this.setState({mode: 'Dark'})
       this.setState({checkedMode: true});
    }else {
      this.setState({mode: "Light"})
      this.setState({checkedMode: false});
    }
  }

  handleChangeModeVcard = (e,modeX) => {
    e.preventDefault();
    if (modeX === false){
       this.setState({modeVcard: 'Active'})
       this.setState({checkedModeVcard: true});
       this.setState({stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({modeVcard: "Inactive"})
      this.setState({checkedModeVcard: false, checkedModeVcardTelephone: false, checkedModeVcardEmail: false, checkedModeVcardSocialNetwork: false, checkedModeVcardWeb: false, checkedModeVcardId: false, checkedModeVcardNotes: false});
      this.setState({stringModeVcard: 'VCARD Inactive'})
    }
  }

  handleChangeModeVcardTelephone = (e,modeX) => {
    e.preventDefault();
    if (modeX === false){
       this.setState({checkedModeVcardTelephone: true});
       this.setState({modeVcard: 'Active'})
       this.setState({checkedModeVcard: true});
       this.setState({stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({checkedModeVcardTelephone: false});
    }
  }

  handleChangeModeVcardEmail = (e,modeX) => {
    e.preventDefault();
    if (modeX === false){
       this.setState({checkedModeVcardEmail: true});
       this.setState({modeVcard: 'Active'})
       this.setState({checkedModeVcard: true});
       this.setState({stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({checkedModeVcardEmail: false});
    }
  }

  handleChangeModeVcardSocialNetwork = (e,modeX) => {
    e.preventDefault();
    if (modeX === false){
       this.setState({checkedModeVcardSocialNetwork: true});
       this.setState({modeVcard: 'Active'})
       this.setState({checkedModeVcard: true});
       this.setState({stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({checkedModeVcardSocialNetwork: false});
    }
  }

  handleChangeModeVcardWeb = (e,modeX) => {
    e.preventDefault();
    if (modeX === false){
       this.setState({checkedModeVcardWeb: true});
       this.setState({modeVcard: 'Active'})
       this.setState({checkedModeVcard: true});
       this.setState({stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({checkedModeVcardWeb: false});
    }
  }

  handleChangeModeVcardId = (e,modeX) => {
    e.preventDefault();
    if (modeX === false){
       this.setState({checkedModeVcardId: true});
       this.setState({modeVcard: 'Active'})
       this.setState({checkedModeVcard: true});
       this.setState({stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({checkedModeVcardId: false});
    }
  }

  handleChangeModeVcardNotes = (e,modeX) => {
    e.preventDefault();
    if (modeX === false){
       this.setState({checkedModeVcardNotes: true});
       this.setState({modeVcard: 'Active'})
       this.setState({checkedModeVcard: true});
       this.setState({stringModeVcard: 'VCARD Active'})
    }else {
      this.setState({checkedModeVcardNotes: false});
    }
  }

  changeVcardProfile = (e) =>{
    e.preventDefault();
    Promise.all([this.getVcardProfile()])
     .then(
       (resolve) =>{},
       (reject) =>{})
    this.setState({ dialogOpenVcard: true, dialogTitle: 'Vcard' })
  }

  nuevoVcardProfile = (mode,telephone,email,socialnetwork,web,id,notes) =>{
    updateProfileVCard(this.props.networkX,this.props.storageX,mode,telephone,email,socialnetwork,web,id,notes)
     .then()
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

    let stacksNetX2 = ''
    if (this.props.serverStacksX==='MainNet'){
       stacksNetX2 = 'mainnet'
    }
    if (this.props.serverStacksX==='TestNet'){
       stacksNetX2 = 'testnet'
    }

    let editvcard = true

    return (
      <Card small className="mb-4" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
        <ListGroup flush>
          <ListGroup.Item className="p-3" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
            <Row>
              <Col>
                <Row form>
                  <Form>
                    <Col md="1"></Col>
                    <Col md="11">
                      <Table size="sm" className="text-center" responsive borderless style={ this.props.colorDark ? {color:'#c6c6c6'} : {color:'#1a1a1a'}}>
                          <tbody>
                            <tr>
                              <td style={{textAlign:"left", fontSize:14 }}>
                                <Form.Check
                                     type="switch"
                                     checked={this.state.checkedModeVcard}
                                     disabled={false}
                                     onClick={e=>this.handleChangeModeVcard(e,this.state.checkedModeVcard)}
                                 />
                                 {this.state.checkedModeVcard ? 'VCARD Active' : 'VCARD Inactive'}
                              </td>
                            </tr>
                            <tr>
                              <td style={{textAlign:"left", fontSize:12 }}>
                                <Form.Check
                                     type="checkbox"
                                     label="Include Telephone"
                                     checked={this.state.checkedModeVcardTelephone}
                                     disabled={false}
                                     onClick={e=>this.handleChangeModeVcardTelephone(e,this.state.checkedModeVcardTelephone)}
                                 />
                              </td>
                            </tr>
                            <tr>
                              <td style={{textAlign:"left", fontSize:12 }}>
                                <Form.Check
                                     type="checkbox"
                                     label="Include Email"
                                     checked={this.state.checkedModeVcardEmail}
                                     disabled={false}
                                     onClick={e=>this.handleChangeModeVcardEmail(e,this.state.checkedModeVcardEmail)}
                                 />
                               </td>
                            </tr>
                            <tr>
                              <td style={{textAlign:"left", fontSize:12 }}>
                                <Form.Check
                                     type="checkbox"
                                     label="Include Social Network"
                                     checked={this.state.checkedModeVcardSocialNetwork}
                                     disabled={false}
                                     onClick={e=>this.handleChangeModeVcardSocialNetwork(e,this.state.checkedModeVcardSocialNetwork)}
                                 />
                               </td>
                            </tr>
                            <tr>
                              <td style={{textAlign:"left", fontSize:12 }}>
                                <Form.Check
                                     type="checkbox"
                                     label="Include Web"
                                     checked={this.state.checkedModeVcardWeb}
                                     disabled={false}
                                     onClick={e=>this.handleChangeModeVcardWeb(e,this.state.checkedModeVcardWeb)}
                                 />
                               </td>
                            </tr>
                            <tr>
                              <td style={{textAlign:"left", fontSize:12 }}>
                                <Form.Check
                                     type="checkbox"
                                     label="Include ID"
                                     checked={this.state.checkedModeVcardId}
                                     disabled={false}
                                     onClick={e=>this.handleChangeModeVcardId(e,this.state.checkedModeVcardId)}
                                 />
                               </td>
                            </tr>
                            <tr>
                              <td style={{textAlign:"left", fontSize:12 }}>
                                <Form.Check
                                     type="checkbox"
                                     label="Include Description"
                                     checked={this.state.checkedModeVcardNotes}
                                     disabled={false}
                                     onClick={e=>this.handleChangeModeVcardNotes(e,this.state.checkedModeVcardNotes)}
                                 />
                               </td>
                            </tr>
                            <tr>
                              <td style={{textAlign:"left", fontSize:12 }}>
                              </td>
                            </tr>
                         </tbody>
                      </Table>
                      <Button onClick={() => this.handleDialogVcard(this.state.dialogTitle, 'confirm', this.state.modeVcard, this.state.checkedModeVcardTelephone, this.state.checkedModeVcardEmail, this.state.checkedModeVcardSocialNetwork, this.state.checkedModeVcardWeb, this.state.checkedModeVcardId, this.state.checkedModeVcardNotes)} theme="success">
                          <FormattedMessage id="alert.confirm" />
                      </Button>
                    </Col>
                  </Form>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }
};

UserProfileVCard.propTypes = {
  title: PropTypes.string
};

UserProfileVCard.defaultProps = {
  title: "Account Details"
};

export default withRouter(UserProfileVCard);
