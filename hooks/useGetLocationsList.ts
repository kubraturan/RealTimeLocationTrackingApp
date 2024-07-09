import { getDocs, collection } from "firebase/firestore";
import { firestore } from '../firebase/config';

interface LocationData {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
}

const useGetLocationsList = async (): Promise<LocationData[]> => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'locations'));
    const locationData: LocationData[] = querySnapshot.docs.map((doc) => {
      const documentData = doc.data();

      if (documentData && typeof documentData.address === 'string') {
        return {
          id: doc.id,
          address: documentData.address,
          latitude: documentData.latitude,
          longitude: documentData.longitude
        } as LocationData;
      } else {
        return null;
      }
    }).filter((item: any): item is LocationData => !!item); // null değerleri filtrele

    return locationData;
  } catch (error) {
    return [];
  }
};

export default useGetLocationsList;
