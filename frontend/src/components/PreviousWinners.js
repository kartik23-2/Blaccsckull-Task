import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PreviousWinners({ winners, t }) {
  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{t.previousWinners}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {winners.map((winner, index) => (
          <View key={index} style={styles.winnerCard}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: winner.avatar }} style={styles.avatar} />
              <View style={styles.badge}>
                <Ionicons name="trophy" size={10} color="#D97706" />
              </View>
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {winner.name}
            </Text>
            <View style={styles.rankPill}>
              <Text style={styles.rankText}>{winner.rank}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  winnerCard: {
    width: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 6,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  name: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  rankPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 3,
  },
  rankText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#D97706',
  },
});
