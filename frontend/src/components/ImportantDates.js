import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ImportantDates({ importantDates, t }) {
  const dates = [
    {
      title: t.registerBefore,
      date: '10 Aug 26',
      time: '11:50 PM',
      icon: <Ionicons name="calendar-outline" size={20} color="#0D9488" />,
    },
    {
      title: t.submissionStarts,
      date: '5 Aug 26',
      time: '04:00 AM',
      icon: <Ionicons name="paper-plane-outline" size={20} color="#0D9488" />,
    },
    {
      title: t.submissionEnds,
      date: '30 Aug 26',
      time: '11:55 PM',
      icon: <Feather name="upload" size={20} color="#0D9488" />,
    },
    {
      title: t.resultDate,
      date: '1 Sept 26',
      time: '11:50 PM',
      icon: <Ionicons name="trophy-outline" size={20} color="#0D9488" />,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{t.importantDates}</Text>
      <View style={styles.grid}>
        {dates.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
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
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  card: {
    width: '48.5%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
  },
  timeText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
});
