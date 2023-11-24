import React from "react";
import PropTypes from "prop-types";
import {Card, CardHeader, ListGroup, Row, Col, Form, Button, InputGroup, Container} from "react-bootstrap";
import { Table } from 'reactstrap';
import { Divider, Typography, TextField, Grid, Dialog,DialogContent, DialogActions, DialogTitle, DialogContentText,Button as ButtonMaterialUI } from '@material-ui/core';
import ReactImageFallback from "react-image-fallback";
import ImageUploader from 'react-images-upload';
import { UserSession } from '@stacks/auth';
import { Storage } from '@stacks/storage'
import { hashMessage } from "@stacks/encryption";
import { serializeCV, signWithKey, stringAsciiCV, tupleCV, uintCV, bufferCVFromString, bufferCV, stringCV } from "@stacks/transactions";
import { bytesToHex, ClarityValue, createStacksPrivateKey, getPublicKey, publicKeyToString, signMessageHashRsv, signStructuredData, StacksPrivateKey } from "@stacks/transactions";
import { FormattedMessage } from 'react-intl';
import { Base64 } from 'js-base64';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import {updateProfilePassword, openSignature, openStructuredDataSignature} from "../../clarity/clarityfunctions"
import { sha256 } from 'js-sha256';

const structuredDataPrefix = [0x53, 0x49, 0x50, 0x30, 0x31, 0x38];
const chainIds = {
  mainnet: 1,
  testnet: 2147483648,
}

class UserProfilePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: new UserSession(),
      visible: false,
      languaje: 'English',
      imagen: '',
      newpassword: false,
      newwebsite: false,
      newavatar: false,
      profilePassword: '',
      profilePasswordConfirm: '',
      profileAvatar: [],
      profileWebSite: '',
      pictures: [],
      file64ProfileAvatar: '',
      dialogOpen: false,
      dialogMessage: '',
      dialogTitle: '',
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      pinterest: '',
      aboutme: '',
      newAboutme: false,
      privateKey: '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601',
    };
  }

  UNSAFE_componentWillMount() {
    const languageX = localStorage.getItem('language')
    if (languageX === undefined || languageX === ''){
      this.setState({ language: 'English' })
    }else{
      this.setState({ language: languageX })
    }

    //this.setState({profilePassword: this.props.profilePassword})
    this.setState({profilePassword: '', profilePasswordConfirm: ''})
  }

  changePassword = (e) =>{
    e.preventDefault();
    this.setState({ newpassword: true })
  }

  handleChangeInput = (e) =>{
    e.preventDefault();
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
    this.setState({profilePassword: e.target.value})
  }

  handleChangeInputConfirm = (e) =>{
    e.preventDefault();
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
    this.setState({profilePasswordConfirm: e.target.value})
  }

  sha256X(data) {
    const sha256X2 = sha256(data);
    return sha256X2;
  }

  structuredDataHash(structuredData) {
    const structuredDataX = this.sha256X(serializeCV(structuredData));
    return structuredDataX;
  }

  addPassword = (e) => {
    if (this.state.profilePassword !== '' && this.state.profilePassword !== null && this.state.profilePassword !== undefined) {
      if (this.state.profilePassword === this.state.profilePasswordConfirm) {

        //const messageX = sha256(this.state.profilePassword)
        const messageHash = this.structuredDataHash(stringAsciiCV(this.state.profilePassword));
        const domainHash  = this.structuredDataHash(tupleCV({
          "name": stringAsciiCV("CrossCheck(c) did:web:XCK.app Dapp"),
          "version": stringAsciiCV("1.0.0"),
          "chain-id": uintCV(chainIds.mainnet),
        }));
        const messageX = this.sha256X(Buffer.concat([Buffer.from(structuredDataPrefix), Buffer.from(domainHash), Buffer.from(messageHash)]))

        console.log('1',structuredDataPrefix)
        console.log('2',domainHash)
        console.log('3',messageHash)
        console.log('4',Buffer.from(structuredDataPrefix))
        console.log('5',Buffer.from(domainHash))
        console.log('6',Buffer.from(messageHash))
        console.log('7',Buffer.concat([Buffer.from(structuredDataPrefix), Buffer.from(domainHash), Buffer.from(messageHash)]))
        console.log('8',messageX)

        openSignature(this.props.networkX,this.props.storageX,messageX).then()
        //openStructuredDataSignature(this.props.networkX,this.props.storageX,messageX).then()
      }else{
      }
    }
  }

  render() {
    const username = this.props.username
    let bUsername = true
    let bUsername2 = false
    if (username === undefined || username === null || username === ''){
      bUsername = false
    }else{
      if (username === this.props.STX.substring(0,5).toLowerCase()+'...'+this.props.STX.substring(this.props.STX.length-5).toLowerCase()+'.xck.app'){
        bUsername2 = true
      }
    }
    let buttonConfirm = true
    if (this.state.newpassword) {
      if (this.state.profilePassword !== '' && this.state.profilePassword !== null && this.state.profilePassword !== undefined){
        if (this.state.profilePassword === this.state.profilePasswordConfirm) {
          buttonConfirm = false
        }
      }
    }
    let editpassword = true

    return (
      <Card small className="mb-4 pt-3" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md="4" className="form-group">
                </Col>
                <Col md="4" className="form-group">
                  <Table size="sm" className="text-center" responsive borderless>
                      <tbody>
                        <tr>
                          <td style={{ width: "90%" }}>
                              <label style={ this.props.colorDark ? { color:'white', fontSize:14} : {fontSize:14}}><FormattedMessage id="profile.entermodifypassword" /></label>
                              <InputGroup className="mb-2">
                                <Form.Control
                                  style={ this.props.colorDark ? { backgroundColor:'#111f2c', color:'white', fontSize:18} : {backgroundColor:"#F4F4F4", fontSize:18}}
                                  className="text-center"
                                  id="enterpassword"
                                  type="password"
                                  disabled={!this.state.newpassword}
                                  placeholder={"Enter the Password"}
                                  alt={"Enter the Password"}
                                  value={this.state.profilePassword}
                                  onChange={e=>this.handleChangeInput(e)}
                                />
                              </InputGroup>
                          </td>
                          <td style={{ width: "10%" }}>
                             {this.state.newpassword ?
                               null
                             :
                               <>
                               { editpassword ?
                                 <strong style={{cursor: 'pointer'}} onClick={e=>{this.changePassword(e)}}>
                                   { this.props.colorDark ?
                                      <img src="images/editpencil128Grey.png" weight="25" height="25" alt=""/>
                                   :
                                      <img src="images/editpencil128.png" weight="25" height="25" alt=""/>
                                   }
                                 </strong>
                               : null
                               }
                               </>
                             }
                          </td>
                        </tr>
                        <tr>
                          <td style={{ width: "90%" }}>
                              <label style={ this.props.colorDark ? { color:'white', fontSize:14} : {fontSize:14}}><FormattedMessage id="profile.confirmpassword" /></label>
                              <InputGroup className="mb-2">
                                <Form.Control
                                  style={ this.props.colorDark ? { backgroundColor:'#111f2c', color:'white', fontSize:18} : {backgroundColor:"#F4F4F4", fontSize:18}}
                                  className="text-center"
                                  id="confirmpassword"
                                  type="password"
                                  disabled={!this.state.newpassword}
                                  placeholder={"Confirm the Password"}
                                  alt={"Confirm the Password"}
                                  value={this.state.profilePasswordConfirm}
                                  onChange={e=>this.handleChangeInputConfirm(e)}
                                />
                              </InputGroup>
                          </td>
                        </tr>
                     </tbody>
                  </Table>
                </Col>
                <Col md="4" className="form-group">
                </Col>
              </Row>
              <Row className="text-center">
                <Col md="4" className="form-group">
                </Col>
                <Col md="4" className="form-group">
                  {this.state.newpassword ?
                    <>
                      {buttonConfirm ?
                         <Button variant="danger" onClick={e=>this.addPassword(e)} disabled={true}><FormattedMessage id="alert.confirm" /></Button>
                      :
                         <Button variant="success" onClick={e=>this.addPassword(e)} disabled={false}><FormattedMessage id="alert.confirm" /></Button>
                      }
                    </>
                  :
                     null
                  }
                </Col>
                <Col md="4" className="form-group">
                </Col>
              </Row>
              <Row form>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    )
  }
};

