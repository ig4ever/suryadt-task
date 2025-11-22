import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { OwnerListItem } from "../../types/api.types";
import { useFavorites } from "../../store/favorites";

interface OwnerCardProps {
  data: OwnerListItem;
}

export default function OwnerCard({ data }: OwnerCardProps) {
  const router = useRouter();
  const initials = `${(data.firstName || "").charAt(0)}${(data.lastName || "").charAt(0)}`.toUpperCase();
  const { favorites, toggle } = useFavorites();
  const isFav = Boolean(favorites[data.id]);

  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/owners/${data.id}`)}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{`${data.firstName} ${data.lastName}`}</Text>
        </View>
        <TouchableOpacity onPress={() => toggle(data.id)}>
          <Text style={[styles.star, isFav ? styles.starFilled : styles.starOutline]}>
            {isFav ? "★" : "☆"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366F1",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  star: {
    fontSize: 20,
  },
  starFilled: {
    color: "#8B5CF6",
  },
  starOutline: {
    color: "#D1D5DB",
  },
});
