import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function KeyStatsCard({ prizePool, entryFee, totalSpots, bookedSpots, t }) {
  const remainingSpots = Math.max(0, totalSpots - bookedSpots);
  const progressRatio = Math.min(1, Math.max(0, bookedSpots / totalSpots));
  const spotsText = t.spotsLeft.replace('{count}', remainingSpots);
  const bookedText = t.bookedCount.replace('{booked}', bookedSpots).replace('{total}', totalSpots);

  return (
    <View style={styles.container}>
      {/* Left Column: Prize Pool & Entry Fee */}
      <View style={styles.statsLeft}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{t.prizePool}</Text>
          <Text style={styles.prizeAmount}>₹ {prizePool.toLocaleString()}</Text>
        </View>

        <View style={styles.dividerVertical} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{t.entryFee}</Text>
          <Text style={styles.feeAmount}>₹ {entryFee}</Text>
        </View>
      </View>

      {/* Right Column: Remaining Spots & Progress Bar */}
      <View style={styles.statsRight}>
        <View style={styles.spotsBadgeRow}>
          <Ionicons name="people" size={15} color="#0D9488" />
          <Text style={styles.spotsText}>{spotsText}</Text>
        </View>

        {/* Progress Bar Container */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]} />
        </View>
        <Text style={styles.progressSubtext}>{bookedText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 14,
    borderRadius: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.2,
  },
  statItem: {
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  prizeAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  feeAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
  },
  dividerVertical: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 14,
  },
  statsRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  spotsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 6,
  },
  spotsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
    marginLeft: 4,
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },
  progressSubtext: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
});
