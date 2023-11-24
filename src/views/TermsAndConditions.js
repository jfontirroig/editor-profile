import React, {Component} from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Container,
  Alert
} from "shards-react";

import TituloPagina from "../components/common/TituloPagina";

//translate
import { FormattedMessage } from 'react-intl';

class TermsAndConditions extends Component {

  constructor(props, context) {
      super();

      this.state = {
        languaje: 'English',
        colorDark: false,
      }
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

  render() {
       const mensaje = `
       Last updated: July 27, 2019

       Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://xck.app website
       (together, or individually, the "Service") operated by Paradigma Global  ("us", "we", or "our").

       Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors,
       users and others who wish to access or use the Service.

       By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you do not have permission
       to access the Service.

       1. Communications

       By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send.
       However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any
       email we send.

       2. Content

       Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material
       ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
       By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use
       it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service
       does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right
       to terminate the account of anyone found to be infringing on a copyright.

       You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting
       those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through the Service. However, by
       posting Content using the Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute
       such Content on and through the Service. You agree that this license includes the right for us to make your Content available to other users of the
       Service, who may also use your Content subject to these Terms.

       Paradigma Global  has the right but not the obligation to monitor and edit all Content provided by users.

       In addition, Content found on or through this Service are the property of Paradigma Global  or used with permission. You may not distribute, modify,
       transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without
       express advance written permission from us.

       3. Accounts

       When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete,
       and current at all times.

       Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.

       You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your
       computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password,
       whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or
       unauthorized use of your account.

       You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to
       any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive,
       vulgar or obscene.

       4. Intellectual Property

       The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of
       Paradigma Global and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
       Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Paradigma Global.

       5. Links To Other Web Sites

       Our Service may contain links to third party web sites or services that are not owned or controlled by Paradigma Global.

       Paradigma Global  has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or
       services.

       We do not warrant the offerings of any of these entities/individuals or their websites.

       You acknowledge and agree that Paradigma Global  shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged
       to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites
       or services.

       We strongly advise you to read the terms and conditions and privacy policies of any third party web sites or services that you visit.

       6. Termination

       We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for
       any reason  whatsoever and without limitation, including but not limited to a breach of the Terms.

       If you wish to terminate your account, you may simply discontinue using the Service.

       All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership
       provisions, warranty disclaimers, indemnity and limitations of liability.

       7. Indemnification

       You agree to defend, indemnify and hold harmless Paradigma Global  and its licensee and licensors, and their employees, contractors, agents, officers
       and directors, from and  against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited
       to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password;
       b) a breach of these Terms, or c) Content posted on the Service.

       8. Limitation Of Liability

       In no event shall Paradigma Global, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental,
       special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting
       from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any
       content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty,
       contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if
       a remedy set forth herein is found to have failed of its essential purpose.

       9. Disclaimer

       Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without
       warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular
       purpose, non-infringement or course of performance.

       Paradigma Global  its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available
       at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d)
       the results of using the Service will meet your requirements.

       10. Exclusions

       Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental
       damages, so the limitations above may not apply to you.

       11. Governing Law

       These Terms shall be governed and construed in accordance with the laws of United States, without regard to its conflict of law provisions.

       Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is
       held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire
       agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.

       12. Changes

       We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30
       days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

       By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree
       to the new terms, you are no longer  authorized to use the Service.

       13. Contact Us

       If you have any questions about these Terms, please contact us.`

       let titleX = "Terms & Condition"
       let subtitleX = "Review"
       if (this.state.language === 'English'){
         titleX = "Terms & Condition"
         subtitleX = "Review"
       }
       if (this.state.language === 'French'){
         titleX = "Termes & Conditions"
         subtitleX = "Review"
       }
       if (this.state.language === 'Spanish'){
         titleX = "Términos y condiciones"
         subtitleX = "Revisar"
       }
       if (this.state.language === 'Portuguese'){
         titleX = "Termos e Condições"
         subtitleX = "Revisão"
       }
       if (this.state.language === 'Swedish'){
         titleX = "Villkor"
         subtitleX = "Review"
       }
       if (this.state.language === 'Netherlands'){
         titleX = "Algemene voorwaarden"
         subtitleX = "Recensie"
       }
       if (this.state.language === 'Russian'){
         titleX = "Условия использования"
         subtitleX = "обзор"
       }
       if (this.state.language === 'Japanese'){
         titleX = "利用規約"
         subtitleX = "復習"
       }
       if (this.state.language === 'Chinese'){
         titleX = "条款和条件"
         subtitleX = "回顾"
       }
       if (this.state.language === 'German'){
         titleX = "Allgemeine Geschäftsbedingungen"
         subtitleX = "Rückblick"
       }
       if (this.state.language === 'Italian'){
         titleX = "Termini e condizioni"
         subtitleX = "Recensione"
       }


          return (
            <>
              { !this.state.colorDark ?
                <Container fluid className="px-4">
                  <Alert className="mb-0">
                    <i className="fa fa-info mx-2"></i>
                  </Alert>
                </Container>
              : null
              }
              <Container fluid className="main-content-container px-4" style={ this.state.colorDark ? { backgroundColor:'#28292d'} : {}}>
                <Row noGutters className="page-header py-4">
                  <Col lg="8" className="mb-4">
                    <TituloPagina
                      sm="4"
                      title={titleX}
                      subtitle={subtitleX}
                      className="text-sm-left"
                    />
                  </Col>
                  <Col lg="4" className="mb-4"></Col>
                </Row>
                <Row>
                  <Col lg="12" className="mb-4">
                    <Card small className="mb-4 pt-3" style={ this.state.colorDark ? { backgroundColor:'#6c757d'} : {}}>
                      <ListGroup flush>
                        <ListGroupItem className="p-0" style={ this.state.colorDark ? { backgroundColor:'#6c757d'} : {}}>
                          <span>
                            <h6>
                              <ReactMarkdown source = { mensaje } />
                            </h6>
                          </span>
                          <Link to = "/">
                             <div className="text-center">
                                 <Button theme="accent"><FormattedMessage id="simulator.return" /></Button>
                             </div>
                             <br></br>
                          </Link>
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
        );
      }
 }


export default TermsAndConditions;
