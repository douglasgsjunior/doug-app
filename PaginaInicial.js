import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaInicial = () => {
    const navigation = useNavigation();

    const handleGoToPokedex = () => {
        navigation.navigate('Pokedex');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/PngItem_4780727.png')}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Bem-vindo, Treinador</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Pokedex"
                    onPress={handleGoToPokedex}
                    color="#FF0000"
                    style={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 400,
        height: 400,
        marginBottom: 20,
    },
    textContainer: {
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        width: 200,
    },
});

export default PaginaInicial;
