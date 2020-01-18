import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'

import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#7159c1',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7d40e7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  }
});

// tempo do video = 1:21:58

export default function Main({navigation}) {
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
    
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
    
        const { latitude, longitude } = coords;
    
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, []);

  useEffect(() => {
    async function loadInitialData() {
      const { data: response } = await api.get('/devs');

      setDevs(response.data);
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  useMemo(() => {
    if (!techs) {
      async function loadInitialData() {
        const { data: response } = await api.get('/devs');
  
        setDevs(response.data);
      }

      loadInitialData();
    }
  }, [techs]);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs
    );
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const {data: response} = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    setDevs(response.data);
    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs && devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image
              style={styles.avatar}
              source={{ uri: dev.avatar_url }}
            />

            <Callout onPress={() => navigation.navigate('Profile', {
              github_username: dev.github_username,
            })}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar devs por techs...."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={setTechs}
          />

          <TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
            <MaterialIcons name="my-location" size={20} color="#fff" />
          </TouchableOpacity>
      </View>
    </>
  );
}
