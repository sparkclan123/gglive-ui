<template><section><div v-if="loading" class="member-loading" role="status">กำลังโหลดทีมของคุณ…</div><div v-else-if="error" class="member-error"><h2>โหลดทีมไม่สำเร็จ</h2><button class="member-button" @click="fetchDataMyGameWeek(page)">ลองอีกครั้ง</button></div><template v-else><article v-for="data in datas" :key="data.id" class="member-entry-card"><div class="member-entry-meta"><span>{{data.season}} · {{data.week || `Gameweek ${data.week_id}`}}</span><span class="member-badge">VIP</span></div><h3>{{data.name}}</h3><div class="member-entry-meta"><span>{{dateLabel(data.created_at)}}<br>งบ {{Number(data.total_price).toFixed(1)}} / 80</span><span class="member-entry-score">{{data.total_point ?? 0}} <small style="font-family:var(--member-body);font-size:10px">คะแนน</small></span></div><div class="member-entry-actions"><button class="member-button is-secondary" @click="seeDetailAndEdit(data)">ดูทีม</button><button v-if="editable(data)" class="member-button is-secondary" @click="edit(data.id)">แก้ไขทันที</button><button v-if="editable(data)" class="member-button" @click="edit_new(data.id)">แก้ไขทั้งทีม</button></div></article><div v-if="!datas.length" class="member-empty"><h2>ยังไม่มีทีมในรายการนี้</h2><p>เลือก Gameweek แล้วส่งทีมของคุณลงสนาม</p><RouterLink class="member-button" :to="{name:'season-select'}">เลือก Gameweek</RouterLink></div><Pagination v-if="pages>1" :page="page" :pages="pages" @page-change="fetchDataMyGameWeek"/></template></section></template>
<script>
import {isEntryEditable, dateLabel} from '../../utils/gameweeks.js';
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
export default {
    props: {activeGameweeks: {type: Array, default:()=>[]}, filterGameweekId: {type: Number, default: null}},
    data() {
        return {
            datas: [],
            loading: true,
            error: false,
            requestId: 0,
            total: 0,
            page: 1,
            limit: 50,
            pages: 1,
        };
    },
    computed: {
    },
    methods: {
        dateLabel,
        editable(entry){return isEntryEditable(entry,this.activeGameweeks)},
        edit(id) {
            this.$router.push({ name: 'pitch-detail-edit', params: { id: id, type: "VIP" } });
        },
        edit_new(id) {
            this.$router.push({ name: 'pitch-detail-edit-new', params: { id: id, type: "VIP" } });
        },
        async fetchDataMyGameWeek(page = 1, limit = 50) {
            const request = ++this.requestId; this.loading = true; this.error = false;
            try {
                const response = await api.get('/premier-league/v1/game-week-player-user', {
                    headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`},
                    params: {page, limit, ...(this.filterGameweekId ? {game_week_id:this.filterGameweekId} : {})}
                });
                if(request!==this.requestId)return;
                if(!response.data.ok)throw new Error('Entries unavailable');
                this.datas=response.data.data||[];this.total=response.data.total;this.page=response.data.page;this.limit=response.data.limit;this.pages=response.data.pages;
            } catch { if(request===this.requestId)this.error=true; }
            finally { if(request===this.requestId)this.loading=false; }
        },
        seeDetailAndEdit(data) {
            if (!data) {
                return;
            }
            let id = data.id;
            this.$router.push({ name: 'pitch-detail', params: { id } });
        },
    },
    beforeUnmount(){this.requestId++},
    created() {

        this.fetchDataMyGameWeek();
    },

};
</script>
