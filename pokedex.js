import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';

const Pokedex = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchAllPokemon();
    }, []);

    const fetchAllPokemon = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
            setPokemonList(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const searchPokemon = async () => {
        if (searchText.trim() === '') {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`);
            setPokemonList([response.data]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setPokemonList([]);
            setLoading(false);
        }
    };

    const getPokemonIdFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };

    const renderPokemonItem = ({ item }) => {
        const pokemonId = item.id || getPokemonIdFromUrl(item.url);
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

        console.log(imageUrl);

        return (
            <View style={styles.pokemonItem}>
                <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
                <Text style={styles.pokemonName}>{item.name}</Text>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Digite o número ou nome do pokemon"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={searchPokemon}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={pokemonList}
                renderItem={renderPokemonItem}
                keyExtractor={(item) => item.name}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: StatusBar.currentHeight,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginRight: 8,
    },
    searchButton: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        alignItems: 'center',
    },
    pokemonItem: {
        alignItems: 'center',
        margin: 8,
        width: windowWidth * 0.4,
    },
    pokemonImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    pokemonName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Pokedex;
