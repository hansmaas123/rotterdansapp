// import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import {
//     StyleSheet,
//     View,
//     Dimensions,
//     Text,
//     TouchableOpacity,
// } from "react-native";
// import {
//     GooglePlaceDetail,
//     GooglePlacesAutocomplete,
// } from "react-native-google-places-autocomplete";
// import Constants from "expo-constants";
// import { useRef, useState } from "react";
// import MapViewDirections from "react-native-maps-directions";

// // https://docs.expo.dev/versions/latest/sdk/map-view/
// // https://www.npmjs.com/package/react-native-google-places-autocomplete
// // https://www.npmjs.com/package/react-native-maps-directions

// const { width, height } = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.02;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const INITIAL_POSITION = {
//     latitude: 40.76711,
//     longitude: -73.979704,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
// };

// type InputAutocompleteProps = {
//     label: string;
//     placeholder?: string;
//     onPlaceSelected: (details: GooglePlaceDetail | null) => void;
// };

// function InputAutocomplete({
//     label,
//     placeholder,
//     onPlaceSelected,
// }: InputAutocompleteProps) {
//     return (
//         <>
//             <Text>{label}</Text>
//             <GooglePlacesAutocomplete
//                 styles={{ textInput: styles.input }}
//                 placeholder={placeholder || ""}
//                 fetchDetails
//                 onPress={(data, details = null) => {
//                     onPlaceSelected(details);
//                 }}
//                 query={{
//                     key: "AIzaSyBltXiAjFjjxONIguLW_7gG4Xr4qS1G3FM",
//                     language: "pt-BR",
//                 }}
//             />
//         </>
//     );
// }

// export default function App() {
//     const [origin, setOrigin] = useState<LatLng | null>();
//     const [destination, setDestination] = useState<LatLng | null>();
//     const [showDirections, setShowDirections] = useState(false);
//     const [distance, setDistance] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const mapRef = useRef<MapView>(null);

//     const moveTo = async (position: LatLng) => {
//         const camera = await mapRef.current?.getCamera();
//         if (camera) {
//             camera.center = position;
//             mapRef.current?.animateCamera(camera, { duration: 1000 });
//         }
//     };

//     const edgePaddingValue = 70;

//     const edgePadding = {
//         top: edgePaddingValue,
//         right: edgePaddingValue,
//         bottom: edgePaddingValue,
//         left: edgePaddingValue,
//     };

//     const traceRouteOnReady = (args: any) => {
//         if (args) {
//             // args.distance
//             // args.duration
//             setDistance(args.distance);
//             setDuration(args.duration);
//         }
//     };

//     const traceRoute = () => {
//         if (origin && destination) {
//             setShowDirections(true);
//             mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
//         }
//     };

//     const onPlaceSelected = (
//         details: GooglePlaceDetail | null,
//         flag: "origin" | "destination"
//     ) => {
//         const set = flag === "origin" ? setOrigin : setDestination;
//         const position = {
//             latitude: details?.geometry.location.lat || 0,
//             longitude: details?.geometry.location.lng || 0,
//         };
//         set(position);
//         moveTo(position);
//     };
//     return (
//         <View style={styles.container}>
//             <MapView
//                 ref={mapRef}
//                 style={styles.map}
//                 provider={PROVIDER_GOOGLE}
//                 initialRegion={INITIAL_POSITION}
//             >
//                 {origin && <Marker coordinate={origin} />}
//                 {destination && <Marker coordinate={destination} />}
//                 {showDirections && origin && destination && (
//                     <MapViewDirections
//                         origin={origin}
//                         destination={destination}
//                         apikey={"AIzaSyBltXiAjFjjxONIguLW_7gG4Xr4qS1G3FM"}
//                         strokeColor="#6644ff"
//                         strokeWidth={4}
//                         onReady={traceRouteOnReady}
//                     />
//                 )}
//             </MapView>
//             <View style={styles.searchContainer}>
//                 <InputAutocomplete
//                     label="Origin"
//                     onPlaceSelected={(details) => {
//                         onPlaceSelected(details, "origin");
//                     }}
//                 />
//                 <InputAutocomplete
//                     label="Destination"
//                     onPlaceSelected={(details) => {
//                         onPlaceSelected(details, "destination");
//                     }}
//                 />
//                 <TouchableOpacity style={styles.button} onPress={traceRoute}>
//                     <Text style={styles.buttonText}>Trace route</Text>
//                 </TouchableOpacity>
//                 {distance && duration ? (
//                     <View>
//                         <Text>Distance: {distance.toFixed(2)}</Text>
//                         <Text>Duration: {Math.ceil(duration)} min</Text>
//                     </View>
//                 ) : null}
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     map: {
//         width: Dimensions.get("window").width,
//         height: Dimensions.get("window").height,
//     },
//     searchContainer: {
//         position: "absolute",
//         width: "90%",
//         backgroundColor: "white",
//         shadowColor: "black",
//         shadowOffset: { width: 2, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 4,
//         elevation: 4,
//         padding: 8,
//         borderRadius: 8,
//         top: Constants.statusBarHeight,
//     },
//     input: {
//         borderColor: "#888",
//         borderWidth: 1,
//     },
//     button: {
//         backgroundColor: "#bbb",
//         paddingVertical: 12,
//         marginTop: 16,
//         borderRadius: 4,
//     },
//     buttonText: {
//         textAlign: "center",
//     },
// });


import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBltXiAjFjjxONIguLW_7gG4Xr4qS1G3FM'; // Get an API key from Google Cloud Platform

export default function App() {
    const [region, setRegion] = useState(null);
    const [destination, setDestination] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showButton, setShowButton] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            });
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
        setDestination({ latitude: lat, longitude: lng });
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        });
    };

    const handleMarkerPress = (coordinate) => {
        setSelectedMarker(coordinate);
        setShowButton(true);
    };

    const handleButtonPress = () => {
        setDestination(selectedMarker);
        setShowButton(false);
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
                        width: '90%',
                    },
                    listView: { backgroundColor: 'white' },
                }}
            />
            {showButton && (
                <TouchableOpacity style={styles.routeButton} onPress={handleButtonPress}>
                    <Text style={styles.routeButtonText}>Start Route</Text>
                </TouchableOpacity>
            )}
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
        left: '50%',
        transform: [{ translateX: -(width * 0.5) }],
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    routeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
