import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOwner, useCurrentMaster, usePetsByMaster, useMakeMaster } from "../../hooks/useApi";
import { useFavorites } from "../../store/favorites";

const getInitials = (firstName?: string, lastName?: string) => `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase();
const calcAge = (dob: string) => {
  const d = new Date(dob);
  if (isNaN(d.getTime())) return "Age: -";
  const now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  let months = now.getMonth() - d.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `Age: ${years} years ${months} months`;
};

export default function OwnerDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const ownerId = String(id || "");
  const { data: owner, isLoading } = useOwner(ownerId);
  const { data: master } = useCurrentMaster();
  const { data: petsPages, fetchNextPage, hasNextPage, isLoading: loadingPets } = usePetsByMaster(ownerId);
  const { favorites, toggle } = useFavorites();
  const isFav = Boolean(favorites[ownerId]);
  const { mutate: makeMaster, isPending: makingMaster } = useMakeMaster();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!owner) return null;

  const pets = (petsPages?.pages.flatMap((p) => p) as any) || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>{"‹"}</Text></TouchableOpacity>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{master ? getInitials(master.firstName, master.lastName) : "--"}</Text>
        </View>
        <Text style={styles.headerTitle}>{master ? `Master: ${master.firstName} ${master.lastName}` : "Master: -"}</Text>
      </View>

      <View style={styles.sectionTitleWrap}><Text style={styles.sectionTitle}>Owner Card</Text></View>

      <View style={styles.ownerCard}>
        <View style={styles.cardRow}>
          <View style={styles.avatarLarge}><Text style={styles.avatarLargeText}>{getInitials(owner.firstName, owner.lastName)}</Text></View>
          <View style={styles.ownerNames}>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.value}>{owner.firstName}</Text>
            <Text style={[styles.label, { marginTop: 8 }]}>Last Name</Text>
            <Text style={styles.value}>{owner.lastName}</Text>
          </View>
          <TouchableOpacity onPress={() => toggle(ownerId)}>
            <Text style={[styles.star, isFav ? styles.starFilled : styles.starOutline]}>{isFav ? "★" : "☆"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionTitleWrap}><Text style={styles.sectionTitle}>Cats</Text></View>

      <View style={{ paddingHorizontal: 16 }}>
        {loadingPets && (
          <ActivityIndicator style={{ paddingVertical: 12 }} />
        )}
        {pets.map((pet: any, idx: number) => (
          <View key={`${pet.name}-${idx}`} style={styles.catItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.catName}>{pet.name}</Text>
              <Text style={styles.catAge}>{calcAge(pet.dob)}</Text>
            </View>
            <Text style={styles.chevron}>{"›"}</Text>
          </View>
        ))}
        {hasNextPage && (
          <TouchableOpacity style={styles.loadMore} onPress={() => fetchNextPage()}><Text style={styles.loadMoreText}>Load more</Text></TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.makeMasterBtn, makingMaster && { opacity: 0.7 }]}
          disabled={makingMaster}
          onPress={() => makeMaster(ownerId)}
        >
          <Text style={styles.makeMasterText}>Make Master</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  back: {
    fontSize: 18,
    color: "#6B7280",
    marginRight: 8,
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
  sectionTitleWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  ownerCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarLarge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarLargeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6366F1",
  },
  ownerNames: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  star: {
    fontSize: 22,
  },
  starFilled: {
    color: "#8B5CF6",
  },
  starOutline: {
    color: "#D1D5DB",
  },
  catItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  catName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  catAge: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: "#D1D5DB",
    marginLeft: 8,
  },
  loadMore: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  loadMoreText: {
    color: "#6B7280",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  makeMasterBtn: {
    backgroundColor: "#10B981",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  makeMasterText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
