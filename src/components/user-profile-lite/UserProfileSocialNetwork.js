import React from "react";
import PropTypes from "prop-types";
import {Card,CardHeader,ListGroup,Row,Col,Form,Button,InputGroup,Container} from "react-bootstrap";
import { Table } from 'reactstrap';
import { Divider, Typography, TextField, Grid, Dialog,DialogContent, DialogActions, DialogTitle, DialogContentText,Button as ButtonMaterialUI } from '@material-ui/core';
import ReactImageFallback from "react-image-fallback";
import ImageUploader from 'react-images-upload';
import { UserSession } from '@stacks/auth';
import { Storage } from '@stacks/storage'
import { FormattedMessage } from 'react-intl';
import { Base64 } from 'js-base64';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import {updateProfileWensiteSocialNetwork } from "../../clarity/clarityfunctions"

function ConfirmacionChangeSocialNetworks (props) {
    return (
        <Dialog
            open={props.dialogOpen}
            onClose={() => props.handleDialog('cancel')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"><div className="fa fa-info">&nbsp;&nbsp;{props.dialogTitle}</div></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <Table className="text-center" responsive borderless style={{ color: 'black', fontSize:14 }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "520px", textAlign:"left", color: 'black', fontSize:14 }}>
                          <InputGroup className="mb-2">
                            <Form.Control
                              style={{fontSize:14}}
                              className="text-left"
                              id="facebook"
                              type="text"
                              disabled={false}
                              placeholder="URL Facebook"
                              alt={props.facebook}
                              value={props.facebook}
                              onChange={e=>props.handleChangeSocialNetworks(e,'facebook')}
                              aria-describedby="basic-addon1"
                            />
                              <InputGroup.Text id="basic-addon2">
                                <strong style={{cursor: 'pointer'}}>
                                  <a href={props.facebook} target="_blank" rel="noopener noreferrer"><img src="images/profile_facebook.png" weight="30" height="30" alt=""/></a>
                                </strong>
                              </InputGroup.Text>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "520px", textAlign:"left", color: 'black', fontSize:14 }}>
                          <InputGroup className="mb-2">
                            <Form.Control
                              style={{fontSize:14}}
                              className="text-left"
                              id="twitter"
                              type="text"
                              disabled={false}
                              placeholder="URL Twitter"
                              alt={props.twitter}
                              value={props.twitter}
                              onChange={e=>props.handleChangeSocialNetworks(e,'twitter')}
                              aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text id="basic-addon2">
                              <strong style={{cursor: 'pointer'}}>
                                <a href={props.twitter} target="_blank" rel="noopener noreferrer"><img src="images/profile_twitter.png" weight="30" height="30" alt=""/></a>
                              </strong>
                            </InputGroup.Text>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "520px", textAlign:"left", color: 'black', fontSize:14 }}>
                          <InputGroup className="mb-2">
                            <Form.Control
                              style={{fontSize:14}}
                              className="text-left"
                              id="youtube"
                              type="text"
                              disabled={false}
                              placeholder="URL Youtube"
                              alt={props.youtube}
                              value={props.youtube}
                              onChange={e=>props.handleChangeSocialNetworks(e,'youtube')}
                              aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text id="basic-addon2">
                              <strong style={{cursor: 'pointer'}}>
                                <a href={props.youtube} target="_blank" rel="noopener noreferrer"><img src="images/profile_youtube.png" weight="30" height="30" alt=""/></a>
                              </strong>
                            </InputGroup.Text>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "520px", textAlign:"left", color: 'black', fontSize:14 }}>
                          <InputGroup className="mb-2">
                            <Form.Control
                              style={{fontSize:14}}
                              className="text-left"
                              id="instagram"
                              type="text"
                              disabled={false}
                              placeholder="URL Instagram"
                              alt={props.instagram}
                              value={props.instagram}
                              onChange={e=>props.handleChangeSocialNetworks(e,'instagram')}
                              aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text id="basic-addon2">
                              <strong style={{cursor: 'pointer'}}>
                                <a href={props.instagram} target="_blank" rel="noopener noreferrer"><img src="images/profile_instagram.png" weight="30" height="30" alt=""/></a>
                              </strong>
                            </InputGroup.Text>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "520px", textAlign:"left", color: 'black', fontSize:14 }}>
                          <InputGroup className="mb-2">
                            <Form.Control
                              style={{fontSize:14}}
                              className="text-left"
                              id="linkedin"
                              type="text"
                              disabled={false}
                              placeholder="URL Linkedin"
                              alt={props.linkedin}
                              value={props.linkedin}
                              onChange={e=>props.handleChangeSocialNetworks(e,'linkedin')}
                              aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text id="basic-addon2">
                              <strong style={{cursor: 'pointer'}}>
                                <a href={props.linkedin} target="_blank" rel="noopener noreferrer"><img src="images/profile_linkedin.png" weight="30" height="30" alt=""/></a>
                              </strong>
                            </InputGroup.Text>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "520px", textAlign:"left", color: 'black', fontSize:14 }}>
                          <InputGroup className="mb-2">
                            <Form.Control
                              style={{fontSize:14}}
                              className="text-left"
                              id="pinterest"
                              type="text"
                              disabled={false}
                              placeholder="URL Pinterest"
                              alt={props.pinterest}
                              value={props.pinterest}
                              onChange={e=>props.handleChangeSocialNetworks(e,'pinterest')}
                              aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text id="basic-addon2">
                              <strong style={{cursor: 'pointer'}}>
                                <a href={props.pinterest} target="_blank" rel="noopener noreferrer"><img src="images/profile_pinterest.png" weight="30" height="30" alt=""/></a>
                              </strong>
                            </InputGroup.Text>
                          </InputGroup>
                        </td>
                      </tr>
                   </tbody>
                </Table>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleDialog(props.dialogTitle, 'cancel', props.facebook, props.twitter, props.youtube, props.instagram, props.linkedin, props.pinterest)} theme="warning" autoFocus>
                    <FormattedMessage id="alert.cancel" />
                </Button>
                <Button onClick={() => props.handleDialog(props.dialogTitle, 'confirm', props.facebook, props.twitter, props.youtube, props.instagram, props.linkedin, props.pinterest)} theme="danger">
                    <FormattedMessage id="alert.confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

class UserProfileSocialNetwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSession: new UserSession(),
      visible: false,
      languaje: 'English',
      imagen: '',
      newname: false,
      newwebsite: false,
      newavatar: false,
      profileName: '',
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
    };
  }

  UNSAFE_componentWillMount() {
    const languageX = localStorage.getItem('language')
    if (languageX === undefined || languageX === ''){
      this.setState({ language: 'English' })
    }else{
      this.setState({ language: languageX })
    }
    this.setState({facebook: this.props.facebook})
    this.setState({twitter: this.props.twitter})
    this.setState({youtube: this.props.youtube})
    this.setState({instagram: this.props.instagram})
    this.setState({linkedin: this.props.linkedin})
    this.setState({pinterest: this.props.pinterest})
    this.setState({profileWebSite: this.props.profileWebSite})
  }

  handleChangeSocialNetworks = (e,type) => {
    if (type === 'facebook'){
       this.setState({facebook: e.target.value})
    }
    if (type === 'twitter'){
       this.setState({twitter: e.target.value})
    }
    if (type === 'youtube'){
       this.setState({youtube: e.target.value})
    }
    if (type === 'instagram'){
       this.setState({instagram: e.target.value})
    }
    if (type === 'linkedin'){
       this.setState({linkedin: e.target.value})
    }
    if (type === 'pinterest'){
       this.setState({pinterest: e.target.value})
    }
  }

  handleDialog = (type, action, facebook,twitter,youtube,instagram,linkedin,pinterest) => {
    if (type === 'Maintain Social Networks') {
      if (action === 'confirm') {
        this.setState({ dialogOpen: false });
        this.addSocialNetworks(facebook,twitter,youtube,instagram,linkedin,pinterest);
      }
      if (action === 'cancel') {
        this.setState({ dialogOpen: false });
      }
    }
  }

  handleCaracteresEspeciales = (e) => {
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
  }

  changeAvatar = (e) =>{
    e.preventDefault();
    this.setState({ newavatar: true })
  }

  changeRedSocial = (e) =>{
    e.preventDefault();
    this.setState({ dialogOpen: true, dialogTitle: 'Maintain Social Networks' })
  }

  changeWebSite = (e) =>{
    e.preventDefault();
    this.setState({ newwebsite: true })
  }

  handleChangeInputWebSite = (e) =>{
    e.preventDefault();
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
    this.setState({profileWebSite: e.target.value})
  }

  onDrop = ( pictureFiles, pictureDataURLs) => {
    this.setState({ pictures: pictureFiles, profileAvatar: pictureDataURLs, newavatar: true, file64ProfileAvatar: Base64.encode(pictureDataURLs) });
    const file64 = Base64.encode(pictureDataURLs);
    this.addAvatar(file64)
  }

  addWebSite = (e) => {
    this.setState({ newwebsite: false })
    updateProfileWensiteSocialNetwork(this.props.networkX,this.props.storageX,this.state.profileWebSite,this.state.facebook,this.state.twitter,this.state.youtube,this.state.instagram,this.state.linkedin,this.state.pinterest)
     .then()
  }

  addSocialNetworks = (facebook,twitter,youtube,instagram,linkedin,pinterest) => {
    this.setState({ newAboutme: false })
    updateProfileWensiteSocialNetwork(this.props.networkX,this.props.storageX,this.state.profileWebSite,facebook,twitter,youtube,instagram,linkedin,pinterest)
     .then()
  }

  render() {
    const languageX = this.state.language
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
    let website
    if (this.state.profileWebSite !== '' && this.state.profileWebSite!== null && this.state.profileWebSite !== undefined) {
      website = this.state.profileWebSite
    }

    const identityAddress = 'did:btc-addr:'+this.props.identityAddress
    const identityAddressStack = 'did:stack:v2:'+this.props.STX
    const zonefile_hash = this.props.zonefile_hash

    let editwebsite = true
    let websocialnetwork = true

    return (
      <>
        <ConfirmacionChangeSocialNetworks
            handleDialog={this.handleDialog}
            dialogMessage={this.state.dialogMessage}
            dialogOpen={this.state.dialogOpen}
            dialogTitle={this.state.dialogTitle}
            facebook={this.state.facebook}
            twitter={this.state.twitter}
            instagram={this.state.instagram}
            youtube={this.state.youtube}
            linkedin={this.state.linkedin}
            pinterest={this.state.pinterest}
            handleChangeSocialNetworks={this.handleChangeSocialNetworks}
        />
        <Card small className="mb-4 pt-3" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
          <ListGroup flush>
            <ListGroup.Item className="p-4 text-center" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
                <Table size="sm" className="text-center" responsive borderless>
                    <tbody>
                      <tr>
                        <td style={{ width: "90%" }}>
                           <label style={ this.props.colorDark ? {color:'#c6c6c6', fontSize:16} : {color:'#1a1a1a', fontSize:16}} htmlFor="feAboutMe"><FormattedMessage id="profile.website" /></label>
                        </td>
                        <td style={{ width: "10%" }}>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "90%" }}>
                          {this.state.newwebsite ?
                              <InputGroup className="mb-2">
                                <Form.Control
                                  style={ this.props.colorDark ? { backgroundColor:'#111f2c', fontSize:18, color:'white', fontSize:18} : {}}
                                  className="text-center"
                                  id="newwebsite"
                                  type="text"
                                  disabled={false}
                                  placeholder={""}
                                  alt={"Enter the URL Web Site"}
                                  value={this.state.profileWebSite}
                                  onChange={e=>this.handleChangeInputWebSite(e)}
                                  aria-describedby="basic-addon1"
                                />
                                <InputGroup.Text id="basic-addon2">
                                   <Button theme="accent" onClick={e=>{this.addWebSite(e)}} ><FormattedMessage id="usergroup.add" /></Button>
                                </InputGroup.Text>
                              </InputGroup>
                          :
                            <h4 className="mb-0">
                               {website ?
                                  <>
                                    <span style={ this.props.colorDark ? { color:'white', fontSize:18} : {color:'black', fontSize:18}} >{website} &nbsp;</span>
                                  </>
                                :
                                  <>
                                    <span style={{ color: "grey", fontSize:18}} >Enter URL website here &nbsp;&nbsp;</span>
                                  </>
                               }
                            </h4>
                          }
                        </td>
                        <td style={{ width: "10%" }}>
                          {this.state.newwebsite ?
                            null
                          :
                            <>
                            {editwebsite ?
                              <h4 className="mb-0">
                                  <strong style={{cursor: 'pointer'}} onClick={e=>{this.changeWebSite(e)}}>
                                      { this.props.colorDark ?
                                         <img src="images/editpencil128Grey.png" weight="25" height="25" alt=""/>
                                      :
                                         <img src="images/editpencil128.png" weight="25" height="25" alt=""/>
                                      }
                                  </strong>
                              </h4>
                            : null
                            }
                            </>
                          }
                        </td>
                      </tr>
                   </tbody>
                </Table>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup flush>
            <ListGroup.Item className="p-4 text-center" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
                <Table size="sm" className="text-center" responsive borderless style={{ color: 'black', fontSize:11 }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "90%" }}>
                           <label style={ this.props.colorDark ? {color:'#c6c6c6', fontSize:16} : {color:'#1a1a1a', fontSize:16}} htmlFor="feAboutMe"><FormattedMessage id="profile.socialnetwork" /></label>
                        </td>
                        <td style={{ width: "10%" }}>
                        </td>
                      </tr>
                    </tbody>
                </Table>
              <Row>
                <Table size="sm" className="text-center" responsive borderless style={{ color: 'black', fontSize:11 }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "15%" }}><a style={{fontSize:9}} href={this.state.facebook} target="_blank" rel="noopener noreferrer"><img src="images/profile_facebook.png" weight="50" height="50" alt=""/></a></td>
                        <td style={{ width: "15%" }}><a style={{fontSize:9}} href={this.state.twitter} target="_blank" rel="noopener noreferrer"><img src="images/profile_twitter.png" weight="50" height="50" alt=""/></a></td>
                        <td style={{ width: "15%" }}><a style={{fontSize:9}} href={this.state.youtube} target="_blank" rel="noopener noreferrer"><img src="images/profile_youtube.png" weight="50" height="50" alt=""/></a></td>
                        <td style={{ width: "15%" }}><a style={{fontSize:9}} href={this.state.instagram} target="_blank" rel="noopener noreferrer"><img src="images/profile_instagram.png" weight="50" height="50" alt=""/></a></td>
                        <td style={{ width: "15%" }}><a style={{fontSize:9}} href={this.state.linkedin} target="_blank" rel="noopener noreferrer"><img src="images/profile_linkedin.png" weight="50" height="50" alt=""/></a></td>
                        <td style={{ width: "15%" }}><a style={{fontSize:9}} href={this.state.pinterest} target="_blank" rel="noopener noreferrer"><img src="images/profile_pinterest.png" weight="50" height="50" alt=""/></a></td>
                        <td style={{ width: "10%" }}>
                           <>
                             { websocialnetwork ?
                               <strong style={{cursor: 'pointer'}} onClick={e=>{this.changeRedSocial(e)}}>
                                 { this.props.colorDark ?
                                    <img src="images/editpencil128Grey.png" weight="25" height="25" alt=""/>
                                 :
                                    <img src="images/editpencil128.png" weight="25" height="25" alt=""/>
                                 }
                               </strong>
                              : null
                              }
                            </>
                        </td>
                      </tr>
                      <tr>
                        <td style={ this.props.colorDark ? { width: "15%", textAlign:"center", color: 'white', fontSize:10} : {width: "15%", textAlign:"center", color: 'black', fontSize:10}}>Facebook</td>
                        <td style={ this.props.colorDark ? { width: "15%", textAlign:"center", color: 'white', fontSize:10} : {width: "15%", textAlign:"center", color: 'black', fontSize:10}}>Twitter</td>
                        <td style={ this.props.colorDark ? { width: "15%", textAlign:"center", color: 'white', fontSize:10} : {width: "15%", textAlign:"center", color: 'black', fontSize:10}}>Youtube</td>
                        <td style={ this.props.colorDark ? { width: "15%", textAlign:"center", color: 'white', fontSize:10} : {width: "15%", textAlign:"center", color: 'black', fontSize:10}}>Instagram</td>
                        <td style={ this.props.colorDark ? { width: "15%", textAlign:"center", color: 'white', fontSize:10} : {width: "15%", textAlign:"center", color: 'black', fontSize:10}}>LinkEdIn</td>
                        <td style={ this.props.colorDark ? { width: "15%", textAlign:"center", color: 'white', fontSize:10} : {width: "15%", textAlign:"center", color: 'black', fontSize:10}}>Pinterest</td>
                        <td style={ this.props.colorDark ? { width: "15%", textAlign:"center", color: 'white', fontSize:10} : {width: "15%", textAlign:"center", color: 'black', fontSize:10}}></td>
                      </tr>
                    </tbody>
                </Table>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </>
    )
  }
};

UserProfileSocialNetwork.propTypes = {
  /**
   * The user details object.
   */
  UserProfileSocialNetwork: PropTypes.object
};

UserProfileSocialNetwork.defaultProps = {
  UserProfileSocialNetwork: {
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

export default UserProfileSocialNetwork;
