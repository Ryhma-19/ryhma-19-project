// screens/BadgeScreen.tsx
import React, { useEffect, useMemo, useState } from "react"
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../services/firebase/config"
import { Achievement, ICONS } from "../../types"
import { useAuth } from "../../contexts/AuthContext"

const date = new Date("23")

const BadgeTestData: Achievement[] = [
    {
        id: "10_workouts",
        type: 'streak',
        title: "Complete 10 workouts",
        icon: "biceps",
        target: 10,
        progress: 7,
        isUnlocked: false,
        unlockedAt: date,
    },
    {
        id: "10km_total",
        type: 'distance',
        title: "Run for 10km in total",
        icon: "run",
        target: 10,
        progress: 10,
        isUnlocked: true,
        unlockedAt: date,
    },
    {
        id: "20km_total",
        type: 'distance',
        title: "Run for 20km in total",
        icon: "run",
        target: 20,
        progress: 15,
        isUnlocked: false,
        unlockedAt: date,
    },
    {
        id: "30km_total",
        type: 'distance',
        title: "Run for 30km in total",
        icon: "run",
        target: 30,
        progress: 15,
        isUnlocked: false,
        unlockedAt: date,
    },
    {
        id: "log_in_1_week",
        type: 'streak',
        title: "Log in everyday for 1 week",
        icon: "calendar",
        target: 7,
        progress: 7,
        isUnlocked: true,
        unlockedAt: date,
    },
    {
        id: "log_in_1_month",
        type: 'streak',
        title: "Log in everyday for 1 month",
        icon: "calendar",
        target: 31,
        progress: 7,
        isUnlocked: false,
        unlockedAt: date,
    }
]


export default function BadgeScreen() {
  const { user } = useAuth()
  const USER_ID = user?.id
  const [badges, setBadges] = useState<Achievement[]>(BadgeTestData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    return
    if (!USER_ID) {
        return
    }
    const ref = collection(db, "users", USER_ID, "badges")

    const unsub = onSnapshot(ref, snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Achievement[]

      setBadges(data)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const sortedBadges = useMemo(() => {
    return [...badges].sort((a, b) => {
      if (a.isUnlocked !== b.isUnlocked) {
        return a.isUnlocked ? -1 : 1;
      }

      return (b.progress / b.target) - (a.progress / a.target);
    });
  }, [badges]);


  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Badges</Text>

      <FlatList
        data={sortedBadges}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BadgeCard badge={item} />}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  )
}

function BadgeCard({ badge }: { badge: Achievement }) {
  const progressPercent = Math.min((badge.progress / badge.target) * 100, 100)

  return (
    <View style={[styles.card, !badge.isUnlocked && styles.locked]}>
      <Text style={styles.icon}>{ICONS[badge.icon] ?? '💪'}</Text>

      <Text style={styles.badgeTitle}>{badge.title}</Text>

      {!badge.isUnlocked && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      )}

      {badge.isUnlocked && <Text style={styles.isUnlocked}>Goal achieved</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
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
})
