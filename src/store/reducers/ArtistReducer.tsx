import { STOREARTIST, REMOVEARTIST } from '../actions/ActionTypes';

const INITIAL_STATE = {
	artist: null,
};

const storeArtist = (state, action) => {
	// tslint:disable-next-line:no-console
	console.log('[ArtistReducer.tsx] storeArtist() called: ' + action.payload.id);
	return {
		artist: {
			...state.artist,
			...action.payload,
		},
	};
};

const removeArtist = () => {
	return {
		artist: null,
	};
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STOREARTIST:
			return storeArtist(state, action);
		case REMOVEARTIST:
			return removeArtist();
		default:
			return state;
	}
};

export default authReducer;
