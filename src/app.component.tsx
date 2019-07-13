import * as config from './core/config';
import * as firebase from 'firebase';
import * as core from '@favid-inc/core';

import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import AuthReducer from './store/reducers/AuthReducer';
import ArtistReducer from './store/reducers/ArtistReducer';

import { ImageRequireSource } from 'react-native';
import { NavigationState } from 'react-navigation';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { DynamicStatusBar } from '@src/components/common';
import { ApplicationLoader, Assets } from './core/appLoader/applicationLoader.component';
import Router from './core/navigation/routes';
import { trackScreenTransition } from './core/utils/analytics';
import { getCurrentStateName } from './core/navigation/util';
import { ThemeContext, ThemeContextType, ThemeKey, themes, ThemeStore } from '@src/core/themes';


firebase.initializeApp(config.firebase);
core.initializeApp(config.core);

const images: ImageRequireSource[] = [
	require('./assets/images/source/image-profile-1.jpg'),
	require('./assets/images/source/image-profile-2.jpg'),
	require('./assets/images/source/image-profile-3.jpg'),
	require('./assets/images/source/image-profile-4.jpg'),
	require('./assets/images/source/image-profile-5.jpg'),
	require('./assets/images/source/image-profile-6.jpg'),
	require('./assets/images/source/image-profile-7.jpg'),
	require('./assets/images/source/image-profile-8.jpg'),
	require('./assets/images/source/image-profile-9.jpg'),
	require('./assets/images/source/image-profile-10.jpg'),
];

const fonts: { [key: string]: number } = {
	'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
	'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
	'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
	'opensans-light': require('./assets/fonts/opensans-light.ttf'),
	'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
};

const assets: Assets = {
	images: images,
	fonts: fonts,
};

interface State {
	theme: ThemeKey;
}

class App extends React.Component<{}, State> {
	public state: State = {
		theme: 'Eva Light',
	};

	private onTransitionTrackError = (error: any): void => {
		console.warn('Analytics error: ', error.message);
	};

	private onNavigationStateChange = (prevState: NavigationState, currentState: NavigationState) => {
		const prevStateName: string = getCurrentStateName(prevState);
		const currentStateName: string = getCurrentStateName(currentState);

		if (prevStateName !== currentStateName) {
			trackScreenTransition(currentStateName).catch(this.onTransitionTrackError);
		}
	};

	private onSwitchTheme = (theme: ThemeKey) => {
		ThemeStore.setTheme(theme).then(() => {
			this.setState({ theme });
		});
	};

	private rootReducer = combineReducers({
		auth: AuthReducer,
		artist: ArtistReducer,
	});

	private store = createStore(this.rootReducer, /* preloadedState, */ compose(applyMiddleware(thunk)));

	public render(): React.ReactNode {
		const contextValue: ThemeContextType = {
			currentTheme: this.state.theme,
			toggleTheme: this.onSwitchTheme,
		};

		return (
			<ApplicationLoader assets={assets}>
				<ThemeContext.Provider value={contextValue}>
					<Provider store={this.store}>
						<ApplicationProvider mapping={mapping} theme={themes[this.state.theme]}>
							<DynamicStatusBar currentTheme={this.state.theme} />
							<Router onNavigationStateChange={this.onNavigationStateChange} />
						</ApplicationProvider>
					</Provider>
				</ThemeContext.Provider>
			</ApplicationLoader>
		);
	}
}

export default App;
