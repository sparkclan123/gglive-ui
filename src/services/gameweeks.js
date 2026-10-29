import { api } from '@axios_inst';
const base='/premier-league/v1';
export const memberHeaders=()=>({Authorization:`Bearer ${localStorage.getItem('access_token')}`});
export async function fetchGameweeks(page=1,limit=50) {
  const {data}=await api.get(`${base}/game-week-all`,{headers:memberHeaders(),params:{page,limit}});
  if(!data.ok)throw new Error(data.error||'โหลด Gameweek ไม่สำเร็จ');
  return {...data,data:Array.isArray(data.data)?data.data:[]};
}
export async function fetchActiveGameweeks() {
  const {data}=await api.get(`${base}/game-weeks-active`,{headers:memberHeaders()});
  if(!data.ok)throw new Error(data.error||'โหลด Gameweek ไม่สำเร็จ');
  return {...data,data:Array.isArray(data.data)?data.data:[]};
}
export async function fetchGameweek(id) {
  const {data}=await api.get(`${base}/game-week/${id}`,{headers:memberHeaders()});
  if(!data.ok || Number(data.gameWeek?.id)!==Number(id))throw new Error('โหลด Gameweek ไม่สำเร็จ');
  return data.gameWeek;
}
export function rememberGameweek(week) { if(week?.id)sessionStorage.setItem('member-gameweek',String(week.id)); }
export function rememberedGameweek() { return Number(sessionStorage.getItem('member-gameweek'))||null; }
