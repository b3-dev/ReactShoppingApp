import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import './css/Content.css';

class Content extends Component {

  constructor(props){
    super(props);

  }

  static propTypes={
    body:PropTypes.object.isRequired
  }
  
  
  render(){
  const {body}  =this.props; //get body from props
    return (
      <Grid container style={{paddingTop:0}}  >                 
         { 
           body
         }
       </Grid>
      
    );
  }
}

export default Content;
