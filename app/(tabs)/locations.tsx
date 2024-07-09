import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import useGetLocationsList from '../../hooks/useGetLocationsList';
import LocationNotFound from '../../components/LocationNotFound';

interface LocationInfo {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
}

const renderItem = ({ item }: { item: LocationInfo }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.address}</Text>
    {/* Diğer bilgileri buraya ekleyebilirsiniz */}
  </View>
);

const FlatListExample = () => {
  const [locationData, setLocationData] = useState<LocationInfo[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = await useGetLocationsList();
      setLocationData(data);
    };

    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      {
        locationData ? 
        <LocationNotFound type="title">No records found to list</LocationNotFound>
        :
        <FlatList
          data={locationData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
  },
  title: {
    fontSize: 18,
  },
});

export default FlatListExample;
