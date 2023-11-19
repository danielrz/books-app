import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.tsx'
// import { HashRouter as Router } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

Amplify.configure({
  aws_cognito_region: 'us-east-2', // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: process.env.USER_POOL_ID, // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: process.env.USER_POOL_APP_CLIENT_ID, // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  // aws_cognito_identity_pool_id:
  //   'us-east-1:f602c14b-0fde-409c-9a7e-0baccbfd87d0', // (optional) - Amazon Cognito Identity Pool ID
  aws_mandatory_sign_in: 'enable' // (optional) - Users are not allowed to get the aws credentials unless they are signed in
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Authenticator.Provider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Authenticator.Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
