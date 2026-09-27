import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RazorpayModal({ visible, competition, onConfirmPayment, onClose, t }) {
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handlePay = async () => {
    setLoading(true);
    const mockPaymentId = `pay_rzp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    await onConfirmPayment(mockPaymentId, competition.entryFee);
    setLoading(false);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* Razorpay Brand Bar */}
          <View style={styles.brandBar}>
            <Ionicons name="card" size={22} color="#0284C7" />
            <Text style={styles.brandTitle}>Razorpay Checkout</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={styles.merchantText}>Feedants Platform</Text>
            <Text style={styles.compTitle}>{competition?.title}</Text>

            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>{t.amountToPay}</Text>
              <Text style={styles.amountValue}>₹ {competition?.entryFee}</Text>
            </View>

            <View style={styles.securityPill}>
              <Ionicons name="shield-checkmark" size={14} color="#0D9488" />
              <Text style={styles.securityText}>100% Secure 256-bit Encrypted Transaction</Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0284C7" />
                <Text style={styles.loadingText}>Processing Razorpay Payment...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.payBtn} onPress={handlePay} activeOpacity={0.85}>
                <Text style={styles.payBtnText}>Pay ₹ {competition?.entryFee} Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  brandBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#BAE6FD',
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0369A1',
    marginLeft: 8,
    flex: 1,
  },
  closeBtn: {
    padding: 2,
  },
  body: {
    padding: 20,
    alignItems: 'center',
  },
  merchantText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  compTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
    textAlign: 'center',
  },
  amountBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  amountLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  amountValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  securityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityText: {
    fontSize: 11,
    color: '#0D9488',
    marginLeft: 6,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 13,
    color: '#0369A1',
    fontWeight: '700',
    marginTop: 8,
  },
  payBtn: {
    width: '100%',
    backgroundColor: '#0284C7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  payBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
