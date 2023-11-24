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
import {updateProfileName} from "../../clarity/clarityfunctions"

class UserProfileName extends React.Component {
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

    this.setState({profileName: this.props.profileName})
  }

  changeName = (e) =>{
    e.preventDefault();
    this.setState({ newname: true })
  }

  handleChangeInput = (e) =>{
    e.preventDefault();
    let palabra = e.target.value
    let ArrayIdValue = palabra.split(`"`)
    e.target.value = ArrayIdValue[0]
    palabra = e.target.value
    ArrayIdValue = palabra.split("'")
    e.target.value = ArrayIdValue[0]
    this.setState({profileName: e.target.value})
  }

  addName = (e) => {
    this.setState({ newname: false })
    updateProfileName(this.props.networkX,this.props.storageX,this.state.profileName)
     .then()
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
    let editname = true

    return (
      <Card small className="mb-4 pt-3" style={ this.props.colorDark ? { backgroundColor:'#0b151d'} : {}}>
        <Table size="sm" className="text-center" responsive borderless>
            <tbody>
              <tr>
                <td style={{ width: "90%" }}>
                    <InputGroup className="mb-2">
                      <Form.Control
                        style={ this.props.colorDark ? { backgroundColor:'#111f2c', color:'white', fontSize:18} : {backgroundColor:"#F4F4F4", fontSize:18}}
                        className="text-center"
                        id="newname"
                        type="text"
                        disabled={!this.state.newname}
                        placeholder={"Nameless"}
                        alt={"Enter the Name"}
                        value={this.state.profileName}
                        onChange={e=>this.handleChangeInput(e)}
                      />
                      {this.state.newname ?
                         <InputGroup.Text>
                             <Button theme="accent" onClick={e=>{this.addName(e)}} ><FormattedMessage id="usergroup.add" /></Button>
                         </InputGroup.Text>
                      :
                         null
                      }
                    </InputGroup>
                </td>

                <td style={{ width: "10%" }}>
                   {this.state.newname ?
                     null
                   :
                     <>
                     { editname ?
                       <strong style={{cursor: 'pointer'}} onClick={e=>{this.changeName(e)}}>
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
                   {bUsername ?
                      <>
                        {bUsername2 ?
                          <>
                            <span className="text-muted d-block mb-2">{username}{'  ('}<FormattedMessage id="profile.provisory" />{')'}</span>
                            <br></br>
                            <span className="text-muted d-block mb-2"><FormattedMessage id="profile.provisory2" /></span>
                            <br></br>
                            <a href="https://domains.paradigma.global" target="_blank" rel="noopener noreferrer"><FormattedMessage id="profile.claim" /></a>
                          </>
                        :
                          null
                        }
                      </>
                   :
                      <a href="https://domains.paradigma.global" target="_blank" rel="noopener noreferrer"><FormattedMessage id="profile.claim" /></a>
                   }
                </td>
                <td style={{ width: "10%" }}>
                </td>
              </tr>
           </tbody>
        </Table>
      </Card>
    )
  }
};

UserProfileName.propTypes = {
  UserProfileName: PropTypes.object
};

UserProfileName.defaultProps = {
  UserProfileName: {
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

export default UserProfileName;
