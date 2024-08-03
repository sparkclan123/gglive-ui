<template>
    <div class="">
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div class="contant_style">
            <div class="walletBalanceCard mb-2 mt-1" v-if="datas" v-for="data in datas">
                <div class="svgwrapper">
                    <svg  viewBox="0 0 256 256" width="44" height="64"
                        v-if="data.Status === 'buy_ticket' || data.Status === 'resive_reward_ticket' " id="ticket">
                        <linearGradient id="a" x1="127.999" x2="127.999" y1="21.35" y2="238.728"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#f9aa2d"></stop>
                            <stop offset="1" stop-color="#e09115"></stop>
                        </linearGradient>
                        <path fill="url(#a)"
                            d="m253.866 94.906-15.84-20.814c-9.74 3.675-21.12.735-27.75-7.97-6.62-8.71-6.42-20.46-.28-28.865l-16.539-21.735c-3.5-4.6-10.13-5.505-14.73-2l-23.919 18.2c.3.165.569.385.79.67a2.48 2.48 0 0 1-.48 3.475c-1.09.83-2.64.62-3.47-.47-.22-.29-.36-.61-.43-.94L4.134 146.36c-4.6 3.5-5.5 10.13-2 14.73l16.535 21.739c9.74-3.68 21.12-.74 27.745 7.96 6.625 8.71 6.425 20.47.28 28.87l15.84 20.819c3.505 4.6 10.135 5.5 14.735 2l147.148-111.959a2.487 2.487 0 0 1-.97-.75 2.488 2.488 0 0 1 .47-3.475 2.483 2.483 0 0 1 3.48.47c.26.345.41.735.47 1.135l24-18.26c4.599-3.498 5.499-10.128 1.999-14.733zm-93.638-52.329a2.487 2.487 0 0 1-3.48-.475 2.485 2.485 0 0 1 .48-3.47c1.08-.83 2.64-.62 3.47.47a2.48 2.48 0 0 1-.47 3.475zm5.099 6.705a2.479 2.479 0 0 1-3-3.945 2.487 2.487 0 0 1 3.48.475c.83 1.09.61 2.645-.48 3.47zm5.111 6.71c-1.091.83-2.65.62-3.48-.47s-.62-2.645.47-3.475a2.49 2.49 0 0 1 3.48.47 2.49 2.49 0 0 1-.47 3.475zm5.099 6.71c-1.09.83-2.65.62-3.47-.475a2.473 2.473 0 0 1 .47-3.47 2.479 2.479 0 0 1 3 3.945zm5.109 6.71a2.488 2.488 0 0 1-3.479-.475 2.472 2.472 0 0 1 .48-3.475 2.48 2.48 0 0 1 2.999 3.95zm5.591 7.35c-1.091.83-2.65.62-3.48-.47a2.49 2.49 0 0 1 .48-3.475 2.47 2.47 0 0 1 3.47.475c.83 1.085.62 2.64-.47 3.47zm5.1 6.71a2.477 2.477 0 1 1-3-3.945 2.484 2.484 0 0 1 3.479.47 2.48 2.48 0 0 1-.479 3.475zm5.109 6.71a2.477 2.477 0 0 1-3.47-.475 2.479 2.479 0 0 1 .47-3.475 2.48 2.48 0 0 1 3 3.95zm5.101 6.704a2.479 2.479 0 0 1-3-3.945 2.474 2.474 0 0 1 3.47.475 2.473 2.473 0 0 1-.47 3.47zm5.109 6.71a2.488 2.488 0 0 1-3.479-.47c-.83-1.09-.62-2.65.479-3.475a2.475 2.475 0 0 1 3.471.47 2.488 2.488 0 0 1-.471 3.475zm5.101 6.705c-1.09.83-2.65.62-3.471-.47a2.474 2.474 0 0 1 .471-3.47c1.09-.83 2.64-.62 3.47.47.83 1.09.62 2.645-.47 3.47zm4.96 6.525a2.47 2.47 0 0 1-3.471-.475 2.472 2.472 0 0 1 .471-3.47c1.09-.83 2.64-.62 3.479.47a2.488 2.488 0 0 1-.479 3.475zm5.109 6.705c-1.1.83-2.649.62-3.479-.47a2.477 2.477 0 1 1 3.94-3 2.472 2.472 0 0 1-.461 3.47z">
                        </path>
                        <path fill="#2C2C2C"
                            d="M46.414 186.46c-6.625-8.71-18.005-11.64-27.745-7.97L2.134 156.761c-.97-1.28-1.59-2.71-1.9-4.19-.605 2.88-.015 6 1.9 8.521l16.535 21.739c9.74-3.68 21.12-.74 27.745 7.96 2.85 3.75 4.43 8.06 4.825 12.42a24.05 24.05 0 0 0-4.825-16.751zm177.032-56.689a2.474 2.474 0 0 1-.19-2.694L77.268 238.149c-4.6 3.5-11.23 2.6-14.735-2l-14.34-18.85c-.455.81-.945 1.6-1.5 2.36l15.84 20.819c3.505 4.6 10.135 5.5 14.735 2l147.148-111.959a2.482 2.482 0 0 1-.97-.748zm.8-3.68c1.061-.57 2.4-.31 3.15.675.26.345.41.735.47 1.135l24-18.26c3.319-2.53 4.699-6.69 3.899-10.54a10.49 10.49 0 0 1-3.899 6.21l-24 18.254-3.62 2.526z"
                            opacity=".2"></path>
                        <linearGradient id="b" x1="47.336" x2="194.75" y1="136.906" y2="136.906"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#fee587"></stop>
                            <stop offset="1" stop-color="#f2d972"></stop>
                        </linearGradient>
                        <path fill="url(#b)"
                            d="M193.687 118.396c1.75 2.3 1.29 5.615-1.01 7.365L91.198 202.979a5.27 5.27 0 0 1-7.37-1.01L48.404 155.42c-1.75-2.311-1.3-5.62 1-7.37l101.494-77.214c2.29-1.755 5.609-1.3 7.359 1l35.43 46.56z">
                        </path><text fill="#2C330D" font-family="'ArialRoundedMTBold'" font-size="34.732"
                            transform="matrix(.8163 -.6453 .6202 .7845 87.393 181.58)">PuDee</text>
                    </svg>

                    <svg 
                        viewBox="0 0 64 64" width="44" height="64" id="money"  v-if="data.Status === 'resive_reward_money'">
                        <defs>
                            <linearGradient id="c" x1="35" x2="35" y1="47" y2="11" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stop-color="#009e77"></stop>
                                <stop offset="1" stop-color="#00d291"></stop>
                            </linearGradient>
                            <linearGradient id="d" x1="33" x2="33" y1="47" y2="15" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stop-color="#00684e"></stop>
                                <stop offset="1" stop-color="#009c6b"></stop>
                            </linearGradient>

                            <linearGradient id="a" x1="48" x2="61" y1="17.5" y2="17.5" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stop-color="#ffe37c"></stop>
                                <stop offset="1" stop-color="#ffc337"></stop>
                            </linearGradient>
                            
                            <linearGradient id="e" x1="9" x2="22" xlink:href="#a"></linearGradient>
                            <linearGradient id="f" y1="40.5" y2="40.5" xlink:href="#a"></linearGradient>
                            <linearGradient id="b" x1="52.5" x2="52.5" y1="47" y2="34.39"
                                gradientUnits="userSpaceOnUse">
                                <stop offset="0" stop-color="#f7c944"></stop>
                                <stop offset="1" stop-color="#f7b314"></stop>
                            </linearGradient>
                            <linearGradient id="g" x1="52.7" x2="52.7" y1="23.61" y2="15" xlink:href="#b">
                            </linearGradient>
                            <linearGradient id="h" x1="15.3" x2="15.3" y1="24" y2="15" xlink:href="#b"></linearGradient>
                            <linearGradient id="i" x1="29" x2="29" y1="53" y2="17" xlink:href="#c"></linearGradient>
                            <linearGradient id="j" x1="42" x2="55" y1="23.5" y2="23.5" xlink:href="#a"></linearGradient>
                            <linearGradient id="k" x1="3" x2="16" y1="23.5" y2="23.5" xlink:href="#a"></linearGradient>
                            <linearGradient id="l" x1="3" x2="16" y1="46.5" y2="46.5" xlink:href="#a"></linearGradient>
                            <linearGradient id="m" x1="42" x2="55" y1="46.5" y2="46.5" xlink:href="#a"></linearGradient>
                            <linearGradient id="n" x1="24" x2="34" y1="35" y2="35" xlink:href="#a"></linearGradient>
                        </defs>
                        <g>
                            <rect width="52" height="36" x="9" y="11" fill="url(#c)" rx="5"></rect>
                            <path fill="url(#d)"
                                d="M50,15H9.1A5.47,5.47,0,0,0,9,16V42a5,5,0,0,0,5,5H56a5.47,5.47,0,0,0,1-.1V22A7,7,0,0,0,50,15Z">
                            </path>
                            <path fill="url(#a)"
                                d="M56,11h-8c0,.33,0,.66,0,1A12,12,0,0,0,60,24c.34,0,.67,0,1-.05V16A5,5,0,0,0,56,11Z">
                            </path>
                            <path fill="url(#e)"
                                d="M9,16v8c.33,0,.66.05,1,.05A12,12,0,0,0,22,12c0-.34,0-.67-.05-1H14A5,5,0,0,0,9,16Z">
                            </path>
                            <path fill="url(#f)"
                                d="M61,34.05c-.33,0-.66,0-1,0A12,12,0,0,0,48,46c0,.34,0,.67,0,1h8a5,5,0,0,0,5-5Z">
                            </path>
                            <path fill="url(#b)"
                                d="M57,34.39A12,12,0,0,0,48,46c0,.34,0,.67,0,1h8a5.47,5.47,0,0,0,1-.1Z"></path>
                            <path fill="url(#g)" d="M57,23.61V22a7,7,0,0,0-7-7H48.39A12,12,0,0,0,57,23.61Z"></path>
                            <path fill="url(#h)"
                                d="M21.61,15H9.1A5.47,5.47,0,0,0,9,16v8c.33,0,.66.05,1,.05A12,12,0,0,0,21.61,15Z">
                            </path>
                            <rect width="52" height="36" x="3" y="17" fill="url(#i)" rx="5"></rect>
                            <path fill="url(#j)"
                                d="M50,17h-8c0,.33,0,.66,0,1A12,12,0,0,0,54,30c.34,0,.67,0,1-.05V22A5,5,0,0,0,50,17Z">
                            </path>
                            <path fill="url(#k)"
                                d="M3,22v8c.33,0,.66.05,1,.05A12,12,0,0,0,16,18c0-.34,0-.67-.05-1H8A5,5,0,0,0,3,22Z">
                            </path>
                            <path fill="url(#l)"
                                d="M4,40c-.34,0-.67,0-1,0v8a5,5,0,0,0,5,5h8c0-.33.05-.66.05-1A12,12,0,0,0,4,40Z"></path>
                            <path fill="url(#m)"
                                d="M55,40.05c-.33,0-.66,0-1,0A12,12,0,0,0,42,52c0,.34,0,.67,0,1h8a5,5,0,0,0,5-5Z">
                            </path>
                            <path fill="url(#n)"
                                d="M30.2,34H30V30.4h.2A1.81,1.81,0,0,1,32,32.2h2a3.8,3.8,0,0,0-3.8-3.8H30V26.2H28v2.2h-.2a3.8,3.8,0,0,0,0,7.6H28v3.6h-.2A1.81,1.81,0,0,1,26,37.8H24a3.8,3.8,0,0,0,3.8,3.8H28v2.2h2V41.6h.2a3.8,3.8,0,0,0,0-7.6Zm-2.4,0a1.8,1.8,0,0,1,0-3.6H28V34Zm2.4,5.6H30V36h.2a1.8,1.8,0,1,1,0,3.6Z">
                            </path>
                        </g>
                    </svg>
                </div>

                <div class="balancewrapper">
                    <span class="balanceHeading">{{ data.Detail }} {{ data.Receive }} <DateFormatted :dateString="data.CreatedAt"/></span>
                    <p class="balance" :class="data.Status == 'resive_reward_money' ||  data.Status == 'resive_reward_ticket' ? 'text-green-400' : 'text-red-200' ">
                        <span id="currency" v-if=" data.Currency == 'THB'">฿</span>
                        <Numberformat :value="data.Amount" :decimal="2" />
                        <span id="currency" v-if=" data.Currency == 'Ticket'">ใบ</span>
                    </p>
                </div>


            </div>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="facthTransections" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
