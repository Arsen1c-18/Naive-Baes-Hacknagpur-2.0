// Mock data for MVP features

export const SPAM_PATTERNS = [
    { pattern: /congratulations/i, reason: "Common spam keyword" },
    { pattern: /won a lottery/i, reason: "Lottery scam pattern" },
    { pattern: /bank details/i, reason: "Phishing attempt" },
    { pattern: /click this link/i, reason: "Suspicious call to action" },
    { pattern: /urgent/i, reason: "Urgency tactic" },
];

export const checkSpam = (text) => {
    let score = 0;
    const reasons = [];

    SPAM_PATTERNS.forEach(item => {
        if (item.pattern.test(text)) {
            score += 20;
            reasons.push(item.reason);
        }
    });

    // Random noise for realism
    if (text.length > 50 && Math.random() > 0.7) {
        score += 10;
        reasons.push("Heuristic analysis flagged generic suspicious patterns");
    }

    return {
        riskLevel: score > 60 ? 'High' : score > 20 ? 'Medium' : 'Low',
        score: Math.min(score, 100),
        reasons: reasons.length > 0 ? reasons : ['No obvious spam patterns detected']
    };
};

export const mockAnalyzeMedia = async (file) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isSuspicious = Math.random() > 0.5;
            resolve({
                detected: isSuspicious,
                message: isSuspicious
                    ? "Potential deepfake artifacts detected in frequency domain."
                    : "No manipulation detected. Media appears authentic.",
                confidence: Math.floor(Math.random() * 30) + 70 // 70-99%
            });
        }, 2000);
    });
};

export const SAFETY_BOT_RESPONSES = [
    "I advise you not to click on that link. It looks suspicious.",
    "You can report this number to the National Cyber Crime Reporting Portal.",
    "Based on what you described, this is likely a 'Pig Butchering' scam.",
    "Always enable Two-Factor Authentication (2FA) on your accounts.",
    "Do not share your OTP with anyone, even if they claim to be from the bank."
];

export const FAQ_DATA = [
    { q: "How do I report a cybercrime?", a: "You can report cybercrimes at valid government portals or your local police station." },
    { q: "What is a deepfake?", a: "A deepfake is artificial media where a person in an existing image or video is replaced with someone else's likeness." },
    { q: "How to identify a phishing email?", a: "Check the sender's email address, look for spelling mistakes, and avoid clicking suspicious links." }
];

export const analyzeText = (text) => {
    // Mock AI analysis
    const keywords = {
        harassment: ['hate', 'kill', 'stupid', 'ugly', 'attack'],
        scam: ['bank', 'money', 'winner', 'account', 'verify', 'urgent'],
        impersonation: ['official', 'admin', 'support', 'manager', 'password']
    };

    let threatType = 'Safe';
    let maxCount = 0;

    // Simple frequency count
    Object.entries(keywords).forEach(([type, words]) => {
        let count = 0;
        words.forEach(word => {
            if (text.toLowerCase().includes(word)) count++;
        });
        if (count > maxCount) {
            maxCount = count;
            threatType = type.charAt(0).toUpperCase() + type.slice(1);
        }
    });

    // Randomize if low confidence but long text
    if (maxCount === 0 && text.length > 20) {
        threatType = ['Safe', 'Scam', 'Harassment'][Math.floor(Math.random() * 3)];
    }

    return {
        threatType,
        riskScore: threatType === 'Safe' ? 10 : Math.floor(Math.random() * 40) + 60, // 60-99 if threat
        guidance: threatType === 'Safe'
            ? ["No specific threats detected.", "Stay vigilant regardless."]
            : getGuidance(threatType)
    };
};

const getGuidance = (type) => {
    const map = {
        'Scam': ["Do not share personal info.", "Verify the source.", "Report to authorities."],
        'Harassment': ["Block the user.", "Take screenshots as evidence.", "Report the message."],
        'Impersonation': ["Verify identity through other channels.", "Do not click provided links.", "Report the profile."]
    };
    return map[type] || ["Proceed with caution."];
};

export const REPORT_TEMPLATES = {
    "Scam": "Subject: Reporting Scam Activity\n\nTo whom it may concern,\n\nI am writing to report a scam attempt I encountered. The details are as follows:\n\n- Date of Incident: [Date]\n- Method of Contact: [Email/SMS/Call]\n- Sender Details: [Phone Number/Email Address]\n- Description: The sender claimed to be [Impersonated Entity] and asked for [Money/Personal Info].\n\nPlease investigate this matter.\n\nSincerely,\n[Your Name]",
    "Harassment": "Subject: Formal Complaint - Online Harassment\n\nTo the Safety Team,\n\nI wish to report a user for harassment. The user [Username/Handle] has been sending abusive messages.\n\nEvidence is attached.\n\nThank you,\n[Your Name]",
    "Impersonation": "Subject: Report of Impersonation\n\nHello,\n\nI found a profile that is impersonating me/my organization. The profile URL is [Link].\n\nThis account is using my photos and personal information without consent.\n\nPlease take appropriate action.\n\nRegards,\n[Your Name]"
};
