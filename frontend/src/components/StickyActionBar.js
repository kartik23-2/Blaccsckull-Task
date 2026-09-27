import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StickyActionBar({
  competition,
  userState,
  onPressAction,
  t,
}) {
  const isRegistered = userState?.isRegistered;
  const isSpotsFull = competition?.bookedSpots >= competition?.totalSpots;
  const isRegistrationOpen = competition?.status === 'REGISTRATION_OPEN';
  const isSubmissionOpen = competition?.status === 'SUBMISSION_OPEN';

  let buttonText = t.registerNow;
  let subtext = t.spotsLeft.replace('{count}', Math.max(0, competition?.totalSpots - competition?.bookedSpots));
  let disabled = false;
  let iconName = 'arrow-forward';

  if (isRegistered) {
    buttonText = t.uploadSubmission;
    subtext = t.registered;
    iconName = 'cloud-upload-outline';
  } else if (isSpotsFull) {
    buttonText = t.spotsFull;
    subtext = '0 spots remaining';
    disabled = true;
    iconName = 'lock-closed-outline';
  } else if (!isRegistrationOpen && !isSubmissionOpen) {
    buttonText = t.submissionClosed;
    subtext = `Status: ${competition?.status}`;
    disabled = true;
    iconName = 'time-outline';
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.actionButton, disabled && styles.disabledButton]}
        onPress={onPressAction}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Ionicons name={iconName} size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <Text style={styles.statusSubtext}>{subtext}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  actionButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D9488',
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  statusSubtext: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
});
