import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { Artist } from '@src/core/model';

interface ArtistContainerProps {
	artist: Artist;
}

class ArtistContainer extends Component<ArtistContainerProps> {
	public render() {
		return <Text>Artist Container</Text>;
	}
}

const mapStateToProps = (state) => {
	return {
		artist: state.artist,
	};
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onOrderCame: dispatch(),
// 	};
// };

export default connect(mapStateToProps)(ArtistContainer);
