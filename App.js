import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 0
const LONGITUDE = 0
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class App extends Component {
	constructor() {
		super()

		this.state = {
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			}
		}
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId)
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					}
				})
			},
			(error) => console.log(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		)
		this.watchID = navigator.geolocation.watchPosition(
			position => {
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					}
				})
			}
		)
	}

	render() {
		console.log(this.state)
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React is really hard yo
				</Text>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.mapContainer}
					// initialRegion={{
					// 	latitude: 39.7392,
					// 	longitude: -104.9903,
					// 	latitudeDelta: 0.0922,
					// 	longitudeDelta: 0.0421,
					// }}
					region={this.state.region}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%'
	},
	mapContainer: {
		width: '100%',
		height: '80%'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
})
