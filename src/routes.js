import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//components..
import App from './components/App';
import About from './components/About';
import Clients from './components/Clients';
import Home from './components/Home/Home';
import Products from './components/Products';
import ProductsList from './components/ProductsList/ProductsList';
import Page404 from './components/Page404';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import ProductDetail from './components/Products/ProductDetail';
import CartDetail from './components/ShoppingCar/CartDetail';
import Register from './components/Register/Register'; 

/*/*<Link className="nav-link" to="/Clients">Clientes</Link>
            <Link className="nav-link" to="/Products">Productos</Link> */

//let isAuthenticated = localStorage.getItem('token');

//console.log('tocken en route'+isAuthenticated)

const PrivateRoute = ({ component: Component,isAuthenticated, ...rest }) => (
	<Route {...rest} render={(props) => (
		isAuthenticated
			? <Component {...props} />
			: <Redirect to='/Home' />
	)} />
)

const AppRoutes = () =>
		<App>
			<Switch>
				<Route path='/Home' exact component={Home}  />
				<Route path='/Register' exact component={Register} isAuthenticated={localStorage.getItem('token')}  />
				<Route path="/" exact component={Login} isAuthenticated={localStorage.getItem('token')}/>
				<Route path="/Login" exact component={Login} isAuthenticated={localStorage.getItem('token')}/>
				<Route path="/logout" exact component={Logout} isAuthenticated={localStorage.getItem('token')}/>
				<PrivateRoute path='/Clients' component={Clients} isAuthenticated={localStorage.getItem('token')} />
				<PrivateRoute path="/Products" component={Products} isAuthenticated={localStorage.getItem('token')} />
				<PrivateRoute path="/ProductsList/:id" component={ProductsList} isAuthenticated={localStorage.getItem('token')} />
				<PrivateRoute path="/ProductDetail" component={ProductDetail} isAuthenticated={localStorage.getItem('token')} />
				<PrivateRoute path="/CartDetail" component={CartDetail} isAuthenticated={localStorage.getItem('token')} />
				<Route component={Page404} />
			</Switch>
		</App>
export default AppRoutes;
