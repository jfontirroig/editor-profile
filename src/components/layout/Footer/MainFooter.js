import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

class MainFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: '',
    }
  }

  componentWillMount() {
    if (!localStorage["language"]) {
      localStorage.setItem('language','English')
      this.setState({language: 'English'})
    }else{
      const languageX = localStorage.getItem('language')
      this.setState({language: languageX})
    }
  }

  render() {
      const { menuItems, contained, copyright, colorDark } = this.props
      const languageX = this.state.language
      return (
        <footer className="main-footer d-flex p-2 px-3 border-top" style={ colorDark ? { backgroundColor:'#0c151d'} : {}}>
          <Container fluid={contained} style={ colorDark ? { backgroundColor:'#0c151d'} : {}}>
            <Row style={{fontSize:10}}>
              <Col md="1" className="form-group"></Col>
              <Col md="8" className="form-group">
                <Nav>
                  {menuItems.map((item, idx) => {
                    let descripX = ''
                    if (languageX === 'English'){
                     descripX = item.title
                    }
                    if (languageX === 'Spanish'){
                     descripX = item.title_es
                    }
                    if (languageX === 'French'){
                     descripX = item.title_fr
                    }
                    if (languageX === 'Portuguese'){
                     descripX = item.title_pt
                    }
                    if (languageX === 'Swedish'){
                     descripX = item.title_sv
                    }
                    if (languageX === 'Netherlands'){
                     descripX = item.title_nl
                    }
                    if (languageX === 'Russian'){
                     descripX = item.title_ru
                    }
                    if (languageX === 'Japanese'){
                     descripX = item.title_jp
                    }
                    if (languageX === 'Chinese'){
                     descripX = item.title_cn
                    }
                    if (languageX === 'German'){
                     descripX = item.title_de
                    }
                    if (languageX === 'Italian'){
                     descripX = item.title_it
                    }
                    return (
                      <NavItem key={idx}>
                        <NavLink tag={Link} to={item.to}>
                           {descripX}
                        </NavLink>
                      </NavItem>
                  )})}
                </Nav>
              </Col>
              <Col md="2" className="form-group">
                <br></br>
                <span className="copyright ml-auto my-auto mr-2"><a style={{fontSize:12}} href="https://paradigma.global" target="_blank" rel="noopener noreferrer">{copyright}</a></span>
              </Col>
              <Col md="1" className="form-group"></Col>
            </Row>
          </Container>
        </footer>
     )
  }
};

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "© 2023 Paradigma Global",
  menuItems: [
    {
      title: "Home",
      title_es: "Inicio",
      title_fr: "Accueil",
      title_pt: "Página Inicial",
      title_sv: "Initiering",
      title_nl: "Inwijding",
      title_ru: "инициирование",
      title_jp: "ホーム",
      title_cn: "引发",
      title_de: "Zuhause",
      title_it: "Iniziazione",
      to: "/"
    },
    {
      title: "Privacy Policy",
      title_es: "Políticas de Privacidad",
      title_fr: "Politique de Confidentialité",
      title_pt: "Política Privacidade",
      title_sv: "Integritetspolicy",
      title_nl: "Privacybeleid",
      title_ru: "Политика конфиденциальности",
      title_jp: "プライバシーポリシー",
      title_cn: "隐私政策",
      title_de: "Datenschutzerklärung",
      title_it: "Informativa sulla privacy",
      to: "/policy"
    },
    {
      title: "Terms and Conditions",
      title_es: "Términos y Condiciones",
      title_fr: "Termes et Conditions",
      title_pt: "Termos e Condições",
      title_sv: "Villkor",
      title_nl: "Voorwaarden",
      title_ru: "Условия и положения",
      title_jp: "規約と条件",
      title_cn: "条款和条件",
      title_de: "Geschäftsbedingungen",
      title_it: "Termini e Condizioni",
      to: "/terms"
    },
    {
      title: "About/Contact",
      title_es: "Acerca de/Contacto",
      title_fr: "A propos/Contact",
      title_pt: "Sobre/Contato",
      title_sv: "Om/Kontakt",
      title_nl: "Over/Contact",
      title_ru: "О нас/Контакты",
      title_jp: "について/お問い合わせ",
      title_cn: "关于/联系",
      title_de: "Über/Kontakt",
      title_it: "Informazioni/Contatti",
      to: "/about/contact"
    },
  ]
};

export default MainFooter;
