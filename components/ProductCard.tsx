import { StyleSheet, View, Text, Pressable } from "react-native";
import { Product } from "@/utils/api";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { COLORS } from "@/utils/colors";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();

    return (
        <Pressable style={styles.productCard} onPress={() => router.push(`/product/${product.id}`)}>
            <Image style={styles.image} source={{ uri: product.image }} />

            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    productCard: {
        flex: 1,
        margin: 8,
        gap: 8,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    },

    image: {
        width: '100%',
        height: 150,
    },

    productInfo: {
        gap: 4,
    },

    productTitle: {
        fontSize: 14,
        fontWeight: '500',
    },

    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
    },
});