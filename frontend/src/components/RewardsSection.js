import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RewardsSection({ rewards, t }) {
  if (!rewards || rewards.length === 0) return null;

  const getRankIcon = (index) => {
    if (index === 0) return <Ionicons name="trophy" size={16} color="#EAB308" />;
    if (index === 1) return <Ionicons name="medal" size={16} color="#94A3B8" />;
    if (index === 2) return <Ionicons name="medal" size={16} color="#B45309" />;
    return <Ionicons name="star-outline" size={16} color="#0D9488" />;
  };

  const getTranslatedRank = (rankTitle, index) => {
    const key = `winnerRank${index + 1}`;
    return t[key] || rankTitle;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionHeader}>{t.rewardsTitle}</Text>
        <Text style={styles.subHeader}>{t.allPositions}</Text>
      </View>

      <View style={styles.card}>
        {rewards.map((reward, index) => (
          <View
            key={index}
            style={[
              styles.rewardRow,
              index !== rewards.length - 1 && styles.borderBottom,
            ]}
          >
            <View style={styles.leftRow}>
              <View style={styles.iconContainer}>{getRankIcon(index)}</View>
              <Text style={styles.rankTitle}>
                {getTranslatedRank(reward.rankTitle, index)}
              </Text>
            </View>
            <Text style={styles.rewardAmount}>₹ {reward.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 6,
  },
  subHeader: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  rankTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  rewardAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
  },
});
