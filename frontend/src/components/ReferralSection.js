import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReferralSection({ referralCode, referralBonus, t }) {
  const referralUrl = `https://feedants.com/c/${referralCode || 'referral123'}`;

  const handleCopy = () => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(referralUrl);
      alert(t.copiedToast);
    } else {
      Alert.alert('Copied!', t.copiedToast);
    }
  };

  return (
    <View style={styles.container}>
      {/* Referral Header */}
      <View style={styles.headerRow}>
        <Ionicons name="megaphone-outline" size={18} color="#0D9488" style={{ marginRight: 6 }} />
        <Text style={styles.title}>{t.referEarnTitle}</Text>
      </View>

      {/* Link Input & Copy Button Row */}
      <View style={styles.linkContainer}>
        <Text style={styles.urlText} numberOfLines={1}>
          {referralUrl}
        </Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopy} activeOpacity={0.8}>
          <Text style={styles.copyButtonText}>{t.copyLink}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.referNowButton} onPress={handleCopy} activeOpacity={0.8}>
          <Text style={styles.referNowText}>{t.referNow}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtext}>{t.referEarnSubtext}</Text>

      {/* Hear From Our Users Box */}
      <TouchableOpacity style={styles.userFeedbackCard} activeOpacity={0.8}>
        <Ionicons name="chatbubbles-outline" size={18} color="#0D9488" style={{ marginRight: 8 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.feedbackTitle}>{t.hearFromUsers}</Text>
          <Text style={styles.feedbackSubtitle}>{t.hearFromUsersSubtext}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
      </TouchableOpacity>

      {/* Ad Placeholder Banner */}
      <View style={styles.adBanner}>
        <Ionicons name="megaphone" size={14} color="#94A3B8" style={{ marginRight: 4 }} />
        <Text style={styles.adText}>{t.adHere}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  urlText: {
    flex: 1,
    fontSize: 11,
    color: '#475569',
  },
  copyButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  copyButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  referNowButton: {
    backgroundColor: '#0D9488',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  referNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtext: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  userFeedbackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  feedbackTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  feedbackSubtitle: {
    fontSize: 10,
    color: '#64748B',
  },
  adBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  adText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
});
