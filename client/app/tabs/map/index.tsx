import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, PixelRatio } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBltXiAjFjjxONIguLW_7gG4Xr4qS1G3FM'; // Get an API key from Google Cloud Platform

const rem = PixelRatio.getFontScale() * 16; // Assuming 16px as the base font size

export default function App() {
    const [region, setRegion] = useState();
    const [destination, setDestination] = useState();
    const [selectedMarker, setSelectedMarker] = useState();
    const [routeActive, setRouteActive] = useState(false);
    const [userLocation, setUserLocation] = useState();
    const [showButton, setShowButton] = useState(false);
    const mapRef = useRef();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const userLoc = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
            setRegion(userLoc);
            setUserLocation(userLoc);
        })();
    }, []);

    const mapPin = {
        latitude: 51.926517,
        longitude: 4.462456,
        latitudeDelta: 0.09,
        longitudeDelta: 0.004,
    }

    const handleSearch = (details) => {
        const { lat, lng } = details.geometry.location;
        const coordinate = {latitude: lat, longitude: lng};
        setSelectedMarker(coordinate);
        setDestination(coordinate);
        setRouteActive(true)
        setShowButton(true);
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        });
    };

    const handleMarkerPress = (coordinate) => {
        setSelectedMarker(coordinate);
        setRouteActive(false);
        setShowButton(true);
    };

    const handleStartStopRoute = () => {
        if (routeActive && showButton) {
            setDestination(null);
            setRouteActive(false);
            setShowButton(false);
        } else if (routeActive === false && showButton){
            if(selectedMarker){
                setDestination(selectedMarker);
                setRouteActive(true);
            }
        } else {
            setRouteActive(false);
            setDestination(null);
        }
    };

    const handleCenterPress = () => {
        if (userLocation) {
            mapRef.current.animateToRegion(userLocation, 1000);
        }
    };

    return (
        <View style={styles.container}>
            {region && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={region}
                    showsUserLocation={true}
                >
                    <Marker
                        coordinate={mapPin}
                        title='Dalmo Doman'
                        description='scan QR-code to collect Dalmo!'
                        onPress={() => handleMarkerPress(mapPin)}
                    />
                    {destination && (
                        <>
                            <Marker coordinate={destination} />
                            <MapViewDirections
                                origin={region}
                                destination={destination}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={4}
                                strokeColor="blue"
                                mode="WALKING"
                            />
                        </>
                    )}
                </MapView>
            )}
            <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => handleSearch(details)}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                fetchDetails={true}
                styles={{
                    container: {
                        position: 'absolute',
                        top: 10,
                        left: 20,
                        width: '90%',
                    },
                    listView: { backgroundColor: 'white' },
                }}
            />
            {selectedMarker && !routeActive && showButton && (
                <TouchableOpacity style={styles.routeButton} onPress={handleStartStopRoute}>
                    <Text style={styles.routeButtonText}>Start Route</Text>
                </TouchableOpacity>
            )}
            {routeActive && showButton && (
                <TouchableOpacity style={styles.routeButton} onPress={handleStartStopRoute}>
                    <Text style={styles.routeButtonText}>Stop Route</Text>
                </TouchableOpacity>
            )}
            {!showButton && (
                <TouchableOpacity style={styles.routeButton}>
                    <Text style={styles.routeButtonText}>Nothing here</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.centerButton} onPress={handleCenterPress}>
                <Text style={styles.centerButtonText}>Center</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    routeButton: {
        position: 'absolute',
        bottom: 20,
        left: 220,
        transform: [{ translateX: -(width * 0.5) }],
        backgroundColor: 'black',
        paddingVertical: rem,
        paddingHorizontal: rem * 2,
        borderRadius: 20,
    },
    routeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    centerButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'black',
        paddingVertical: rem,
        paddingHorizontal: rem * 2,
        borderRadius: 20,
    },
    centerButtonText: {
        color: 'white',
        fontSize: 16,
    }
});
