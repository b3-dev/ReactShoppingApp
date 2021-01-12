 import React, { Component} from 'react';
 import axios from 'axios';
 import '../Global/css/Content.css';
 import store from '../../store';
 import {addToCart} from '../../actionCreator';
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
 import Divider from '@material-ui/core/Divider';
 import CircularProgress from '@material-ui/core/CircularProgress';
 import Constants from '../../data/constants';

//redux..


 class Products extends Component {
     constructor(props) {
         super(props);
         this.state = {
             products: [],
             counter:0,
             messageLoading:'Cargando..',
             productCategoryId:0,
         };
         this.addToCart=this.addToCart.bind(this);
         this.onDeleteButton=this.onDeleteButton.bind(this);
     }

     static propTypes = {
        classes: PropTypes.object.isRequired,
      };
    

     componentWillMount() {
        console.log('receibe props'+this.props.match.params)
        const categoryId = this.props.match.params.id;
        if (categoryId) {
            let category = {};
            category.id =categoryId;
             axios.post(Constants.API_URL+'public/services/getProductsByCategory', {
                 category: category
             }, {
                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                 })
                 .then(response => {
                     this.setState({
                         // products: response.data['data']
                         products: response.data['data'],
                         counter: response.data['data'].length
                     })
                     console.log(response.data['data']);

                 }).catch(error => {
                     alert(error);
                 })
         }
     }


     componentWillReceiveProps(nextProps) {
        console.log('Cargando receibe props...');
        if (nextProps.match.params.id !== this.props.match.params.id) {
          let categoryId = nextProps.match.params.id
          let category = {};
          category.id =categoryId;
           axios.post(Constants.API_URL+'public/services/getProductsByCategory', {
               category: category
           }, {
                   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               })
               .then(response => {
                   this.setState({
                       // products: response.data['data']
                       products: response.data['data'],
                       counter: response.data['data'].length
                   })
                   console.log(response.data['data']);

               }).catch(error => {
                   alert(error);
               })
        }
      }

     componentWillReceiveProps2(){
        console.log('receibe props'+this.props.match.params)
        const categoryId = this.props.match.params.id;
        if (categoryId) {
            let category = {};
            category.id =categoryId;
             axios.post(Constants.API_URL+'public/services/getProductsByCategory', {
                 category: category
             }, {
                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                 })
                 .then(response => {
                     this.setState({
                         // products: response.data['data']
                         products: response.data['data'],
                         counter: response.data['data'].length
                     })
                     console.log(response.data['data']);

                 }).catch(error => {
                     alert(error);
                 })
         }
     }

    componentDidMount(){
         console.log('did mount..'+this.state.counter);
     	
     }

     addToCart(product){
       //let detail = this.state.products[index];
       console.log('agregando..');
       store.dispatch(addToCart(product));
     }

     onDeleteButton(index){
        const products = Object.assign([],this.state.products);
        const deletingProduct = this.state.products[index];
       // return event=>{
            products.splice(index,1);
            this.setState({products:products});
            axios.get(Constants.API_URL+'public/services/product/delete/'+deletingProduct.id_articulo)
            .then(response => {
             
             console.log(response);

         }).catch(error => {
             console.log(error);
         })



        //}
     }

     render() {
        const { classes } = this.props;
        
         if (this.state.counter > 0) {
             return (
                 <Grid container className={classes.root} justify="center" >
                     {this.state.products.map((product, index) =>
                         <Grid item xs={12} md={4} sm={6} className={classes.itemCenter}   style={{padding:10}} key={product.id_articulo} >
                             <Card className={classes.card}   >
                                 <CardActionArea>
                                     <CardMedia
                                         className={classes.media}
                                         image={Constants.API_URL+'public'+product.app_path_img_categoria+product.app_img_articulo}
                                         title= {product.app_nombre_articulo}
                                     />
                                     <CardContent className={classes.content}>
                                         <Typography gutterBottom variant="h5" component="h2">
                                            {product.app_nombre_articulo}
                                        </Typography>
                                         <Typography component="p">
                                             {product.app_descripcion_articulo}
                                         </Typography>
                                                   
                                     </CardContent>
                                     <Divider variant="inset" component="hr" variant="fullWidth" />    
                                 </CardActionArea>                               
                                 <CardActions >
                                     <Button size="small" color="primary">
                                         Borrar
                                     </Button>
                                     <Button size="small" color="secondary" variant="outlined" 
                                     onClick={() => this.props.history.push(
                                         '/ProductDetail', 
                                          { product: product })}>
                                        Agregar
                                     </Button>
                                 </CardActions>
                             </Card>

                         </Grid>
                     )}
                 </Grid>

              

 			);
         } else {
             return (

                 <Grid container style={{ display: 'flex', flexGrow: 1, flexWrap: "wrap", height: "80vh", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress color="secondary" disableShrink />
                 </Grid>     

             	
             	);
         }




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

     content: {
         height: 100
     },
     root: {
         flexGrow: 1,


     },
     card: {
         width: 345,
         maxWidth: 345,
     },
     media: {
         height: 140,
     },

     CardActions:{
        display: 'flex',
        flexDirection: 'row',
     },
     actionItem:{
         flex:1
     }
  };

 export default withStyles(styles)(Products); 

 /*	<div className="row mx-auto">
 			
 				{this.state.products.map((product,index)=>
 					
 					  <div className="col-md-4 " key={product.id_articulo}  >
 						<div className="card cardProduct" >
						 <div className="card-header">
						    <h3>{product.app_nombre_articulo} </h3>
						  </div>
						  <div className="card-body">
					      
					    <p className="card-text">{product.app_descripcion_articulo}</p>
					    <button onClick={()=>this.addToCart(product)} className="btn btn-primary btnProductsItem">Agregar</button>
                       
                        <button onClick={()=>this.onDeleteButton(index)} className="btn btn-danger btnProductsItem">Borrar</button>

    				  </div>
					</div>	
 				</div>
 				   )
 					
 				}

 			</div> */