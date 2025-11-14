import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Dimensions } from "react-native";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.4;

function ProductShimmer() {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        style={styles.image}
        shimmerColors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
      />
      <View style={styles.content}>
        <ShimmerPlaceholder
          style={styles.title}
          shimmerColors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
        />
        <View style={styles.ratingContainer}>
          <ShimmerPlaceholder
            style={styles.rating}
            shimmerColors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
          />
        </View>
      </View>
    </View>
  );
}

export const ProductShimmerGrid = () => {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <ProductShimmer key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },

  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    margin: 8,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  },

  image: {
    width: "100%",
    height: CARD_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  content: {
    padding: 12,
    gap: 8,
  },

  title: {
    height: 20,
    width: "85%",
    borderRadius: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    width: "30%",
    height: 16,
    borderRadius: 4,
  },
});
