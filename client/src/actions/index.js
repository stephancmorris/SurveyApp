import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

// ***Another example of refactoring***

// export const fetchUser = () => async (dispatch) => {
// 	dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user') });
// };

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data });
};
