import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";

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
  return (
    <View style={styles.container}>
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
    </View>
  );
};

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
});
