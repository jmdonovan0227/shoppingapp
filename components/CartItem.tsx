import { Product } from "@/utils/api";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import useCartStore from "@/store/cart-store";
import { COLORS } from "@/utils/colors";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { useRef } from "react";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface CartItemType extends Product {
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
}

// A SharedValue is a reanimated value that lives in UI layer (not accessible from JS layer)
const LeftActions = (
  progress: SharedValue<number>,
  dragX: SharedValue<number>,
  onShouldDelete: () => void
) => {
  const styleAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value - 100 }],
  }));

  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity onPress={onShouldDelete} style={styles.leftActions}>
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </Reanimated.View>
  );
};

export default function CartItem({ item }: CartItemProps) {
  const { addProduct, reduceProduct } = useCartStore();
  const reanimatedRef = useRef<SwipeableMethods>(null);
  const opacityAnimation = useSharedValue(1);
  const scaleAnimation = useSharedValue(1);
  const heightAnimation = useSharedValue(80);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      addProduct(item);
    } else {
      reduceProduct(item);
    }

    scaleAnimation.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 80 })
    );
  };

  const quantityAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
  }));

  const closingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacityAnimation.value,
    height: heightAnimation.value,
  }));

  const onShouldDelete = async () => {
    opacityAnimation.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    heightAnimation.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log("should delete");
    reanimatedRef.current?.close();
    for (let i = 0; i < item.quantity; i++) {
      reduceProduct(item);
    }
  };

  return (
    <Reanimated.View style={closingAnimatedStyle}>
      <ReanimatedSwipeable
        ref={reanimatedRef}
        renderLeftActions={(progress, dragX) =>
          LeftActions(progress, dragX, onShouldDelete)
        }
        leftThreshold={50} // at what point should the swipeable be triggered
        friction={2}
        containerStyle={styles.swipeable}
      >
        <View style={styles.cartItemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.itemContainer}>
            <Text style={styles.cartItemName}>{item.title}</Text>
            <Text>${item.price.toFixed(2)}</Text>
          </View>

          <View style={styles.quantityItemContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange("decrement")}
            >
              <Ionicons name="remove-outline" size={24} color="black" />
            </TouchableOpacity>

            <Reanimated.Text
              style={[styles.cardItemQuantity, quantityAnimatedStyle]}
            >
              {item.quantity}
            </Reanimated.Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange("increment")}
            >
              <Ionicons name="add-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ReanimatedSwipeable>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20,
    height: 80,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  itemContainer: {
    flex: 1,
  },

  cartItemName: {
    fontSize: 16,
    fontWeight: "500",
  },

  quantityItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  quantityButton: {
    padding: 10,
  },

  cardItemQuantity: {
    fontWeight: "bold",
    backgroundColor: COLORS.primary,
    fontSize: 16,
    padding: 5,
    width: 30,
    color: "white",
    textAlign: "center",
    borderRadius: "100%",
  },

  leftActions: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: "100%",
  },

  swipeable: {
    height: 80,
  },
});
