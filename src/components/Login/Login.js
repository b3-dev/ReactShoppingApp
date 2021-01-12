import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actionCreator';
import { Redirect } from 'react-router-dom'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, TextField, Button, FormControl, FormHelperText, Input, InputLabel, Typography, Divider } from '@material-ui/core/';
import Constants from '../../data/constants';
class Login extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            inputEmail: '',
            inputPassword: '',
            errMsgEmail: '',
            errMsgPassword: '',
            isLogged: false,
        }
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.setState({ isLogged: true });
            //dispatch login
           console.log('login component..');
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ loginMessage: 'Conectando..' })
        //calls api login..
        axios.post(Constants.API_URL+'public/services/login', {
            email: this.state.inputEmail,
            password: this.state.inputPassword,
            loginMessage: ''
        }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(res => {
                //console.log(res.data.data[0].id_cliente);
                console.log(res.data.token)

                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userID', res.data.data[0].id_cliente);
                    localStorage.setItem('clientName', res.data.data[0].nombre_cliente);
                    this.props.dispatch(login()); 
                    this.props.history.push('/Products');
                }
                else {
                    this.setState({ loginMessage: 'Datos de acceso incorrectos' })
                }

            }).catch(error => {
                alert('error' + error);
            })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes } = this.props;
        if (this.state.isLogged) {
            return (<Redirect to={"/Home"} />);
        }

        return (
            <Grid container justify="center">
                <Grid item sm={12} xs={12} md={4} >
                    <Paper elevation={4} style={{ marginTop: '1vh', padding: "25px" }}>
                        <Typography variant="h3" component="h2">
                            {"Login"}
                        </Typography>
                        <Divider component="hr" variant="fullWidth" style={{ marginTop: "3vh" }} />
                        <Grid item style={{ marginTop: "1vh", display: "flex", flex: 1, flexDirection: "column" }}>
                            <form noValidate autoComplete="off" onSubmit={this.onSubmit} >
                                <Grid>

                                    <FormControl style={{ display: 'flex', flex: 1 }} error={this.state.errName ? true : false}  >
                                        <InputLabel htmlFor="inputEmail">Email</InputLabel>
                                        <Input
                                            autoFocus
                                            required
                                            type="text"
                                            id="inputEmail"
                                            name="inputEmail"
                                            placeholder="Email"
                                            value={this.state.inputEmail}
                                            onChange={this.handleChange}
                                            fullWidth
                                            aria-describedby="component-error-text"
                                        />
                                        <FormHelperText id="component-error-text">{this.state.errMsgEmail}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <FormControl style={{ display: 'flex', flex: 1 }} error={this.state.errName ? true : false}  >
                                        <InputLabel htmlFor="inputPassword">Password</InputLabel>
                                        <Input
                                            required
                                            type="text"
                                            id="inputPassword"
                                            name="inputPassword"
                                            placeholder="Password"
                                            value={this.state.inputPassword}
                                            onChange={this.handleChange}
                                            fullWidth
                                            aria-describedby="component-error-text"
                                        />
                                        <FormHelperText id="component-error-text">{this.state.errMsgPassword}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <h6>{this.state.loginMessage}</h6>
                                </Grid>

                                <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center' }} >

                                    <div style={{ flex: 1, textAlign: "center" }} >
                                        <Button size="medium" color="primary" variant="flat" style={{ marginTop: 0 }} onClick={() => this.props.history.push("/Home")} >
                                            Regresar al inicio
                                        </Button>
                                    </div>
                                    <div style={{ flex: 1, textAlign: "right" }} >
                                        <Button type="submit" variant="contained" color="secondary" size="large">
                                            Entrar
                                        </Button>
                                    </div>
                                </div>



                            </form>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

const styles = {

    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,

    },
    root: {
        flexGrow: 1,


    }

};

//export default  withStyles(styles)(Login);


export default compose(
    withStyles(styles, { name: 'Login' }),
    connect(null, null)
  )(Login);

/*<div className="container col-6 mx auto">
                <br/>
                <br/>
               <form onSubmit={this.onSubmit}>
                <div className="form-group text-left">
                    <label htmlFor="email" className="text-left">Email</label>
                    <input type="text" className="form-control"
                     id="email"
                     name="email"
                     onChange={this.onChange}
                     placeholder="Usuario"/>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="password">Contraseña</label>
                    <input type="text" className="form-control"
                    id="password"
                    name="password"
                    onChange={this.onChange}
                    placeholder="password"/>
                </div>
                <h3 className="">{this.state.loginMessage}</h3>

                <br/>
                <button type="submit" className="btn btn-primary"  >Entrar</button>
                </form>
            </div> */