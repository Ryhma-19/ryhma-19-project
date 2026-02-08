import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StoreService, Pack } from "../../services/store/store.service";

type TabType = 'premium' | 'training' | 'diet';

type Plan = {
  id: string;
  title: string;
  price: string;
  subtitle?: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "monthly",
    title: "Monthly",
    price: "$7.99 / month",
  },
  {
    id: "yearly",
    title: "Yearly",
    price: "$63.99 / year",
    subtitle: "Best value • Save 33%",
    highlighted: true,
  },
];

const FEATURES = [
  "More in depth workout statistics",
  "Save up to 100 routes",
  "Exclusive badges",
  "No ads",
];

export default function PremiumPlanScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('premium');

  const trainingPacks = StoreService.getTrainingPacks();
  const dietPacks = StoreService.getDietPacks();

  const handlePurchase = (pack: Pack) => {
    Alert.alert(
      'Purchase',
      `Purchase ${pack.title} for €${pack.price}?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Buy',
          onPress: () => {
            Alert.alert('Success', `You purchased ${pack.title}! 🎉`);
          },
        },
      ]
    );
  };

  const renderPackCard = ({ item }: { item: Pack }) => (
    <View style={styles.packCard}>
      <View style={styles.packHeader}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={activeTab === 'training' ? 'fitness' : 'restaurant'}
            size={28}
            color="#fff"
          />
        </View>
        <View style={styles.packInfo}>
          <Text style={styles.packTitle}>{item.title}</Text>
          <Text style={styles.packDuration}>{item.duration}</Text>
        </View>
      </View>

      <Text style={styles.packDescription}>{item.description}</Text>

      <View style={styles.packFooter}>
        <Text style={styles.packPrice}>€{item.price}</Text>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => handlePurchase(item)}
        >
          <Ionicons name="cart-outline" size={18} color="#fff" />
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPremiumContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Go Premium 💎</Text>
        <Text style={styles.subtitle}>
          Unlock your full fitness potential
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        {FEATURES.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureIcon}>✔</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <View style={styles.plansContainer}>
        {PLANS.map((plan) => (
          <View
            key={plan.id}
            style={[
              styles.planCard,
              plan.highlighted && styles.highlightedPlan,
            ]}
          >
            {plan.highlighted && (
              <Text style={styles.badge}>BEST VALUE</Text>
            )}

            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planPrice}>{plan.price}</Text>

            {plan.subtitle && (
              <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.planButton,
                plan.highlighted && styles.highlightedButton,
              ]}
              onPress={() => {}}
            >
              <Text
                style={[
                  styles.planButtonText,
                  plan.highlighted && styles.highlightedButtonText,
                ]}
              >
                Choose Plan
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.footerText}>
        Cancel anytime • Billed through your app store
      </Text>
    </ScrollView>
  );

  const renderPacksContent = () => {
    const currentPacks = activeTab === 'training' ? trainingPacks : dietPacks;
    return (
      <FlatList
        data={currentPacks}
        keyExtractor={(item) => item.id}
        renderItem={renderPackCard}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'premium' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('premium')}
        >
          <Ionicons
            name="diamond"
            size={20}
            color={activeTab === 'premium' ? '#fff' : '#888'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'premium' && styles.activeTabText,
            ]}
          >
            Premium
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'training' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('training')}
        >
          <Ionicons
            name="fitness"
            size={20}
            color={activeTab === 'training' ? '#fff' : '#888'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'training' && styles.activeTabText,
            ]}
          >
            Training
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'diet' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('diet')}
        >
          <Ionicons
            name="restaurant"
            size={20}
            color={activeTab === 'diet' ? '#fff' : '#888'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'diet' && styles.activeTabText,
            ]}
          >
            Diet
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'premium' ? renderPremiumContent() : renderPacksContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  header: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#121212",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#9c9c9c",
    textAlign: "center",
  },
  featuresContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: {
    color: "#4CAF50",
    marginRight: 10,
    fontSize: 16,
  },
  featureText: {
    color: "#202020",
    fontSize: 15,
  },
  plansContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  planCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A2A30",
  },
  highlightedPlan: {
    borderColor: "#4CAF50",
    backgroundColor: "#ceecce",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#4CAF50",
    color: "#0B0B0F",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#303030",
  },
  planPrice: {
    fontSize: 18,
    color: "#151515",
    marginTop: 8,
  },
  planSubtitle: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 4,
  },
  planButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4CAF50",
    alignItems: "center",
  },
  highlightedButton: {
    backgroundColor: "#4CAF50",
  },
  planButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "700",
  },
  highlightedButtonText: {
    color: "#0B0B0F",
  },
  footerText: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
    marginVertical: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  packCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  packHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  packInfo: {
    flex: 1,
  },
  packTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#303030',
    marginBottom: 4,
  },
  packDuration: {
    fontSize: 13,
    color: '#888',
  },
  packDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  packFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  packPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4CAF50',
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
