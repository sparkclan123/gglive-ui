<template>
    <section class="member-detail">
        <div v-if="isDetailLoading" class="member-loading" role="status">กำลังโหลดข้อมูลทีม…</div>
        <div v-else-if="loadError" class="member-error" role="alert">
            <h2>โหลดข้อมูลทีมไม่สำเร็จ</h2>
            <p>{{ loadError }}</p>
            <button class="member-button" @click="fetchGameWeekDetail">ลองอีกครั้ง</button>
        </div>
    <div class="dxRBog" v-if="getMain">
        <MemberTeamHeader
            :team="getMain"
            :avatar="image_url || $memberBrand.avatarFallback"
            :stats="[
                { label: 'คะแนน', value: getMain.total_point },
                { label: 'งบที่ใช้ไป', value: getMain.total_price, unit: '$' },
            ]"
            @back="route_back"
        />

        <div>
            <div class="elHRfu ">
                <div class="imodPj custom-btn shadow-xl">
                    <div class="iA-dheQ">

                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(GKP, i) in getGKP" :key="i">
                                <button type="button" @click="" class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="GKP.id" :src="getShirtImage(GKP)" class="flTOZR circle-img">
                                        <span v-if="GKP.captain == 1" class="captain-badge">C</span>
                                        <span v-if="GKP.play_point > 2" class="mvp-badge">
                                            <!-- <StarMVPIcon /> -->
                                        </span>
                                        <div class="goal-indicator-container">
                                            <div class="goal-indicator" v-if="GKP.goal_point > 0">
                                                <span class="goal-mark" v-if="GKP.goal_point % 6 === 0">{{
                                                    GKP.goal_point / 6 }}</span>
                                                <FootBallIcon />
                                            </div>
                                            <div class="goal-indicator" v-if="GKP.clean_sheet > 0">
                                                <span class="cs-mark">CS</span>

                                            </div>
                                            <div class="goal-indicator" v-if="GKP.assist_point > 0">
                                                <span class="assit-mark">A{{ GKP.assist_point / 3 }}</span>

                                            </div>
                                            <div class="goal-indicator" v-if="GKP.card_point === -1">
                                                <div class="yellow-card"></div>
                                            </div>
                                            <div class="goal-indicator" v-if="GKP.card_point === -3">
                                                <div class="red-card"></div>
                                            </div>
                                        </div>
                                    </picture>

                                    <div class=" gTayAP">
                                        <div class=" etyMDj">{{ truncateText(GKP.name) }}</div>
                                        <div class=" fQREvA">{{ GKP.points }}</div>
                                        <div class=" fQREvA_fix" v-if="GKP.team_vs != ''">{{ GKP.team_vs }}</div>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(DEF, i) in getDEF" :key="i">
                                <button type="button" @click="" class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="DEF.id" :src="getShirtImage(DEF)" class="flTOZR circle-img">
                                        <span v-if="DEF.captain == 1" class="captain-badge">C</span>
                                        <span v-if="DEF.play_point > 2" class="mvp-badge">
                                            <!-- <StarMVPIcon /> -->
                                        </span>
                                        <div class="goal-indicator-container">
                                            <div class="goal-indicator" v-if="DEF.goal_point > 0">
                                                <span class="goal-mark" v-if="DEF.goal_point % 6 === 0">{{
                                                    DEF.goal_point / 6 }}</span>
                                                <FootBallIcon />
                                            </div>
                                            <div class="goal-indicator" v-if="DEF.clean_sheet > 0">
                                                <span class="cs-mark">CS</span>

                                            </div>
                                            <div class="goal-indicator" v-if="DEF.assist_point > 0">
                                                <span class="assit-mark">A{{ DEF.assist_point / 3 }}</span>

                                            </div>
                                            <div class="goal-indicator" v-if="DEF.card_point === -1">
                                                <div class="yellow-card"></div>
                                            </div>
                                            <div class="goal-indicator" v-if="DEF.card_point === -3">
                                                <div class="red-card"></div>
                                            </div>
                                        </div>
                                    </picture>
                                    <div class=" gTayAP">
                                        <div class=" etyMDj">{{ truncateText(DEF.name) }}</div>
                                        <div class=" fQREvA">{{ DEF.points }}</div>
                                        <div class=" fQREvA_fix" v-if="DEF.team_vs != ''">{{ DEF.team_vs }}</div>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(MID, i) in getMID" :key="i">
                                <button type="button" @click="" class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="MID.id" :src="getShirtImage(MID)" class="flTOZR circle-img">
                                        <span v-if="MID.captain == 1" class="captain-badge">C</span>
                                        <span v-if="MID.play_point > 2" class="mvp-badge">
                                            <!-- <StarMVPIcon /> -->
                                        </span>
                                        <div class="goal-indicator-container">
                                            <div class="goal-indicator" v-if="MID.goal_point > 0">
                                                <span class="goal-mark" v-if="MID.goal_point % 5 === 0">{{
                                                    MID.goal_point / 5 }}</span>
                                                <FootBallIcon />
                                            </div>
                                            <div class="goal-indicator" v-if="MID.clean_sheet > 0">
                                                <span class="cs-mark">CS</span>

                                            </div>
                                            <div class="goal-indicator" v-if="MID.assist_point > 0">
                                                <span class="assit-mark">A{{ MID.assist_point / 3 }}</span>

                                            </div>
                                            <div class="goal-indicator" v-if="MID.card_point === -1">
                                                <div class="yellow-card"></div>
                                            </div>
                                            <div class="goal-indicator" v-if="MID.card_point === -3">
                                                <div class="red-card"></div>
                                            </div>
                                        </div>

                                    </picture>

                                    <div class=" gTayAP">
                                        <div class=" etyMDj">{{ truncateText(MID.name) }}</div>
                                        <div class=" fQREvA">{{ MID.points }}</div>
                                        <div class=" fQREvA_fix" v-if="MID.team_vs != ''">{{ MID.team_vs }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro" v-for="(FWD, i) in getFWD" :key="i">
                                <button type="button" @click="" class="fBGUqJ">
                                    <picture class="relative">
                                        <source type="image/webp">
                                        <img v-if="FWD.id" :src="getShirtImage(FWD)" class="flTOZR circle-img">
                                        <span v-if="FWD.captain == 1" class="captain-badge">C</span>
                                        <span v-if="FWD.play_point > 2" class="mvp-badge">
                                            <!-- <StarMVPIcon /> -->
                                        </span>
                                        <div class="goal-indicator-container">
                                            <div class="goal-indicator" v-if="FWD.goal_point > 0">
                                                <span class="goal-mark" v-if="FWD.goal_point % 4 === 0">{{
                                                    FWD.goal_point / 4 }}</span>
                                                <FootBallIcon />
                                            </div>
                                            <div class="goal-indicator" v-if="FWD.assist_point > 0">
                                                <span class="assit-mark">A{{ FWD.assist_point / 3 }}</span>

                                            </div>
                                            <div class="goal-indicator" v-if="FWD.card_point === -1">
                                                <div class="yellow-card"></div>
                                            </div>
                                            <div class="goal-indicator" v-if="FWD.card_point === -3">
                                                <div class="red-card"></div>
                                            </div>

                                        </div>

                                    </picture>

                                    <div class=" gTayAP">
                                        <div class=" etyMDj">{{ truncateText(FWD.name) }}</div>
                                        <div class=" fQREvA">{{ FWD.points }}</div>
                                        <div class=" fQREvA_fix" v-if="FWD.team_vs != ''">{{ FWD.team_vs }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>


<script>
import { api } from '@axios_inst';
import MemberTeamHeader from '../../components/member/MemberTeamHeader.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: { MemberTeamHeader },
    data() {
        return {
            id: null,
            getGKP: [],
            getDEF: [],
            getMID: [],
            getFWD: [],
            getMain: null,
            requestVersion: 0,
            isDetailLoading: false,
            loadError: '',
            image_url: null,
            isNavigating: false

        };
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        route_back() {
            if (!this.isNavigating) {
                this.isNavigating = true;
                this.$router.go(-1);
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            }
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
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/game-week-challenge-user-detail/${this.id}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                if (requestVersion !== this.requestVersion) return;
                if (!response.data.ok || !response.data.playerGameMain) throw new Error('ไม่พบข้อมูลทีม');
                if (response.data.ok) {
                    const datas = response.data.playerGame;
                    this.getGKP = datas.filter(player => player.position === 'G').sort((a, b) => a.sort - b.sort);
                    this.getDEF = datas.filter(player => player.position === 'D').sort((a, b) => a.sort - b.sort);
                    this.getMID = datas.filter(player => player.position === 'M').sort((a, b) => a.sort - b.sort);
                    this.getFWD = datas.filter(player => player.position === 'F').sort((a, b) => a.sort - b.sort);
                    this.getMain = response.data.playerGameMain;
                    this.image_url = response.data.imageUrl;


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

    },
    beforeUnmount() {
        this.requestVersion++;
        this.updateLoading(false);
    },
    created() {
        this.id = this.$route.params.id;
        this.updateLoading(true);
        this.fetchGameWeekDetail();
    },

};
</script>

<style scoped>
.mvp-badge {
    position: absolute;
    top: 0;
    /* อยู่มุมบนของรูปภาพ */
    left: 0;
    /* อยู่มุมบนขวาของรูปภาพ */
    display: flex;
    align-items: center;
    justify-content: center;

    transform: translate(20%, -50%);
    /* เลื่อนป้ายให้เข้ามุม */
}

.goal-indicator-container {
    position: absolute;
    top: 0;
    left: -10px;
    /* ปรับตำแหน่งให้ goal-indicator อยู่ตรงรูปนักเตะ */
    display: flex;
    flex-direction: column;
    /* วางแนวตั้ง */
    gap: 2px;
    /* ระยะห่างระหว่างแต่ละ goal-indicator */
}

.goal-indicator {
    display: flex;
    align-items: center;
    /* จัดให้ FootBallIcon กับ text อยู่ในแนวเดียวกัน */
}

.goal-mark {
    position: absolute;
    margin-left: 3px;
    color: rgb(237, 237, 237);
    font-size: 6px;
    font-weight: bold;
    margin-bottom: 15px;
    /* ระยะห่างระหว่างตัวเลขกับไอคอน */
    background-color: rgb(125, 5, 5);
    /* พื้นหลังสีเทาอ่อน */
    border-radius: 50%;
    /* ทำให้เป็นวงกลม */
    padding: 2px 3px;
    /* ระยะห่างระหว่างข้อความกับขอบวงกลม */
    display: inline-block;
    /* ทำให้ padding และ border-radius ทำงานได้ดี */
    line-height: 1;
    /* ให้ข้อความอยู่กึ่งกลางวงกลม */
}

.yellow-card {
    margin-left: 2px;
    display: inline-block;
    width: 10px;

    /* กำหนดความกว้าง */
    height: 13px;
    /* กำหนดความสูง */
    background-color: yellow;
    /* สีพื้นหลังเป็นสีเหลือง */

    /* เส้นขอบสีดำ */
    border-radius: 4px;
    /* มุมโค้งเล็กน้อย */
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    /* เพิ่มเงาเล็กน้อย */
}


.red-card {
    margin-left: 2px;
    display: inline-block;
    width: 10px;
    /* กำหนดความกว้าง */
    height: 13px;
    /* กำหนดความสูง */
    background-color: rgb(211, 6, 6);
    /* สีพื้นหลังเป็นสีเหลือง */

    /* เส้นขอบสีดำ */
    border-radius: 4px;
    /* มุมโค้งเล็กน้อย */
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    /* เพิ่มเงาเล็กน้อย */
}

.assit-mark {
    margin: 1px;
    color: rgb(237, 237, 237);
    font-size: 5px;
    font-weight: bold;
    /* ระยะห่างระหว่างตัวเลขกับไอคอน */
    background-color: rgb(5, 51, 125);
    /* พื้นหลังสีเทาอ่อน */
    border-radius: 50%;
    /* ทำให้เป็นวงกลม */
    padding: 4px 3px;
    /* ระยะห่างระหว่างข้อความกับขอบวงกลม */
    display: inline-block;
    /* ทำให้ padding และ border-radius ทำงานได้ดี */
    line-height: 1;
    /* ให้ข้อความอยู่กึ่งกลางวงกลม */
}

.cs-mark {

    margin: 1px;
    color: rgb(237, 237, 237);
    font-size: 5px;
    font-weight: bold;
    /* ระยะห่างระหว่างตัวเลขกับไอคอน */
    background-color: rgb(16, 80, 2);
    /* พื้นหลังสีเทาอ่อน */
    border-radius: 50%;
    /* ทำให้เป็นวงกลม */
    padding: 4px 3px;
    /* ระยะห่างระหว่างข้อความกับขอบวงกลม */
    display: inline-block;
    /* ทำให้ padding และ border-radius ทำงานได้ดี */
    line-height: 1;
    /* ให้ข้อความอยู่กึ่งกลางวงกลม */
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
    background-image: linear-gradient(to right, rgb(0, 255, 135), rgb(2, 239, 255));

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
<style src="../../styles/member-details.css"></style>
