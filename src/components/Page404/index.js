import React,{Component} from 'react';
//import '../Global/css/Content.css';

class Page404 extends Component{

	constructor(props){
		super(props);

		this.state={
			login:0
		};
	}
	//fin constructor..
	componentWillMount() { 
		//funcion que se ejecuta cuando el componente		//se va a montar
		if (localStorage.getItem('token')) {
			this.setState({ isLogged: true });
			//dispatch login
		   console.log('login component..');
		   }
	}		
	componentDidMount(){
	//se ejecuta ya que el componente se ha montado
	}
	componentWillReceiveProps(nextProps) {
		//Se usa para  estar a la escucha de recibir props ..
		//como ejemplo, product detail recibir next props
	}
	componentWillUpdate(){
		//se ejecuta antes del render,
		// cuando nuestros props o estados han sido recibidos. 
		//Es útil para preparar antes de hacer un render.
		// Tampoco se va a ejecutar con el primer render
	}

	shouldComponentUpdate(next_props, next_state) {
		return false;
		//Con este método podremos mejorar nuestra performance. Por defecto, siempre retorna true.
		//Si hacemos que retorne false, cancelariamos el render hasta un nuevo cambio de 
		//propiedades o de estado y ni componentWillUpdate, ni componentWillReceiveProps serían ejecutados.
	}

	render(){
		return(
			<div className="Page404">
				<h1>No found</h1>
			</div>
		);
	}
}

export default Page404;
