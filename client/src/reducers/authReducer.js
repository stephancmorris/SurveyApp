import { FETCH_USER } from '../actions/types';

//Need to return 1 of three values:
//Null, User, or False

export default function(state = null, action) {
	console.log(action);
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
