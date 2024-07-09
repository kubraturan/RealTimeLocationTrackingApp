import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

interface LocationNotFoundProps {
    title: string;
    subtitle: string;
}

const LocationNotFound: React.FC<LocationNotFoundProps> = ({title, subtitle}) => {

    // const navigation = useNavigation();

    // const refreshPage = () => {
    //   navigation.replace('index'); // Mevcut ekranı yeniden yükler
    // };
    return (
        <View style={styles.container}>
        <Text style={styles.errorText}>{title}</Text>
        <Text style={styles.suggestionText}>{subtitle}</Text>
        {/* <TouchableOpacity style={styles.retryButton} onPress={refreshPage}>
            <Text style={styles.retryButtonText}>Refresh Page</Text>
        </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LocationNotFound;
