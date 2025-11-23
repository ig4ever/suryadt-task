import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { useOwners, useCurrentMaster } from "../hooks/useApi";
import OwnerCard from "../components/molecules/OwnerCard";
import { useState, useMemo, useEffect } from "react";
import { tokenService } from "../services/token.service";
import { useLogin } from "../hooks/useAuth";
import Text from "../components/atoms/Text";
import Colors from "../constants/Colors";
import MasterCard from "../components/molecules/MasterCard";
import { Icons } from "../assets/icons";

export default function OwnersScreen() {
  const { mutateAsync: login } = useLogin();

  const [sortBy, setSortBy] = useState<"name" | "cats">("name");
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useOwners(10, sortBy);
  const { data: master } = useCurrentMaster();

  const owners = useMemo(
    () => (data?.pages.flatMap((page) => page) as any) || [],
    [data]
  );

  const checkAuth = async () => {
    const token = await tokenService.getAccessToken();
    if (!token) {
      try {
        await login({ username: "demo", password: "password" });
      } catch (error) {
        console.error("Auto-login failed:", error);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={owners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OwnerCard data={item} />}
        contentContainerStyle={styles.list}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            {master && (
              <MasterCard
                style={{ marginBottom: 32 }}
                firstName={master.firstName}
                lastName={master.lastName}
              />
            )}

            <View style={styles.listHeaderRow}>
              <Text font="circularstd-book" size={14} color={Colors.gray}>
                Owners List
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  gap: 5,
                }}
                onPress={() => setSortBy(sortBy === "name" ? "cats" : "name")}
              >
                <Text font="circularstd-book" size={12} color={Colors.gray20}>
                  Sort By:
                  <Text
                    font="circularstd-book"
                    size={12}
                    color={Colors.gray20}
                    style={{ fontWeight: "bold" }}
                  >
                    {sortBy === "name" ? "Name" : "Cats"}
                  </Text>
                </Text>
                <Image
                  source={Icons.dropdown}
                  style={{ width: 16, height: 16 }}
                />
              </TouchableOpacity>
            </View>
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={Boolean(isRefetching)}
            onRefresh={() => {
              checkAuth();
              refetch();
            }}
          />
        }
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
    backgroundColor: Colors.white,
  },
  listHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
});
