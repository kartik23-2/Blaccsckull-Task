import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CountdownTimer({ targetDate, t }) {
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 6, minutes: 28, seconds: 32 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = targetDate ? new Date(targetDate).getTime() : now + 24 * 3600 * 1000 + 6 * 3600 * 1000 + 28 * 60 * 1000 + 32 * 1000;
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <Ionicons name="hourglass-outline" size={16} color="#0D9488" style={{ marginRight: 6 }} />
        <Text style={styles.label}>{t.regClosesIn}</Text>
      </View>

      <Text style={styles.timerText}>
        {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
      </Text>

      <View style={styles.hurryPill}>
        <Ionicons name="flash" size={12} color="#D97706" />
        <Text style={styles.hurryText}>{t.hurryUp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0FDFA',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F766E',
  },
  timerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 0.5,
  },
  hurryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  hurryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 2,
  },
});
