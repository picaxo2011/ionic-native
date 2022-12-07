import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

import { Geolocation } from "@capacitor/geolocation";

interface Coordinate {
  lat: number;
  long: number;
}

const getDistance = (
  lat1: number,
  lat2: number,
  lon1: number,
  lon2: number
) => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
};

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CheckIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const [currentPos, setCurrentPos] = useState<Coordinate>();
  const [storePostition, setStorePosition] = useState<Coordinate>({
    lat: 10.74441699305904,
    long: 106.63227957224856,
  }); // altsource VN: 18 Đường số 10, Phường 11, Quận 6, Thành phố Hồ Chí Minh, Vietnam

  const printCurrentPosition = async () => {
    setLoading(true);
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 30000,
    });

    console.log("Current position:", coordinates);
    setCurrentPos({
      lat: coordinates.coords.latitude,
      long: coordinates.coords.longitude,
    });
    setLoading(false);
  };

  useEffect(() => {
    printCurrentPosition();
  }, []);

  const calDistance = () => {
    setDistance(
      getDistance(
        currentPos!.lat,
        storePostition.lat,
        currentPos!.long,
        storePostition.long
      )
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Check In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          <IonListHeader lines="full">
            <IonLabel> Store Position </IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Store Latitude</IonLabel>
            <IonInput
              type="text"
              value={storePostition.lat}
              onIonChange={(event) =>
                setStorePosition((curPosition) => {
                  return {
                    ...curPosition,
                    lat: Number(event.detail.value),
                  };
                })
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Store Longitude</IonLabel>
            <IonInput
              type="text"
              value={storePostition.long}
              onIonChange={(event) =>
                setStorePosition((curPosition) => {
                  return {
                    ...curPosition,
                    long: Number(event.detail.value),
                  };
                })
              }
            ></IonInput>
          </IonItem>
        </IonList>

        <IonList lines="full">
          <IonListHeader lines="full">
            <IonLabel> Current Position </IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Current Latitude: {currentPos?.lat}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Current Longitude: {currentPos?.long}</IonLabel>
          </IonItem>
        </IonList>

        <IonList lines="full">
          <IonListHeader lines="full">
            <IonLabel> Distance From Store</IonLabel>
          </IonListHeader>
          <IonItem>
            {loading && <IonSpinner />}
            {!loading && <IonButton onClick={calDistance}>Calculate</IonButton>}
          </IonItem>
          <IonItem>
            <IonLabel>
              Distance from store:{" "}
              {numberWithCommas(Math.round(distance * 1000 * 1) / 1)} meters
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CheckIn;
