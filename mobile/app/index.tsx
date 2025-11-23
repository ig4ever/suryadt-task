import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useOwners, useCurrentMaster } from "../hooks/useApi";
import OwnerCard from "../components/atoms/OwnerCard";
import { useState, useMemo } from "react";

export default function OwnersScreen() {
  const [sortBy, setSortBy] = useState<"name" | "cats">("name");
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useOwners(
    10,
    sortBy
  );
  const { data: master } = useCurrentMaster();

  

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to retrieve data owners</Text>
      </View>
    );
  }

  const owners = useMemo(
    () => (data?.pages.flatMap((page) => page) as any) || [],
    [data]
  );

  return (
    <View style={styles.container}>
      {master && (
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>
              {`${master.firstName.charAt(0)}${master.lastName.charAt(
                0
              )}`.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.headerTitle}>
            {`Master: ${master.firstName} ${master.lastName}`}
          </Text>
        </View>
      )}

      <View style={styles.listHeaderRow}>
        <Text style={styles.sectionTitle}>Owners List</Text>
        <TouchableOpacity
          onPress={() => setSortBy(sortBy === "name" ? "cats" : "name")}
        >
          <Text style={styles.sortText}>
            Sort By: {sortBy === "name" ? "Name" : "Cats"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={owners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OwnerCard data={item} />}
        contentContainerStyle={styles.list}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasNextPage ? <ActivityIndicator style={{ padding: 20 }} /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  headerBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  headerBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366F1",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  listHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  sortText: {
    fontSize: 14,
    color: "#6B7280",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
