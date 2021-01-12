import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import './css/Content.css';

class List extends Component {

  constructor(){
    super();
   

  }
  render(){
    return (

        <div className="containter">
          <h1>Hola soy otro componente </h1>
          <h3>{this.props.title}</h3>

        </div>


      );

  }

}

export default List;
