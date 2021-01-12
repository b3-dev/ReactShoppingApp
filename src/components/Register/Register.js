import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../data/constants';


/*MATERIAL UI */
import { Paper, Grid, TextField, Button, FormControl, FormHelperText, Input, InputLabel, Typography, Divider } from '@material-ui/core/';
import LocationOn from "@material-ui/icons/LocationOn";
import AccountCircle from "@material-ui/icons/AccountCircle";
class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputName: '',
            errMsgName: '',
            errName: 0,
            inputLastName: '',
            errMsgLastName: '',
            errLastName: 0,
            inputAddress: '',
            errMsgAddress: '',
            errAddress: 0,
            inputNoExt: '',
            errMsgNoExt: '',
            errNoExt: 0,
            inputColony: '',
            errMsgColony: '',
            inputCP: '',
            errCP: 0,
            inputEmail: '',
            errMsgEmail: '',
            errEmail: 0,
            inputPassword: '',
            errMsgPassword: '8 a 10 caracteres',
            errPassword: 0,
            inputRePassword: '',
            errMsgRePassword: '',
            errRePassword: 0,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createObjetClient = this.createObjetClient.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createObjetClient(e) {
        let rowClient = {}, dataClient = [];
        rowClient.nombre_cliente = this.state.inputName;
        rowClient.apellido_cliente = this.state.inputLastName;
        rowClient.domicilio_cliente = this.state.inputAddress;
        rowClient.numero_ext_cliente = this.state.inputLastName;
        //rowClient.id_colonias_garantia_ube = this.state.inputColony;
        rowClient.id_colonias_garantia_ube = -1;
        rowClient.cp_cliente = this.state.inputCP;
        rowClient.email_cliente = this.state.inputEmail;
        rowClient.passwd_cliente = this.state.inputPassword;
        //dataClient.push({ rowClient });

        return rowClient;
    }

    onSubmit(e) {

        e.preventDefault();
        let client = this.createObjetClient(e);
        console.log('submit client'+JSON.stringify(client));
         axios.post(Constants.API_URL+'public/services/register', {
            client:client
         }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

             })
             .then(res => {
                 //console.log(res.data.data[0].id_cliente);
                 console.log('response register'+JSON.stringify(res.data.status))
 
                 if (res.data.status==='OK') {
                    console.log('response register'+JSON.stringify(res.data.data.client))
                     localStorage.setItem('token', res.data.data.client.token);
                     localStorage.setItem('userID',res.data.data.client.id_cliente);
                     localStorage.setItem('clientName', res.data.data.client.nombre_cliente);
                     this.props.history.push('/Products');
                 }
                 else {
                     //this.setState({ loginMessage: 'Datos de acceso incorrectos' })
                    alert('error status..');
                 }
 
             }).catch(error => {
                 alert('error' + error);
             })



        // console.log('e '+JSON.stringify(e))
        /*  if(!this.state.inputName.length)
          {
              this.setState({
                 errName:1,
                 errMsgName:'* Campo requerido'
              })
          }
          else{
             this.setState({
                 errName:0,
                 errMsgName:''
              })
   
              
   
          }   */





    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item sm={12} xs={12} md={6} >
                    <Paper elevation={4} style={{ marginTop: '1vh', padding: "25px" }}>
                        <Typography variant="h3" component="h2">
                            {"Registro"}
                        </Typography>
                        <Divider component="hr" variant="fullWidth" style={{ marginTop: "3vh" }} />
                        <Grid item style={{ marginTop: "1vh", display: "flex", flex: 1, flexDirection: "column" }}>
                            <form noValidate autoComplete="off" onSubmit={this.onSubmit} >
                                <Grid >
                                    <Typography variant="title" color="textSecondary" style={{ paddingTop: '4vh', paddingBottom: '1vh' }} >
                                        <LocationOn fontSize="small" /> {"Ubicación"}
                                    </Typography>
                                    <FormControl style={{ display: 'flex', flex: 1 }} error={this.state.errName ? true : false}  >
                                        <InputLabel htmlFor="inputName">Nombre</InputLabel>
                                        <Input
                                            autoFocus
                                            required
                                            type="text"
                                            id="inputName"
                                            name="inputName"
                                            placeholder="Nombre"
                                            value={this.state.inputName}
                                            onChange={this.handleChange}
                                            fullWidth
                                            aria-describedby="component-error-text"
                                        />
                                        <FormHelperText id="component-error-text">{this.state.errMsgName}</FormHelperText>
                                    </FormControl>

                                </Grid>
                                <Grid >
                                    <FormControl style={{ display: 'flex', flex: 1 }} >
                                        <InputLabel htmlFor="inputLastName">Apellidos</InputLabel>
                                        <Input
                                            id="inputLastName"
                                            name="inputLastName"
                                            placeholder="Apellidos"
                                            value={this.state.inputLastName}
                                            fullWidth
                                            onChange={this.handleChange}
                                            aria-describedby="component-error-text"
                                        />

                                        <FormHelperText id="component-error-text">{this.state.errMsgLastName}</FormHelperText>
                                    </FormControl>

                                </Grid>
                                <Grid container spacing={16} >
                                    <Grid item sm={12} xs={12} md={6}>

                                        <FormControl style={{ display: 'flex', flex: 1 }} >
                                            <InputLabel htmlFor="inputAddress">Domicilio</InputLabel>
                                            <Input
                                                id="inputAddress"
                                                name="inputAddress"
                                                placeholder="Calle"
                                                value={this.state.inputAddress}
                                                fullWidth
                                                onChange={this.handleChange}
                                                aria-describedby="component-error-text"
                                            />

                                            <FormHelperText id="component-error-text">{this.state.errMsgAddress}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>

                                        <FormControl style={{ display: 'flex', flex: 1 }} >
                                            <InputLabel htmlFor="inputNoExt">No. ext</InputLabel>
                                            <Input
                                                id="inputNoExt"
                                                name="inputNoExt"
                                                placeholder="No. ext"
                                                value={this.state.inputNoExt}
                                                fullWidth
                                                onChange={this.handleChange}
                                                aria-describedby="component-error-text"
                                            />

                                            <FormHelperText id="component-error-text">{this.state.errMsgNoExt}</FormHelperText>
                                        </FormControl>


                                    </Grid>

                                </Grid>


                                <Grid container spacing={16} >
                                    <Grid item sm={12} xs={12} md={6}>
                                        <FormControl style={{ display: 'flex', flex: 1 }} >
                                            <InputLabel htmlFor="inputColony">Colonia</InputLabel>
                                            <Input
                                                id="inputColony"
                                                name="inputColony"
                                                placeholder="Colonia"
                                                value={this.state.inputColony}
                                                fullWidth
                                                onChange={this.handleChange}
                                                aria-describedby="component-error-text"
                                            />

                                            <FormHelperText id="component-error-text">{this.state.errMsgColony}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <FormControl style={{ display: 'flex', flex: 1 }} >
                                            <InputLabel htmlFor="inputCP">Código Postal</InputLabel>
                                            <Input
                                                id="inputCP"
                                                name="inputCP"
                                                placeholder="Código postal"
                                                value={this.state.inputCP}
                                                fullWidth
                                                onChange={this.handleChange}
                                                aria-describedby="component-error-text"
                                            />

                                            <FormHelperText id="component-error-text">Solo números</FormHelperText>
                                        </FormControl>

                                    </Grid>
                                </Grid>
                                <Grid >
                                    <Typography variant="title" color="textSecondary" style={{ paddingTop: '4vh', paddingBottom: '1vh' }} >
                                        <AccountCircle fontSize="small" /> {"Datos de acceso"}
                                    </Typography>
                                    <FormControl style={{ display: 'flex', flex: 1 }} >
                                        <InputLabel htmlFor="inputEmail">Email</InputLabel>
                                        <Input
                                            id="inputEmail"
                                            name="inputEmail"
                                            value={this.state.inputEmail}
                                            placeholder="email@ejemplo.com"
                                            fullWidth
                                            onChange={this.handleChange}
                                            aria-describedby="component-error-text"
                                        />

                                        <FormHelperText id="component-error-text">{this.state.errMsgEmail}</FormHelperText>
                                    </FormControl>

                                </Grid>

                                <Grid container spacing={16} >
                                    <Grid item sm={12} xs={12} md={6}>
                                        <FormControl style={{ display: 'flex', flex: 1 }} >
                                            <InputLabel htmlFor="inputPassword">Contraseña</InputLabel>
                                            <Input
                                                id="inputPassword"
                                                name="inputPassword"
                                                placeholder=""
                                                type="password"
                                                value={this.inputPassword}
                                                fullWidth
                                                onChange={this.handleChange}
                                                aria-describedby="component-error-text"
                                            />

                                            <FormHelperText id="component-error-text">{this.state.errMsgPassword}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <FormControl style={{ display: 'flex', flex: 1 }} >
                                            <InputLabel htmlFor="c">Repite tu contraseña</InputLabel>
                                            <Input
                                                id="inputRePassword"
                                                name="inputRePassword"
                                                placeholder="Código postal"
                                                type="password"
                                                value={this.state.inputRePassword}
                                                fullWidth
                                                onChange={this.handleChange}
                                                aria-describedby="component-error-text"
                                            />

                                            <FormHelperText id="component-error-text">{this.state.errMsgRePassword}</FormHelperText>
                                        </FormControl>

                                    </Grid>
                                </Grid>

                                <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button type="submit" color="secondary" variant="contained"  size="large">
                                        Guardar
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }

}
export default Register;