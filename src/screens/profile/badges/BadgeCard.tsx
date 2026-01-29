import { View, Text, StyleSheet, Modal, Pressable } from "react-native"
import { useState } from "react";
import { Achievement, ICONS } from "../../../types"

export default function BadgeCard({ badge }: { badge: Achievement }) {
  const [modalVisible, setModalVisible] = useState(false);
  const progressPercent = Math.min((badge.progress / badge.target) * 100, 100)

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
            <Text style={styles.modalIcon}>{ICONS[badge.icon] ?? ''}</Text>
          </View>
          <Text style={styles.modalText}>{badge.title}</Text>
          {!badge.isUnlocked && (
            <View style={styles.modalProgressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          )}
          {badge.isUnlocked && (
            <Pressable style={styles.modalIconButton}>
              <Text>Add to profile</Text>
            </Pressable>
          )}
        </Pressable>
      </Modal>

      <Pressable
      onPress={() => setModalVisible(true)}
      >
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
      </Pressable>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // adjust opacity here
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
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#1bff2e',
  }
})