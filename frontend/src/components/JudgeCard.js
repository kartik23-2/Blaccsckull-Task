import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JudgeCard({ judge, onOpenVideo, t }) {
  if (!judge) return null;

  return (
    <View style={styles.container}>
      {/* Judge Avatar */}
      <Image source={{ uri: judge.avatar }} style={styles.avatar} />

      {/* Judge Info */}
      <View style={styles.infoContainer}>
        <View style={styles.judgeTag}>
          <Text style={styles.judgeTagText}>{t.judgeLabel}</Text>
        </View>
        <Text style={styles.name}>{judge.name}</Text>
        <Text style={styles.subtitle}>{judge.title}</Text>
        <Text style={styles.experience}>{judge.experience}</Text>
      </View>

      {/* Intro Video Button */}
      <TouchableOpacity
        style={styles.videoButton}
        onPress={() => onOpenVideo(judge.videoUrl, `${judge.name} - Intro Video`)}
        activeOpacity={0.8}
      >
        <Ionicons name="play" size={14} color="#0D9488" style={{ marginRight: 4 }} />
        <Text style={styles.videoButtonText}>{t.introVideo}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FAF5FF', // Subtle elegant purple-pink background matching design
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#D8B4FE',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  judgeTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9D5FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginBottom: 2,
  },
  judgeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B21A8',
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B21A8',
    fontWeight: '500',
  },
  experience: {
    fontSize: 10,
    color: '#9333EA',
    fontWeight: '600',
    marginTop: 1,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  videoButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
});