export default {
    data() {
        return {
            loading: false,
            datas: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
        };
    },
    methods: {
        async facthTransections(page = 1, limit = 10) {
            try {
                this.loading = true;
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/get-transection`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    this.datas = response.data.data;
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.loading = false;

                }
            } catch (error) {
                console.log(error);
                this.loading = false;

            }
        },

    },
    computed: {

    },
    created() {
        this.facthTransections()
    }
};
</script>

<style scoped>
.contant_style {
    background-color: white;
    border-radius: 10px;
    padding: 5px;
}

/* From Uiverse.io by vinodjangid07 */
.walletBalanceCard {
    height: 55px;
    background-color: #1c1f2f;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* เปลี่ยนจาก justify-content: flex-start; เป็น space-between */
    gap: 12px;
    padding: 0px 12px;
    font-family: Arial, Helvetica, sans-serif;
}

.svgwrapper {
    /* width: 80px; */
    /* display: flex; */
    align-items: center;
    justify-content: center;
}

.svgwrapper svg {
    width: 100%;
}

.balancewrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 120px;
    gap: 0px;
}

.balanceHeading {
    font-size: 9px;
    color: rgb(238, 237, 237);
    font-weight: 100;
    letter-spacing: 0.6px;
}

.balance {
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: 0.5px;
}



.addmoney:hover {
    background-color: whitesmoke;
    color: #9c59cc;
}

.plussign {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
