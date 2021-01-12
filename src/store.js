//redux store 
import {createStore, combineReducers} from 'redux';
import cartReducer from './reducer';


function saveToLocalStorage(state){
	try{
		const serializedState = JSON.stringify(state);
		const tokenClient = localStorage.getItem('token');
		if(tokenClient && tokenClient.length){
			localStorage.setItem('state'+tokenClient,serializedState);
		}
		
	}
	catch(e){
		console.log(e);
	}
}

function loadFromLocalStorage(state){
	try{
		const tokenClient = localStorage.getItem('token');
		if (tokenClient && tokenClient.length) {
			console.log('load from localstorage');
			const serializedState = localStorage.getItem('state' + tokenClient);
			if (serializedState === null) return undefined;
				return JSON.parse(serializedState);
		}
		else
			return undefined
	}
	catch(e){
		console.log(e);
	}
}

const appReducer = combineReducers({
	cart:cartReducer, //funciones de card reducer
	//loadUser:1
 });

 const rootReducer = ( state, action ) => {
	if ( action.type === 'LOGOUT' ) {
	  state = undefined;

	  console.log('root reducer logout..'+state);
	}

	if ( action.type === 'LOGIN' ) {
		state = loadFromLocalStorage();
		console.log('root reducer LOGIN..'+state);
	  }
		
	return appReducer(state, action)
  }

/*const rootReducer  = combineReducers({
	cart:cartReducer, //funciones de card reducer
	loadUser:1
})*/


const persistedState  = loadFromLocalStorage()

//for using devtools redux..
const store = createStore (
	rootReducer,
	persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

)
store.subscribe(()=>saveToLocalStorage(store.getState()))
//store.subscribe(()=>loadFromLocalStorage())

export default store