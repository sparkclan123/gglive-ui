<template>
    <div class="dxRBog">
        <div :class="['kigSry', isToggled ? 'liIqzj' : '']">
            <div class="dsbthN">
                <span @click="toggleClass">click</span>
            </div>
            <!-- page 1 -->
            <div class="elHRfu">
                <div class="dsbthN">
                    <div class="sc-eAQwYs eVUsqz">
                        <button type="button" class="sc-eTNRI khqgum">Reset</button>
                        <button type="button" class="sc-eTNRI khqgum">Auto pick</button>
                        <button type="button" disabled="" class="sc-eTNRI dceCpZ">Save team</button>
                    </div>
                    <div class="sc-kyeWiB kznjgV">
                        <div class="sc-vIyEI sc-iiqfCt jrXxIw cgwdFl">
                            <div class="sc-bPrlCs ceLkmB">
                                <label for="formation" class="sc-eIPYkq kISBiI">
                                    <div><span class="sc-yRUbj jeDXjk">Choose formation</span></div>
                                </label>
                                <select id="formation" class="sc-GkLId eiPequ">
                                    <option value="1-3-4-3" aria-selected="true" class="sc-jYnQyy jAisTV">3-4-3</option>
                                    <option value="1-3-5-2" aria-selected="false" class="sc-jYnQyy jAisTV">3-5-2
                                    </option>
                                    <option value="1-4-3-3" aria-selected="false" class="sc-jYnQyy jAisTV">4-3-3
                                    </option>
                                    <option value="1-4-4-2" aria-selected="false" class="sc-jYnQyy jAisTV">4-4-2
                                    </option>
                                    <option value="1-4-5-1" aria-selected="false" class="sc-jYnQyy jAisTV">4-5-1
                                    </option>
                                    <option value="1-5-2-3" aria-selected="false" class="sc-jYnQyy jAisTV">5-2-3
                                    </option>
                                    <option value="1-5-3-2" aria-selected="false" class="sc-jYnQyy jAisTV">5-3-2
                                    </option>
                                    <option value="1-5-4-1" aria-selected="false" class="sc-jYnQyy jAisTV">5-4-1
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="imodPj">
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
        padding-top: 3.2rem;
        width: calc(66.6667%);
    }
}

.elHRfu {
    padding-top: 2.4rem;
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
        min-height: 6.2rem;
    }
}

@media (min-width: 38.125em) {
    .hWtxro {
        min-height: 6rem;
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
    width: 3rem;
    padding: 1px;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset;
    min-height: 4rem;
    border-radius: 0.4rem;
    background-color: rgb(2, 159, 79);
    font-family: PremierSans-Heavy, Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 1rem;
    text-align: center;
}



@media (min-width: 25em) {
    .blPMze {
        width: 3rem;
        min-height: 4rem;
    }
}

@media (min-width: 38.125em) {

    .blPMze {
        width: 3rem;
        min-height: 4rem;
    }
}

@media (min-width: 43.75em) {
    .blPMze {
        width: 3rem;
        min-height: 4rem;
    }
}

@media (min-width: 56.25em) {
    .blPMze {
        width: 5rem;
        min-height: 6rem;
    }
}

@media (min-width: 64em) {
    .blPMze {
        width: 6rem;
        min-height: 7rem;
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

.cgwdFl {
    margin: 0px;
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
    font-size: 1.6rem;
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
    padding: 2rem 0;
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


@media (min-width: 64em) {

    .kznjgV {
        flex: 0 0 23%;
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
</style>
