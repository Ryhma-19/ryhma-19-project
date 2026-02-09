import { View, Text, StyleSheet, Modal, Pressable } from "react-native"
import { useEffect, useState } from "react";
import { Achievement, ICONS } from "../../../types"
import { BadgeService } from "../../../services/badges/badge.service";
import { useAuth } from "../../../contexts/AuthContext";

export default function BadgeCard({ badge }: { badge: Achievement }) {
  const { user } = useAuth()
  const [modalVisible, setModalVisible] = useState(false);
  const [nextMilestone, setNextMilestone] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState<number | null>(null);

  useEffect(() => {
  if (!badge.milestones?.length) {
    setNextMilestone(null)
    setProgressPercent(null)
    return
  }

  const next = badge.milestones.find(
    num => badge.progress < num
  ) ?? null

  setNextMilestone(next)

  if (next === null || next === 0) {
    setProgressPercent(null)
    return
  }

  const percent = Math.min(
    (badge.progress / next) * 100,
    100
  )

  setProgressPercent(percent)
}, [badge.progress, badge.milestones])

  

  return (
    <View>
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >

          <View style={[styles.modalScreen, !badge.isUnlocked && styles.locked]}>
            <Text style={styles.modalIcon}>{ICONS[badge.type] ?? ''}</Text>
          </View>
          <Text style={styles.modalText}>{badge.title}</Text>
          {badge.progress !== null && (
            <Text style={styles.modalText}>{badge.progress?.toString()}</Text>
          )}
          {badge.isUnlocked && progressPercent !== null && progressPercent > 0 && (
            <View style={styles.modalProgressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          )}
          {badge.isUnlocked && nextMilestone !== null && (
            <Text style={styles.desc}>Next milestone: {nextMilestone}</Text>
          )}
          {!badge.isUnlocked && (
            <Pressable 
            style={styles.modalIconButton}
            onPress={() => BadgeService.saveBadgeToUser(user?.id, badge.id)}
            >
              <Text>Unlock</Text>
            </Pressable>
          )}

          {badge.isUnlocked && !badge.isProfile && (
            <Pressable 
            style={styles.modalIconButton}
            onPress={() => BadgeService.changeProfileBadgeStatus(user?.id, badge.id, true)}
            >
            <Text>Add to profile</Text>
            </Pressable> 
          )}

          {badge.isUnlocked && badge.isProfile && (
            <Pressable 
            style={styles.modalIconButton}
            onPress={() => BadgeService.changeProfileBadgeStatus(user?.id, badge.id, false)}
            >
            <Text>Remove from profile</Text>
            </Pressable>
          )}
        </Pressable>
      </Modal>

      <Pressable
      onPress={() => setModalVisible(true)}
      >
        <View style={[styles.card, !badge.isUnlocked && styles.locked]}>
          <View style={styles.background}>
            <Text style={styles.icon}>{ICONS[badge.type] ?? ''}</Text>
          </View>

          <Text style={styles.badgeTitle}>{badge.title}</Text>

          {badge.progress && (
            <Text>{badge.progress}</Text>
          )}
      
        </View>
      </Pressable>
    </View>
    
  )
}

const styles = StyleSheet.create({
    
  card: {
    width: 100,
    padding: 16,
    borderRadius: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 60,
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
    fontSize: 16,
    color: "#ffffff",
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
  background: {
    backgroundColor: '#ffffff',
    borderRadius: 40,
    padding: 4,
    width: 68,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScreen: {
    height: '25%',
    width: '50%',
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#ffff',
  },
  modalIcon: {
    fontSize: 100,
  },
  modalProgressBar: {
    width: "50%",
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    marginTop: 10,
  },
  modalIconButton: {
    marginTop: 24,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#1bff2e',
  }
})