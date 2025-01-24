<template>
    <div class="dxRBog pb-4">

        <div :class="['kigSry', isToggled ? 'liIqzj' : '']">
            <!-- page 1 -->
            <div class="elHRfu ">
                <div class="sc-CrZHp hvBVYx flex items-center">
                    <img src="/public/assets/logonew.png" alt="icon" class="mr-1 w-7 h-7">
                    <span class="mr-auto text-xs text-gray-800">comming soon</span>

                </div>

                <div class="imodPj custom-btn shadow-xl">
                    <div class="iA-dheQ">

                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button type="button"
                                    @click="getGKP.id === null ? toggleClass('G') : adjustPlayer(getGKP)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="getGKP.id" :src="getShirtImage(getGKP)" class="flTOZR circle-img">
                                        <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0_1-66.png"
                                            class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                        <span v-if="getGKP.id == isCaptain" class="captain-badge">C</span>

                                        <svg v-if="getGKP.id" @click.stop="removePlayerC(getGKP)"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                            class="captain-badge-close">
                                            <path fill="#F94646"
                                                d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                            </path>
                                            <path fill="#E2E2E2"
                                                d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                            </path>
                                        </svg>


                                    </picture>
                                    <div class=" gTayAP" v-if="getGKP.id === null">
                                        <div class="gvQQRY "
                                            :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                            add</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(getGKP.name) }}</div>
                                        <div class=" fQREvA">{{ getGKP.price }}</div>
                                        <div class=" fQREvA_fix" v-if="getGKP.team_vs != ''">{{ getGKP.team_vs }}</div>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button type="button"
                                    @click="getDEF.id === null ? toggleClass('D') : adjustPlayer(getDEF)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="getDEF.id" :src="getShirtImage(getDEF)" class="flTOZR circle-img">
                                        <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0-66.png"
                                            class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                        <span v-if="getDEF.id == isCaptain" class="captain-badge">C</span>
                                        <svg v-if="getDEF.id" @click.stop="removePlayerC(getDEF)"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                            class="captain-badge-close">
                                            <path fill="#F94646"
                                                d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                            </path>
                                            <path fill="#E2E2E2"
                                                d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                            </path>
                                        </svg>
                                    </picture>
                                    <div class=" gTayAP" v-if="getDEF.id === null">
                                        <div class="gvQQRY "
                                            :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                            add</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(getDEF.name) }}</div>
                                        <div class=" fQREvA">{{ getDEF.price }}</div>
                                        <div class=" fQREvA_fix" v-if="getDEF.team_vs != ''">{{ getDEF.team_vs }}</div>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button type="button"
                                    @click="getMID.id === null ? toggleClass('M') : adjustPlayer(getMID)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="getMID.id" :src="getShirtImage(getMID)" class="flTOZR circle-img">
                                        <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0-66.png"
                                            class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                        <span v-if="getMID.id == isCaptain" class="captain-badge">C</span>
                                        <svg v-if="getMID.id" @click.stop="removePlayerC(getMID)"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                            class="captain-badge-close">
                                            <path fill="#F94646"
                                                d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                            </path>
                                            <path fill="#E2E2E2"
                                                d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                            </path>
                                        </svg>
                                    </picture>
                                    <div class=" gTayAP" v-if="getMID.id === null">
                                        <div class="gvQQRY "
                                            :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                            add</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(getMID.name) }}</div>
                                        <div class=" fQREvA">{{ getMID.price }}</div>
                                        <div class=" fQREvA_fix" v-if="getMID.team_vs != ''">{{ getMID.team_vs }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button type="button"
                                    @click="getFWD.id === null ? toggleClass('F') : adjustPlayer(getFWD)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="getFWD.id" :src="getShirtImage(getFWD)" class="flTOZR circle-img">
                                        <img v-else src="https://pudee.sgp1.digitaloceanspaces.com/shirt_0-66.png"
                                            class="flTOZR" :style="{ opacity: totalPlayerCount >= 11 ? 0.7 : 1 }">
                                        <span v-if="getFWD.id == isCaptain" class="captain-badge">C</span>
                                        <svg v-if="getFWD.id" @click.stop="removePlayerC(getFWD)"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                            class="captain-badge-close">
                                            <path fill="#F94646"
                                                d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                            </path>
                                            <path fill="#E2E2E2"
                                                d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                            </path>
                                        </svg>
                                    </picture>
                                    <div class=" gTayAP" v-if="getFWD.id === null">
                                        <div class="gvQQRY "
                                            :class="{ 'bg-red-700  text-gray-100': totalPlayerCount >= 11, 'bg-gray-200 text-gray-800': totalPlayerCount < 11 }">
                                            add</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(getFWD.name) }}</div>
                                        <div class=" fQREvA">{{ getFWD.price }}</div>
                                        <div class=" fQREvA_fix" v-if="getFWD.team_vs != ''">{{ getFWD.team_vs }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- page 2 -->
            <!-- <div :class="['cGcmaR', isToggled ? 'active' : '']" class=" border-red-500 max-h-fit !overflow-y-hidden">
                <div class="eWuGMX ">
                    <div class="sc-CrZHp hvBVYx">
                        <button @click="toggleClassBack" class="sc-iftxFb isQEzW hvBVYx_non">back<div ml="1"
                                class="sc-csKJxZ dviEZq"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="15"
                                    viewBox="0 0 24 15" color="primary" class=" gPCpFh flMINk">
                                    <path
                                        d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
                                        transform="matrix(-1 0 0 1 24 0)"></path>
                                </svg></div></button>
                    </div>
                    <PlayerSelection @playerAdded="toggleClassBack" @showPositionFullModal="alertPositionfull"
                        @showTeamLimitModal="alertTeamLimit" :position="position" @remove-player="del_captan"
                        :remainingAmount="remainingAmount" />
                </div>
            </div> -->
        </div>

        <!-- Modal for team limit -->
        <Modelc :showAdjustPlayerModal="showAdjustPlayerModal" :playerName="detailPlayer ? detailPlayer.name : 'Player'"
            @close-modal="showAdjustPlayerModal = false" @set-captain="setCaptan" @remove-player="ClickRemovePlayer" />

    </div>
</template>


<script>
import PlayerSelection from './PlayerSelection.vue';
import { mapActions, mapGetters } from 'vuex';
import Modelc from '../object/model.vue'
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    name: 'FantasyTeam',
    components: {
        PlayerSelection,
        Modelc,
    },
    data() {
        return {
            showPlayerList: false,
            isToggled: false,
            loading: true,
            position: 'all',

            showAdjustPlayerModal: false,
            isCaptain: 'none',
            detailPlayer: null,
            nameteam: '',
            amount: 80.0,
            disable: false,
            matches: [],
        }
    },
    methods: {
        ...mapActions('playerSelectBigmatch', ['setFormation', 'removePlayer']),
        ...mapActions('alert', ['addNotification']),
        ...mapActions('ticket', ['facthTicket']),
        formatDate(date) {
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(date).toLocaleDateString('th-TH', options);
        },
        alertPositionfull() {
            Swal.fire({
                text: 'You cannot select duplicate positions.',
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
        },
        alertTeamLimit() {
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
        },
        alertTeamAllLimit() {
            Swal.fire({
                text: 'You cannot select more than 11 players.',
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
        },
        resetTeam() {
            Swal.fire({
                title: 'Are you sure??',
                text: "Do you want to clear player data??",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่, reset!',
                cancelButtonText: 'cancel',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.updateFormation();
                }
            })
        },
        toggleClass(position) {
            Swal.fire({
                text: 'comming soon',
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
            if (this.totalPlayerCount >= 11) {
                this.alertTeamAllLimit();
                return;
            }
            this.position = position;
            this.isToggled = true;
        },
        toggleClassBack() {
            this.isToggled = false;
        },

        updateFormation() {

            this.setFormation();

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
        adjustPlayer(player) {
            this.detailPlayer = player;
            this.showAdjustPlayerModal = true;
        },
        setCaptan() {
            this.isCaptain = this.detailPlayer.id;
            this.showAdjustPlayerModal = false;
        },
        removePlayerC(player) {
            const positionState = this.getPositionStateKey(player.position);
            this.removePlayer({ player, position: positionState });
            if (player.id == this.isCaptain) {
                this.isCaptain = 'none';
            }
        },
        ClickRemovePlayer() {
            let player = this.detailPlayer;
            if (player.id == this.isCaptain) {
                this.isCaptain = 'none';
            }
            const positionState = this.getPositionStateKey(player.position);
            this.removePlayer({ player, position: positionState });
            this.showAdjustPlayerModal = false;
        },
        del_captan(player_id) {
            if (player_id == this.isCaptain) {
                this.isCaptain = 'none';
            }
        },
        getPositionStateKey(position) {
            switch (position) {
                case 'G': return 'GKP';
                case 'D': return 'DEF';
                case 'M': return 'MID';
                case 'F': return 'FWD';
            }
        },
        checkHasCaptan() {
            const allPlayers = [
                ...this.getGKP,
                ...this.getDEF,
                ...this.getMID,
                ...this.getFWD,
            ];
            const isCaptainValid = allPlayers.some(player => player.id === this.isCaptain);
            return isCaptainValid;
        },
        async saveTeam() {
            return;
            if (this.getGameWeek.status != "active") {
                this.addNotification({ type: 'error', message: 'can not save' });
                return;
            }
            if (this.disable) {
                return;
            }

            let countGKP = 0;
            for (let i = 0; i < this.getGKP.length; i++) {
                if (this.getGKP[i].id != null) {
                    countGKP++;
                }
            }

            let countDiff = 0;
            for (let i = 0; i < this.getDEF.length; i++) {
                if (this.getDEF[i].id != null) {
                    countDiff++;
                }
            }

            let countMid = 0;
            for (let i = 0; i < this.getMID.length; i++) {
                if (this.getMID[i].id != null) {
                    countMid++;
                }
            }

            let countFWD = 0;
            for (let i = 0; i < this.getFWD.length; i++) {
                if (this.getFWD[i].id != null) {
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
            if (this.totalPlayerCount !== 11) {
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

                this.disable = false;
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

            this.disable = true;
            const result = await Swal.fire({
                title: 'Please read.!',
                text: 'Saved. To make changes, please go to the menu list.',
                input: 'text',
                inputPlaceholder: 'Please enter your team name.',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                confirmButtonText: 'Confirm (x1ตั๋ว)',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please enter your team name.';
                    }
                    if (value.length > 18) {
                        return 'The name must not exceed 18 characters.';
                    }
                }
            });

            if (!result.isConfirmed) {
                this.disable = false;
                return;
            }

            const teamName = result.value;
            if (!teamName) {
                this.disable = false;
                return;
            }

            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.post('/premier-league/v1/create-player-game', {
                    game_week_id: this.getGameWeek.id,
                    season_id: this.getGameWeek.season_id,
                    formation: this.selectedFormation,
                    name: teamName,
                    captain: this.isCaptain,
                    gkp: this.getGKP,
                    def: this.getDEF,
                    mid: this.getMID,
                    fwd: this.getFWD

                }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.facthTicket();
                    this.addNotification({ type: 'success', message: 'success see detail on list menu' });
                    let id = response.data.main_id;
                    this.disable = false;
                    this.$router.push({ name: 'pitch-detail', params: { id } });
                }
            } catch (error) {
                Swal.fire({
                    text: 'can not be save' + error.response.data.error,
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
                console.log(error);
            }

        }


    },
    computed: {
        ...mapGetters('GameWeek', ['getGameWeek']),
        ...mapGetters('playerSelectBigmatch', ['getGKP', 'getDEF', 'getMID', 'getFWD']),
        groupedMatches() {
            return this.matches.reduce((groups, match) => {
                const date = match.date;
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(match);
                return groups;
            }, {});
        },
        totalPlayerCount() {
            try {
                const allPlayers = [this.getGKP, this.getDEF, this.getMID, this.getFWD];
                const validPlayers = allPlayers.filter(player => player.id !== null);
                return validPlayers.length;
            } catch (error) {
                console.error('Error calculating total player count:', error);
                return 0;
            }
        },
        totalPrice() {
            const allPlayers = [this.getGKP, this.getDEF, this.getMID, this.getFWD];
            const validPlayers = allPlayers.filter(player => player.id !== null);
            return validPlayers.reduce((total, player) => total + player.price, 0);
        },
        remainingAmount() {
            return (this.amount - this.totalPrice).toFixed(2);
        }
    },

    created() {
        this.updateFormation();
    }
}
</script>

<style scoped>
.separator {
    width: 90%;
    height: 1px;
    background-color: #8e8d8d;
    /* สีของเส้นขั้น */
    margin: 1px 0;
    /* ระยะห่างระหว่างเส้นและเนื้อหา */
}

.match-group {
    margin-bottom: 5px;
    width: 100%;
}

.date {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    color: #2e343c;
    width: 100%;
}

.match-results {
    text-align: left;

    border-radius: 10px;
    padding: 5px;
}

.match {
    display: flex;
    flex-direction: column;
    padding: 5px 5px 5px 10px;
    margin: 2px 0;
    background-color: #2e343c;
    border-radius: 10px;
    position: relative;
}

.team-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 2px;
}

.team-name {
    font-size: 0.7rem;
    color: #FFFFFF;
    white-space: nowrap;
    text-align: left;
}

.score {
    padding: 0px 5px;
    font-size: 0.8rem;
    font-weight: bold;
    color: #FFFFFF;
    text-align: right;
}


.alert-container {
    height: 27px;
    /* กำหนดความสูงคงที่สำหรับช่องที่แสดงข้อความ */
    width: 100%;
}

.alert-content {
    display: flex;
    align-items: center;
}

.button_new {
    font-size: 14px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #4ba44e 0%, #1a771d 100%);
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 1em;
    border-radius: 0.3em;
    color: #fff;
    height: 2.3em;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.button_new {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #155717;
    transform: translateY(-0.1em);
}

.button_new:active {
    box-shadow: inset 0px 0.1em 0.6em #155717;
    transform: translateY(0em);
}

.button_new_reset {
    font-size: 14px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #ad3d3d 0%, #771a1a 100%);
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 1em;
    border-radius: 0.3em;
    color: #fff;
    height: 2.3em;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.button_new_reset {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #571515;
    transform: translateY(-0.1em);
}

.button_new_reset:active {
    box-shadow: inset 0px 0.1em 0.6em #571515;
    transform: translateY(0em);
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
    /* อยู่มุมบนของรูปภาพ */
    left: -15px;
    /* อยู่มุมบนขวาของรูปภาพ */
    /* พื้นหลังของคำว่า "C" */
    color: rgb(255, 251, 251);
    /* สีตัวอักษร */
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    /* ขนาดตัวอักษร */
    font-weight: bold;
    transform: translate(50%, -50%);
    /* เลื่อนป้ายให้เข้ามุม */
}

.circle-img {
    border-radius: 5%;
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



.gvQQRY {
    padding: 0.2rem;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;


}

@media (min-width: 64em) {
    .elHRfu {
        padding: 0.5rem;
        width: calc(66.6667%);
    }
}

.elHRfu {
    padding: 0.5rem;
    padding-bottom: 20px;

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
    margin-top: 0.1rem;
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
    margin: 0.2rem 0px 12px 0px;
}

@media (min-width: 64em) {
    .eVUsqz {
        flex: 0 0 50%;
        margin: 0px;
    }
}


.dsbthN {
    margin-bottom: 0.1rem;
}

@media (min-width: 64em) {
    .dsbthN {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
    }
}


.flex-container {
    display: flex;
    flex-wrap: wrap;
    font-size: 10px;

}

.flex-container label {
    flex: 1 1 calc(50% - 0.5rem);
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

    /* .hvBVYx {
        display: none;
    } */
    .hvBVYx_non {
        visibility: hidden;
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
    /* transition: all 0.3s ease-in-out; */
    backdrop-filter: blur(10px);
    font-size: 0.75rem;

}

.custom-btn {
    background-color: #191b1e;
    color: #000000;
    padding: 0.5rem 0.5rem;
    border: 3px solid #272829;
    /* เส้นขอบสี #2f4453 หนา */
    border-radius: 0.5rem;
    /* มุมโค้ง */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    /* addเงา */
    /* transition: all 0.3s ease-in-out; */
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
        padding-bottom: 0.3rem;
        background-size: 44px 8px;
    }
}

@media (min-width: 64em) {

    .flTOZR {
        padding-bottom: 0.3rem;
        background-size: 55px 10px;
    }
}
</style>
