<template>
    <div class="dxRBog">

        <div :class="['kigSry', isToggled ? 'liIqzj' : '']">
            <!-- page 1 -->
            <div class="elHRfu ">
                <span @click="toggleClass">click</span>
                <div class="dsbthN custom-btn shadow-xl">
                    <div class="eVUsqz">
                        <button
                            class="bg-white bg-opacity-100 hover:bg-opacity-10 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                            รีเซ็ต
                        </button>
                        <button
                            class="bg-white bg-opacity-100 hover:bg-opacity-10 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                            เลือกอัตโนมัติ
                        </button>
                        <button
                            class="bg-emerald-600 bg-opacity-100 hover:bg-opacity-10 text-emerald-50 hover:text-emerald-50 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs flex items-center">
                            บันทึกทีม
                        </button>
                    </div>
                    <div class="kznjgV">
                        <div class="jrXxIw cgwdFl">
                            <div
                                class="bg-white bg-opacity-100 hover:bg-opacity-10 text-gray-600 hover:text-gray-300 py-2 px-5 rounded-lg shadow-xl transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs ceLkmB">
                                <label for="formation" class="kISBiI">
                                    <div><span class=" jeDXjk">เลือกรูปแบบ</span></div>
                                </label>
                                <select id="formation" class=" eiPequ text-xs">
                                    <option value="1-3-4-3" aria-selected="true" class="">3-4-3</option>
                                    <option value="1-3-5-2" aria-selected="false" class="">3-5-2
                                    </option>
                                    <option value="1-4-3-3" aria-selected="false" class="">4-3-3
                                    </option>
                                    <option value="1-4-4-2" aria-selected="false" class="">4-4-2
                                    </option>
                                    <option value="1-4-5-1" aria-selected="false" class="">4-5-1
                                    </option>
                                    <option value="1-5-2-3" aria-selected="false" class="">5-2-3
                                    </option>
                                    <option value="1-5-3-2" aria-selected="false" class="">5-3-2
                                    </option>
                                    <option value="1-5-4-1" aria-selected="false" class="">5-4-1
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="imodPj custom-btn shadow-xl">
                    <div class="iA-dheQ">
                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Goalkeeper" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">GKP</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Defender" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">DEF</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Defender" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">DEF</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Defender" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">DEF</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Midfielder" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">MID</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Midfielder" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">MID</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Midfielder" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">MID</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Midfielder" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">MID</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Midfielder" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">MID</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div class="gRFNix">
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Forward" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">FWD</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Forward" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">FWD</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                            <div class="hWtxro">
                                <button class="bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze">
                                        <abbr title="Forward" class="sc-eUcPGm gOFUai">
                                            <span class="sc-kRroQv jJZVip">FWD</span>
                                        </abbr>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- page 2 -->
            <div :class="['cGcmaR', isToggled ? 'active' : '']">
                <div class="eWuGMX">
                    <span @click="toggleClassBack">back</span>
                    <PlayerSelection />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import PlayerSelection from './PlayerSelection.vue';

export default {
    name: 'FantasyTeam',
    components: {
        PlayerSelection
    },
    data() {
        return {
            showPlayerList: false,
            isToggled: false
        }
    },
    methods: {
        toggleClass() {
            this.isToggled = true;
        },
        toggleClassBack() {
            this.isToggled = false;
        }
    }
}
</script>

<style scoped>
@media (min-width: 64em) {
    .elHRfu {
        padding: 0.5rem;
        width: calc(66.6667%);
    }
}

.elHRfu {
    padding: 0.5rem;

}

.ism *,
.ism ::before,
.ism ::after {
    box-sizing: inherit;
}

.imodPj {
    margin-top: 2.4rem;
    border-radius: 0.8rem;
    background: url(/public/assets/fantasy.svg) center top / 750px no-repeat;
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
    width: 2.5rem;
    padding: 1px;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset;
    min-height: 3.5rem;
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
    margin: 1.2rem 0px;
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
    padding: 1rem ;
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

.custom-btn {
    background-color: #0f212e;
    color: #000000;
    padding: 0.5rem 0.5rem;
    border: 3px solid #2f4453; /* เส้นขอบสี #2f4453 หนา */
    border-radius: 0.5rem; /* มุมโค้ง */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* เพิ่มเงา */
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(10px);
    font-size: 0.75rem;

}

</style>
