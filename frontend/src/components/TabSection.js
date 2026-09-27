import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabSection({ competition, t }) {
  const [activeTab, setActiveTab] = useState('about');
  const [expanded, setExpanded] = useState(false);

  const tabs = [
    { id: 'about', label: t.aboutCompetition },
    { id: 'judging', label: t.judgingParameters },
    { id: 'rules', label: t.rulesEligibility },
  ];

  return (
    <View style={styles.container}>
      {/* Tabs Header */}
      <View style={styles.tabsHeader}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
            {activeTab === tab.id && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content Box */}
      <View style={styles.contentBox}>
        {activeTab === 'about' && (
          <View>
            <Text style={styles.contentText} numberOfLines={expanded ? undefined : 3}>
              {competition.aboutText}
            </Text>
          </View>
        )}

        {activeTab === 'judging' && (
          <View style={styles.listContainer}>
            {(competition.judgingParameters || []).map((item, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Ionicons name="checkmark-circle" size={14} color="#0D9488" style={styles.bulletIcon} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'rules' && (
          <View style={styles.listContainer}>
            {(competition.rulesAndEligibility || []).map((item, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Ionicons name="information-circle" size={14} color="#0D9488" style={styles.bulletIcon} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* View More / View Less Toggle */}
        <TouchableOpacity style={styles.viewMoreButton} onPress={() => setExpanded(!expanded)}>
          <Text style={styles.viewMoreText}>{expanded ? t.viewLess : t.viewMore}</Text>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color="#0D9488" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  tabsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabButton: {
    paddingVertical: 10,
    marginRight: 16,
    position: 'relative',
  },
  tabButtonActive: {},
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0D9488',
    fontWeight: '800',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#0D9488',
    borderRadius: 1,
  },
  contentBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contentText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  listContainer: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  listText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
    lineHeight: 18,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  viewMoreText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
});
