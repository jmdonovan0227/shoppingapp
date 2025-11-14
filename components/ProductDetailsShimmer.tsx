import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const Placeholder = createShimmerPlaceholder(LinearGradient);

export const ProductDetailsShimmer = () => {
  return (
    <View style={styles.container}>
      <Placeholder
        style={styles.image}
        shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
      />

      <View style={styles.content}>
        <Placeholder
          style={styles.title}
          shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
        />
        <Placeholder
          style={styles.price}
          shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
        />
        <Placeholder
          style={styles.category}
          shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
        />
        <Placeholder
          style={styles.description}
          shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
        />
        <Placeholder
          style={styles.rating}
          shimmerColors={["#ebebeb", "#ddd", "#ebebeb"]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },

  image: {
    width: "100%",
    height: 400,
  },

  content: {
    gap: 12,
    padding: 16,
  },

  title: {
    height: 28,
    width: "70%",
    borderRadius: 4,
  },

  price: {
    height: 24,
    width: "20%",
    borderRadius: 4,
  },

  category: {
    height: 20,
    width: "40%",
    borderRadius: 4,
  },

  description: {
    height: 80,
    width: "100%",
    borderRadius: 4,
  },

  rating: {
    height: 20,
    width: "30%",
    borderRadius: 4,
  },
});
