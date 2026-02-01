import { supabase } from './supabase';

const API_BASE_URL = 'https://semidefensively-semistimulating-eladia.ngrok-free.dev';

/**
 * Helper function to handle API requests
 */
const apiRequest = async (endpoint, method = 'POST', body = null, isFileUpload = false) => {
    try {
        const headers = {};
        if (!isFileUpload) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            method,
            headers,
        };

        if (body) {
            config.body = isFileUpload ? body : JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
            throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

export const api = {
    /**
     * Chat with the safety bot
     * @param {string} message 
     * @returns {Promise<{response: string}>}
     */
    chatWithSafetyBot: (message) => {
        return apiRequest('/chat/safety', 'POST', { message });
    },

    /**
     * Analyze text for threats
     * @param {string} text 
     * @returns {Promise<any>}
     */
    analyzeText: (text) => {
        return apiRequest('/analyze/text', 'POST', { text });
    },

    /**
     * Analyze screenshot/image
     * @param {File} file 
     * @returns {Promise<any>}
     */
    analyzeScreenshot: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiRequest('/analyze/screenshot', 'POST', formData, true);
    },

    /**
     * Analyze voice (audio)
     * @param {File} file 
     * @returns {Promise<any>}
     */
    analyzeVoice: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiRequest('/analyze/voice', 'POST', formData, true);
    },

    /**
     * Trigger an alert
     * @param {string} incidentText 
     * @param {string} token 
     * @param {string} [emergencyContact]
     * @param {string} [location]
     */
    /**
     * Generate a report using RAG system
     * @param {string} complaintType 
     * @param {string} incidentText 
     * @returns {Promise<{report: string}>}
     */
    generateReport: (complaintType, incidentText) => {
        return apiRequest('/report/generate', 'POST', {
            complaint_type: complaintType,
            incident_text: incidentText
        });
    },

    triggerAlert: async (incidentText, token, emergencyContact = null, location = "India") => {
        const response = await fetch(`${API_BASE_URL}/alert/trigger`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                incident_text: incidentText,
                emergency_contact: emergencyContact,
                location
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to trigger alert');
        }
        return await response.json();
    }
};
