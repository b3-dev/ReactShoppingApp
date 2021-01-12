import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
/*redux*/
import store from '../../store';
import { addToCart } from '../../actionCreator';

class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: this.props.location.state.product,
            sizes: [],
            messageLoading: 'Cargando..',
            SizeSelector: '',
            sizeDescription: '',
            name: 'hai',
            priceItem: 0,
            labelWidth: 0,
            open: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentWillMount() {

        console.log(this.state.product);
        axios.get(Constants.API_URL+'public/services/product/getSizes/' + this.state.product.id_articulo, {

            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(res => {
                if (res.data.data.sizes.length) {
                    this.setState({ sizes: res.data.data.sizes })
                }
                // console.log('sizes'+JSON.stringify(this.state.sizes));             
            }).catch(error => {
                console.log('error' + error);
            })

        //fetch(URL+'/api_react/public/services/product/getSizes/'
        //+ this.props.navigation.state.params.productItem.id_articulo)

    }

    addProduct(product) {
        if (this.state.SizeSelector) {
            let item = new Object;
            item = product;
            item.price = this.state.priceItem;
            item.size = this.state.SizeSelector;
            item.sizeDescription = this.state.sizeDescription;
            item.cuantity = 1;
            store.dispatch(addToCart(item));
            this.handleClickOpen();
        }
        else
            alert('debes elegir un tamaño');

    }

    handleChange(event, index) {
        //let price=index.props.price?index.props.price:0
        this.setState({
            [event.target.name]: event.target.value,
            priceItem: index.props.price ? index.props.price : 0,
            sizeDescription: index.props.sizeDescription
        });
        console.log(this.state.SizeSelector)
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.props.history.push("/Products")
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} justify="center" spacing={0}>
                <Grid item md={6} xs={12} className={classes.itemCenter} key={this.state.product.id_articulo} >
                    <Card className={classes.card} >
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={"http://localhost/api_react/public" + this.state.product.app_path_img_categoria + this.state.product.app_img_articulo}
                                title={this.state.product.app_nombre_articulo}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.product.app_nombre_articulo}
                                </Typography>
                                <Typography component="p">
                                    {this.state.product.app_descripcion_articulo}
                                </Typography>
                            </CardContent>
                            <Divider component="hr" variant="fullWidth" />
                        </CardActionArea>
                        <CardActions className={classes.cardActions}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Tamaño</InputLabel>
                                <Select
                                    value={this.state.SizeSelector}

                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'SizeSelector',
                                        id: 'age-simple',

                                    }}
                                >
                                    {this.state.sizes.map((size, index) =>

                                        <MenuItem key={size.id_tamano_articulo}
                                            value={size.id_tamano_articulo}
                                            price={size.precio_articulo_tamano}
                                            sizeDescription={size.web_descripcion_tamano_articulo}
                                        >
                                            {size.web_descripcion_tamano_articulo}
                                        </MenuItem>

                                    )}

                                </Select>
                                <Typography variant="h7" color={"secondary"} style={{ marginTop: 10, fontWeight: "normal" }}>
                                    {this.state.priceItem ? 'Precio $' + this.state.priceItem : 'Elige un tamaño'}
                                </Typography>
                                <div style={{  flex: 1, display: "flex",flexDirection: "row",alignItems:"center",justifyContent:'center' }} >

                                    <div style={{ flex: 1,  textAlign:"left"}} >
                                        <Button size="medium" color="primary" variant="flat" style={{ marginTop: 10 }} onClick={() => this.props.history.push("/Products")} >
                                            Regresar al menú
                                         </Button>
                                    </div>
                                    <div style={{ flex: 1,  textAlign:"right" }} >
                                        <Button size="medium" style={{ marginTop: 10}} disabled={this.state.SizeSelector ? false : true} color="secondary" variant="contained" onClick={() => this.addProduct(this.state.product)} >
                                            Agregar
                                      </Button>
                                    </div>
                                </div>

                            </FormControl>


                        </CardActions>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Producto agregado"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Tu producto se ha agregado al carrito
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>

                                <Button onClick={this.handleClose} variant="contained" color="secondary" autoFocus>
                                    Entiendo
                                 </Button>
                            </DialogActions>
                        </Dialog>
                    </Card>

                </Grid>
            </Grid>
        );
    }
}
const styles = {

    itemCenter: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        aligmentAjust: 'center',
        justifyContent: 'center',



    },

    cardActions: {
        display: 'flex',
        flexDirection: 'row',
        aligmentAjust: 'center',
        justifyContent: 'center',
        flex: 1,
    }
    ,
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        //margin: theme.spacing.unit,
        minWidth: 300,
    },
    selectEmpty: {
        //  marginTop: theme.spacing.unit * 2,
    },
    card: {
        width: 350,
        maxWidth: 350,
    },
    media: {
        // width: 350,
        height: 250,
    },
    mediaimage: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop: '30'
    }

};
export default withStyles(styles)(ProductDetail); 