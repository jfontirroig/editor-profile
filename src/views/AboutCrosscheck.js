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
  Container
} from "shards-react";

import TituloPagina from "../components/common/TituloPagina";

//translate
import { FormattedMessage } from 'react-intl';

class AboutCrosscheck extends Component {
  constructor(props, context) {
      super();

      this.state = {
        languaje: 'English',
      }

      // Define some Markdown content
      this.ContentMarkdown =`
      CrossCheck by Paradigma is a secure, decentralized, automatic, paperless contract monitoring ( with IoT devices or not) between members, that certifies transactions, reducing cost and increasing your business
      profile.

      You are only three steps away from your own smart contract:

      1.	Agree with business partners or team members the conditions to be established using a smart contract format provided.

      2.	Monitor your smart contract. Check any time if the terms of the agreement have been fulfilled.

      3.	Get paid or pay only if conditions are met. Alternatively receive a certification or alarm according to your contract.


      Introduction (problem at its basis)

      CrossCheck by Paradigma has been inspired by a culture of cooperation and reciprocity in small communities. Paradigma has always been at the forefront of helping communities in need for more than 20 years.
      On the other hand, it acknowledges from its experience that people, groups, companies and organizations have difficulties to cooperate with each other, mainly protecting their acquired knowledge, status
      and resources. In this reality, a decentralized economy will not necessarily develop in a natural way, if people do not have the tools to do so. It is for that reason that CrossCheck comes into
      life. Taking advantage of the trustless based system inherent to blockchain technology, CrossCheck opens the possibility for development of a very wide range of new businesses.

      From a centralized to a decentralized society

      A society can be seen as a stream of events in time from which some will have more impact than others. From such events, rules, procedures, legislation and a sense of what is right or wrong will guide our
      feelings, creating a culture around it. From within such environment, organizations and institutions develop that reaffirm our status and thus creating a new way of thinking. Centralization for that matter
      has become an important way to organize our society. This does not mean that this is the best way forward and therefore decentralization opens a new direction. In a decentralized society less, power will be
      centralized and will be combining both styles. We believe also that a decentralized economy can empower people, be more creative and protect better individuals’ creations and privacy.

      Providing basic tools to start decentralizing

      CrossCheck by Paradigma is a system for cross checking events. The cross checking of events is done by agreed procedures set in a smart contract in a similarly to a business legal contract. The agreed paragraphs
      of such a contract will start to form the basis for our own community forming a cluster of hubs and eventually a network that can stand on his own as a business. When conditions are off limit, the contract
      will activate and notify the parties sharing the information of such deviation. When conditions are within the agreed, business will be as usual. As per contract, information will be tracked and accumulated in
      a distributed manner protecting privacy. An inbuilt flexibility will allow to re-evaluate the rules that form the core of the business upon which it was created and allow to start a new line of business when
      needed.

      Solving the soggy pizza problem

      A pizzeria wants to deliver its products in the best conditions to his customer. For that purpose, it hires an individual or company that takes the pizza to its destination. Great! How often have we had pizza
      delivered lukewarm, cold or soggy? Wouldn’t it be great if the restaurant, its delivery and costumer could keep track of the temperature, humidity in real time to measure the best conditions?

      CrossCheck by Paradigma is a Dapp that tracks data in a ledger creating smart contracts for specific business agreements and collaborations, allowing monitoring of product conditions with IOT devices.

      The pizza restaurant will learn best practices and improve delivery conditions creating a network of pizzerias that provide extra quality in its delivery process.

      In this case a document is created that outlines the procedure and the right parameters of time, temperature and humidity for its delivery. Additionally a rating system can be added to the contract further
      deepening the understanding of what is happening.New businesses could be developed too, specializing in the delivery of food.

      As the system tracks delivery and satisfaction through reviews from client and incidents at transport they will be able to deliver better pizzas and be more competitive.

      The client will learn from reviews the best pizza restaurant and will know which pizzerias have this quality cross-check system. It is possible that some clients will develop their own network of delivery with
      specific requests on their pizza altering the initial delivery contract.

      Finally, the delivery person can track his own data and discover where you should be geo-positioned to receive more delivery requests.


     Monitoring temperature at work

      We want to track temperature in our working environment improving the office workplace environment, maintenance and or repair of equipment.

      Who participates in this network and what can it do for them?

      1.	The building manager renting out office space. He or she will have knowledge of the offices using more electricity than contractually agreed, enabling automatically to charge the overspending.

      2.	The landlord wanting to have a great and modern working space will be able to change the temperature from his phone.

      3.	The service and maintenance companies for the building equipment such as air conditioning will receive notification when to repair a cooling unit.

      CrossCheck by Paradigma will enable to cross-check environment parameters and automatically send a notification to all involved. As the air-conditioning temperature parameters are back to normal after 24 hours,
      it will automatically pay the company for its repair. This tracking of temperature is not new. What is new is that this will happen in a secure decentralized manner, paperless and with an automatic payment
      system providing a certification if needed.

      CrossCheck by Paradigma is a platform for different business networks such as described above, with the extra benefit that each can be implemented with its own characteristics. Similarly, to the pizza network,
      this cluster can be developed in any direction the market needs, altering the variables and their ranges.


      Monitoring ship containers

      Problem: temperature can drop or rise inside a reefer container enough to damage its contents.

      Containers are being tracked with IoT devices and a bill of lading registers all the relevant information for shipping. The bill of lading is transformed into a smart contract and the device will monitor
      among other the temperature range acceptable for producer, carrier and buyer. Real time tracking enables to make decisions on the go avoiding in this case great potential losses. The contract will make
      further possible the following:

      1.	Tracking which carrier is moving the container.

      2.	Tracking where the container is located.

      3.	Tracking if the environment conditions inside the container are the correct ones.

      4.	Tracking if a container is being open, shaken or altered in some way.

      5.	Tracking if the geo-positioning correspond with the timetable of location.

      6.	Tracking if the container needs to be brought to a different harbor due to accelerated ripening of fruit.

      7.	Arrange an automatic payment at arrival or arrange an automatic demurrage fine in case of delay.

      8.	Make possible a paperless documentation handover.

      Let’s assume that a supermarket starts tracking its avocados and it provides a better business results avoiding potential losses because of temperature variations. The supermarket decides then to start
      the import of bananas. A new contract will be created based on the original success, extending potential gains to this new product. From here a new hub of information and knowledge can be acquired and
      immediately be put into practice in a decentralized network.

      Just as centralized companies accumulate knowledge to gain advantage from competitors, each smart contract that is properly functioning and making money will be accumulating valuable know how. The hubs
      or clusters of businesses that have the correct variables working, will succeed and be more competitive providing more traffic and more money exchange.

      We sincerely believe that the underlying blockchain technology together with Blockstack will be a powerful way forward and CrossCheck is committed to create the best experience possible in
      discovering new ways for successful businesses in a decentralized economy.
      `;
  }

