export function validRuleImage(value) {
  if (typeof value !== 'string' || !/^https?:\/\//i.test(value) || value.length > 2048 || /[\s\u0000-\u001f\u007f\\]/.test(value)) return false;
  try { const url = new URL(value); return !!url.hostname && !url.username && !url.password; } catch { return false; }
}

export function rulesValidation(data) {
  const text = (value, min, max) => typeof value === 'string' && [...value.trim()].length >= min && [...value].length <= max && !value.includes('\0');
  if (!data || !text(data.title, 1, 160)) return 'กรุณากรอกชื่อกติกา ไม่เกิน 160 ตัวอักษร';
  if (!Number.isSafeInteger(data.version) || data.version < 0 || data.version > 2147483646) return 'ข้อมูลเวอร์ชันไม่ถูกต้อง กรุณาโหลดใหม่';
  if (!Array.isArray(data.sections) || !Array.isArray(data.images) || data.sections.length > 20 || data.images.length > 6 || !data.sections.length && !data.images.length) return 'กรุณาเพิ่มเนื้อหาหรือรูปภาพ (ไม่เกิน 20 หัวข้อ และ 6 รูป)';
  if (data.sections.some(item => !item || !text(item.heading, 1, 120) || !text(item.body, 1, 8000))) return 'แต่ละหัวข้อต้องมีชื่อไม่เกิน 120 ตัวอักษร และเนื้อหา 1–8,000 ตัวอักษร';
  if (data.images.some(item => !item || !validRuleImage(item.url) || !text(item.alt, 0, 200))) return 'กรุณาอัปโหลดรูปหรือใส่ URL http/https และคำอธิบายไม่เกิน 200 ตัวอักษร';
  if (new TextEncoder().encode(JSON.stringify(data)).length > 128 * 1024) return 'เนื้อหายาวเกินไป กรุณาย่อข้อความ';
  return '';
}

export function rulesResponse(response) {
  if (!response.data?.ok) throw new Error(response.data?.error || 'โหลดกติกาไม่สำเร็จ');
  const data = response.data.data;
  const invalid = rulesValidation(data);
  if (invalid) throw new Error(invalid);
  return { title: data.title, sections: data.sections.map(item => ({ ...item })), images: data.images.map(item => ({ ...item })), version: data.version, updated_at: data.updated_at || null };
}
