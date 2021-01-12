import React, { } from 'react';
import '../Global/css/Content.css';
//import {removeFromCart} from '../../actionCreator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/*materialui*/
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
const MyLink = props => <Link to="/CartDetail" {...props} />

//componente presentacional
const TotalAmmount = (props) => {
	console.log('propsTotalAmount' + JSON.stringify(props))
	return (
		<Typography variant="caption" color="inherit" style={{marginTop:'10px', fontWeight:"bolder" }} >
			$ {props.price} MXN
		</Typography>
	)
}

const BoxShoppingCar = (props) => {

	let total = 0
	props.cart.map(product =>
		total += product.price
	)

	return (
		<IconButton color="inherit" component={MyLink} >
			<Badge badgeContent={props.cart.length} color="primary">
				<ShoppingCart />
			</Badge>
			<TotalAmmount price={total}  />

		</IconButton>


	);
}

{/*<div className="float-md-right BoxShoppingCar">
			<div className="card " >
				<div className="card-header bg-primary">
					<h3>Carrito de compra </h3>
				</div>
				<div className="card-body">
					<ul className="list-group">
						{props.cart.map(product =>
							<li key={product.id_articulo}
								className="list-group-item ItemBoxCard d-flex justify-content-between align-items-center">
								<span className="badge badge-primary badge-pill">1</span>{product.web_nombre_articulo}
								<button className="btn btn-primary btn-sm d-flex justify-content-end align-items-center" onClick={() => props.removeFromCart(product)}>
									x
							  	  		</button>
							</li>
						)}

					</ul>
				</div>

			</div>

		</div>*/}

const mapStateToProps = state => {
	return {
		cart: state.cart
	}
}

/*const mapDispatchToProps = dispatch =>{
	return{
		removeFromCart(product){
			dispatch(removeFromCart(product));
		}
	}
}*/

export default connect(mapStateToProps, null)(BoxShoppingCar); //conectando a react-redux