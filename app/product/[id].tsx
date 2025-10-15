import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Product details for product with id: {id}</Text>
        </View>
    );
}