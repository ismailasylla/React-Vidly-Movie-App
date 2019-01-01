import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import RegisterForm from "./components/RegisterForm";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
class App extends Component {
  state={

  };

  componentDidMount() {
    try{
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({user});
    }
    catch(ex){}
  }
  render() {
    return <React.Fragment>
      <ToastContainer />
        <NavBar  user={this.state.user}/>
        <main className="container">
          <Switch>
          <Route path="/register" component={RegisterForm} ></Route>
            <Route path="/login" component={LoginForm} ></Route>
            <Route path="/movies/:id" component={MovieForm} ></Route>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>;
  } 
}

export default App;
