import { Platform } from 'react-native';

// On Web/Localhost use http://localhost:5000
const API_BASE_URL = 'http://localhost:5000/api';

export const fetchCompetitionDetails = async (competitionId = 'default', userId = null) => {
  try {
    const headers = {};
    if (userId) {
      headers['x-user-id'] = userId;
    }
    const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}`, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching competition details:', error);
    return { success: false, message: error.message };
  }
};

export const registerForCompetition = async (competitionId, userId, paymentId, paidAmount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({ userId, paymentId, paidAmount }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering for competition:', error);
    return { success: false, message: error.message };
  }
};

export const submitCompetitionEntry = async (competitionId, userId, title, description, videoUrl) => {
  try {
    const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({ userId, title, description, videoUrl }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting entry:', error);
    return { success: false, message: error.message };
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();
    return data.users || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const updateCompetitionAdminState = async (competitionId, status, bookedSpots, totalSpots) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/competitions/${competitionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, bookedSpots, totalSpots }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating admin state:', error);
    return { success: false, message: error.message };
  }
};

export const resetDatabaseAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/reset`, { method: 'POST' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resetting DB:', error);
    return { success: false, message: error.message };
  }
};
