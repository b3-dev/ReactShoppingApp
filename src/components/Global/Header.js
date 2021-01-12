import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BoxShoppingCar from "../ShoppingCar/BoxShoppingCar";

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MailIcon from "@material-ui/icons/Email";
import LocalPizza from "@material-ui/icons/LocalPizza";
import LocalDrink from "@material-ui/icons/LocalDrink";
import Restaurant from '@material-ui/icons/Restaurant'
import Divider from "@material-ui/core/Divider";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
//import './css/Header.css';
class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      open: false,


    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,

  };

  handleDrawerClose=()=>{
    this.setState({ open: false });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  render() {

    const { title, items, classes } = this.props; //declarating props into a constants
    const isToken = localStorage.getItem('token');
    const open = null;

    const renderMenu = (
      <Menu
        id='menu-appbar'
        anchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={open}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const Logout = (
      <IconButton color="inherit" component={Link} to="/Logout">
        <AccountCircle />
      </IconButton>

    );

    return (

      <div className={classes.root} >
        <header >
          <AppBar position="absoulte" color="secondary" >
            <Toolbar>
              <IconButton aria-owns={open ? 'menu-appbar' : undefined} onClick={this.handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
              </Typography  >
              {!isToken ? <Button component={Link} to="/Login" color="inherit" >Login</Button> : ''}
              {isToken ? <BoxShoppingCar /> : ''}
              {isToken ? Logout : ''}

            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor="left"
            open={this.state.open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <div className={classes.drawerHeaderTitle}>
              <h3 style={{ paddingLeft: '10px', color: "#f00" }} >Menú</h3>
            </div>

            <List>
              <ListItem button key={'Pizzas'}  component={Link} to="/ProductsList/1" onClick={this.handleDrawerClose} >
                <ListItemIcon> <LocalPizza /></ListItemIcon>
                <ListItemText primary={'Pizzas'} />
              </ListItem>
              <ListItem button key={'Entradas'} component={Link}  to="/ProductsList/2" onClick={this.handleDrawerClose} >
                <ListItemIcon> <Restaurant /></ListItemIcon>
                <ListItemText primary={'Entradas'} />
              </ListItem>
              <ListItem button key={'Baguette'} component={Link} to="/ProductsList/5" onClick={this.handleDrawerClose} >
                <ListItemIcon> <Restaurant /></ListItemIcon>
                <ListItemText primary={'Baguette'} />
              </ListItem>
              <ListItem button key={'BeneRoll'} component={Link} to="/ProductsList/12" onClick={this.handleDrawerClose} >
                <ListItemIcon> <Restaurant /></ListItemIcon>
                <ListItemText primary={'BeneRoll'} />
              </ListItem>
              <ListItem button key={'Postres'} component={Link} to="/ProductsList/3" onClick={this.handleDrawerClose} >
                <ListItemIcon> <Restaurant /></ListItemIcon>
                <ListItemText primary={'Postres'} />
              </ListItem>
              <ListItem button key={'Bebidas'} component={Link} to="/ProductsList/4" onClick={this.handleDrawerClose} >
                <ListItemIcon> <LocalDrink /></ListItemIcon>
                <ListItemText primary={'Bebidas'} />
              </ListItem>

              <Divider />
              <ListItem button key={'Sesion'} style={{ marginTop: '20px' }} component={Link} to="/Logout" onClick={this.handleDrawerClose} >
                <ListItemIcon > <AccountCircle /></ListItemIcon>
                <ListItemText primary={'Cerrar sesión'} />
              </ListItem>
            </List>
          </Drawer>
        </header>
      </div>
    );
  }
}
const drawerWidth = 240;
const styles ={
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  
    justifyContent: 'flex-end',
  },
  drawerHeaderTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 8px',
   
    justifyContent: 'flex-start',
  },
}



export default withStyles(styles)(Header);
/**<nav className="nav navBlack">

            <Link className="nav-link active" to="/Home">Inicio</Link>
            <Link className="nav-link" to="/Clients">Clientes</Link>
            <Link className="nav-link" to="/Products">Productos</Link>
            {isToken ? Logout : ''}
            <BoxShoppingCar />
          </nav>/ */