function safeURL(value, allowPath = false) {
  if (typeof value !== 'string') return '';
  const text = value.trim();
  if (!text || text.length > 2048 || /[\u0000-\u0020\\]/.test(text)) return '';
  if (allowPath && text.startsWith('/') && !text.startsWith('//')) return text;
  try {
    const url = new URL(text);
    return ['http:', 'https:'].includes(url.protocol) && url.hostname && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

export function normalizeMemberBanner(value) {
  if (value?.enabled !== true) return null;
  const image_url = safeURL(value.image_url);
  if (!image_url) return null;
  return {
    enabled: true, image_url,
    mobile_image_url: safeURL(value.mobile_image_url),
    alt_text: typeof value.alt_text === 'string' && value.alt_text.trim() ? value.alt_text.trim().slice(0,200) : 'ข่าวสารและกิจกรรม Kickมันส์',
    link_url: safeURL(value.link_url, true),
  };
}

export function bannerAfterImageError(banner, mobileFailed, currentSource = '') {
  const mobileWasSelected = !currentSource || currentSource === banner?.mobile_image_url;
  return {mobileFailed: true, failed: !banner?.mobile_image_url || mobileFailed || !mobileWasSelected};
}
