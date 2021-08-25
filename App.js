import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [temperatura, setTemperatura] = useState([]);

  const getWeather = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Belo horizonte&APPID=4efbe3606dc68b3acd60263d58fa773f"
      );
      const json = await response.json();
      setData(json.weather);
      setCity(json.name);
      setCountry(json.sys.country);
      setTemperatura(json.main);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat);
    console.log("Longitude is:", long);
  }, [lat, long]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerCard}>
        {city},{country}
      </Text>
      <div
        style={{
          backgroundColor: "grey",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={styles.textColor}>
          {Math.round(temperatura.temp) / 10} &deg;C
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text style={styles.textColor}>
                {item.description}, {item.main}
              </Text>
            )}
          />
        )}
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: "white",
  },
  container: {
    flex: 1,
    padding: 24,
    width: 200,
    height: 50,
  },
  headerCard: {
    backgroundColor: "#40C2FF",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  bodyCard: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
});
