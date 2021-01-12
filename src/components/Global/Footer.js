import React, { Component } from 'react';
import './css/Footer.css';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';

class Footer extends Component {

  static propTypes={
    copyRight:PropTypes.string
  };

  render() {
    const {copyRight = 'copy-right default'} = this.props;
    return (
      <Grid container>
       
      </Grid>
    );
  }
}

export default Footer;
