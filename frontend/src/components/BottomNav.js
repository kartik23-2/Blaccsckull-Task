import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ t }) {
  const navItems = [
    { id: 'home', label: t.home, icon: 'home-outline' },
    { id: 'explore', label: t.explore, icon: 'search-outline' },
    { id: 'add', label: '', icon: 'add', isCenter: true },
    { id: 'competitions', label: t.competitions, icon: 'trophy', isActive: true },
    { id: 'profile', label: t.profile, icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        if (item.isCenter) {
          return (
            <TouchableOpacity key={item.id} style={styles.centerButton} activeOpacity={0.8}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={item.id} style={styles.navItem} activeOpacity={0.7}>
            <Ionicons
              name={item.icon}
              size={20}
              color={item.isActive ? '#0D9488' : '#94A3B8'}
            />
            <Text style={[styles.navLabel, item.isActive && styles.activeNavLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  activeNavLabel: {
    color: '#0D9488',
    fontWeight: '700',
  },
  centerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
});
