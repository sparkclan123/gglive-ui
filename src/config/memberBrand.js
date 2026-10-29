// Member identity only. The admin theme and API application key are independent.
export const memberBrand = Object.freeze({
  name: 'Kickมันส์', wordmark: 'Kickมันส์', mark: 'K', tagline: 'Football Fantasy',
  primary: '#E52520', deep: '#B91018', warm: '#FF6840', background: '#080808',
  logo: '/assets/member/kickmun-logo-512.png', logoSmall: '/assets/member/kickmun-logo-160.png', logoLarge: '/assets/member/kickmun-logo-768.png',
  hero: '/assets/member/footballer.png',
  avatarFallback: '/assets/member/avatar.svg',
  lineLabel: 'ติดต่อทีมงาน', lineUrl: 'https://lin.ee/bltN2Lk',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61563548004280',
  appDownloadUrl: 'https://pudee.sgp1.digitaloceanspaces.com/app-pudee.apk',
});
export function applyMemberBrand() {
  document.documentElement.style.removeProperty('--member-bg');
  const values = {'--member-primary':memberBrand.primary,'--member-deep':memberBrand.deep,'--member-warm':memberBrand.warm};
  for (const [key, value] of Object.entries(values)) document.documentElement.style.setProperty(key,value);
  document.title = `${memberBrand.name} · Fantasy Football`;
}
