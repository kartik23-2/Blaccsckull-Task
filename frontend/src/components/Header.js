import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header({
  lang,
  onToggleLang,
  isRegistered,
  t,
  onGoBack,
}) {
  return (
    <View style={styles.container}>
      {/* Phone Status Bar Simulation */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={14} color="#000" style={styles.iconMargin} />
          <Ionicons name="wifi" size={14} color="#000" style={styles.iconMargin} />
          <Ionicons name="battery-full" size={16} color="#000" />
        </View>
      </View>

      {/* Top Action Row: Go Back & Language Selector */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#1E293B" />
          <Text style={styles.backText}>{t.goBack}</Text>
        </TouchableOpacity>

        {/* Language Selector Pill */}
        <View style={styles.langPillContainer}>
          <TouchableOpacity
            style={[styles.langOption, lang === 'ENG' && styles.langOptionActive]}
            onPress={() => onToggleLang('ENG')}
          >
            <Text style={[styles.langText, lang === 'ENG' && styles.langTextActive]}>
              ENG
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langOption, lang === 'हिंदी' && styles.langOptionActive]}
            onPress={() => onToggleLang('हिंदी')}
          >
            <Text style={[styles.langText, lang === 'हिंदी' && styles.langTextActive]}>
              हिंदी
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title & Registration Badge Row */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Feedants Classical Dance</Text>
        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#0D9488" />
            <Text style={styles.registeredText}>{t.registered}</Text>
          </View>
        )}
      </View>

      {/* Category Tags Row */}
      <View style={styles.tagsRow}>
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>Dance</Text>
        </View>
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>Multi-Win</Text>
        </View>
        <View style={[styles.tagPill, styles.certificateTagPill]}>
          <Text style={styles.certificateTagText}>🏆 Winners get certificate</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: 6,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 6,
  },
  langPillContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    padding: 2,
  },
  langOption: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 18,
  },
  langOptionActive: {
    backgroundColor: '#0F766E',
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  langTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    borderColor: '#99F6E4',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  registeredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  certificateTagPill: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  certificateTagText: {
    fontSize: 12,
    color: '#0D9488',
    fontWeight: '600',
  },
});
