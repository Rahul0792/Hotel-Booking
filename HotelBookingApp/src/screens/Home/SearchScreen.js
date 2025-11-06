// import React, { useState } from "react";
// import { View, FlatList, Text, StyleSheet } from "react-native";
// import InputField from "../../components/Common/InputField";

// const SearchScreen = () => {
//   const [query, setQuery] = useState("");
//   const data = []; // Replace with actual data

//   return (
//     <View style={styles.container}>
//       <InputField label="Search" placeholder="Search hotels or restaurants" value={query} onChangeText={setQuery} />
//       <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Text>{item.name}</Text>} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
// });

// export default SearchScreen;
