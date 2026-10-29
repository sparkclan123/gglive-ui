<template>
    <section class="member-detail">
        <div v-if="isDetailLoading" class="member-loading" role="status">กำลังโหลดข้อมูลทีม…</div>
        <div v-else-if="loadError" class="member-error" role="alert">
            <h2>โหลดข้อมูลทีมไม่สำเร็จ</h2>
            <p>{{ loadError }}</p>
            <button class="member-button" @click="fetchGameWeekDetail">ลองอีกครั้ง</button>
        </div>
    <div>
        <div>
            <LodingSceen :loading="loading" />
        </div>
        <div class="dxRBog" v-if="getMain">
            <MemberTeamHeader
                :team="getMain"
                :stats="[
                    { label: 'งบทั้งหมด', value: 80, format: 'budget' },
                    { label: 'ใช้ไป', value: -priceSum, format: 'budget' },
                ]"
                :created-at="getMain.created_at"
                edit-mode="staged"
                @back="route_back"
                @save="saveTeamEdit"
                @reset="resetTeamEdit"
            />
            <div>
                <div class="elHRfu ">
                    <div class="imodPj custom-btn shadow-xl">
                        <div class="iA-dheQ">

                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(GKP, i) in getGKP" :key="i">
                                    <div class="member-staged-player">
                                    <button type="button"
                                        @click="GKP.player_id === null || GKP.remove ? toggleClass('G') : adjustPlayer(GKP)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="GKP.player_id" :src="getShirtImage(GKP)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: GKP.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png"
                                                class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="GKP.player_id == is_captan" class="captain-badge">C</span>




                                        </picture>
                                        <div class=" gTayAP" v-if="GKP.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                เพิ่ม</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: GKP.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(GKP.name) }}</div>
                                            <div class=" fQREvA">{{ GKP.price }}</div>
                                            <div class=" fQREvA_fix" v-if="GKP.team_vs != ''">{{ GKP.team_vs }}</div>
                                        </div>
                                    </button>
                                    <button v-if="GKP.player_id && !GKP.remove" type="button"
                                        class="captain-badge-close" @click.stop="removePlayer(GKP)"
                                        :aria-label="'นำ ' + GKP.name + ' ออกจากทีม'">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                        </svg>
                                    </button>
                                    <button v-if="GKP.player_id && GKP.remove" type="button"
                                        class="captain-badge-close member-staged-undo" @click.stop="revestPlayer(GKP)"
                                        :aria-label="'คืน ' + GKP.name + ' เข้าทีม'">⟳</button>
                                    </div>
                                </div>

                            </div>
                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(DEF, i) in getDEF" :key="i">
                                    <div class="member-staged-player">
                                    <button type="button"
                                        @click="DEF.player_id === null || DEF.remove ? toggleClass('D') : adjustPlayer(DEF)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="DEF.player_id" :src="getShirtImage(DEF)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: DEF.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png"
                                                class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="DEF.player_id == is_captan" class="captain-badge">C</span>





                                        </picture>
                                        <div class=" gTayAP" v-if="DEF.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                เพิ่ม</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: DEF.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(DEF.name) }}</div>
                                            <div class=" fQREvA">{{ DEF.price }}</div>
                                            <div class=" fQREvA_fix" v-if="DEF.team_vs != ''">{{ DEF.team_vs }}</div>
                                        </div>
                                    </button>
                                    <button v-if="DEF.player_id && !DEF.remove" type="button"
                                        class="captain-badge-close" @click.stop="removePlayer(DEF)"
                                        :aria-label="'นำ ' + DEF.name + ' ออกจากทีม'">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                        </svg>
                                    </button>
                                    <button v-if="DEF.player_id && DEF.remove" type="button"
                                        class="captain-badge-close member-staged-undo" @click.stop="revestPlayer(DEF)"
                                        :aria-label="'คืน ' + DEF.name + ' เข้าทีม'">⟳</button>
                                    </div>
                                </div>

                            </div>
                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(MID, i) in getMID" :key="i">
                                    <div class="member-staged-player">
                                    <button type="button"
                                        @click="MID.player_id === null || MID.remove ? toggleClass('M') : adjustPlayer(MID)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="MID.player_id" :src="getShirtImage(MID)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: MID.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png"
                                                class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="MID.player_id == is_captan" class="captain-badge">C</span>




                                        </picture>
                                        <div class=" gTayAP" v-if="MID.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                เพิ่ม</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: MID.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(MID.name) }}</div>
                                            <div class=" fQREvA">{{ MID.price }}</div>
                                            <div class=" fQREvA_fix" v-if="MID.team_vs != ''">{{ MID.team_vs }}</div>
                                        </div>
                                    </button>
                                    <button v-if="MID.player_id && !MID.remove" type="button"
                                        class="captain-badge-close" @click.stop="removePlayer(MID)"
                                        :aria-label="'นำ ' + MID.name + ' ออกจากทีม'">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                        </svg>
                                    </button>
                                    <button v-if="MID.player_id && MID.remove" type="button"
                                        class="captain-badge-close member-staged-undo" @click.stop="revestPlayer(MID)"
                                        :aria-label="'คืน ' + MID.name + ' เข้าทีม'">⟳</button>
                                    </div>
                                </div>
                            </div>
                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(FWD, i) in getFWD" :key="i">
                                    <div class="member-staged-player">
                                    <button type="button"
                                        @click="FWD.player_id === null || FWD.remove ? toggleClass('F') : adjustPlayer(FWD)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="FWD.player_id" :src="getShirtImage(FWD)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: FWD.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png"
                                                class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="FWD.player_id == is_captan" class="captain-badge">C</span>






                                        </picture>
                                        <div class=" gTayAP" v-if="FWD.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                เพิ่ม</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: FWD.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(FWD.name) }}</div>
                                            <div class=" fQREvA">{{ FWD.price }}</div>
                                            <div class=" fQREvA_fix" v-if="FWD.team_vs != ''">{{ FWD.team_vs }}</div>
                                        </div>
                                    </button>
                                    <button v-if="FWD.player_id && !FWD.remove" type="button"
                                        class="captain-badge-close" @click.stop="removePlayer(FWD)"
                                        :aria-label="'นำ ' + FWD.name + ' ออกจากทีม'">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                        </svg>
                                    </button>
                                    <button v-if="FWD.player_id && FWD.remove" type="button"
                                        class="captain-badge-close member-staged-undo" @click.stop="revestPlayer(FWD)"
                                        :aria-label="'คืน ' + FWD.name + ' เข้าทีม'">⟳</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModelEdit :showAdjustPlayerModal="showAdjustPlayerModal"
                :playerName="detailPlayer ? detailPlayer.name : 'Player'" @close-modal="showAdjustPlayerModal = false"
                @set-captain="setCaptan" @change-player="ChangePlayer" />

            <ModelEditSelectPlayerNew :showAdjustPlayerModal="showAdjustPlayerModalSelect" :players="players"
                :position="position" :detailPlayer_price="detailPlayer ? detailPlayer.price : 0"
                @close-modal="showAdjustPlayerModalSelect = false" @set-captain="setCaptan"
                @change-player="ChangePlayerSelect" :remainingAmount="remainingAmount" />
        </div>
    </div>

    </section>
