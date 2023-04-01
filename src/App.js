import React from 'react';
import 'semantic-ui-css/semantic.min.css'

import { AuthContext, AuthProvider } from './Context/Auth';
import ReactRoutes from './components/ReactRoutes';

function App() {
  
  return (
  <AuthProvider>
    <ReactRoutes />
  </AuthProvider>
  );
}

export default App;
