import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, collection } from "firebase/firestore";
import { firestore } from '../firebase/config';
import { Alert } from 'react-native';

interface Location {
    latitude: number;
    longitude: number;
}

interface LocationInfo {
  latitude: number;
  longitude: number;
  address?: string;
}

const useLocation = (interval: number) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<string | null>("");

  useEffect(() => {
    const updateLocation = async () => {
      const permissions = await Location.requestForegroundPermissionsAsync();

      if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
            const newLocation = {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
            };
            setLocation(newLocation);
            Alert.alert("Location updated");

            const regionName = await Location.reverseGeocodeAsync(newLocation);
            const {
                country,
                district, 
                name 
            } = regionName[0];
            const address = `${country},${district},${name}`;
            setAddress(address);

            await logLocation({
                ...newLocation, 
                address
            });
            } else {
            Alert.alert("Error occurred while fetching location");
            }
        } else {
            Alert.alert("Permissions haven't been granted.");
        }
    };

    updateLocation();
    const intervalId = setInterval(updateLocation, interval);

    return () => clearInterval(intervalId);
  }, [interval]);


  const logLocation = async (newLocation: LocationInfo) => {
    try {
      await AsyncStorage.setItem('location', JSON.stringify(newLocation));
      console.log('Location logged:', newLocation);
      try {
        const locationsCollection = collection(firestore, 'locations');
        const locationRef = doc(locationsCollection);
        await setDoc(locationRef, newLocation);
      } catch (error) {
        console.error("Error occurred: ", error);
      }
    } catch (error) {
      console.error('Location could not be logged:', error);
    }
  };

  return { location, address };
};

export default useLocation;