UserProfilePassword.propTypes = {
  UserProfilePassword: PropTypes.object
};

UserProfilePassword.defaultProps = {
  UserProfilePassword: {
    name: "John Smith",
    jobTitle: "Nameless",
    jobTitle_es: "Sin Nombre",
    jobTitle_fr: "Sans Nom",
    jobTitle_pt: "Sem Nome",
    jobTitle_sv: "Inget Namn",
    jobTitle_nl: "Geen Naam",
    jobTitle_ru: "Нет имени",
    jobTitle_jp: "名前なし",
    jobTitle_cn: "没有名字",
    jobTitle_de: "Kein Name",
    jobTitle_it: "Nessun Nome",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaTitle_es: "Descripción",
    metaTitle_fr: "La description",
    metaTitle_pt: "Descrição",
    metaTitle_sv: "Beskrivning",
    metaTitle_nl: "Omschrijving",
    metaTitle_ru: "Описание",
    metaTitle_jp: "説明",
    metaTitle_cn: "描述",
    metaTitle_de: "Beschreibung",
    metaTitle_it: "Descrizione",
    metaValue: "This info represents your descentralized identity, used by login to CrossCheck application.",
    metaValue_es: "Esta información representa su identidad descentralizada, utilizada al iniciar sesión en la aplicación Crosscheck.",
    metaValue_fr: "Cette information représente votre identité décentralisée, utilisée pour vous connecter à l'application Crosscheck.",
    metaValue_pt: "Esta informação representa sua identidade descentralizada, usada pelo login no aplicativo Crosscheck.",
    metaValue_sv: "Denna information representerar din decentraliserade identitet, som används genom att logga in på Crosscheck-applikationen.",
    metaValue_nl: "Deze info vertegenwoordigt uw gedecentraliseerde identiteit, die wordt gebruikt door in te loggen bij de applicatie Crosscheck.",
    metaValue_ru: "Эта информация представляет вашу децентрализованную личность, используемую при входе в приложение Crosscheck.",
    metaValue_jp: "この情報は、パラダイマクロスチェックアプリケーションへのログインで使用される分散IDを表します。",
    metaValue_cn: "此信息表示您的分散身份，登录Crosscheck应用程序时使用。",
    metaValue_de: "Diese Informationen stellen Ihre dezentrale Identität dar, die bei der Anmeldung bei der Crosscheck-Anwendung verwendet wird.",
    metaValue_it: "Queste informazioni rappresentano la tua identità decentralizzata, utilizzata per l'accesso all'applicazione Crosscheck."
  }
};

export default UserProfilePassword;
