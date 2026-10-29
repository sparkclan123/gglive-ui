import {api} from '@axios_inst';
import {memberHeaders} from './gameweeks.js';
import {normalizeMemberBanner} from '../utils/memberBanner.js';
export async function fetchMemberBanner() {
  const {data} = await api.get('/premier-league/v1/member-banner', {headers: memberHeaders(), timeout: 5000});
  return data?.ok === true ? normalizeMemberBanner(data.data) : null;
}
