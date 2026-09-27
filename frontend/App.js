import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import Header from './src/components/Header';
import KeyStatsCard from './src/components/KeyStatsCard';
import JudgeCard from './src/components/JudgeCard';
import CountdownTimer from './src/components/CountdownTimer';
import ImportantDates from './src/components/ImportantDates';
import PreviousWinners from './src/components/PreviousWinners';
import TabSection from './src/components/TabSection';
import RewardsSection from './src/components/RewardsSection';
import TrustBanners from './src/components/TrustBanners';
import ReferralSection from './src/components/ReferralSection';
import StickyActionBar from './src/components/StickyActionBar';
import BottomNav from './src/components/BottomNav';
import DebugControlPanel from './src/components/DebugControlPanel';
import VideoModal from './src/components/Modals/VideoModal';
import RazorpayModal from './src/components/Modals/RazorpayModal';
import SubmissionModal from './src/components/Modals/SubmissionModal';

import { translations } from './src/constants/translations';
import {
  fetchCompetitionDetails,
  registerForCompetition,
  submitCompetitionEntry,
  fetchUsers,
  updateCompetitionAdminState,
  resetDatabaseAPI,
} from './src/api/apiClient';

export default function App() {
  const [lang, setLang] = useState('ENG');
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState(null);
  const [userState, setUserState] = useState({ isRegistered: false, hasSubmitted: false });
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  // Modals state
  const [videoModal, setVideoModal] = useState({ visible: false, url: '', title: '' });
  const [razorpayVisible, setRazorpayVisible] = useState(false);
  const [submissionVisible, setSubmissionVisible] = useState(false);

  const t = translations[lang] || translations.ENG;

  const loadData = async (userIdToUse = activeUserId) => {
    try {
      const usersList = await fetchUsers();
      setUsers(usersList);

      let currentUserId = userIdToUse;
      if (!currentUserId && usersList.length > 0) {
        currentUserId = usersList[0]._id;
        setActiveUserId(currentUserId);
      }

      const res = await fetchCompetitionDetails('latest', currentUserId);
      if (res.success && res.competition) {
        setCompetition(res.competition);
        setUserState(res.userState || { isRegistered: false, hasSubmitted: false });
      }
    } catch (err) {
      console.error('App load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectUser = (userId) => {
    setActiveUserId(userId);
    loadData(userId);
  };

  const handleToggleLang = (selectedLang) => {
    setLang(selectedLang);
  };

  const handleOpenVideo = (url, title) => {
    setVideoModal({ visible: true, url, title });
  };

  const handleCloseVideo = () => {
    setVideoModal({ visible: false, url: '', title: '' });
  };

  const handlePressMainAction = () => {
    if (userState.isRegistered) {
      setSubmissionVisible(true);
    } else {
      setRazorpayVisible(true);
    }
  };

  const handleConfirmPayment = async (paymentId, amount) => {
    if (!activeUserId || !competition) return;

    const res = await registerForCompetition(competition._id, activeUserId, paymentId, amount);
    setRazorpayVisible(false);

    if (res.success) {
      const msg = res.message || 'Successfully registered!';
      if (Platform.OS === 'web') alert(`🎉 ${msg}`);
      else Alert.alert('Success', msg);
      await loadData(activeUserId);
    } else {
      const errMsg = res.message || 'Registration failed.';
      if (Platform.OS === 'web') alert(`⚠️ ${errMsg}`);
      else Alert.alert('Registration Failed', errMsg);
    }
  };

  const handleSubmitEntry = async ({ title, description, videoUrl }) => {
    if (!activeUserId || !competition) return;

    const res = await submitCompetitionEntry(competition._id, activeUserId, title, description, videoUrl);
    setSubmissionVisible(false);

    if (res.success) {
      const msg = 'Your dance entry has been submitted successfully!';
      if (Platform.OS === 'web') alert(`🎬 ${msg}`);
      else Alert.alert('Submission Successful', msg);
      await loadData(activeUserId);
    } else {
      const errMsg = res.message || 'Submission failed.';
      if (Platform.OS === 'web') alert(`⚠️ ${errMsg}`);
      else Alert.alert('Submission Error', errMsg);
    }
  };

  const handleUpdateAdminState = async (status, bookedSpots, totalSpots) => {
    if (!competition) return;
    await updateCompetitionAdminState(competition._id, status, bookedSpots, totalSpots);
    await loadData(activeUserId);
  };

  const handleResetDatabase = async () => {
    await resetDatabaseAPI();
    await loadData();
  };

  if (loading || !competition) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#0D9488" />
        <Text style={styles.loadingText}>Loading Feedants Competition...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.phoneOuterWrapper}>
        <View style={styles.phoneInnerContainer}>
          {/* Debug / Tester Control Panel */}
          <DebugControlPanel
            users={users}
            activeUserId={activeUserId}
            onSelectUser={handleSelectUser}
            competition={competition}
            onUpdateAdminState={handleUpdateAdminState}
            onResetDatabase={handleResetDatabase}
          />

          {/* Main Scrollable Content */}
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Header
              lang={lang}
              onToggleLang={handleToggleLang}
              isRegistered={userState.isRegistered}
              t={t}
              onGoBack={() => {
                if (Platform.OS === 'web') alert('Navigating back...');
              }}
            />

            <KeyStatsCard
              prizePool={competition.prizePool}
              entryFee={competition.entryFee}
              totalSpots={competition.totalSpots}
              bookedSpots={competition.bookedSpots}
              t={t}
            />

            <JudgeCard judge={competition.judge} onOpenVideo={handleOpenVideo} t={t} />

            <CountdownTimer targetDate={competition.importantDates?.registerBefore} t={t} />

            <ImportantDates importantDates={competition.importantDates} t={t} />

            <PreviousWinners winners={competition.previousWinners} t={t} />

            <TabSection competition={competition} t={t} />

            <RewardsSection rewards={competition.rewards} t={t} />

            <TrustBanners
              disclaimer={competition.disclaimer}
              onOpenVideo={handleOpenVideo}
              t={t}
            />

            <ReferralSection
              referralCode={competition.referralCode}
              referralBonus={competition.referralBonus}
              t={t}
            />
          </ScrollView>

          {/* Bottom Sticky Action CTA */}
          <StickyActionBar
            competition={competition}
            userState={userState}
            onPressAction={handlePressMainAction}
            t={t}
          />

          {/* Bottom App Navigation Bar */}
          <BottomNav t={t} />
        </View>
      </View>

      {/* Modals */}
      <VideoModal
        visible={videoModal.visible}
        videoUrl={videoModal.url}
        title={videoModal.title}
        onClose={handleCloseVideo}
      />

      <RazorpayModal
        visible={razorpayVisible}
        competition={competition}
        onConfirmPayment={handleConfirmPayment}
        onClose={() => setRazorpayVisible(false)}
        t={t}
      />

      <SubmissionModal
        visible={submissionVisible}
        onSubmit={handleSubmitEntry}
        onClose={() => setSubmissionVisible(false)}
        t={t}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  phoneOuterWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  phoneInnerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 14,
    color: '#0D9488',
    fontWeight: '700',
    marginTop: 12,
  },
});
