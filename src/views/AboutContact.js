import React from "react";
import { withRouter } from "../actions/withRouter";
import PropTypes from "prop-types";
import {Card,CardHeader,ListGroup,Row,Col,Form,Container} from "react-bootstrap";
import {Button} from "shards-react";

import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core';

import TituloPagina from "../components/common/TituloPagina";

//translate
import { FormattedMessage } from 'react-intl';

//Email
import emailjs from 'emailjs-com'

function ConfirmacionWarning(props) {
    return (
        <Dialog
            open={props.dialogOpen}
            onClose={() => props.handleDialog('cancel')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.dialogMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleDialog(props.dialogTitle, 'accept')} theme="warning" autoFocus>
                    <FormattedMessage id="alert.cancel" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function ConfirmacionAccept(props) {
    return (
        <Dialog
            open={props.dialogOpen}
            onClose={() => props.handleDialog('accept')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.dialogMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleDialog(props.dialogTitle, 'accept')} theme="warning" autoFocus>
                   <FormattedMessage id="alert.accept" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

class AboutContact extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        visible: false,
        languaje: 'English',
        imagen: '',
        dialogOpen: false,
        dialogOpenWarning: false,
        dialogOpenAccept: false,
        dialogTitle: '',
        colorDark: false,
      };

      this.sendMail = this.sendMail.bind(this);

    }

    c01Contact = React.createRef();
    c02Contact = React.createRef();
    c03Contact = React.createRef();
    c04Contact = React.createRef();

    aboutCrosscheck = () => {
        const path = '/about/crosscheck'
        //this.props.history.push(path);

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

    }

    handleDialog = (type, action) => {
      if (type === 'Email Response') {
          if (action === 'accept') {
            this.setState({ dialogOpenAccept: false });
          }
      }
      if (type === 'Email Error') {
          if (action === 'accept') {
            this.setState({ dialogOpenWarning: false });
          }
      }
    }

    sendMail(){
        emailjs.send("service_9dv38as", "template_kuv5mme", { email: this.c02Contact.current.value, subject: 'Contact Crosscheck', message: this.c04Contact.current.value, name: this.c01Contact.current.value, phone: this.c03Contact.current.value}, "user_djYXBdBTeG1Km5qtyqkDl")
            .then(response => {
               console.log('SUCCESS!', response.status, response.text)
               this.responseConfirm()
            }, error => {
               console.log('FAILED...', error)
               this.responseErrorSend()
            });

    }

    responseConfirm(){
      if (this.state.language === 'English'){this.setState({ dialogOpenAccept: true, dialogMessage: 'Email was sent successfully', dialogTitle: 'Email Response', })}
      if (this.state.language === 'French'){this.setState({ dialogOpenAccept: true, dialogMessage: 'Email a été envoyé avec succès', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Spanish'){this.setState({ dialogOpenAccept: true, dialogMessage: 'Email fue enviado satisfactoriamente', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Portuguese'){this.setState({ dialogOpenAccept: true, dialogMessage: 'O email foi enviado com sucesso', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Swedish'){this.setState({ dialogOpenAccept: true, dialogMessage: 'E-postmeddelandet skickades', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Netherlands'){this.setState({ dialogOpenAccept: true, dialogMessage: 'E-mail is succesvol verzonden', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Russian'){this.setState({ dialogOpenAccept: true, dialogMessage: 'Письмо было успешно отправлено', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Japanese'){this.setState({ dialogOpenAccept: true, dialogMessage: 'メールは正常に送信されました', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Chinese'){this.setState({ dialogOpenAccept: true, dialogMessage: '电子邮件已成功发送', dialogTitle: 'Email Response', })}
      if (this.state.language === 'German'){this.setState({ dialogOpenAccept: true, dialogMessage: 'Die Email wurde erfolgreich versendet', dialogTitle: 'Email Response', })}
      if (this.state.language === 'Italian'){this.setState({ dialogOpenAccept: true, dialogMessage: "L'email è stata inviata con successo", dialogTitle: 'Email Response', })}
    }

    responseErrorSend(){
      if (this.state.language === 'English'){this.setState({ dialogOpenWarning: true, dialogMessage: 'Email could not be sent, try again', dialogTitle: 'Email Error', })}
      if (this.state.language === 'French'){this.setState({ dialogOpenWarning: true, dialogMessage: "Impossible d'envoyer l'e-mail, essayez à nouveau", dialogTitle: 'Email Error', })}
      if (this.state.language === 'Spanish'){this.setState({ dialogOpenWarning: true, dialogMessage: 'Email no pudo ser enviado, inténtelo nuevamente', dialogTitle: 'Email Error', })}
      if (this.state.language === 'Portuguese'){this.setState({ dialogOpenWarning: true, dialogMessage: 'Não foi possível enviar o e-mail, tente novamente', dialogTitle: 'Email Error', })}
      if (this.state.language === 'Swedish'){this.setState({ dialogOpenWarning: true, dialogMessage: 'E-post kunde inte skickas, försök igen', dialogTitle: 'Email Error', })}
      if (this.state.language === 'Netherlands'){this.setState({ dialogOpenWarning: true, dialogMessage: 'E-mail kon niet worden verzonden, probeer het opnieuw', dialogTitle: 'Email Error', })}
      if (this.state.language === 'Russian'){this.setState({ dialogOpenWarning: true, dialogMessage: 'Не удалось отправить письмо, попробуйте еще раз', dialogTitle: 'Email Error', })}
      if (this.state.language === 'Japanese'){this.setState({ dialogOpenWarning: true, dialogMessage: 'メールを送信できませんでした。もう一度お試しください', dialogTitle: 'Email Error', })}
      if (this.state.language === 'Chinese'){this.setState({ dialogOpenWarning: true, dialogMessage: '无法发送电子邮件，请重试', dialogTitle: 'Email Error', })}
      if (this.state.language === 'German'){this.setState({ dialogOpenWarning: true, dialogMessage: 'E-Mail konnte nicht gesendet werden. Versuchen Sie es erneut', dialogTitle: 'Email Error', })}
      if (this.state.language === 'Italian'){this.setState({ dialogOpenWarning: true, dialogMessage: "Impossibile inviare l'e-mail, riprovare", dialogTitle: 'Email Error', })}
    }

    render() {
        const {userDetails} = this.props
        let metaValueX = ''
        let jobTitleX = ''
        let titleX = ''
        let subtitleX = ''
        if (this.state.language === 'English'){
          metaValueX = userDetails.metaValue
          jobTitleX = userDetails.jobTitle
          titleX = "Contact"
          subtitleX = "About us"
        }
        if (this.state.language === 'French'){
          metaValueX = userDetails.metaValue_fr
          jobTitleX = userDetails.jobTitle_fr
          titleX = "Contact"
          subtitleX = "À propos de..."
        }
        if (this.state.language === 'Spanish'){
          metaValueX = userDetails.metaValue_es
          jobTitleX = userDetails.jobTitle_es
          titleX = "Contacto"
          subtitleX = "Acerca de...."
        }
        if (this.state.language === 'Portuguese'){
          metaValueX = userDetails.metaValue_pt
          jobTitleX = userDetails.jobTitle_pt
          titleX = "Contato"
          subtitleX = "Sobre"
        }
        if (this.state.language === 'Swedish'){
          metaValueX = userDetails.metaValue_sv
          jobTitleX = userDetails.jobTitle_sv
          titleX = "Kontakta"
          subtitleX = "Om"
        }
        if (this.state.language === 'Netherlands'){
          metaValueX = userDetails.metaValue_nl
          jobTitleX = userDetails.jobTitle_nl
          titleX = "Contact"
          subtitleX = "Over"
        }
        if (this.state.language === 'Russian'){
          metaValueX = userDetails.metaValue_ru
          jobTitleX = userDetails.jobTitle_ru
          titleX = "контакт"
          subtitleX = "О нас"
        }
        if (this.state.language === 'Japanese'){
          metaValueX = userDetails.metaValue_jp
          jobTitleX = userDetails.jobTitle_jp
          titleX = "接触"
          subtitleX = "私たちに関しては"
        }
        if (this.state.language === 'Chinese'){
          metaValueX = userDetails.metaValue_cn
          jobTitleX = userDetails.jobTitle_cn
          titleX = "接触"
          subtitleX = "关于我们"
        }
        if (this.state.language === 'German'){
          metaValueX = userDetails.metaValue_de
          jobTitleX = userDetails.jobTitle_de
          titleX = "Kontakt"
          subtitleX = "Über uns"
        }
        if (this.state.language === 'Italian'){
          metaValueX = userDetails.metaValue_it
          jobTitleX = userDetails.jobTitle_it
          titleX = "Contatto"
          subtitleX = "Riguardo a noi"
        }

        let colorThemeX = 'Blue'
        let colorThemeX2 = 'info'
        if (localStorage["colorTheme"]) {colorThemeX = localStorage.getItem('colorTheme')}
        if (colorThemeX === 'Blue') {colorThemeX2 = 'info'}
        if (colorThemeX === 'Green') {colorThemeX2 = 'success'}
        if (colorThemeX === 'Grey') {colorThemeX2 = 'secondary'}
        if (colorThemeX === 'Dark') {colorThemeX2 = 'dark'}

        return (
            <>
              { !this.state.colorDark ?
                <Container fluid className="px-0" style={ this.state.colorDark ? { backgroundColor:'#060a0f'} : {}}>
                  <Card theme={colorThemeX2} style={{ color: "white" }}>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            &nbsp;&nbsp;<div className="fa fa-info"></div>
                          </td>
                          <td >
                            &nbsp;&nbsp;<FormattedMessage id="aboutcontact.indicate" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                </Container>
              : null
              }
              <Container fluid className="main-content-container px-4" style={ this.state.colorDark ? { backgroundColor:'#060a0f'} : {}}>
                <Row noGutters className="page-header py-4">
                  <Col lg="5" className="mb-4">
                    <TituloPagina
                      sm="4"
                      title={titleX}
                      subtitle={subtitleX}
                      className="text-sm-left"
                    />
                  </Col>
                <Col lg="7" className="mb-4"></Col>
                </Row>
                <ConfirmacionWarning
                    handleDialog={this.handleDialog}
                    dialogMessage={this.state.dialogMessage}
                    dialogOpen={this.state.dialogOpenWarning}
                    dialogTitle={this.state.dialogTitle}
                />
                <ConfirmacionAccept
                    handleDialog={this.handleDialog}
                    dialogMessage={this.state.dialogMessage}
                    dialogOpen={this.state.dialogOpenAccept}
                    dialogTitle={this.state.dialogTitle}
                />
                <Row>
                  <Col lg="7" className="mb-4">
                    <Card small className="mb-4 pt-3" style={ this.state.colorDark ? { backgroundColor:'#0b151d'} : {}}>
                      <Card.Header className="border-bottom text-center" style={ this.state.colorDark ? { backgroundColor:'#0b151d'} : {}}>
                        <a href="https://xck.app">
                           <h4 className="mb-0">{userDetails.name}</h4>
                        </a>
                        <a href="/crosscheck.html">
                           <span className="text-muted d-block mb-2">{jobTitleX}</span>
                        </a>
                        <a href="https://twitter.com/CheckParadigma" target="_blank" rel="noopener noreferrer">
                          <Button pill outline size="sm" className="mb-2">
                            <i className="material-icons mr-1">person_add</i> <FormattedMessage id="aboutcontact.follow" />
                          </Button>
                        </a>
                      </Card.Header>
                      <ListGroup flush>
                        <ListGroup.Item className="p-4 text-center" style={ this.state.colorDark ? { backgroundColor:'#0b151d'} : {}}>
                          <span><h6>{metaValueX}</h6></span>
                          <div>
                            <Button pill outline size="sm" className="mb-2" onClick={this.aboutCrosscheck}><FormattedMessage id="aboutcontact.aboutcrosscheck" /></Button>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col lg="5" className="mb-4">
                    <Card small className="mb-4" style={ this.state.colorDark ? { backgroundColor:'#0b151d'} : {}}>
                      <ListGroup flush>
                        <ListGroup.Item className="p-3" style={ this.state.colorDark ? { backgroundColor:'#0b151d'} : {}}>
                          <Row>
                            <Col>
                              <Form>
                                <Row form>
                                  {/* Name */}
                                  <Col className="form-group">
                                    <label style={ this.state.colorDark ? {color:'#c6c6c6', fontSize:16} : {color:'#1a1a1a', fontSize:16}} htmlFor="feName"><FormattedMessage id="aboutcontact.name" /></label>
                                    <Form.Control
                                      id="feName"
                                      style={ this.state.colorDark ? { backgroundColor:'#111f2c'} : {}}
                                      placeholder="Name"
                                      ref={this.c01Contact}
                                      onChange={() => {}}
                                    />
                                  </Col>
                                </Row>
                                <Row form>
                                  {/* Email */}
                                  <Col className="form-group">
                                    <label style={ this.state.colorDark ? {color:'#c6c6c6', fontSize:16} : {color:'#1a1a1a', fontSize:16}} htmlFor="feEmail"><FormattedMessage id="aboutcontact.emailaddress" /></label>
                                    <Form.Control
                                      type="email"
                                      id="feEmail"
                                      style={ this.state.colorDark ? { backgroundColor:'#111f2c'} : {}}
                                      placeholder="Email Address"
                                      ref={this.c02Contact}
                                      onChange={() => {}}
                                      autoComplete="email"
                                    />
                                  </Col>
                                </Row>
                                <Row form>
                                  {/* Phone */}
                                  <Col className="form-group">
                                    <label style={ this.state.colorDark ? {color:'#c6c6c6', fontSize:16} : {color:'#1a1a1a', fontSize:16}} htmlFor="feCity"><FormattedMessage id="aboutcontact.phone" /></label>
                                    <Form.Control
                                      id="fePhone"
                                      style={ this.state.colorDark ? { backgroundColor:'#111f2c'} : {}}
                                      placeholder="Phone"
                                      ref={this.c03Contact}
                                      onChange={() => {}}
                                    />
                                  </Col>
                                </Row>
                                <Row form>
                                  {/* Message */}
                                  <Col className="form-group">
                                    <label style={ this.state.colorDark ? {color:'#c6c6c6', fontSize:16} : {color:'#1a1a1a', fontSize:16}} htmlFor="feMessage"><FormattedMessage id="aboutcontact.message" /></label>
                                    <Form.Control
                      								as="textarea"
                                      id="feMessage"
                                      style={ this.state.colorDark ? { backgroundColor:'#111f2c'} : {}}
                                      rows="5"
                                      ref={this.c04Contact}
                                    />
                                  </Col>
                                </Row>
                                <Button theme="accent" onClick={this.sendMail} ><FormattedMessage id="aboutcontact.send" /></Button>
                              </Form>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
          );
      }
}

AboutContact.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

AboutContact.defaultProps = {
  userDetails: {
    name: "Paradigma",
    avatar: require("../images/logo20.svg"),
    jobTitle: "Research and Development",
    jobTitle_es: "Investigación & Desarrollo",
    jobTitle_fr: "Recherche et Développement",
    jobTitle_pt: "Investigação e Desenvolvimento",
    jobTitle_sv: "Forskning och Utveckling",
    jobTitle_nl: "Onderzoek en Ontwikkeling",
    jobTitle_ru: "Исследования и разработки",
    jobTitle_jp: "研究開発",
    jobTitle_cn: "研究与开发",
    jobTitle_de: "Forschung und Entwicklung",
    jobTitle_it: "Ricerca e Sviluppo",
    performanceReportTitle: "Workload",
    "aboutcontact.name": "Name",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue: "Paradigma Global is a provider of distributed technology solutions with high added value, helping to meet the objectives of its customers. Paradigma has specialized in distributed technologies (blockchain, smart contract), internet of things (IoT), mobile (cell phones, tablets), Cloud applications and fixed and mobile Internet convergence, as well as infrastructure services (networks, storage of data, portals, websites) and data analysis.",
    metaValue_es: "Paradigma Global es un proveedor de soluciones de tecnología distribuida con alto valor agregado, ayudando a cumplir los objetivos de sus clientes. Paradigma se ha especializado en tecnologías distribuidas (blockchain, contratos inteligentes), internet de las cosas (IoT), móvil (teléfonos celulares, tabletas), aplicaciones en la nube y convergencia de Internet fija y móvil, así como servicios de infraestructura (redes, almacenamiento de datos, portales, sitios web) y análisis de datos.",
    metaValue_fr: "Paradigma Global est un fournisseur de solutions technologiques distribuées à forte valeur ajoutée permettant de répondre aux objectifs de ses clients. Paradigma s'est spécialisé dans les technologies distribuées (blockchain, smart contract), l'Internet des objets (IoT), la téléphonie mobile (téléphones portables, tablettes), les applications cloud et la convergence Internet fixe et mobile, ainsi que les services d'infrastructure (réseaux, stockage de données, portails, sites Web) et l’analyse des données.",
    metaValue_pt: "A Paradigma Global é fornecedora de soluções de tecnologia distribuída com alto valor agregado, ajudando a atender aos objetivos de seus clientes. A Paradigma se especializou em tecnologias distribuídas (blockchain, contrato inteligente), Internet das Coisas (IoT), dispositivos móveis (telefones celulares, tablets), aplicativos em nuvem e convergência de Internet fixa e móvel, além de serviços de infraestrutura (redes, armazenamento de dados, portais, sites) e análise de dados.",
    metaValue_sv: "Paradigma Global är en leverantör av distribuerade teknologilösningar med högt mervärde som hjälper till att uppfylla sina kunders mål. Paradigma har specialiserat sig på distribuerad teknik (blockchain, smart contract), internet på saker (IoT), mobil (mobiltelefoner, surfplattor), molnapplikationer och fast och mobil internetkonvergens, samt infrastrukturtjänster (nätverk, lagring av data, portaler, webbplatser) och dataanalys.",
    metaValue_nl: "Paradigma Global is een leverancier van gedistribueerde technologische oplossingen met een hoge toegevoegde waarde en helpt de doelstellingen van zijn klanten te bereiken. Paradigma heeft zich gespecialiseerd in gedistribueerde technologieën (blockchain, smart contract), internet of things (IoT), mobiel (mobiele telefoons, tablets), cloudapplicaties en convergentie van vast en mobiel internet, evenals infrastructuurdiensten (netwerken, opslag van gegevens, portals , websites) en gegevensanalyse.",
    metaValue_ru: "Paradigma Global является поставщиком распределенных технологических решений с высокой добавленной стоимостью, помогая удовлетворить цели своих клиентов. Paradigma специализируется на распределенных технологиях (блокчейн, смарт-контракт), интернете вещей (IoT), мобильных устройствах (мобильные телефоны, планшеты), облачных приложениях и конвергенции фиксированного и мобильного интернета, а также на инфраструктурных услугах (сети, хранилище данных, порталы, сайты) и анализ данных.",
    metaValue_jp: "Paradigma Globalは、付加価値の高い分散技術ソリューションのプロバイダーであり、顧客の目的の達成を支援しています。 パラディグマは、分散テクノロジー（ブロックチェーン、スマートコントラクト）、モノのインターネット（IoT）、モバイル（携帯電話、タブレット）、クラウドアプリケーション、固定およびモバイルインターネットコンバージェンス、およびインフラストラクチャサービス（ネットワーク、データのストレージ、ポータル）に特化しています 、ウェブサイト）およびデータ分析。",
    metaValue_ch: "Paradigma Global是一家具有高附加值的分布式技术解决方案提供商，有助于实现客户的目标。 Paradigma专注于分布式技术（区块链，智能合约），物联网（IoT），移动（手机，平板电脑），云应用以及固定和移动互联网融合，以及基础设施服务（网络，数据存储，门户网站），网站）和数据分析。",
    metaValue_de: "Paradigma Global ist ein Anbieter von verteilten Technologielösungen mit hohem Mehrwert, die dazu beitragen, die Ziele seiner Kunden zu erreichen. Paradigma hat sich auf verteilte Technologien (Blockchain, Smart Contract), das Internet der Dinge (IoT), Mobilgeräte (Handys, Tablets), Cloud-Anwendungen und Konvergenz von Festnetz- und Mobilinternet sowie Infrastrukturdienste (Netzwerke, Speicherung von Daten, Portale spezialisiert , Websites) und Datenanalyse.",
    metaValue_it: "Paradigma Global è un fornitore di soluzioni tecnologiche distribuite ad alto valore aggiunto, contribuendo al raggiungimento degli obiettivi dei propri clienti. Paradigma è specializzata in tecnologie distribuite (blockchain, smart contract), internet of things (IoT), mobile (telefoni cellulari, tablet), applicazioni cloud e convergenza Internet fissa e mobile, nonché servizi di infrastruttura (reti, archiviazione di dati, portali , siti Web) e analisi dei dati."
  }
};

export default withRouter(AboutContact)
