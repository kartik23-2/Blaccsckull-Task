import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrustBanners({ disclaimer, onOpenVideo, t }) {
  return (
    <View style={styles.container}>
      {/* Disclaimer Box */}
      <View style={styles.disclaimerBox}>
        <Ionicons name="information-circle-outline" size={16} color="#0D9488" style={styles.infoIcon} />
        <Text style={styles.disclaimerText}>{disclaimer || t.disclaimer}</Text>
      </View>

      {/* Row 1: How will you receive prize money? */}
      <TouchableOpacity
        style={styles.trustRow}
        onPress={() =>
          onOpenVideo(
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            t.howReceivePrize
          )
        }
        activeOpacity={0.7}
      >
        <View style={styles.rowLeft}>
          <Ionicons name="play-circle" size={24} color="#0D9488" />
          <View style={styles.rowTextCol}>
            <Text style={styles.rowTitle}>{t.howReceivePrize}</Text>
            <Text style={styles.rowSubtitle}>{t.watchVideoText}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
      </TouchableOpacity>

      {/* Row 2: Refund Policy & Secure Payments */}
      <View style={styles.badgesGrid}>
        <TouchableOpacity style={styles.badgeItem} activeOpacity={0.8}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#0D9488" />
          <Text style={styles.badgeText}>{t.refundPolicy}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.badgeItem} activeOpacity={0.8}>
          <Ionicons name="lock-closed-outline" size={16} color="#0D9488" />
          <Text style={styles.badgeText}>{t.securePayments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    gap: 8,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDFA',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  infoIcon: {
    marginTop: 1,
    marginRight: 6,
  },
  disclaimerText: {
    fontSize: 10,
    color: '#0F766E',
    flex: 1,
    lineHeight: 14,
    fontWeight: '500',
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextCol: {
    marginLeft: 10,
  },
  rowTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowSubtitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  badgesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  badgeItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
    marginLeft: 4,
  },
});
