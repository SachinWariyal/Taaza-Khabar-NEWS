import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"; 

export default class App extends Component {
  render() {
    return (
      <div>
        <Router basename='Taaza-Khabar-NEWS'>
        <Navbar/>
        {/* <News/> */}
        <Switch>
          <Route exact path="/Taaza-Khabar-NEWS"> <News key="general" pageSize={6} country ="in" category ="general" /> </Route>
          <Route exact path="/bussiness"> <News key="bussiness" pageSize={6} country = "in" category ="bussiness" /> </Route>
          <Route exact path="/entertainment"> <News key="entertainment" pageSize={6} country = "in" category ="entertainment" /> </Route>
          <Route exact path="/sports"> <News key="sports" pageSize={6} country = 'in' category ='sports' /> </Route>
          <Route exact path="/technology"> <News key="technology" pageSize={6} country = 'in' category ='technology' /> </Route>
          <Route exact path="/health"> <News key="health" pageSize={6} country = 'in' category ='health' /> </Route>
          <Route exact path="/science"> <News key="science" pageSize={6} country = 'in' category ='science' /> </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}