  componentWillMount() {
    const languageX = localStorage.getItem('language')
    if (languageX === undefined || languageX === ''){
      this.setState({ language: 'English' })
    }else{
      this.setState({ language: languageX })
    }
  }

  render() {

      let titleX = "CrossCheck"
      let subtitleX = "About"
      let aboutX = "About CrossCheck"
      if (this.state.language === 'English'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'French'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Spanish'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Portuguese'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Swedish'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Netherlands'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Russian'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Japanese'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Chinese'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'German'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }
      if (this.state.language === 'Italian'){
        titleX = "CrossCheck"
        subtitleX = "About"
        aboutX = "About CrossCheck"
      }

      let colorThemeX = 'Blue'
      let colorThemeX2 = 'info'
      if (localStorage["colorTheme"]) {colorThemeX = localStorage.getItem('colorTheme')}
      if (colorThemeX === 'Blue') {colorThemeX2 = 'info'}
      if (colorThemeX === 'Green') {colorThemeX2 = 'success'}
      if (colorThemeX === 'Grey') {colorThemeX2 = 'secondary'}

       return (
            <div>
              <Container fluid className="px-0">
                <Card theme={colorThemeX2} style={{ color: "white" }}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          &nbsp;&nbsp;<div className="fa fa-info"></div>
                        </td>
                        <td>
                          &nbsp;&nbsp;{aboutX}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </Container>
              <Container fluid className="main-content-container px-4">
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
                <Row>
                  <Col lg="12" className="mb-4">
                    <Card small className="mb-4 pt-3">
                      <ListGroup flush>
                        <ListGroupItem className="p-0">
                          <div>
                            <ReactMarkdown
                                escapeHtml={true}
                                source={this.ContentMarkdown}
                            />
                          </div>
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
            </div>
        );
      }
 }


export default AboutCrosscheck;
