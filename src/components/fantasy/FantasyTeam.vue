<template>
    <div class=" dxRBog">
        <div class=" kigSry">
            <div class=" elHRfu">
                <div class=" imodPj">
                    <div class=" iA-dheQ">
                        <div class=" gRFNix">
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Goalkeeper"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">GKP</span></abbr>
                                    </div>
                                </button></div>
                        </div>
                        <div class=" gRFNix">
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Defender"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">DEF</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Defender"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">DEF</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Defender"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">DEF</span></abbr>
                                    </div>
                                </button></div>
                        </div>
                        <div class=" gRFNix">
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Midfielder"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">MID</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Midfielder"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">MID</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Midfielder"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">MID</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Midfielder"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">MID</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Midfielder"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">MID</span></abbr>
                                    </div>
                                </button></div>
                        </div>
                        <div class=" gRFNix">
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Forward"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">FWD</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Forward"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">FWD</span></abbr>
                                    </div>
                                </button></div>
                            <div class="hWtxro"><button class=" bswMxH">
                                    <div class="sc-kgwOPF sc-bgykEL blPMze bsFVze"><abbr title="Forward"
                                            class="sc-eUcPGm gOFUai"><span class="sc-kRroQv jJZVip">FWD</span></abbr>
                                    </div>
                                </button></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--  -->
            <div class=" cGcmaR">
                <div class=" eWuGMX"></div>
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
            showPlayerList: false
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


.dxRBog {
    position: relative;
    overflow-x: hidden;
}

.kigSry {
    position: relative;
    transition: all 300ms ease 0s;
}

@media (min-width: 64em) {
    .kigSry {
        display: flex;
        gap: 1.2rem;
    }
}
</style>
