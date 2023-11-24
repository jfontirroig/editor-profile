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
import {updateProfileEmailTelephone} from "../../clarity/clarityfunctions"

const Prefix = require('./CountryDialPhoneCodes.json');

class UserProfileEmailTelephone  extends React.Component {
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

  c01EmailNotifications = React.createRef();
  c02SMSNotifications = React.createRef();
  c04Applications = React.createRef();
  c02SMSCountry = React.createRef();
  c01EmailScope = React.createRef();
  c02SMSScope = React.createRef();
  c04ApplicationsScope = React.createRef();

  componentDidMount() {
    this.c01EmailNotifications.current.value = this.props.EMAIL
    this.c02SMSNotifications.current.value = this.props.SMS
    this.c01EmailScope.current.value = this.props.emailScope
    this.c02SMSScope.current.value = this.props.smsScope
    this.c02SMSCountry.current.value = this.props.smsCountry
    this.c04ApplicationsScope.current.value = this.props.applicationsScope
    this.setState({ prefixX: this.props.smsPrefix, smsPrefix: this.props.smsPrefix, smsCountry: this.props.smsCountry });
    this.setState({ smsScope: this.props.smsScope, emailScope: this.props.emailScope, applicationsScope: this.props.applicationsScope, stxScope: this.props.stxScope, btcScope: this.props.btcScope });

  }

  handleChangePrefix = (e) => {
    this.setState({
        prefixX: this.c02SMSCountry.current.value,
        smsPrefix: this.c02SMSCountry.current.value,
        smsCountry: this.props.smsCountry
    });
  }

  handleCaracteresEspeciales = (e) => {
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
  }

  nuevoProfileEmailTelephone = e => {
    updateProfileEmailTelephone(
           this.props.networkX,
           this.props.storageX,
           this.c01EmailNotifications.current.value,
           this.c02SMSNotifications.current.value,
           this.c02SMSCountry.current.value,
           this.state.smsPrefix,
           this.c01EmailScope.current.value,
           this.c02SMSScope.current.value,
           this.c04ApplicationsScope.current.value,
           this.state.stxScope,
           this.state.btcScope)
     .then()
  }

  render() {
    const { userSession } = this.props
    let {EMAIL} = this.props
    let {SMS} = this.props
    if (EMAIL === undefined){EMAIL=''}
    if (SMS === undefined){SMS=''}
    let existEmail = false
    let existSMS = false
    if (EMAIL.length > 0){existEmail = true}
    if (SMS.length > 0){existSMS = true}

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
                      <label htmlFor="feEmail" style={ this.props.colorDark ? {color:'#c6c6c6'} : {color:'#1a1a1a'}}><FormattedMessage id="useraccountdetail.emailnotifications" /></label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon1">
                            <img src="images/email.png" weight="30" height="30" alt="" title="eMail" />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                          id="feEmailNotifications"
                          placeholder={existEmail ? EMAIL : "Email Notifications"}opacity5X
                          disabled={false}
                          ref={this.c01EmailNotifications}
                          onChange={e=>this.handleCaracteresEspeciales(e)}
                          autoComplete="email"
                        />
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon3">
                          <Form.Select
                              id="scope"
                              style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                              ref={this.c01EmailScope}
                              disabled={false}
                          >
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Private">Private</option>
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Public">Public</option>
                          </Form.Select>
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row form>
                    {/* SMS Notifications */}
                    <Col md="12" className="form-group">
                      <label htmlFor="fePassword" style={ this.props.colorDark ? {color:'#c6c6c6'} : {color:'#1a1a1a'}}><FormattedMessage id="useraccountdetail.smsnotifications" /></label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon1">
                              <img src="images/sms.png" weight="30" height="30" alt="" title="SMS" />
                        </InputGroup.Text>
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon2">
                          <Form.Select
                              id="prefix"
                              style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                              disabled={false}
                              ref={this.c02SMSCountry}
                              onChange={e=>this.handleChangePrefix(e)}
                          >
                              {Prefix.map((todo, i) => {
                                  if (todo.dialCode === this.state.smsCountry) {
                                    return (
                                      <option style={this.props.colorDark ? {color:'white'} : {color:'grey'}} key={i} value={todo.dialCode} selected style={{backgroundImage: `url("${todo.flag}")`}}>{`${todo.name}`}</option>
                                    )
                                  }else{
                                    return (
                                      <option style={this.props.colorDark ? {color:'white'} : {color:'grey'}} key={i} value={todo.dialCode} style={{backgroundImage: `url("${todo.flag}")`}}>{`${todo.name}`}</option>
                                    )
                                  }
                              })}
                          </Form.Select>
                        </InputGroup.Text>
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon3">
                          {this.state.smsPrefix}
                        </InputGroup.Text>
                        <Form.Control
                          id="feSMS Notifications"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                          disabled={false}
                          placeholder={existSMS ? SMS : "SMS Notifications"}
                          ref={this.c02SMSNotifications}
                          aria-describedby="basic-addon4"
                        />
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon5">
                          <Form.Select
                              id="scope"
                              style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                              disabled={false}
                              ref={this.c02SMSScope}
                          >
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Private">Private</option>
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Public">Public</option>
                          </Form.Select>
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row form>
                    {/* Applications */}
                    <Col md="12" className="form-group">
                      <label htmlFor="fePassword" style={ this.props.colorDark ? {color:'#c6c6c6'} : {color:'#1a1a1a'}}><FormattedMessage id="useraccountdetail.applications" /></label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon1">
                            <img src="images/applications.png" weight="30" height="30" alt="" title="Applications" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                          id="feApplications"
                          placeholder={"Applications"}
                          ref={this.c04Applications}
                          disabled={true}
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text style={ this.props.colorDark ? { backgroundColor:'#111f2c'} : {}} id="basic-addon3">
                          <Form.Select
                              id="scope"
                              style={ this.props.colorDark ? { backgroundColor:'#111f2c', color: 'white'} : {}}
                              disabled={false}
                              ref={this.c04ApplicationsScope}
                          >
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Private">Private</option>
                            <option style={this.props.colorDark ? {color:'white'} : {color:'darkblue'}} value="Public">Public</option>
                          </Form.Select>
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Button theme="success" onClick={e=>this.nuevoProfileEmailTelephone(e)}><FormattedMessage id="alert.confirm" /></Button>
                </Form>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }
};

UserProfileEmailTelephone.propTypes = {
  title: PropTypes.string
};

UserProfileEmailTelephone.defaultProps = {
  title: "Account Details"
};

export default withRouter(UserProfileEmailTelephone);
