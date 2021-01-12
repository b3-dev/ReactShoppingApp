import React,{Component} from 'react';
import axios from 'axios';
import '../Global/css/Content.css';

class Clients extends Component{
	constructor(props){
		super(props);

		this.state={
			clients:[],
			countClients:0
		};
	}

	componentWillMount(){
		console.log('cargando clientes..');
		axios.get('http://localhost/api_react/public/services/clients')
		.then(response=>{
			this.setState({
				clients: response.data['data'],
				countClients:response.data['data'].length
			})
			console.log('cargando clientes..'+ this.state.clients);
		}).catch(error=>{
			console.log('error '+error.response);
		})
	}

	render(){
		if(this.state.countClients>0){
			return(
				<div >
				{ this.state.clients.map((client,index)=>

					<div className="col-md-12" key={client.id_cliente}>
						<h3>{client.id_cliente+'.- '+client.nombre_cliente+' '+client.apellido_cliente}</h3>
					</div>
					)
	 			}
	 			</div>
			);
		}else{
			return (
             	<div>
             		<h1>Cargando clientes..</h1>
             	</div>
             	);
		}
	}
}

export default Clients;
