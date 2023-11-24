
//Importar Librerías
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import routes from "./routes";
import Login from './components/login';
import { AppConfig, UserSession } from '@stacks/connect';
import { Connect } from '@stacks/connect-react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/shards-dashboards.1.1.0Blue.min.css';
import Loader from './components/loader'

import { IntlProvider } from "react-intl";
import messages_es from "./assets/i18n/es.json";
import messages_en from "./assets/i18n/en.json";
import messages_fr from "./assets/i18n/fr.json";
import messages_pt from "./assets/i18n/pt.json";
import messages_sv from "./assets/i18n/sv.json";
import messages_nl from "./assets/i18n/nl.json";
import messages_ru from "./assets/i18n/ru.json";
import messages_jp from "./assets/i18n/jp.json";
import messages_cn from "./assets/i18n/cn.json";
import messages_de from "./assets/i18n/de.json";
import messages_it from "./assets/i18n/it.json";

function App() {
    //Inicializar States
    const [userSession,setUserSession] = useState(new UserSession({appConfig: new AppConfig(['store_write', 'publish_data'])}))

    //Inicializar LocalStorage
    if (!localStorage["language"]) {
      localStorage.setItem('language', 'English')
    }
    let colorThemeX = 'Blue'
    if (localStorage["colorTheme"]) {
      colorThemeX = localStorage.getItem('colorTheme')
      if (colorThemeX !== 'Blue'){
         import(`./styles/shards-dashboards.1.1.0${colorThemeX}.min.css`).then(module => {})
      }
    }else{
      localStorage.setItem('colorTheme',colorThemeX)
    }
    if (!localStorage["serverStacks"]) {
      localStorage.setItem('serverStacks','MainNet')
    }
    if (!localStorage["languageCryptocurrency"]) {
      localStorage.setItem('languageCryptocurrency','Stacks (STX)')
    }
    if (!localStorage["cryptoCurrency"]) {
      localStorage.setItem('cryptoCurrency','Stacks (STX)')
    }

    let language3 = ''
    if (localStorage["languageOrigin"]) {
       const languageOriginX = localStorage.getItem('languageOrigin')
       if (languageOriginX === 'From Browser'){
         language3 = window.navigator.language||navigator.browserLanguage;
         language3 = language3.substring(0,2);
         if (language3 !=='en' && language3 !=='es' && language3 !=='fr' && language3 !=='pt' && language3 !=='sv' && language3 !=='nl' && language3 !=='ru' && language3 !=='jp' && language3 !=='cn' && language3 !=='de' && language3 !=='it'){
           language3 ='en'
         }
       }else{
         const languageX = localStorage.getItem('language')
         language3 = ''
         if (languageX === undefined || languageX === null || languageX === '') {
           language3 = 'en'
         } else {
           if (languageX === 'English') {language3 = 'en'}
           if (languageX === 'Spanish') {language3 = 'es'}
           if (languageX === 'French') {language3 = 'fr'}
           if (languageX === 'Portuguese') {language3 = 'pt'}
           if (languageX === 'Swedish') {language3 = 'sv'}
           if (languageX === 'Netherlands') {language3 = 'nl'}
           if (languageX === 'Russian') {language3 = 'ru'}
           if (languageX === 'Japanese') {language3 = 'jp'}
           if (languageX === 'Chinese') {language3 = 'cn'}
           if (languageX === 'German') {language3 = 'de'}
           if (languageX === 'Italian') {language3 = 'it'}
         }
       }
    }else{
       language3 = window.navigator.language||navigator.browserLanguage;
       language3 = language3.substring(0,2);
       if (language3 !=='en' && language3 !=='es' && language3 !=='fr' && language3 !=='pt' && language3 !=='sv' && language3 !=='nl' && language3 !=='ru' && language3 !=='jp' && language3 !=='cn' && language3 !=='de' && language3 !=='it'){
         language3 ='en'
       }
       localStorage.setItem('languageOrigin','From Browser')
    }

   const colorTheme = React.createContext()

   const messages = {
        'es': messages_es,
        'en': messages_en,
        'fr': messages_fr,
        'pt': messages_pt,
        'sv': messages_sv,
        'nl': messages_nl,
        'ru': messages_ru,
        'jp': messages_jp,
        'cn': messages_cn,
        'de': messages_de,
        'it': messages_it
      }

    let location = useLocation();
    useEffect( () => {
      location = async function() {
        if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
          const userData = await userSession.handlePendingSignIn()
          if (!userData.username || userData.username === null) {
            throw new Error('This app requires a username')
          }
        } else {
          location = location.origin + `?lang=${language3}#/profile`
          return location
        }
      }
      return () => {}
    },[userSession])

    const authOptions = {
      appDetails: {
        name: "CrossCheck",
        icon: 'https://xck.app/images/isotipo1.png',
      },
      onFinish: () => {
        let userData = userSession.loadUserData();
        location.reload();
      },
      onCancel: () => {
        console.log('oops, user cancels/closes pop-up');
      },
      userSession: userSession,
    };

    //-----------------------------------------------
    return (
      <Connect authOptions={authOptions}>
        <Provider store={store}>
          <colorTheme.Provider value={colorThemeX}>
            <IntlProvider locale={language3} messages={messages[language3]}>
                {userSession.isUserSignedIn()
                  ?
                    <React.Fragment>
                          <Routes>
                            {routes.map((route, index) => {
                              return (
                                    <Route
                                      key={index}
                                      path={route.path}
                                      exact={route.exact}
                                      element={
                                        <route.layout userSession={userSession}>
                                          <route.element />
                                        </route.layout>
                                      }
                                    />
                              );
                            })}
                          </Routes>
                    </React.Fragment>
                  :
                  <React.Fragment>
                    {userSession.isSignInPending() ?
                      <Loader />
                    :
                      <Login userSession={userSession} language={language3}/>
                    }
                  </React.Fragment>
                  }
            </IntlProvider>
          </colorTheme.Provider>
        </Provider>
      </Connect>
    );
}

export default App
