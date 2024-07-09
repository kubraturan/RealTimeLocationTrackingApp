import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Toast from 'react-native-toast-message';
import useLocation from '../../hooks/useLocation';
import LocationNotFound from '../../components/LocationNotFound';
import NetInfo from '@react-native-community/netinfo';
import Loading from '../../components/Loading'; // Loading bileşenini import edin

const Location = () => {
  const { location, address } = useLocation(300000); // 5 minutes
  const [isConnected, setConnected] = useState(true);
  const [loading, setLoading] = useState(true); // Loading durumunu ekleyin

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected || false);
      if (!state.isConnected) {
        showAlert();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(false);
      showToast();
    }
  }, [location]);

  const showAlert = () => {
    Alert.alert(
      'Internet Connection',
      'You are offline. Some features may not be available.'
    );
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: '📍 Location Updated',
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40
    });
  };



  return (
    <View style={styles.container}>
      <Toast />
      <Loading visible={loading} />
      <View style={styles.header}>
        <MaterialCommunityIcons
          name={isConnected ? "wifi" : "wifi-off"}
          size={24}
          color={isConnected ? Colors.light.green : Colors.light.red}
        />
        <Text style={styles.connectStatus}>{!isConnected && "Not"} Connected Internet</Text>
      </View>
      {isConnected && location ? (
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
      ) : (
        <LocationNotFound 
          title="Location not found"
          subtitle="Please check location services or your internet and try again"
        />
      )}
    </View>
  );
};

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
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '20%',
  },
  map: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  connectStatus: {
    color: 'black',
    fontSize: 15,
    fontWeight: "600"
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
