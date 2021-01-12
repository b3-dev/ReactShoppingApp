import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import  '../Home/Home.css';
import "/Users/eperez/ReactProject/test_project2/node_modules/react-image-gallery/styles/css/image-gallery.css";
import axios from 'axios';
import Constants from '../../data/constants';

/*material UI */
import { Grid, Paper, Button, Typography } from '@material-ui/core/';

class Home extends Component {

	constructor(props) {
		super(props);

		console.log('props home'+JSON.stringify(props))
		this.state = {
			promotions: [],
			counter: null,
			imagesPromotions: []
		};
	}

	componentWillMount() {
		
		console.log('cargando promotions..');
		axios.get(Constants.API_URL+'public/services/getPromotions')
			.then(response => {
				this.setState({
					// promotions: response.data['data']
					promotions: response.data['data'],
					counter: response.data['data'].length
				})
				console.log(response.data['data']);

			}).catch(error => {
				console.log(error);
			})
	}

	render() {
		const isToken = localStorage.getItem('token');

		const registerButton = (
			<>
			<Button variant="flat" size="large" color="secondary" component={Link} to="/Register">Registrate</Button>
			<Button variant="contained" size="large" color="secondary" component={Link} to="/Login">Inicia sesion</Button>
			</>
		)
		
	    const goMenuButton=(
			<Button variant="contained" size="large" color="secondary" component={Link} to="/Products">Ir al menu</Button>
		)		

		const images = []
		if (this.state.counter > 0) {
			console.log('entra aca');
			this.state.promotions.map((promotion, index) =>

				images.push({ 'original': Constants.API_URL+'public' + promotion.app_path_img_categoria + promotion.app_img_articulo },
				)
				//images.thumbnail='http://lorempixel.com/250/150/nature/1/',
			)
			//pass to state		
			console.log('images' + images)
		}

		return (
			<Grid container justify="center" className="body" >
				<Grid item md={6} lg={6} sm={12} justify="center">
					<Paper elevation={2} style={{ padding: '25px', marginTop:'1vh' }}>
						<ImageGallery
							items={images}
							showThumbnails={false}
							showFullscreenButton={false}
							autoPlay={true}
							showPlayButton={false}
						/>
						<Typography variant="h7" color="textPrimary" component="p" style={{ textAlign: "justify", paddingTop: "4vh" }}>
							! Entra ya! o registrate para acceder a nuestro menu y promociones exclusivas <br /><br />

							Crea una cuenta y realiza tu pedido de una forma rápida. También recibirás promociones exclusivas de <strong>Benedetti's Pizza.</strong>
                        </Typography>
						<Grid item justify="center" style={{ textAlign: "center", paddingTop: "2vh" }}  >
							{isToken ?goMenuButton:registerButton}
								
						</Grid>

					</Paper>

				</Grid>
			</Grid>

		);
	}
}

export default Home;
/*const images = new Object()
		if(this.state.counter>0){


			/*const images = [
				{
					original: 'http://lorempixel.com/1000/600/nature/1/',
					thumbnail: 'http://lorempixel.com/250/150/nature/1/',
				},
				{
					original: 'http://lorempixel.com/1000/600/nature/2/',
					thumbnail: 'http://lorempixel.com/250/150/nature/2/'
				},
				{
					original: 'http://lorempixel.com/1000/600/nature/3/',
					thumbnail: 'http://lorempixel.com/250/150/nature/3/'
				}
			]*/

