import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import useCartStore from "@/store/cart-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/utils/colors";
import CartItem from "@/components/CartItem";
import { FlashList } from "@shopify/flash-list";
import * as Sentry from "@sentry/react-native";

export default function Cart() {
  const { products, total, clearCart } = useCartStore();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert("No products in cart");
      return;
    }

    clearCart();
    Alert.alert("Checkout successful");
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      {products.length > 0 ? (
        <>
          <FlashList
            data={products}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <>
                {products.length && (
                  <Text style={styles.totalText}>
                    Total: ${total.toFixed(2)}
                  </Text>
                )}
              </>
            )}
            ListFooterComponent={() => (
              <Button
                title="Test Error!"
                onPress={() => {
                  Sentry.captureException(new Error("Test Error!"));
                }}
              />
            )}
          />

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              {
                paddingBottom: Platform.OS === "ios" ? insets.bottom : 0,
              },
            ]}
            onPress={handleCheckout}
          >
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.addToCartButtonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>No products in cart</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  emptyText: {
    textAlign: "center",
  },

  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
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
