import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { SPACING, TYPOGRAPHY, getColors } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import BadgeCard from './badges/BadgeCard';
import { Achievement } from '../../types';
import { BadgeService } from '../../services/badges/badge.service';


export default function ProfileScreen({navigation}: any) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);
  const [badges, setBadges] = useState<Achievement[]>()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadBadges = async () => {
      if (!user?.id) {
        setLoading(false)
        return
      }
      const data = await BadgeService.getUserProfileBadges(user?.id)
      setBadges(data)
      setLoading(false)
    }

    loadBadges()
  }, [badges])

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRightCorner}>

        <Pressable
        style={styles.BadgesButton}
        onPress={() => navigation.navigate('UserBadges')}
        >
          <View>
            <Text style={styles.buttonText}>My Badges</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('UserSettings')}>
          <Ionicons name="settings-sharp" size={32}/>
        </Pressable>
      </View>

      <View style={styles.ProfileContainer}>
        <Text style={styles.title}>{user?.displayName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <FlatList
          data={badges}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <BadgeCard badge={item} />}
        />
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getColors>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: colors.text.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: colors.text.light,
    marginBottom: SPACING.xl,
  },
  button: {
    backgroundColor: colors.error,
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