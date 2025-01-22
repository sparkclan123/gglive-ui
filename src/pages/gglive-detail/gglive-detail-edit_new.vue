<template>
    <div>
        <div >
            <LodingSceen :loading="loading" />
        </div>
        <div class="dxRBog" v-if="getMain">
            <div class="card cursor-pointer">
                <div class="top-section  ">
                    <div class="icons">
                        <div class="absolute top-0 left-0 m-2 flex items-center cursor-pointer shsojvp text-gray-200"
                            @click="route_back()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 12"
                                class="svg-white mr-1">
                                <path
                                    d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
                                    transform="matrix(-1 0 0 1 24 0)"></path>
                            </svg>
                            <span class="text-gray-200 font-bold text-xs">back</span>
                        </div>

                    </div>
                </div>
                <div class="bottom-section">
                    <span class="title text-green-500">{{ getMain.name }} </span>
                    <div class="row row1">
                        <div class="item">
                            <span class="text-xs">Budget </span>
                            <span class="text-xs text-gray-200">
                                <NumberDisplay number="80" /> Spent
                                <NumberDisplay :number="-priceSum" />
                            </span>
                            <span class="big-text text-xs text-yellow-200">**Creation Time
                                <DateFormatted :dateString="getMain.created_at" />
                            </span>

                            <button
                                class="text-gray-200 bg-green-700 font-bold text-[11px] px-2 py-1 rounded-full shadow-lg hover:bg-green-500 cursor-pointer m-2"
                                @click.stop="saveTeamEdit">
                                Save Team Changes
                            </button>
                            <button
                                class="text-gray-200 bg-yellow-700 font-bold text-[11px] px-2 py-1 rounded-full shadow-lg hover:bg-yellow-500 cursor-pointer"
                                @click.stop="resetTeamEdit">
                                Reset
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            <div>
                <div class="elHRfu ">
                    <div class="imodPj custom-btn shadow-xl">
                        <div class="iA-dheQ">

                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(GKP, i) in getGKP" :key="i">
                                    <button type="button"
                                        @click="GKP.player_id === null || GKP.remove ? toggleClass('G') : adjustPlayer(GKP)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="GKP.player_id" :src="getShirtImage(GKP)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: GKP.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png" class="flTOZR"
                                                :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="GKP.player_id == is_captan" class="captain-badge">C</span>

                                            <svg v-if="GKP.player_id && !GKP.remove" @click.stop="removePlayer(GKP)"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                                class="captain-badge-close">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                            </svg>

                                            <span @click.stop="revestPlayer(GKP)" v-if="GKP.player_id && GKP.remove"
                                                class="captain-badge-close"
                                                style="background-color: aquamarine; font-size: 16px;color:black;padding: 0px 0px 2px 1px;">⟳</span>
                                        </picture>
                                        <div class=" gTayAP" v-if="GKP.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                add</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: GKP.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(GKP.name) }}</div>
                                            <div class=" fQREvA">{{ GKP.price }}</div>
                                            <div class=" fQREvA_fix" v-if="GKP.team_vs != ''">{{ GKP.team_vs }}</div>
                                        </div>
                                    </button>
                                </div>

                            </div>
                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(DEF, i) in getDEF" :key="i">
                                    <button type="button"
                                        @click="DEF.player_id === null || DEF.remove ? toggleClass('D') : adjustPlayer(DEF)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="DEF.player_id" :src="getShirtImage(DEF)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: DEF.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png" class="flTOZR"
                                                :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="DEF.player_id == is_captan" class="captain-badge">C</span>

                                            <svg v-if="DEF.player_id && !DEF.remove" @click.stop="removePlayer(DEF)"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                                class="captain-badge-close">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                            </svg>


                                            <span @click.stop="revestPlayer(DEF)" v-if="DEF.player_id && DEF.remove"
                                                class="captain-badge-close"
                                                style="background-color: aquamarine; font-size: 16px;color:black;padding: 0px 0px 2px 1px;">⟳</span>
                                        </picture>
                                        <div class=" gTayAP" v-if="DEF.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                add</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: DEF.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(DEF.name) }}</div>
                                            <div class=" fQREvA">{{ DEF.price }}</div>
                                            <div class=" fQREvA_fix" v-if="DEF.team_vs != ''">{{ DEF.team_vs }}</div>
                                        </div>
                                    </button>
                                </div>

                            </div>
                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(MID, i) in getMID" :key="i">
                                    <button type="button"
                                        @click="MID.player_id === null || MID.remove ? toggleClass('M') : adjustPlayer(MID)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="MID.player_id" :src="getShirtImage(MID)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: MID.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png" class="flTOZR"
                                                :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="MID.player_id == is_captan" class="captain-badge">C</span>


                                            <svg v-if="MID.player_id && !MID.remove" @click.stop="removePlayer(MID)"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                                class="captain-badge-close">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                            </svg>
                                            <span @click.stop="revestPlayer(MID)" v-if="MID.player_id && MID.remove"
                                                class="captain-badge-close"
                                                style="background-color: aquamarine; font-size: 16px;color:black;padding: 0px 0px 2px 1px;">⟳</span>
                                        </picture>
                                        <div class=" gTayAP" v-if="MID.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                add</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: MID.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(MID.name) }}</div>
                                            <div class=" fQREvA">{{ MID.price }}</div>
                                            <div class=" fQREvA_fix" v-if="MID.team_vs != ''">{{ MID.team_vs }}</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div class="gRFNix">
                                <div class="hWtxro" v-for="(FWD, i) in getFWD" :key="i">
                                    <button type="button"
                                        @click="FWD.player_id === null || FWD.remove ? toggleClass('F') : adjustPlayer(FWD)"
                                        class="fBGUqJ">
                                        <picture class="relative">
                                            <source type="image/webp">
                                            <img v-if="FWD.player_id" :src="getShirtImage(FWD)"
                                                class="flTOZR circle-img"
                                                :style="{ opacity: FWD.remove == true ? 0.4 : 1 }">
                                            <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png" class="flTOZR"
                                                :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                            <span v-if="FWD.player_id == is_captan" class="captain-badge">C</span>

                                            <svg v-if="FWD.player_id && !FWD.remove" @click.stop="removePlayer(FWD)"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                                class="captain-badge-close">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                            </svg>

                                            <span @click.stop="revestPlayer(FWD)" v-if="FWD.player_id && FWD.remove"
                                                class="captain-badge-close"
                                                style="background-color: aquamarine; font-size: 16px;color:black;padding: 0px 0px 2px 1px;">⟳</span>


                                        </picture>
                                        <div class=" gTayAP" v-if="FWD.player_id === null">
                                            <div class="gvQQRY "
                                                :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                                add</div>
                                        </div>
                                        <div class=" gTayAP" v-else :style="{ opacity: FWD.remove == true ? 0.4 : 1 }">
                                            <div class=" etyMDj">{{ truncateText(FWD.name) }}</div>
                                            <div class=" fQREvA">{{ FWD.price }}</div>
                                            <div class=" fQREvA_fix" v-if="FWD.team_vs != ''">{{ FWD.team_vs }}</div>
                                        </div>
                                    </button>
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

