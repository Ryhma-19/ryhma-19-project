import { View, Text, StyleSheet } from "react-native"
import { Achievement, ICONS } from "../../types"

export default function ProfileBadgeCard({ badge }: { badge: Achievement }) {
  const progressPercent = Math.min((badge.progress / badge.target) * 100, 100)

  return (
    <View style={[styles.card, !badge.isUnlocked && styles.locked]}>
      <View style={styles.background}>
      <Text style={styles.icon}>{ICONS[badge.icon] ?? ''}</Text>
      </View>

      <Text style={styles.badgeTitle}>{badge.title}</Text>

      {!badge.isUnlocked && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    
  card: {
    width: 100,
    padding: 16,
    borderRadius: 32, //16
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,

  },
  locked: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 40,
    marginBottom: 6,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  desc: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginVertical: 6,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 6,
  },
  isUnlocked: {
    marginTop: 10,
    fontWeight: "600",
    color: "#16A34A",
  },
  background: {
    backgroundColor: '#ffffff',
    borderRadius: 40,
    padding: 4,
    width: 68,
    alignItems: 'center',
  }
})