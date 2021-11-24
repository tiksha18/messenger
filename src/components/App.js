import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext";  // it is a React Context

import Chats from "./Chats";
import Login from "./Login";

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
      {/* AuthProvider => This is what React context is => It is one big object that contains all the data(in this case, users data) and it wraps all of the other components, this context will handle the entire application's state*/}
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} /> 
            <Route path="/" component={Login} /> 
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
