import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useCartStore from "@/store/cart-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/utils/colors";
import { Link } from "expo-router";

export default function CartButton() {
  const { count } = useCartStore();
  return (
    <Link href="/cart" asChild>
      <TouchableOpacity>
        {count > 0 && (
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}

        <Ionicons name="cart-outline" size={24} color="black" />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    right: -10,
    bottom: -5,
    zIndex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },

  countText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
