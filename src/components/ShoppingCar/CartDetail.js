import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
/*ICONS */

import DeleteOutline from '@material-ui/icons/Delete';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import { IconButton } from '@material-ui/core';

/*REDUX */
import { connect } from 'react-redux';
import { removeFromCart } from '../../actionCreator';


class CartDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.cart.length > 0) {
            return (
                <Grid container spacing={0}>
                    <Grid item xs={12}  >
                        <Grid item container direction="column" spacing={0}>
                            <List  >
                                {this.props.cart.map((product, index) =>
                                    <ListItem key={index} button alignItems="flex-start" divider style={{ borderBottomColor: '#cfd8dc' }} >
                                        <ListItemAvatar>
                                            <Avatar alt={product.app_nombre_articulo} src={"http://189.254.212.155/api/public/" + product.app_path_img_categoria + product.app_img_articulo} />
                                        </ListItemAvatar>
                                        <ListItemText style={{ maxWidth: 600 }}
                                            primary={
                                                <React.Fragment>
                                                    <span style={{ color: "#F00", fontSize: "30px", fontWeight: 'bold', padding: "3px" }}>{product.cuantity}</span>
                                                    <span style={{ color: "#00", fontSize: "20px", padding: "1px" }}>{product.app_nombre_articulo + ', ' + product.sizeDescription}</span>

                                                </React.Fragment>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component="span" color="textPrimary">
                                                        {product.app_descripcion_articulo}
                                                    </Typography>
                                                </React.Fragment>

                                            }
                                        />
                                        <ListItemText
                                            secondary={
                                                <React.Fragment>
                                                    <Typography variant="h5" color="#000">
                                                        {"$ " + product.price}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Borrar del carrito">
                                                <IconButton color="secondary" onClick={() => this.props.removeFromCart(index)} >
                                                    <DeleteOutline fontSize="medium" />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}

                            </List>
                        </Grid>

                    </Grid>
                    <Grid container spacing={0} justify="center" style={{ padding: '0px' }}>
                        <Grid item md={12} style={{ textAlign: 'center' }}  >
                            <Typography variant="h2" color="textPrimary" style={{ marginTop: '50px' }} >
                                {"Información de mi orden"}
                            </Typography>

                        </Grid>
                        <Grid item md={12} xs={12} justify="center" style={{ textAlign: 'center' }}   >
                            <Button component={Link} to="/Products" variant="flat" color="primary" size="large" style={{ marginTop: '40px' }} >Volver a productos</Button>

                            <Button variant="contained" color="secondary" size="large" style={{ marginTop: '40px' }} >Comprar</Button>

                        </Grid>
                    </Grid>

                </Grid>
            );

        }
        else {
            return (
                <Grid justify="center" style={{ display: 'flex', flexGrow: 1, flexWrap: "wrap", flexDirection: 'column', textAlign: 'center', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
                    <RemoveShoppingCart fontSize="large" color="action" />
                    <h3>Tu carrito está vacio</h3>
                    <Button component={Link} to="/Products" variant="contained" size="large" color="secondary" >Volver a la lista de productos</Button>

                </Grid>
            );
        }

    }

}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart(product) {
            dispatch(removeFromCart(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail); //conectando a react-redux
//export default CartDetail;