import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, FlatList } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import BadgeCard from './badges/BadgeCard';
import { Achievement } from '../../types';
import ProfileBadgeCard from './ProfileBadgeCard';

const date = new Date("23-1-2026")

const UserBadgeTestData: Achievement[] = [
  {
        id: "100_workouts",
        type: 'streak',
        title: "Completed 100 workouts",
        icon: "biceps",
        target: 100,
        progress: 100,
        isUnlocked: true,
        unlockedAt: date,
    },
    {
        id: "100km_total",
        type: 'distance',
        title: "Ran 100 km in total",
        icon: "run",
        target: 10,
        progress: 10,
        isUnlocked: true,
        unlockedAt: date,
    },
    {
        id: "user_speed",
        type: 'streak',
        title: "Active user for 1 year",
        icon: "calendar",
        target: 30,
        progress: 30,
        isUnlocked: true,
        unlockedAt: date,
    },
]


export default function ProfileScreen({navigation}: any) {
  const { user, signOut } = useAuth();



  return (
    <View style={styles.container}>
      <View style={styles.topRightCorner}>

        <Pressable
        style={styles.BadgesButton}
        onPress={() => navigation.navigate('UserBadges')}
        >
          <Text style={styles.buttonText}>My Badges</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('UserSettings')}>
          <Ionicons name="settings-sharp" size={32}/>
        </Pressable>

      </View>

      <View style={styles.ProfileContainer}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>{user?.displayName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <FlatList
          data={UserBadgeTestData}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ProfileBadgeCard badge={item} />}
        />

        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.light,
    marginBottom: SPACING.xl,
  },
  button: {
    backgroundColor: COLORS.error,
    borderRadius: 8,
    padding: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  topRightCorner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  BadgesButton: {
    backgroundColor: '#59b159',
    borderRadius: 16,
    padding: 8,
  },
  ProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  }
});