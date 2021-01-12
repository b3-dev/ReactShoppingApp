import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*Components*/
import Header from "./Global/Header";
import Content from "./Global/Content";
import Footer from "./Global/Footer";

//data
class App extends Component {
  constructor() {
    super()
  }

  static propTypes = {
    children: PropTypes.object.isRequired
  }
  
  render() {
    const { children } = this.props;
    return (
      <div >
        <Header title="AppTest"  />
        <Content body={children} style={{paddingTop:'0px'}}/>     
        <Footer copyRight="Copyright 2019" />       
      </div>
    );
  }
}

export default App;
