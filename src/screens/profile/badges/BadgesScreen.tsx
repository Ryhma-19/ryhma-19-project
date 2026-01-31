// screens/BadgeScreen.tsx
import React, { useEffect, useMemo, useState } from "react"
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../../services/firebase/config"
import { Achievement, ICONS } from "../../../types"
import { useAuth } from "../../../contexts/AuthContext"
import BadgeCard from "./BadgeCard"
import { BadgeManager } from "../../../services/badges/badge.service"


export default function BadgeScreen() {
  const { user } = useAuth()
  const [badges, setBadges] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBadges = async () => {
      if (!user?.id) {
        setLoading(false)
        return
      }
      const data = await BadgeManager.getAllBadgesWithUnlockStatus(user?.id)
      setBadges(data)
      setLoading(false)
    }

    loadBadges()
  }, [])

  const sortedBadges = useMemo(() => {
    return [...badges].sort((a, b) => {
      if (a.isUnlocked !== b.isUnlocked) {
        return a.isUnlocked ? -1 : 1;
      }

      return 0

      //return (b.progress / b.target) - (a.progress / a.target);
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
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BadgeCard badge={item} />}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
      />
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
})
