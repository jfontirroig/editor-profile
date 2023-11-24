import React from 'react';
//import { Box, Text, Button } from '@blockstack/ui';
//import { authenticate } from './auth';
import { useConnect } from '@stacks/connect-react';
//import { useConnect } from '@blockstack/connect';
import { UserSession, AppConfig } from '@stacks/auth';
//import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { showConnect } from '@stacks/connect';

//translate
import { FormattedMessage } from 'react-intl';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

export const Signin = (props) => {

  const onFinish = async (payload: FinishedData) => {
       const userData = await payload.userSession.loadUserData();
  };

  showConnect({
    appDetails: {
      name: "CrossCheck",
      icon: 'https://xck.app/images/isotipo1.png',
    },
    onFinish: () => {
      let userData = userSession.loadUserData();
      window.location.reload();
    },
    onCancel: () => {
      console.log('oops, user cancels/closes pop-up');
    },
    userSession: userSession,
  });

  const { doOpenAuth } = useConnect();

  return (true);
};

export default Signin;
