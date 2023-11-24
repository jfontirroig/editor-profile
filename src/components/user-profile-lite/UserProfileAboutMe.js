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
import {updateProfileAboutMe} from "../../clarity/clarityfunctions"

class UserProfileAboutMe extends React.Component {
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
    this.setState({description: this.props.description})
    this.setState({aboutme: this.props.aboutme})
  }

  handleCaracteresEspeciales = (e) => {
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
  }

  changeAboutMe = (e) =>{
    e.preventDefault();
    this.setState({ newAboutme: true })
  }

  handleChangeAboutMe = (e) =>{
    e.preventDefault();
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
    this.setState({aboutme: e.target.value})
  }

  addAboutMe = (e) => {
    this.setState({ newAboutme: false })
    updateProfileAboutMe(this.props.networkX,this.props.storageX,this.state.aboutme)
     .then()
  }

  render() {
    const languageX = this.state.language
    let descripX = ''
    let title = ''
    let placeholderX3 = "Enter a short description about yourself "
    if (languageX === 'English'){title =  this.props.UserProfileAboutMe.metaTitle;descripX = this.props.UserProfileAboutMe.metaValue;placeholderX3 = "Enter a short description about yourself "}
    if (languageX === 'Spanish'){title =  this.props.UserProfileAboutMe.metaTitle_es;descripX = this.props.UserProfileAboutMe.metaValue_es;placeholderX3 = "Ingresa una breve descripcion sobre ti"}
    if (languageX === 'French'){title =  this.props.UserProfileAboutMe.metaTitle_fr;descripX = this.props.UserProfileAboutMe.metaValue_fr;placeholderX3 = "Entrez votre description ici"}
    if (languageX === 'Portuguese'){title =  this.props.UserProfileAboutMe.metaTitle_pt;descripX = this.props.UserProfileAboutMe.metaValue_pt;placeholderX3 = "Insira sua descrição aqui"}
    if (languageX === 'Swedish'){title =  this.props.UserProfileAboutMe.metaTitle_sv;descripX = this.props.UserProfileAboutMe.metaValue_sv;placeholderX3 = "Ange din beskrivning här"}
    if (languageX === 'Netherlands'){title =  this.props.UserProfileAboutMe.metaTitle_nl;descripX = this.props.UserProfileAboutMe.metaValue_nl;placeholderX3 = "Vul hier uw omschrijving in"}
    if (languageX === 'Russian'){title =  this.props.UserProfileAboutMe.metaTitle_ru;descripX = this.props.UserProfileAboutMe.metaValue_ru;placeholderX3 = "Введите свое описание здесь"}
    if (languageX === 'Japanese'){title =  this.props.UserProfileAboutMe.metaTitle_jp;descripX = this.props.UserProfileAboutMe.metaValue_jp;placeholderX3 = "ここに説明を入力してください"}
    if (languageX === 'Chinese'){title =  this.props.UserProfileAboutMe.metaTitle_cn;descripX = this.props.UserProfileAboutMe.metaValue_cn;placeholderX3 = "在此處輸入您的描述"}
    if (languageX === 'German'){title =  this.props.UserProfileAboutMe.metaTitle_de;descripX = this.props.UserProfileAboutMe.metaValue_de;placeholderX3 = "Geben Sie hier Ihre Beschreibung ein"}
    if (languageX === 'Italian'){title =  this.props.UserProfileAboutMe.metaTitle_it;descripX = this.props.UserProfileAboutMe.metaValue_it;placeholderX3 = "Inserisci qui la tua descrizione"}

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
    let person = ""
    if (this.props.profileName !== '' && this.props.profileName !== null && this.props.profileName !== undefined){
       person = this.props.profileName
    }else{
       if (this.state.profileName !== '' && this.state.profileName!== null && this.state.profileName !== undefined) {
         person = this.state.profileName
       }else{
         person = this.props.profileName
       }
    }

    const identityAddress = 'did:btc-addr:'+this.props.identityAddress
    const identityAddressStack = 'did:stack:v2:'+this.props.STX
    const zonefile_hash = this.props.zonefile_hash

    let editaboutme = true

  return (
      <Card small className="mb-4 pt-3" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
        <ListGroup flush>
          <ListGroup.Item className="p-4 text-center" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
            <Table size="sm" className="text-center" responsive borderless>
                <tbody>
                  <tr>
                    <td style={{ width: "90%" }}>
                       <label style={{ color: 'grey', fontSize:16 }} htmlFor="feAboutMe"><FormattedMessage id="profile.aboutme" /></label>
                    </td>
                    <td style={{ width: "10%" }}>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "90%" }}>
          						<InputGroup className="mb-2">
          							<Form.Control
          								as="textarea"
          								rows={5}
          								id="feMessage"
          								style={ this.props.colorDark ? { backgroundColor:'#111f2c', color:'white'} : {backgroundColor:"#F4F4F4"}}
                          value={this.state.aboutme}
                          onChange={e=>this.handleChangeAboutMe(e)}
          								placeholder={placeholderX3}
          								disabled={!this.state.newAboutme}
          							/>
                        {this.state.newAboutme ?
                           <InputGroup.Text>
                               <Button theme="accent" onClick={e=>{this.addAboutMe(e)}} ><FormattedMessage id="usergroup.add" /></Button>
                           </InputGroup.Text>
                        :
                           null
                        }
                      </InputGroup>
                    </td>
                    <td style={{ width: "10%" }}>
                       {this.state.newAboutme ?
                         null
                       :
                         <>
                         { editaboutme ?
                           <strong style={{cursor: 'pointer'}} onClick={e=>{this.changeAboutMe(e)}}>
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
               </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }
};

UserProfileAboutMe.propTypes = {
  UserProfileAboutMe: PropTypes.object
};

UserProfileAboutMe.defaultProps = {
  UserProfileAboutMe: {
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

export default UserProfileAboutMe;
