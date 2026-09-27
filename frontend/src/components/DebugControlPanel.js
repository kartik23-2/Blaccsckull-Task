import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DebugControlPanel({
  users,
  activeUserId,
  onSelectUser,
  competition,
  onUpdateAdminState,
  onResetDatabase,
}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerToggle}
        onPress={() => setCollapsed(!collapsed)}
        activeOpacity={0.8}
      >
        <Ionicons name="options-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.headerTitle}>🛠 Live Demo & Tester Control Panel</Text>
        <Ionicons
          name={collapsed ? 'chevron-down' : 'chevron-up'}
          size={16}
          color="#FFFFFF"
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>

      {!collapsed && (
        <ScrollView style={styles.body} nestedScrollEnabled>
          {/* Active User Switcher */}
          <Text style={styles.sectionLabel}>1. Switch Active Demo User:</Text>
          <View style={styles.chipRow}>
            {users.map((u) => (
              <TouchableOpacity
                key={u._id}
                style={[styles.chip, activeUserId === u._id && styles.chipActive]}
                onPress={() => onSelectUser(u._id)}
              >
                <Text style={[styles.chipText, activeUserId === u._id && styles.chipTextActive]}>
                  👤 {u.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Competition Status Switcher */}
          <Text style={styles.sectionLabel}>2. Simulate Competition Lifecycle State:</Text>
          <View style={styles.chipRow}>
            {['REGISTRATION_OPEN', 'SUBMISSION_OPEN', 'COMPLETED'].map((st) => (
              <TouchableOpacity
                key={st}
                style={[styles.chip, competition?.status === st && styles.chipActive]}
                onPress={() => onUpdateAdminState(st, competition?.bookedSpots, competition?.totalSpots)}
              >
                <Text style={[styles.chipText, competition?.status === st && styles.chipTextActive]}>
                  ⚡ {st}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Spots Full Simulation */}
          <Text style={styles.sectionLabel}>3. Simulate Spot Availability:</Text>
          <View style={styles.chipRow}>
            <TouchableOpacity
              style={styles.chipAction}
              onPress={() => onUpdateAdminState(competition?.status, 1, 20)}
            >
              <Text style={styles.chipActionText}>Set 1/20 Booked (19 Left)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chipAction}
              onPress={() => onUpdateAdminState(competition?.status, 20, 20)}
            >
              <Text style={styles.chipActionText}>Set 20/20 Booked (Spots Full)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chipReset} onPress={onResetDatabase}>
              <Text style={styles.chipResetText}>🔄 Reset DB & Seed</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 180,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 6,
    marginTop: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  chipActive: {
    backgroundColor: '#0D9488',
  },
  chipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  chipAction: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  chipActionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chipReset: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  chipResetText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
