import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { getProducts, getCategories } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { useState, useCallback, useMemo } from "react";
import { Product } from "@/utils/api";
import ProductCard from "@/components/ProductCard";

// 1) Get function from utils/api.ts
// 2) Pass function as queryFn
// 3) Store result in queryKey
export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: products, refetch, isRefetching } = useQuery({
    queryKey: ['products'], // data is cached under this key!
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const allCategories = ['all', ...categories];

  const filteredProducts = useMemo(() => products?.filter((product) => {
    if(selectedCategory !== 'all') {
      return product.category === selectedCategory;
    }

    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  }), [products, searchQuery, selectedCategory]);
  
  const renderProduct = useCallback(({ item } : { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  // FlashList is a more performant list component than FlatList for displaying large lists of data.
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
          {allCategories.map((category) => (
            <Pressable 
              key={category} 
              style={styles.categoryButton} 
              onPress={() => setSelectedCategory(category)}
            >
              <Text>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlashList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  categoryContainer: {
    height: 60,
    zIndex: 1,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  },

  categoryScrollView: {
    paddingHorizontal: 10,
  },

  categoryButton: {},
});