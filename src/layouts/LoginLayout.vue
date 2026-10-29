<template>
  <main class="member-auth kick-auth">
    <svg class="auth-ground-lines" viewBox="0 0 1440 1000" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d="M96 128h1248v744H96zM720 128v744M96 310h180v380H96M1344 310h-180v380h180" />
      <circle cx="720" cy="500" r="158" />
      <circle cx="720" cy="500" r="5" />
    </svg>
    <header class="auth-topbar">
      <RouterLink to="/login" class="auth-home-link" :aria-label="$memberBrand.name + ' หน้าหลัก'"><MemberBrand /></RouterLink>
      <MemberThemeToggle />
    </header>
    <div class="auth-content"><router-view /></div>
    <footer class="auth-footer"><span class="auth-footer-brand">{{ $memberBrand.name }}</span><span>ฟุตบอลแฟนตาซีในแบบของคุณ</span></footer>
  </main>
</template>
<script>
import '../styles/member-auth.css';
export default { name: 'LoginLayout' };
</script>
