<template>
    <div class="dxRBog pb-4" v-if="getGameWeek && getGameWeek.status == 'active'">

        <div :class="['kigSry', isToggled ? 'liIqzj' : '']">
            <!-- page 1 -->
            <div class="elHRfu ">
                <div class="sc-CrZHp hvBVYx flex items-center">
                    <img src="/public/assets/logonew.png" alt="icon" class="mr-1 w-7 h-7">
                    <span class="mr-auto">เกมวีค {{ getGameWeek.week }} <i
                            class="fas fa-ticket-alt text-yellow-400"></i> <span class="text-yellow-400 text-xs">x
                            1</span></span>
                    <button @click="toggleClass('all')" class="sc-iftxFb isQEzW">
                        รายชื่อผู้เล่น
                        <div ml="1" class="sc-csKJxZ dviEZq">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20"
                                color="primary" class="sc-bSywJw sc-hPMVTF gPCpFh flMINk">
                                <path fill-rule="evenodd"
                                    d="M53.6485838,32.0017628 L50.0028805,32.002243 L44.1795487,32.002243 L42.8449352,32.002243 C42.2448392,32.002243 41.6106577,32.2648846 41.1853096,32.6869358 C40.7782045,33.0941023 40.4723956,33.7595891 40.5007201,34.3468117 C40.5285646,34.9508394 40.7258761,35.5807952 41.1853096,36.0066875 C41.6447432,36.4287387 42.2069131,36.6913803 42.8449352,36.6913803 L46.4978397,36.6913803 L47.9851176,36.6913803 L45.4666347,39.209763 C43.6044167,41.0722619 41.7383581,42.9386019 39.8780605,44.7991802 C38.2707633,46.4067198 36.6673068,48.0104182 35.0585694,49.6193983 C34.2803649,50.3977202 33.4867979,51.1722009 32.7181949,51.9601258 L32.6845895,51.9937362 C32.2568411,52.4215492 32,53.0481439 32,53.6536121 C32,54.2317118 32.2530005,54.9140038 32.6845895,55.313488 C33.1305809,55.7206545 33.7157945,56.0265096 34.3442151,55.9981808 C34.9721555,55.9703321 35.5592895,55.7600268 36.0038406,55.313488 L37.931349,53.3856888 L42.5261642,48.7906607 L48.1147384,43.2007634 C49.1805089,42.1348321 50.2462794,41.0689008 51.3115699,40.0034497 L51.3115699,43.8239971 L51.3115699,45.1597723 C51.3115699,45.7599588 51.5741719,46.3937558 51.9961594,46.8196481 C52.4032645,47.2263345 53.068651,47.5321896 53.6557849,47.5038608 C54.2597216,47.4760121 54.8895823,47.279151 55.3154105,46.8196481 C55.7316371,46.3582247 56,45.7954898 56,45.1597723 L56,41.5058366 L56,35.6821067 L56,34.3468117 C56,34.0073461 55.9183869,33.6846859 55.781085,33.3893941 C55.6649064,33.1209907 55.5084013,32.8717932 55.3082093,32.6864556 C54.8617379,32.2792891 54.2770043,31.9739142 53.6485838,32.0017628 Z"
                                    transform="rotate(45 71.042 -6.799)"></path>
                            </svg>
                        </div>
                    </button>
                </div>
                <!-- <span @click="toggleClass">click</span> -->
                <div class="dsbthN custom-btn shadow-xl">
                    <div class="eVUsqz">
                        <button @click="saveTeam()" class="button_new">
                            บันทึกทีม
                        </button>
                        <button @click="resetTeam()" class="button_new_reset">
                            รีเซ็ต
                        </button>
                        <button class="font-bold text-gray-300  py-2 px-1 text-xs items-center">
                            {{ totalPlayerCount }}/11
                        </button>
                        <button class=" font-bold text-green-400  py-2 px-0 text-xs items-center">
                            <NumberDisplay :number="remainingAmount" /> $
                        </button>
                        <!-- <button
                            class="bg-white bg-opacity-100 hover:bg-opacity-10 text-gray-600 hover:text-gray-300 py-2 px-4 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                            เลือกอัตโนมัติ
                        </button> -->

                    </div>
                    <div class="kznjgV">
                        <div class="jrXxIw cgwdFl">
                            <div
                                class="bg-white bg-opacity-100 hover:bg-opacity-10 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs ceLkmB">
                                <label for="formation" class="kISBiI">
                                    <div><span class=" jeDXjk">เลือกรูปแบบ</span></div>
                                </label>
                                <select id="formation" class="eiPequ text-xs" @change="updateFormation"
                                    v-model="selectedFormation">
                                    <option value="1-3-4-3" aria-selected="true" class="">3-4-3</option>
                                    <option value="1-3-5-2" aria-selected="false" class="">3-5-2</option>
                                    <option value="1-4-3-3" aria-selected="false" class="">4-3-3</option>
                                    <option value="1-4-4-2" aria-selected="false" class="">4-4-2</option>
                                    <option value="1-4-5-1" aria-selected="false" class="">4-5-1</option>
                                    <option value="1-5-2-3" aria-selected="false" class="">5-2-3</option>
                                    <option value="1-5-3-2" aria-selected="false" class="">5-3-2</option>
                                    <option value="1-5-4-1" aria-selected="false" class="">5-4-1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="imodPj custom-btn shadow-xl">
                    <div class="iA-dheQ">

                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(GKP, i) in getGKP" :key="i">
                                <button type="button" @click="GKP.id === null ? toggleClass('G') : adjustPlayer(GKP)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="GKP.id" :src="getShirtImage(GKP)" class="flTOZR circle-img">
                                        <img v-else src="/public/assets/shirt/shirt_0_1-66.png" class="flTOZR">
                                        <span v-if="GKP.id == isCaptain" class="captain-badge">C</span>
                                    </picture>
                                    <div class=" gTayAP" v-if="GKP.id === null">
                                        <div class="gvQQRY text-gray-800">เพิ่ม</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(GKP.name) }}</div>
                                        <div class=" fQREvA">{{ GKP.price }}</div>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(DEF, i) in getDEF" :key="i">
                                <button type="button" @click="DEF.id === null ? toggleClass('D') : adjustPlayer(DEF)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="DEF.id" :src="getShirtImage(DEF)" class="flTOZR circle-img">
                                        <img v-else src="/public/assets/shirt/shirt_0-66.png" class="flTOZR">
                                        <span v-if="DEF.id == isCaptain" class="captain-badge">C</span>
                                    </picture>
                                    <div class=" gTayAP" v-if="DEF.id === null">
                                        <div class="gvQQRY text-gray-800">เพิ่ม</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(DEF.name) }}</div>
                                        <div class=" fQREvA">{{ DEF.price }}</div>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(MID, i) in getMID" :key="i">
                                <button type="button" @click="MID.id === null ? toggleClass('M') : adjustPlayer(MID)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="MID.id" :src="getShirtImage(MID)" class="flTOZR circle-img">
                                        <img v-else src="/public/assets/shirt/shirt_0-66.png" class="flTOZR">
                                        <span v-if="MID.id == isCaptain" class="captain-badge">C</span>
                                    </picture>
                                    <div class=" gTayAP" v-if="MID.id === null">
                                        <div class="gvQQRY text-gray-800">เพิ่ม</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(MID.name) }}</div>
                                        <div class=" fQREvA">{{ MID.price }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(FWD, i) in getFWD" :key="i">
                                <button type="button" @click="FWD.id === null ? toggleClass('F') : adjustPlayer(FWD)"
                                    class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="FWD.id" :src="getShirtImage(FWD)" class="flTOZR circle-img">
                                        <img v-else src="/public/assets/shirt/shirt_0-66.png" class="flTOZR">
                                        <span v-if="FWD.id == isCaptain" class="captain-badge">C</span>
                                    </picture>
                                    <div class=" gTayAP" v-if="FWD.id === null">
                                        <div class="gvQQRY text-gray-800">เพิ่ม</div>
                                    </div>
                                    <div class=" gTayAP" v-else>
                                        <div class=" etyMDj">{{ truncateText(FWD.name) }}</div>
                                        <div class=" fQREvA">{{ FWD.price }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- page 2 -->
            <div :class="['cGcmaR', isToggled ? 'active' : '']" class=" border-red-500 max-h-fit !overflow-y-hidden">
                <div class="eWuGMX ">
                    <div class="sc-CrZHp hvBVYx">
                        <button @click="toggleClassBack" class="sc-iftxFb isQEzW">กลับ<div ml="1"
                                class="sc-csKJxZ dviEZq"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="15"
                                    viewBox="0 0 24 15" color="primary" class=" gPCpFh flMINk">
                                    <path
                                        d="M23.9996,7.4946 C23.9786,7.0416 23.8296,6.5696 23.4816,6.2506 C23.4816,6.2506 23.4806,6.2496 23.4806,6.2496 L18.4596,1.2256 L17.7526,0.5176 C17.4346,0.1986 16.9586,0.0016 16.5096,-0.0004 C16.0766,-0.0004 15.5616,0.1906 15.2656,0.5176 C14.9596,0.8526 14.7296,1.2916 14.7486,1.7616 C14.7686,2.2296 14.9276,2.6676 15.2656,3.0056 L17.9916,5.7336 C17.9916,5.7336 2.6226,5.7246 1.7966,5.7346 L1.7616,5.7346 C1.3076,5.7346 0.8386,5.9316 0.5186,6.2526 C0.2116,6.5586 -0.0164,7.0556 0.0006,7.4966 C0.0216,7.9496 0.1696,8.4226 0.5176,8.7406 C0.8656,9.0596 1.2886,9.2576 1.7616,9.2566 L17.9986,9.2566 L15.2646,11.9936 C14.9456,12.3116 14.7496,12.7866 14.7476,13.2376 C14.7476,13.6686 14.9376,14.1846 15.2646,14.4816 C15.5996,14.7866 16.0376,15.0166 16.5076,14.9986 C16.9736,14.9746 17.4136,14.8186 17.7506,14.4816 L22.7766,9.4516 L23.4856,8.7436 C23.6656,8.5626 23.7936,8.3486 23.8776,8.1186 C23.9576,7.9146 24.0076,7.6996 23.9996,7.4946"
                                        transform="matrix(-1 0 0 1 24 0)"></path>
                                </svg></div></button>
                    </div>
                    <PlayerSelection @playerAdded="toggleClassBack" @showPositionFullModal="alertPositionfull"
                        @showTeamLimitModal="alertTeamLimit" :position="position" />
                </div>
            </div>
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
            selectedFormation: '1-3-4-3',
            loading: true,
            position: 'all',

            showAdjustPlayerModal: false,
            isCaptain: 'none',
            detailPlayer: null,
            nameteam: '',
            amount: 80.0,
            disable: false,
        }
    },
    methods: {
        ...mapActions('playerSelect', ['setFormation', 'removePlayer']),
        ...mapActions('alert', ['addNotification']),
        ...mapActions('ticket', ['facthTicket']),
        alertPositionfull() {
            Swal.fire({
                text: 'ไม่สามารถเลือกตำเเหน่งซ้ำกันได้',
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
        },
        alertTeamLimit() {
            Swal.fire({
                text: 'ไม่สามารถเลือกทีมเดียวกันได้เกิน 3 คน',
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
        },
        resetTeam() {
            this.updateFormation();
        },
        toggleClass(position) {
            this.position = position;
            this.isToggled = true;
        },
        toggleClassBack() {
            this.isToggled = false;
        },

        updateFormation() {
            const formation = this.selectedFormation;
            this.setFormation(formation);

        },
        getShirtImage(player) {
            const teamCode = this.stripTeamCode(player.team_code);
            const suffix = player.position === 'G' ? '_1-66' : '-66';
            return `/assets/shirt/shirt_${teamCode}${suffix}.webp`;
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
        ClickRemovePlayer() {
            let player = this.detailPlayer;
            const positionState = this.getPositionStateKey(player.position);
            this.removePlayer({ player, position: positionState });
            this.showAdjustPlayerModal = false;
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
            if (this.getGameWeek.status != "active") {
                this.addNotification({ type: 'error', message: 'เกมวีคไม่สามารถบันทึกได้' });
                return;
            }
            if (this.disable) {
                return;
            }
            this.disable = true;
            const result = await Swal.fire({
                title: 'กรุณาอ่าน!',
                text: 'บันทึกเเล้วจะไม่สามารถเเก้ไข หรือลบได้',
                input: 'text',
                inputPlaceholder: 'กรุณาใส่ชื่อทีมของคุณ',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน (x1ตั๋ว)',
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
                        return 'กรุณาใส่ชื่อทีมของคุณ';
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

            if (this.remainingAmount < 0) {
                this.addNotification({ type: 'error', message: 'จำนวนเงินการซื้อนักเตะของคุณไม่เพียงพอ' });
                this.disable = false;
                return;
            }
            if (this.totalPlayerCount !== 11) {
                this.addNotification({ type: 'error', message: 'กรุณาเลือกนักเตะให้ครบ 11 คน' });
                this.disable = false;
                return;
            }
            if (!this.checkHasCaptan()) {
                this.addNotification({ type: 'error', message: 'กรุณาเลือกกับตันทีม' });
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
                    this.addNotification({ type: 'success', message: 'บันทึกสำเร็จ รายละเอียดอยู่ที่เมนูรายการ' });
                    let id = response.data.main_id;
                    this.disable = false;
                    this.$router.push({ name: 'pitch-detail', params: { id } });
                }
            } catch (error) {
                Swal.fire({
                    text: 'บันทึกไม่สำเร็จ' + error.response.data.error,
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
                console.log(error);
            }

        }


    },
    computed: {
        ...mapGetters('GameWeek', ['getGameWeek']),
        ...mapGetters('playerSelect', ['getGKP', 'getDEF', 'getMID', 'getFWD']),
        totalPlayerCount() {
            try {
                const allPlayers = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD];
                const validPlayers = allPlayers.filter(player => player.id !== null);
                return validPlayers.length;
            } catch (error) {
                console.error('Error calculating total player count:', error);
                return 0;
            }
        },
        totalPrice() {
            const allPlayers = [...this.getGKP, ...this.getDEF, ...this.getMID, ...this.getFWD];
            const validPlayers = allPlayers.filter(player => player.id !== null);
            return validPlayers.reduce((total, player) => total + player.price, 0);
        },
        remainingAmount() {
            return this.amount - this.totalPrice;
        }
    },
    created() {
        this.updateFormation();
    }
}
</script>

<style scoped>
.button_new {
    font-size: 14px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #47d04c 0%, #1a771d 100%);
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
    background: radial-gradient(100% 100% at 100% 0%, #d04747 0%, #771a1a 100%);
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
    background-image: linear-gradient(to right, rgb(220, 201, 255), rgb(253 250 255));

}

@media (min-width: 64em) {
    .elHRfu {
        padding: 0.5rem;
        width: calc(66.6667%);
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
    margin: 0.2rem 0px 12px 0px;
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
}


.fQREvA {
    padding: 0.2rem;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: rgba(233, 249, 241, 0.3);
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