</template>


<script>
import { api } from '@axios_inst';
import MemberTeamHeader from '../../components/member/MemberTeamHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import ModelEdit from '../../components/object/model_edit.vue';
import ModelEditSelectPlayerNew from '../../components/object/model_edit_selectplayer_new.vue';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            selectedFormation: '1-5-5-3',
            loading: false,
            showAdjustPlayerModal: false,
            showAdjustPlayerModalSelect: false,
            type: null,
            id: null,
            getGKP: [],
            getDEF: [],
            getMID: [],
            getFWD: [],
            getMain: null,
            requestVersion: 0,
            isDetailLoading: false,
            loadError: '',
            isNavigating: false,
            is_captan: null,
            players: [],
            position: null,

            delGKP: [],
            delDEF: [],
            delMID: [],
            delFWD: [],
            delAllIds: [],
            detailPlayer: null,

        };
    },
    components: {
        MemberTeamHeader,
        ModelEdit,
        ModelEditSelectPlayerNew
    },
    computed: {
        priceSum() {
            let sum = 0;
            this.getGKP.forEach(player => {
                if (player.player_id && !player.remove) {
                    sum += player.price;
                }

            });
            this.getDEF.forEach(player => {
                if (player.player_id && !player.remove) {
                    sum += player.price;
                }
            });
            this.getMID.forEach(player => {
                if (player.player_id && !player.remove) {
                    sum += player.price;
                }
            });
            this.getFWD.forEach(player => {
                if (player.player_id && !player.remove) {
                    sum += player.price;
                }
            });
            return sum;
        },
        remainingAmount() {
            return 80 - this.priceSum;
        },
        totalPlayerCount() {
            try {
                const allPlayers = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD];
                const validPlayers = allPlayers.filter(player => player.player_id !== null && !player.remove);
                return validPlayers.length;
            } catch (error) {
                console.error('Error calculating total player count:', error);
                return 0;
            }
        },
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        ...mapActions('Teams', ['setTeams']),
        async removePlayer(player) {
            const mergeData = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD];
            mergeData.map((item) => {
                if (item.player_id === player.player_id) {
                    if (item.position === 'G') {
                        this.delGKP.push(item.id);
                    }
                    if (item.position === 'D') {
                        this.delDEF.push(item.id);
                    }
                    if (item.position === 'M') {
                        this.delMID.push(item.id);
                    }
                    if (item.position === 'F') {
                        this.delFWD.push(item.id);
                    }
                    item.remove = true
                }
            });

            this.delAllIds.push(player.id);

        },
        async revestPlayer(player) {
            const mergeData = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD];
            mergeData.map((item) => {
                if (item.player_id === player.player_id) {
                    if (item.position === 'G') {
                        this.delGKP = this.delGKP.filter((id) => id !== item.id);
                    }
                    if (item.position === 'D') {
                        this.delDEF = this.delDEF.filter((id) => id !== item.id);
                    }
                    if (item.position === 'M') {
                        this.delMID = this.delMID.filter((id) => id !== item.id);
                    }
                    if (item.position === 'F') {
                        this.delFWD = this.delFWD.filter((id) => id !== item.id);
                    }
                    item.remove = false
                }
            });

            this.delAllIds = this.delAllIds.filter((id) => id !== player.id);

        },
        async setCaptan() {

            this.showAdjustPlayerModal = false;
            this.is_captan = this.detailPlayer.player_id;

        },
        adjustPlayer(player) {
            this.detailPlayer = player;
            this.showAdjustPlayerModal = true;
        },
        toggleClass(position) {
            this.detailPlayer = null;
            if (this.totalPlayerCount >= 11) {
                Swal.fire({
                    text: 'ไม่สามารถเลือกนักเตะเกิน 11 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            this.position = position;
            this.showAdjustPlayerModalSelect = true;

        },
        ChangePlayer() {

            if (this.totalPlayerCount >= 11 && !this.detailPlayer) {
                Swal.fire({
                    text: 'ไม่สามารถเลือกนักเตะเกิน 11 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            this.position = this.detailPlayer.position;
            this.showAdjustPlayerModal = false;
            this.showAdjustPlayerModalSelect = true;

        },
        async ChangePlayerSelect(player) {


            this.showAdjustPlayerModalSelect = false;

            const totalPlayersInTeam = [
                ...this.getGKP,
                ...this.getDEF,
                ...this.getMID,
                ...this.getFWD
            ];

            totalPlayersInTeam.map((item) => {
                if (item.player_id === player.player_id) {
                    item.remove = false;
                    return;
                }
            });

            let checkHas = totalPlayersInTeam.some(p => {
                if (p.player_id === player.player_id && !p.remove) {
                    Swal.fire({
                        text: 'มีนักเตะอยู่แล้ว',
                        showCancelButton: true,
                        cancelButtonText: 'ยกเลิก',
                        showConfirmButton: false,
                        customClass: {
                            cancelButton: 'btn-cancel',
                            popup: 'popup-custom',
                            title: 'text-custom',
                            htmlContainer: 'text-custom'
                        },
                        buttonsStyling: false,
                    });
                    return true;
                }
                return false;
            });

            if (checkHas) {
                return;
            }

            const filterSelectPlayer = totalPlayersInTeam.filter(p => p.player_id !== player.player_id);

            const totalPlayerNewfilter = filterSelectPlayer.filter(p => p.team_code === player.team_code && !p.remove).length;

            // if (totalPlayerNewfilter >= 3) {
            //     Swal.fire({
            //         text: 'ไม่สามารถเลือกทีมเดียวกันได้เกิน 3 คน',
            //         showCancelButton: true,
            //         cancelButtonText: 'ยกเลิก',
            //         showConfirmButton: false,
            //         customClass: {
            //             cancelButton: 'btn-cancel',
            //             popup: 'popup-custom',
            //             title: 'text-custom',
            //             htmlContainer: 'text-custom'
            //         },
            //         buttonsStyling: false,
            //     });
            //     return;
            // }

            if (player.position === 'F') {
                for (let i = 0; i < this.getFWD.length; i++) {
                    let p = this.getFWD[i];


                    if (p.remove || this.detailPlayer && p.player_id === this.detailPlayer.player_id) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                    if (p.player_id === null && !p.remove) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                }
            }

            if (player.position === 'M') {
                for (let i = 0; i < this.getMID.length; i++) {
                    let p = this.getMID[i];

                    if (p.remove || this.detailPlayer && p.player_id === this.detailPlayer.player_id) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                    if (p.player_id === null && !p.remove) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                }
            }

            if (player.position === 'D') {
                for (let i = 0; i < this.getDEF.length; i++) {
                    let p = this.getDEF[i];


                    if (p.remove || this.detailPlayer && p.player_id === this.detailPlayer.player_id) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                    if (p.player_id === null && !p.remove) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                }
            }

            if (player.position === 'G') {
                for (let i = 0; i < this.getGKP.length; i++) {
                    let p = this.getGKP[i];

                    if (p.remove || this.detailPlayer && p.player_id === this.detailPlayer.player_id) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                    if (p.player_id === null && !p.remove) {
                        p.player_id = player.player_id;
                        p.name = player.name;
                        p.price = player.price;
                        p.remove = false;
                        p.team_vs = player.team_vs;
                        p.position = player.position;
                        p.team_code = player.team_code;
                        break;
                    }
                }
            }
            this.detailPlayer = null;

            return;
        },
        async saveTeamEdit() {

            let countGKP = 0;
            for (let i = 0; i < this.getGKP.length; i++) {
                if (this.getGKP[i].player_id != null && !this.getGKP[i].remove) {
                    countGKP++;
                }
            }

            let countDiff = 0;
            for (let i = 0; i < this.getDEF.length; i++) {
                if (this.getDEF[i].player_id != null && !this.getDEF[i].remove) {
                    countDiff++;
                }
            }

            let countMid = 0;
            for (let i = 0; i < this.getMID.length; i++) {
                if (this.getMID[i].player_id != null && !this.getMID[i].remove) {
                    countMid++;
                }
            }

            let countFWD = 0;
            for (let i = 0; i < this.getFWD.length; i++) {
                if (this.getFWD[i].player_id != null && !this.getFWD[i].remove) {
                    countFWD++;
                }
            }

            if (countGKP < 1) {
                Swal.fire({
                    text: 'กรุณาเลือกผู้รักษาประตูอย่างน้อย 1 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (countDiff < 3) {
                Swal.fire({
                    text: 'กรุณาเลือกกองหลังอย่างน้อย 3 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (countMid < 2) {
                Swal.fire({
                    text: 'กรุณาเลือกกองกลางอย่างน้อย 2 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (countFWD < 1) {
                Swal.fire({
                    text: 'กรุณาเลือกกองหน้าอย่างน้อย 1 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (this.remainingAmount < 0) {
                Swal.fire({
                    text: 'จำนวนเงินไม่เพียงพอ',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                this.disable = false;
                return;
            }

            if (this.totalPlayerCount != 11) {
                Swal.fire({
                    text: 'กรุณาเลือกนักเตะให้ครบ 11 คน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                return;
            }

            if (!this.checkHasCaptan()) {
                Swal.fire({
                    text: 'กรุณาเลือกกับตันทีม',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });

                this.disable = false;
                return;
            }

            let confirm = await Swal.fire({
                text: 'ยืนยันการเปลี่ยนนักเตะ',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน',
                customClass: {
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });

            if (!confirm.isConfirmed) {
                return;
            }

            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.put('/premier-league/v1/game-week-player-user-detail-edit-new', {
                    is_captain: this.is_captan,
                    getGKP: this.getGKP,
                    getDEF: this.getDEF,
                    getMID: this.getMID,
                    getFWD: this.getFWD,
                    game_main_id: this.getMain.id,
                    type: this.type,
                }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.loading = false;
                    Swal.fire({
                        icon: 'success',
                        text: 'เปลี่ยนนักเตะสำเร็จ',
                        showCancelButton: true,
                        cancelButtonText: 'ยืนยัน',
                        showConfirmButton: false,
                        customClass: {
                            cancelButton: 'btn-cancel',
                            popup: 'popup-custom',
                            title: 'text-custom',
                            htmlContainer: 'text-custom'
                        },
                        buttonsStyling: false,
                    });
                    this.clearData();

                }
            } catch (error) {
                console.log(error);
                this.loading = false;
                Swal.fire({
                    text: error.response.data.error,
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });

            }

        },
        route_back() {
            if (!this.isNavigating) {
                this.isNavigating = true;
                this.$router.go(-1);
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            }
            // this.$router.push({ name: 'list' });
        },
        checkHasCaptan() {
            const allPlayers = [
                ...this.getGKP,
                ...this.getDEF,
                ...this.getMID,
                ...this.getFWD,
            ];

            const isCaptainValid = allPlayers.some(player => player.player_id === this.is_captan);
            return isCaptainValid;
        },
        async fetchDataTeams(gameWeekID) {
            const access_token = localStorage.getItem('access_token');
            const response = await api.get('/premier-league/v1/teams', {
                headers: { 'Authorization': `Bearer ${access_token}` },
                params: { game_week_id: Number(gameWeekID) }
            });
            if (!response.data.ok) throw new Error('โหลดรายชื่อสโมสรไม่สำเร็จ');
            return response.data.teams || [];
        },
        async fetchGameWeekDetail() {
            const requestVersion = ++this.requestVersion;
            this.isDetailLoading = true;
            this.loadError = '';
            this.getMain = null;
            this.getGKP = [];
            this.getDEF = [];
            this.getMID = [];
            this.getFWD = [];
            this.delGKP = [];
            this.delDEF = [];
            this.delMID = [];
            this.delFWD = [];
            this.delAllIds = [];
            this.players = [];
            this.setTeams([]);
            this.is_captan = null;
            this.detailPlayer = null;
            this.position = null;
            this.showAdjustPlayerModal = false;
            this.showAdjustPlayerModalSelect = false;
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/game-week-player-user-detail-edit/${this.id}/${this.type}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                if (requestVersion !== this.requestVersion) return;
                if (!response.data.ok || !response.data.playerGameMain) throw new Error('ไม่พบข้อมูลทีม');
                if (response.data.ok) {
                    const entry = response.data.playerGameMain;
                    const [players, teams] = await Promise.all([
                        this.fetchData(entry.season_id, entry.week_id),
                        this.fetchDataTeams(entry.week_id)
                    ]);
                    if (requestVersion !== this.requestVersion) return;
                    this.players = players;
                    this.setTeams(teams);
                    const datas = response.data.playerGame;

                    datas.forEach(element => {
                        if (element.captain == 1) {
                            this.is_captan = element.player_id;
                        }
                    });

                    const [GKP, DEF, MID, FWD] = this.selectedFormation.split('-').map(Number);

                    let getGKP = Array.from({ length: GKP }, () => ({ player_id: null, id: null, name: null, position: '', team_code: '', remove: false, price: 0, team_vs: '' }));
                    let getDEF = Array.from({ length: DEF }, () => ({ player_id: null, id: null, name: null, position: '', team_code: '', remove: false, price: 0, team_vs: '' }));
                    let getMID = Array.from({ length: MID }, () => ({ player_id: null, id: null, name: null, position: '', team_code: '', remove: false, price: 0, team_vs: '' }));
                    let getFWD = Array.from({ length: FWD }, () => ({ player_id: null, id: null, name: null, position: '', team_code: '', remove: false, price: 0, team_vs: '' }));

                    if (datas && Array.isArray(datas)) {

                        getGKP = getGKP.map((player, index) => datas.filter(p => p.position === 'G')[index] || player);
                        getDEF = getDEF.map((player, index) => datas.filter(p => p.position === 'D')[index] || player);
                        getMID = getMID.map((player, index) => datas.filter(p => p.position === 'M')[index] || player);
                        getFWD = getFWD.map((player, index) => datas.filter(p => p.position === 'F')[index] || player);
                    } else {
                        console.error("datas is null or not an array");
                    }
                    this.getGKP = getGKP;
                    this.getDEF = getDEF;
                    this.getMID = getMID;
                    this.getFWD = getFWD;

                    this.getMain = response.data.playerGameMain;


                }
            } catch (error) {
                if (requestVersion !== this.requestVersion) return;
                this.loadError = error.response?.data?.error || error.message || 'โหลดข้อมูลทีมไม่สำเร็จ';
            } finally {
                if (requestVersion === this.requestVersion) {
                    this.isDetailLoading = false;
                    this.updateLoading(false);
                }
            }
        },
        getShirtImage(player) {
            const teamCode = this.stripTeamCode(player.team_code);
            const suffix = player.position === 'G' ? '_1-66' : '-66';
            return `https://pudee.sgp1.digitaloceanspaces.com/shirt_${teamCode}${suffix}.webp`;
        },
        stripTeamCode(teamCode) {
            return teamCode.replace('t', '');
        },
        truncateText(text) {
            if (text.length > 8) {
                return text.slice(0, 8) + '...';
            } else {
                return text;
            }
        },
        async fetchData(seasonID, gameWeekID) {
            const intSeasonID = Number(seasonID);
            const intGameWeekID = Number(gameWeekID);
            if (!Number.isInteger(intSeasonID) || intSeasonID < 1 || !Number.isInteger(intGameWeekID) || intGameWeekID < 1) {
                throw new Error('ไม่พบฤดูกาลหรือเกมวีคของทีม');
            }
            const access_token = localStorage.getItem('access_token');
            const response = await api.get('/premier-league/v1/game-week-player', {
                headers: { 'Authorization': `Bearer ${access_token}` },
                params: { seasonID: intSeasonID, gameWeekID: intGameWeekID }
            });
            const round = response.data.gameWeek;
            if (!response.data.ok || !round || Number(round.id) !== intGameWeekID || Number(round.season_id) !== intSeasonID) {
                throw new Error('รายชื่อนักเตะไม่ตรงกับเกมวีคของทีม กรุณาลองใหม่');
            }
            return response.data.players || [];
        },
        async resetTeamEdit() {

            let confirm = await Swal.fire({
                text: 'ยืนยันการรีเซ็ตทีม',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน',
                customClass: {
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });

            if (!confirm.isConfirmed) {
                return;
            }

            this.clearData();
        },

        clearData() {
            this.getGKP = [];
            this.getDEF = [];
            this.getMID = [];
            this.getFWD = [];
            this.getMain = null;
            this.is_captan = null;
            this.players = [];
            this.position = null;
            this.delGKP = [];
            this.delDEF = [];
            this.delMID = [];
            this.delFWD = [];
            this.delAllIds = [];
            this.detailPlayer = null;
            this.fetchGameWeekDetail()
        }



    },
    created() {
        this.id = this.$route.params.id;
        this.type = this.$route.params.type;
        this.updateLoading(true);
        this.fetchGameWeekDetail();
    },
    beforeUnmount() {
        this.requestVersion++;
        this.updateLoading(false);
    }

};
</script>

<style scoped>
.member-staged-player {
    position: relative;
    width: 100%;
    max-width: 96px;
}
.member-detail .member-staged-player > button.captain-badge-close {
    position: absolute;
    left: calc(50% - 30px);
    top: -3px;
    padding: 0;
    border: 0;
    display: grid;
    place-items: center;
    background: transparent;
    line-height: 1;
}
.member-detail .member-staged-player > button.member-staged-undo {
    background: #b7dfc1;
    color: #14261c;
    font-size: 16px;
}

.btn-fix {
    padding: 1px 15px;
    border-radius: 20px;
    background-color: #a56103;
    color: white;
    border: none;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.svg-white {
    fill: #ffffff;
    /* เปลี่ยนสีของ SVG เป็นสีขาว */
}

.captain-badge {
    position: absolute;
    top: 0;
    /* อยู่มุมบนของรูปภาพ */
    right: 0;
    /* อยู่มุมบนขวาของรูปภาพ */
    background-color: white;
    /* พื้นหลังของคำว่า "C" */
    color: black;
    /* สีตัวอักษร */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    /* ขนาดตัวอักษร */
    font-weight: bold;
    transform: translate(50%, -50%);
    /* เลื่อนป้ายให้เข้ามุม */
}


.captain-badge-close {
    position: absolute;
    top: 0;
    left: -5px;
    color: rgb(255, 251, 251);
    border-radius: 50%;
    width: 17px;
    height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: bold;
    transform: translate(-50%, -50%);
    /* ปรับจาก 50%, -50% เป็น -50%, -50% */
}

.circle-img {
    border-radius: 10%;
    width: 50px;
    /* กำหนดขนาดของรูปภาพ */
    height: 50px;
    /* กำหนดขนาดของรูปภาพ */
}

.relative {
    position: relative;
    display: inline-block;
    /* ทำให้แน่ใจว่า picture ขนาดตามเนื้อหา */
}

.modal {
    position: fixed;
    z-index: 110;
    top: 0px;
    left: 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.8));
    border-radius: 6px;
}

.modal-content {
    z-index: 120;
    max-width: 90%;
    max-height: 90%;
    padding: 0px;
    border: 0px;
    border-radius: 6px;
    width: 640px;
    color: currentcolor;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 12px 24px 0px;
    background-repeat: no-repeat;
    background-position: right top, 0px center, 0px center;
    background-image: linear-gradient(135deg, #501a1b, #191313);
}

.gvQQRY {
    padding: 0.2rem;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;


}

@media (min-width: 64em) {
    .elHRfu {
        padding: 0.5rem;
        width: calc(100%);
    }
}

.elHRfu {
    padding: 0.5rem;

}

@media (min-width: 64em) {
    .cGcmaR {
        padding: 0.5rem;
        width: calc(66.6667%);
    }
}

.cGcmaR {
    padding: 0.5rem;

}



.ism *,
.ism ::before,
.ism ::after {
    box-sizing: inherit;
}

.imodPj {
    margin-top: 2.2rem;
    border-radius: 0.8rem;
    background: url(/assets/fantasy.svg) center / 800px no-repeat;
}

@media (min-width: 43.75em) {
    .imodPj {
        background-size: 840px;
    }
}

@media (min-width: 64em) {
    .imodPj {
        padding-top: 1.2rem;
        background-size: 1360px;
    }
}




* {
    box-sizing: border-box;
}

.iA-dheQ {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding-bottom: 1.2rem;
}

@media (min-width: 25em) {

    .iA-dheQ {
        margin-right: 5%;
        margin-left: 5%;
    }
}

@media (min-width: 38.125em) {

    .iA-dheQ {
        margin-right: 10%;
        margin-left: 10%;
    }
}

@media (min-width: 43.75em) {

    .iA-dheQ {
        margin-right: 15%;
        margin-left: 15%;
    }
}

@media (min-width: 56.25em) {
    .iA-dheQ {
        margin-right: 20%;
        margin-left: 20%;
    }
}

@media (min-width: 64em) {
    .iA-dheQ {
        gap: 3.2rem;
        margin-right: 0px;
        margin-left: 0px;
        padding-bottom: 3.2rem;
    }
}

.gRFNix {
    display: flex;
    justify-content: space-around;
}

.hWtxro {
    min-height: 5.9rem;
    text-align: center;
}

@media (min-width: 25em) {
    .hWtxro {
        min-height: 5.8rem;
    }
}

@media (min-width: 38.125em) {
    .hWtxro {
        min-height: 5.8rem;
    }
}

@media (min-width: 43.75em) {
    .hWtxro {
        min-height: 6.5rem;
    }
}

@media (min-width: 56.25em) {
    .hWtxro {
        min-height: 6.5rem;
    }
}

@media (min-width: 64em) {
    .hWtxro {
        min-height: 8.6rem;
    }
}



.bswMxH {
    padding: 4px;
    border: 0px;
    border-radius: 0.8rem;
    background-color: transparent;
}

.bsFVze {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    margin: auto;
    padding: 0.4rem;
    border-color: rgba(255, 255, 255, 0.3);
    color: rgb(255, 255, 255);
}

.blPMze {
    width: 2rem;
    padding: 1px;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset;
    min-height: 2.5rem;
    border-radius: 0.4rem;
    background-color: rgb(2, 159, 79);
    font-family: PremierSans-Heavy, Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 0.5rem;
    text-align: center;
}



@media (min-width: 25em) {
    .blPMze {
        width: 3rem;
        min-height: 4rem;
        font-size: 0.7rem;
    }
}

@media (min-width: 38.125em) {

    .blPMze {
        width: 3rem;
        min-height: 4rem;
        font-size: 0.8rem;
    }
}

@media (min-width: 43.75em) {
    .blPMze {
        width: 3rem;
        min-height: 4rem;
        font-size: 1rem;
    }
}

@media (min-width: 56.25em) {
    .blPMze {
        width: 3rem;
        min-height: 4rem;
        font-size: 1rem;
    }
}

@media (min-width: 64em) {
    .blPMze {
        width: 5rem;
        min-height: 6rem;
        font-size: 1rem;
    }
}

.eVUsqz {
    display: flex;
    gap: 0.8rem;
    margin: 0.4rem 0px;
}

@media (min-width: 64em) {
    .eVUsqz {
        flex: 0 0 50%;
        margin: 0px;
    }
}


.dsbthN {
    margin-bottom: 2.4rem;
}

@media (min-width: 64em) {
    .dsbthN {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
    }
}

@media (min-width: 64em) {
    .kznjgV {
        flex: 0 0 23%;
    }
}


.ceLkmB {
    position: relative;
    z-index: 80;
    padding: 0px 0.4rem 0.2rem;
    border: 1px solid rgb(215, 204, 216);
    border-radius: 0.4rem;
    background-color: rgb(255, 255, 255);

}

.eiPequ {
    display: block;
    width: 100%;
    line-height: inherit;
    position: relative;
    z-index: 90;
    margin: 0px;
    padding: 0px 0.6rem;
    border: 0px;
    border-radius: 0px;
    background: none;
    color: inherit;
    font-family: PremierSans-Regular, Arial, "Helvetica Neue", Helvetica, "sans-serif";
    appearance: none;
    cursor: pointer;
}

.kISBiI {
    display: block;
    padding: 0px 0.6rem;
}


.dxRBog {
    position: relative;
    overflow-x: hidden;
}


.kigSry {
    position: relative;
    transition: all 300ms ease;
}

.liIqzj {
    position: relative;
    transition: all 300ms ease;
    transform: translate3d(-100%, 0px, 0px);
}

.cGcmaR {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(100%, 0px, 0px);
    transition: all 300ms ease;
    overflow-y: auto;

}

@media (min-width: 64em) {
    .cGcmaR {
        position: static;
        transform: none;
        width: calc(33.3333%);
    }

    .cGcmaR.active {
        transform: none;
    }

    .kigSry {
        display: flex;
        gap: 1.2rem;
    }

    .liIqzj {
        transform: none;
    }
}



.khqgum {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.2rem;
    border: 0px;
    border-radius: 0.4rem;
    color: rgb(55, 0, 60);
    font-family: PremierSans-Bold, Arial, "Helvetica Neue", Helvetica, sans-seriff;
    font-size: 1.4rem;
    background: rgb(255, 255, 255);
    box-shadow: rgb(235, 229, 235) 0px 0px 0px 1px inset;
    width: 100%;
    cursor: pointer;
}

.hvBVYx {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: right;
}

@media (min-width: 64em) {
    .hvBVYx {
        display: none;
    }
}

.dviEZq {
    box-sizing: border-box;
    min-width: 0px;
    margin-left: 0.4rem;
    color: rgb(255, 255, 255);
}

.flMINk {
    height: 15px;
    width: 15px;
    margin-left: 0.5rem;
}

.gPCpFh {
    fill: #281b3c;
}

.isQEzW {
    display: inline-flex;
    align-items: center;
    padding: 0px;
    border: 0px;
    background-color: transparent;
    color: inherit;
    font-size: 0.8rem;
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    color: #281b3c;
}

.dceCpZ {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.2rem;
    border: 0px;
    border-radius: 0.4rem;
    font-family: PremierSans-Bold, Arial, "Helvetica Neue", Helvetica, sans-seriff;
    font-size: 1.4rem;
    background: rgb(150, 60, 255);
    color: white;
    width: 100%;
    opacity: 0.3;
    cursor: auto;
}

.custom-btn0 {
    background-color: #1e0f37;
    color: #000000;
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    /* มุมโค้ง */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    /* เพิ่มเงา */
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(10px);
    font-size: 0.75rem;

}

.custom-btn {
    background-color: #1e0f37;
    color: #000000;
    padding: 0.5rem 0.5rem;
    border: 3px solid #523c74;
    /* เส้นขอบสี #2f4453 หนา */
    border-radius: 0.5rem;
    /* มุมโค้ง */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    /* เพิ่มเงา */
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(10px);
    font-size: 0.75rem;

}

.fBGUqJ {
    display: block;
    width: 100%;

    padding: 0px;
    border: 0px;
    background-color: transparent;
    font-family: PremierSans-Bold, Arial, "Helvetica Neue", Helvetica, sans-seriff;
    line-height: 1;
    cursor: pointer;
}

.imgfBGUqJ {
    max-width: 35px;
}

@media (min-width: 64em) {
    .imgfBGUqJ {
        max-width: 60px;
    }
}

@media (min-width: 38.125em) {

    .imgfBGUqJ {
        max-width: 50px;
    }
}

@media (min-width: 43.75em) {
    .imgfBGUqJ {
        max-width: 50px;
    }
}

@media (min-width: 56.25em) {
    .imgfBGUqJ {
        max-width: 60px;
    }
}



.etyMDj {
    padding: 0.2rem;
    background-color: rgb(55, 0, 60);
    color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 11px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}


.fQREvA {
    padding: 0.1rem;
    font-size: 11px;
    /* border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px; */
    background-color: rgba(233, 249, 241, 0.3);
}


.fQREvA_fix {
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 3px;
    padding-right: 3px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: rgb(55, 0, 60);
    color: white;
    font-size: 6px;
}


.flTOZR {
    display: inline-block;
    margin: auto;
    vertical-align: middle;
    padding-bottom: 0.3rem;
    max-width: 35px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAAAfCAYAAACCj930AAAE1UlEQVR4nO2c63LUMAyFlaXADAzv/7a7/AAX7ek5ujhOm+2imYxt2ZHt+Itkpyzbrx8/7b/cyWZmt79pR8Y93XtvzX6eRl4+egALpAvRUTY3SI/sC8W/GAb5h5VHgHPWk417j2y/WjpAMU/tx6/mgs/ytBCfBc4MispDn63r9L1SIigyYBSQFZs4Hza/UwD7HnCu8F4VXVSerYt0WZsKYNXybJ0vVyBWAEdtD5Oj4JxZTKZjEFV0URuVKl2lnAlbSAXYbTLttNmI3ozvVRWE6mVctt9dBWc3nCrPlUGV6aI2mZ0ojfKZVLxelCqdaqPaKXtoG8FVsDGwfX43oLNwdmBU5SjNwMIrqsvasT5ZyuaidEO6YGaQKR27onZZf5gibOyAqmCdhrQKJ54K2QC6IbgL3SVotzXbYZ9sPGr8qhxJJYRXPaS6rpN1kX0cz0g7sKrnlEKbwVldnE207XrADDYELytXAe3MdYUoj1rxph1Ar8U6r4v68nUIKM6l4jmVDTOL4VQLohYu8og+3wGQ5THtQMnGG831KMn6q4T/KqRXkSrdjKcNIRPz8utA70U4o4emFjMD0ewPPCNlUGYQRmAqONmYHkWiF6fiVRlsClKWXoQNBqQfBxsnmxfWUf0LVDKpeMqRKkAYPBF0l6Q+85Zq7J9B8LkzSC92D5QvMxg9kAO6Ddp5GK/GAcu8pw/5KbwvFi9gxVuOtHJlXpGVI48Zhe1nkTF35s1YeUDoYdxE3qcezAvYRe/p+45AVDBvZnbbs+f8KDARUIP8s4qHwZf9QQfBvIANDwu2GzbUNgPrGKAV7/pqCwfXlSoQCmjMqzoWsrtjeAZR0SOLNFm5arszRmbrTvbCWX0LsD3bJym7eFrdO4ZnlSgEZ2Wz+Dl31qDaNgzrkfHItat7MM8AxfDj8yoU+VDx7F5UneDVN83ud1Clx/4QaAV4yM2X71+/mdUPRaPMdBWJoM7ylTd4ZkyPLuz5KKDwhJ6d4BHG7Pvnqoj3elr3Crag6JVwA8w6Gbbwutm/Aw2eJkcevaQ/IF1dOTq9m719iT4LrCoERx4O8xGMCuYMyGirVvWYd/oXUCpAsY51tgV5BNSf4MfkEbbstF79vFTZ0J9VsggSXZ2P7hnQHSjVuFVZ6eifL9FTKiO418MBRSfzcV2JTn2wZ3XZR/mxP63AquD1shfkNJTZ2+cYeccISgbY7J8rjwAyrYsORBGkyijzmgjqSKNPGOyKPGTnH3yoPnF8FuhQshdZ6ZQ39Pmup+zWVSBUIM4AGYF6J5XTOhqrLsTQ4/7S26h4V6arQHdJ7ke9Gheb84wHZQu5Es4MrtUQVl4+Jhhlpcx+SvIdZfU4GQapz1fAVfmsnOWjFPOszKTiLVVazXfKzAZLozybD9NvSZtQ9v5MI/Oq6u3CQePbVA2vM5B1QngHRj+nyDtki78n7Xi8DoQduCpAl2T1D9yiwfiFjfYnCtRKOcureysQzoRyJdH8K3UVsLI9YLRWs3VL5T1/t64mlXlb3AIwO1WYFGB79pRZ28pidrxVBbIVcL0bhErO8J8qzHrbyEZl010FcKXHHDIbJvfawvvKh5OPkDPAGUn1wVX2uqtsr5KjoOhAd1owzc4PZ1X2PmS2mLtOmg2Jtil7vOLDy2+kvEzFwgQiDAAAAABJRU5ErkJggg==) center bottom / contain no-repeat;
}

@media (min-width: 38.125em) {

    .flTOZR {
        padding-bottom: 0.7rem;
        background-size: 44px 8px;
    }
}

@media (min-width: 64em) {

    .flTOZR {
        padding-bottom: 0.9rem;
        background-size: 55px 10px;
    }
}
</style>
<style src="../../styles/member-details.css"></style>
