import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import useLocation from '../../hooks/useLocation';
import useNetInfo from '../../hooks/useNetInfo';
import LocationNotFound from '../../components/LocationNotFound';

const Location = () => {
  const { location, address } = useLocation(300000); // 5 minutes
  const isConnected = useNetInfo();

  return (
    <View style={styles.container}>
      <ConnectionStatus isConnected={isConnected} />
        {
          location ? 
          <>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
                showsUserLocation={true}
              >
                {(
                  <Marker
                    coordinate={location}
                    title={'Current Location'}
                    description={address || ''}
                  />
                )}
              </MapView>
            </View>
            <LocationInfo address={address} />
          </>
          :
          <LocationNotFound type="title">Location could not be retrieved</LocationNotFound>
        }
      
    </View>
  );
};

const ConnectionStatus = (isConnected: {isConnected: boolean}) => (
  <View style={styles.header}>
    <MaterialCommunityIcons
      name={isConnected ? "wifi" : "wifi-off"}
      size={24}
      color={isConnected ? Colors.light.green : Colors.light.red}
    />
    <Text style={styles.connectStatus}>{!isConnected && "Not"} Connected Internet</Text>
  </View>
);

const LocationInfo = ({ address }: { address: string | null }) => (
  <View style={styles.locationContainer}>
    <MaterialCommunityIcons name="map-marker" size={26} color="black" />
    <Text style={styles.location}>{address}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 50,
  },
  map: {
    width: '90%',
    height: 400,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  connectStatus: {
    color: 'black',
    fontSize: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  location: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
  mapContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default Location;
