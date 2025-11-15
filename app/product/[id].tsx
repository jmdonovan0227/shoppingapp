import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Share,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/utils/api";
import { ProductDetailsShimmer } from "@/components/ProductDetailsShimmer";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/utils/colors";
import useCartStore from "@/store/cart-store";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { addProduct } = useCartStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
  });

  if (isLoading) {
    return <ProductDetailsShimmer />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleAddToCart = () => {
    console.log("Adding to cart");
    addProduct(product);
  };

  const onShare = async () => {
    const url = `shoppingapp://product/${product.id}`;

    if (Platform.OS === "ios") {
      await Share.share({
        url,
        message: `Check out this product: ${product.title}`,
      });
    } else {
      await Share.share({
        url,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.title,
          headerRight: () => (
            <TouchableOpacity onPress={onShare}>
              <Ionicons name="share-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
        />

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
            <Text style={styles.ratingCount}>
              ({product.rating.count} reviews)
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.addToCartButton,
          {
            paddingBottom: Platform.OS === "ios" ? insets.bottom : 0,
          },
        ]}
        onPress={handleAddToCart}
      >
        <Ionicons name="cart-outline" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#f9f9f9",
  },

  content: {
    padding: 16,
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },

  category: {
    fontSize: 16,
    color: "#666",
    textTransform: "capitalize",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rating: {
    fontSize: 16,
    color: "#FFB800",
    fontWeight: "600",
  },

  ratingCount: {
    fontSize: 14,
    color: "#666",
  },

  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },

  addToCartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
