const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('4slayers_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export const api = {
  // Authentication
  async register(name, email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Registration failed');
    }
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    return res.json();
  },

  async demoLogin() {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Demo login failed');
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Session expired');
    return res.json();
  },

  // Scanners
  async scanMessage(content, senderInfo = null, isDemo = false) {
    const res = await fetch(`${API_BASE}/scan/message`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content, sender_info: senderInfo, is_demo: isDemo }),
    });
    if (!res.ok) throw new Error('Message scan failed');
    return res.json();
  },

  async scanURL(url, context = null, isDemo = false) {
    const res = await fetch(`${API_BASE}/scan/url`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ url, context, is_demo: isDemo }),
    });
    if (!res.ok) throw new Error('URL scan failed');
    return res.json();
  },

  async scanPhone(phoneNumber, callerName = null, callType = 'call', isDemo = false) {
    const res = await fetch(`${API_BASE}/scan/phone`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ phone_number: phoneNumber, caller_name: callerName, call_type: callType, is_demo: isDemo }),
    });
    if (!res.ok) throw new Error('Phone scan failed');
    return res.json();
  },

  async scanQR(qrContent = null, imageBase64 = null, isDemo = false) {
    const res = await fetch(`${API_BASE}/scan/qr`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ qr_content: qrContent, image_base64: imageBase64, is_demo: isDemo }),
    });
    if (!res.ok) throw new Error('QR scan failed');
    return res.json();
  },

  async scanScreenshot(textContent = null, imageBase64 = null, notes = null, isDemo = false) {
    const res = await fetch(`${API_BASE}/scan/screenshot`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ text_content: textContent, image_base64: imageBase64, notes, is_demo: isDemo }),
    });
    if (!res.ok) throw new Error('Screenshot scan failed');
    return res.json();
  },

  async scanTransaction(amount, recipient, paymentMethod, description = null, isDemo = false) {
    const res = await fetch(`${API_BASE}/scan/transaction`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        amount: parseFloat(amount),
        recipient,
        payment_method: paymentMethod,
        description,
        is_demo: isDemo
      }),
    });
    if (!res.ok) throw new Error('Transaction scan failed');
    return res.json();
  },

  async getDemoScan(demoId) {
    const res = await fetch(`${API_BASE}/scan/demo/${demoId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to load demo');
    return res.json();
  },

  async getScans() {
    const res = await fetch(`${API_BASE}/scans`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch scans');
    return res.json();
  },

  async getScanById(id) {
    const res = await fetch(`${API_BASE}/scan/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Scan not found');
    return res.json();
  },

  async deleteScan(id) {
    const res = await fetch(`${API_BASE}/scan/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Community Reports
  async getReports(search = '', scamType = '') {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (scamType && scamType !== 'All') params.append('scam_type', scamType);
    const res = await fetch(`${API_BASE}/reports?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch reports');
    return res.json();
  },

  async createReport(reportData) {
    const res = await fetch(`${API_BASE}/reports`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reportData),
    });
    if (!res.ok) throw new Error('Failed to submit report');
    return res.json();
  },

  async upvoteReport(id) {
    const res = await fetch(`${API_BASE}/reports/${id}/upvote`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // Intelligence
  async getIntelligence() {
    const res = await fetch(`${API_BASE}/intelligence`);
    if (!res.ok) throw new Error('Failed to fetch intelligence');
    return res.json();
  },

  async getIntelligenceCategory(categoryId) {
    const res = await fetch(`${API_BASE}/intelligence/${categoryId}`);
    if (!res.ok) throw new Error('Failed to fetch category');
    return res.json();
  }
};
