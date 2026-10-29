<template>
  <section class="auth-login">
    <LodingSceen :loading="loading" />
    <header class="auth-ticket-heading auth-ticket-seam">
      <div>
        <p class="auth-ticket-wordmark">Matchday</p>
        <h1>เข้าสู่ระบบ</h1>
        <p class="auth-ticket-description">ทีมของคุณพร้อมแล้ว กลับมาลุ้นทุกเกมด้วยกัน</p>
      </div>
      <svg class="auth-ticket-pitch" viewBox="0 0 72 104" fill="none" aria-hidden="true">
        <path d="M3 3h66v98H3zM3 52h66M21 3v17h30V3M21 101V84h30v17"/>
        <circle cx="36" cy="52" r="13"/><circle cx="36" cy="52" r="1.8"/>
      </svg>
    </header>
    <div class="auth-form-panel">
      <form class="auth-form" @submit.prevent="loginform" :aria-busy="loading">
        <div class="auth-field">
          <label for="username">เบอร์โทรศัพท์</label>
          <input id="username" v-model="username" name="username" type="tel" inputmode="tel" autocomplete="username" placeholder="เบอร์โทรศัพท์ 10 หลัก" />
        </div>
        <div class="auth-field">
          <div class="auth-field-heading">
            <label for="password">รหัสผ่าน</label>
            <RouterLink to="/reset-password" class="auth-text-link">ลืมรหัสผ่าน?</RouterLink>
          </div>
          <div class="auth-password">
            <input id="password" v-model="password" name="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" placeholder="กรอกรหัสผ่าน" />
            <button type="button" class="auth-password-toggle" :aria-label="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'" :aria-pressed="showPassword" @click="showPassword = !showPassword">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path v-if="showPassword" d="m4 3 16 18"/></svg>
            </button>
          </div>
        </div>
        <button class="auth-submit" type="submit" :disabled="loading">
          {{ loading ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ' }}
        </button>
      </form>
      <div class="auth-divider"><span>หรือเข้าสู่ระบบด้วย</span></div>
      <div class="auth-socials">
        <button type="button" class="auth-social" :disabled="loading" @click="loginWithGoogle">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.04H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H3.08v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.42 13.92A6 6 0 0 1 6.1 12c0-.67.12-1.32.32-1.92V7.49H3.08A10 10 0 0 0 2 12c0 1.61.39 3.14 1.08 4.51l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.92 5.49l3.34 2.59A5.99 5.99 0 0 1 12 5.96Z"/></svg>
          Google
        </button>
        <button type="button" class="auth-social" :disabled="loading" @click="loginWithLine">
          <svg viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#06C755"/><path fill="#fff" d="M23 12.5C23 8.35 18.97 5 14 5s-9 3.35-9 7.5c0 3.72 3.24 6.82 7.58 7.4.29.06.69.2.79.45.09.23.06.6.03.83l-.13.8c-.04.24-.18.95.83.52 1.01-.42 5.44-3.2 7.42-5.48A6.7 6.7 0 0 0 23 12.5Z"/><text x="7.2" y="14.8" fill="#06C755" font-size="6.4" font-family="Arial, sans-serif" font-weight="700">LINE</text></svg>
          LINE
        </button>
      </div>
      <p class="auth-register-prompt">ยังไม่มีบัญชี? <RouterLink to="/register" class="auth-text-link">สมัครสมาชิก</RouterLink></p>
    </div>
    <div class="auth-ticket-stub auth-ticket-seam">
      <a :href="$memberBrand.appDownloadUrl" download class="auth-app-download">
        <span class="auth-app-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"/></svg></span>
        <span>พกทีมของคุณไปทุกที่<small>ดาวน์โหลดแอป {{ $memberBrand.name }} สำหรับ Android</small></span>
      </a>
      <span class="auth-ticket-bars" aria-hidden="true"></span>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { api } from '@axios_inst';

export default {
  name: 'Login',
  data() {
    return { loading: false, username: '', password: '', showPassword: false };
  },
  methods: {
    ...mapActions('loading', ['updateLoading']),
    ...mapActions('alert', ['addNotification']),
    async loginform() {
      if (this.loading) return;
      if (!this.username || !this.password) {
        this.addNotification({ type: 'error', message: 'กรุณากรอกเบอร์โทรศัพท์และรหัสผ่าน' });
        return;
      }
      this.loading = true;
      try {
        const response = await api.post('/premier-league/v1/login', {
          username: this.username, password: this.password, app_key: 'pudee'
        });
        localStorage.setItem('access_token', response.data.tokenString);
        this.addNotification({ type: 'success', message: 'เข้าสู่ระบบสำเร็จ' });
        window.location.href = '/season-select';
      } catch (error) {
        this.addNotification({ type: 'error', message: error.response?.data?.error || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง' });
        try { localStorage.removeItem('access_token'); } catch { /* Storage may be unavailable. */ }
      } finally {
        this.loading = false;
      }
    },
    loginWithGoogle() {
      if (this.loading) return;
      this.loading = true;
      window.location.href = 'https://api-service.pudee-club.com/api/premier-league/auth/login';
    },
    loginWithLine() {
      if (this.loading) return;
      this.loading = true;
      window.location.href = 'https://api-service.pudee-club.com/api/premier-league/auth/line/login';
    },
    async loginuuid(uuid, username) {
      if (this.loading) return;
      this.loading = true;
      this.updateLoading(true);
      try {
        const response = await api.post('/premier-league/v1/login-uuid', { uuid, username, app_key: 'pudee' });
        localStorage.setItem('access_token', response.data.tokenString);
        this.addNotification({ type: 'success', message: 'เข้าสู่ระบบสำเร็จ' });
        window.location.href = '/season-select';
      } catch (error) {
        this.addNotification({ type: 'error', message: error.response?.data?.error || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง' });
        try { localStorage.removeItem('access_token'); } catch { /* Storage may be unavailable. */ }
      } finally {
        this.loading = false;
        this.updateLoading(false);
      }
    },
    async logVisit() {
      try { await api.post('/premier-league/log-visit', { page: 'login' }); }
      catch { /* Visit tracking must not interrupt sign-in. */ }
    },
  },
  mounted() {
    this.updateLoading(false);
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        api.get('/premier-league/v1/check-token', { headers: { Authorization: `Bearer ${accessToken}` } })
          .then(() => { window.location.href = '/season-select'; })
          .catch(() => { try { localStorage.removeItem('access_token'); } catch {} });
      }
      const userParams = JSON.parse(localStorage.getItem('user_params') || 'null');
      if (userParams?.access_token) {
        localStorage.setItem('access_token', userParams.access_token);
        window.location.href = '/lobby';
        return;
      }
    } catch { /* Missing or invalid saved callback data must not block sign-in. */ }
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('uuid');
    const username = urlParams.get('username');
    if (uuid && username) this.loginuuid(uuid, username);
  }
};
</script>