</template>


<script>
import { api } from '@axios_inst';
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
                    text: 'team size exceeds the limit of 11 players.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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

            document.body.style.overflow = 'hidden';
            this.position = position;
            this.showAdjustPlayerModalSelect = true;

        },
        ChangePlayer() {

            if (this.totalPlayerCount >= 11 && !this.detailPlayer) {
                Swal.fire({
                    text: 'team size exceeds the limit of 11 players.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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

            document.body.style.overflow = 'hidden';
            this.position = this.detailPlayer.position;
            this.showAdjustPlayerModal = false;
            this.showAdjustPlayerModalSelect = true;

        },
        async ChangePlayerSelect(player) {


            document.body.style.overflow = '';
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
                        text: 'Player already selected.',
                        showCancelButton: true,
                        cancelButtonText: 'cancel',
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

            if (totalPlayerNewfilter >= 3) {
                Swal.fire({
                    text: 'Team selection is limited to 3 players from the same club.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                    text: 'You must select at least one goalkeeper.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                    text: 'You must select at least three defenders.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                    text: 'You must select at least two midfielders.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                    text: 'You must select at least one forward.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                    text: 'You do not have enough balance.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                    text: 'You must select a total of 11 players for your team.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                    text: 'You must select a captain for your team.',
                    showCancelButton: true,
                    cancelButtonText: 'cancel',
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
                text: 'Confirm the player change.',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                confirmButtonText: 'Confirm',
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
                        text: 'Player successfully substituted.',
                        showCancelButton: true,
                        cancelButtonText: 'Confirm',
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
                    cancelButtonText: 'cancel',
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
        async fetchDataTeams() {

            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/teams', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.setTeams(response.data.teams);
                } else {
                    console.error('Failed to fetch teams data');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async fetchGameWeekDetail() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/game-week-player-user-detail-edit/${this.id}/${this.type}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                if (response.data.ok) {
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
                    this.fetchData(response.data.playerGameMain.season_id, response.data.playerGameMain.week_id);

                }
            } catch (error) {
                console.log(error);

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
            console.log('seasonID', seasonID);
            try {
                // แปลง seasonID และ gameWeekID เป็น integer
                const intSeasonID = parseInt(seasonID, 10);
                const intGameWeekID = parseInt(gameWeekID, 10);

                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        seasonID: intSeasonID,
                        gameWeekID: intGameWeekID
                    }
                });
                if (response.data.ok) {
                    // this.setGameWeek(response.data.gameWeek);
                    this.players = response.data.players;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async resetTeamEdit() {

            let confirm = await Swal.fire({
                text: 'Confirm Reset',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                confirmButtonText: 'Confirm',
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

        clearData(){
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
        Promise.all([this.fetchGameWeekDetail(), this.fetchDataTeams()])
            .then(() => {
                this.updateLoading(false);
            })
            .catch((error) => {
                console.error('Error loading data:', error);
                this.updateLoading(false);
            });

    },
    mounted() {

    }

};
</script>

<style scoped>
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

.card {
    background: linear-gradient(to bottom, #191919, #341c5d);
    padding: 5px;
    overflow: hidden;
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px; */
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 10px;
    border-top: 1px solid #503779;
    /* border-left: 2px solid #503779; */
    /* ขอบซ้าย */
    /* border-right: 2px solid #503779; */
    /* ขอบขวา */
    border-bottom: 2px solid #503779;
    /* ขอบล่าง */
}

.card .top-section .icons {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
}

.card .top-section .icons .logo {
    height: 100%;
    aspect-ratio: 1;
    padding: 7px 0 7px 15px;
}

.card .top-section .icons .logo .top-section {
    height: 100%;
}

.card .top-section .icons .social-media {
    height: 100%;
    padding: 8px 15px;
    display: flex;
    gap: 7px;
}

.card .top-section .icons .social-media .svg {
    height: 100%;
    fill: #191919;
}


.card .bottom-section {
    margin-top: 1px;
    /* padding: 10px 5px; */
}

.card .bottom-section .title {
    display: block;
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
    letter-spacing: 1px;
}

.card .bottom-section .row {
    display: flex;
    justify-content: space-between;
    /* margin-top: 20px; */
}

.card .bottom-section .row .item {
    flex: 30%;
    text-align: center;
    padding: 5px;
    color: rgba(255, 255, 255, 0.721);
}

.card .bottom-section .row .item .big-text {

    display: block;
}

.card .bottom-section .row .item .regular-text {
    font-size: 12px;
}

.card .bottom-section .row .item:nth-child(2) {
    border-left: 1px solid rgba(255, 255, 255, 0.126);
    border-right: 1px solid rgba(255, 255, 255, 0.126);
}

.shsojvp {
    font-weight: bold;
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
    background-image: url(/public/assets/pattern-2-crop-90.0e86ae39.png), linear-gradient(rgba(255, 255, 255, 0) 10px, rgba(255, 255, 255, 0.2) 30px, white 60px), linear-gradient(to right, rgb(2, 239, 255), rgb(98, 123, 255));
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
    background: url(/public/assets/fantasy.svg) center / 800px no-repeat;
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
    background-color: #191b1e;
    color: #000000;
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    /* มุมโค้ง */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    /* addเงา */
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(10px);
    font-size: 0.75rem;

}

.custom-btn {
    background-color: #191b1e;
    color: #000000;
    padding: 0.5rem 0.5rem;
    border: 3px solid #523c74;
    /* เส้นขอบสี #2f4453 หนา */
    border-radius: 0.5rem;
    /* มุมโค้ง */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    /* addเงา */
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