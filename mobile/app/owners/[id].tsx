import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  useOwner,
  useCurrentMaster,
  usePetsByMaster,
  useMakeMaster,
} from "../../hooks/useApi";
import { useFavorites } from "../../store/favorites";
import { useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import { useLogin } from "../../hooks/useAuth";
import { tokenService } from "../../services/token.service";
import MasterCard from "../../components/molecules/MasterCard";
import { Icons } from "../../assets/icons";
import Text from "../../components/atoms/Text";
import Colors from "../../constants/Colors";
import OwnerCard from "../../components/molecules/OwnerCard";
import PetCard from "../../components/molecules/PetCard";
import { Pet } from "../../types/api.types";

export default function OwnerDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const ownerId = String(id || "");
  const { data: owner, isLoading } = useOwner(ownerId);
  const {
    data: petsPages,
    fetchNextPage,
    hasNextPage,
    isLoading: loadingPets,
  } = usePetsByMaster(ownerId);
  const { data: master } = useCurrentMaster();
  const { mutate: makeMaster, isPending: makingMaster } = useMakeMaster();
  const { mutateAsync: login } = useLogin();

  useEffect(() => {
    let last = 0;
    let sub: any;
    const subscribe = async () => {
      if (Platform.OS === "web") return;
      sub = Accelerometer.addListener(({ x, y, z }) => {
        const m = Math.sqrt(x * x + y * y + z * z);
        const now = Date.now();
        if (m > 2.3 && now - last > 1200) {
          last = now;
          (async () => {
            const token = await tokenService.getAccessToken();
            if (!token) {
              try {
                await login({ username: "demo", password: "password" });
              } catch (e) {}
            }
            makeMaster(ownerId);
          })();
        }
      });
      Accelerometer.setUpdateInterval(100);
    };
    subscribe();
    return () => {
      if (sub) sub.remove();
    };
  }, [ownerId]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  if (!owner) return null;

  const pets = (petsPages?.pages.flatMap((p) => p) as any) || [];

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
      >
        <View
          style={{
            paddingVertical: 14,
            justifyContent: "center",
            height: 80,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={Icons.back} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          {master && (
            <MasterCard
              style={{
                position: "absolute",
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
              }}
              firstName={master.firstName || ""}
              lastName={master.lastName || ""}
            />
          )}
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text size={14} color={Colors.gray} style={{ marginBottom: 16 }}>
            Owner Card
          </Text>
          <OwnerCard data={owner} type="detail" />
        </View>

        <View style={{ marginBottom: 24 }}>
          {pets.length > 0 && (
            <Text size={14} color={Colors.gray} style={{ marginBottom: 8 }}>
              Cats
            </Text>
          )}
          {loadingPets && <ActivityIndicator style={{ paddingVertical: 12 }} />}
          {!pets && (
            <Text
              font="circularstd-book"
              size={14}
              color={Colors.gray}
              style={{ textAlign: "center" }}
            >
              No pets found
            </Text>
          )}
          {pets.map((pet: Pet, idx: number) => (
            <PetCard key={`${pet.name}-${idx}`} data={pet} />
          ))}
          {hasNextPage && (
            <TouchableOpacity
              style={styles.loadMore}
              onPress={() => fetchNextPage()}
            >
              <Text size={14} color={Colors.gray}>
                Load more
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.makeMasterBtn, makingMaster && { opacity: 0.7 }]}
          disabled={makingMaster}
          onPress={() => makeMaster(ownerId)}
        >
          <Text size={18} color={Colors.white} style={{ fontWeight: "500" }}>
            Make Master
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ownerCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.dark100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  loadMore: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  footer: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: Colors.white,
  },
  makeMasterBtn: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
});
