import React, { Component } from "react";
import Input from "./common/Input";
import Form from './common/Form';
import Joi from 'joi-browser';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors:{}
  };

  schema ={ 
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')

  };

  doSubmit = () =>{
  //call the server
  console.log('Submitted!')
  }


  render() {
      const { data, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>

            <Input 
            name ="username"
            label="Username" 
            value={data.username}
            error= {errors.username}
            onChange={this.handleChange}/>
            <Input 
            name ="password"
            label="Password" 
            value={data.password}
            error={errors.password}
            onChange={this.handleChange}/>
            
          <button 
            disabled={this.validate()}
            className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
