<template>
    <div class="">
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div class="contant_style">
            <div class="walletBalanceCard mb-2 mt-1" v-if="datas.length > 0" v-for="data in datas"
                @click="seeDetail(data)">
                <div class="svgwrapper">
                    <svg viewBox="0 0 256 256" width="34" height="64"
                        v-if="data.Status === 'buy_ticket' || data.Status === 'resive_reward_ticket'" id="ticket">
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="34" height="64" id="money"
                        v-if="data.Status === 'resive_reward_money'">
                        <rect width="58" height="30" x="3" y="17" fill="#49b170" rx="3"></rect>
                        <path fill="#00913e"
                            d="M55,26a3,3,0,0,1-3-3,1,1,0,0,0-1-1H13a1,1,0,0,0-1,1,3,3,0,0,1-3,3,1,1,0,0,0-1,1V37a1,1,0,0,0,1,1,3,3,0,0,1,3,3,1,1,0,0,0,1,1H51a1,1,0,0,0,1-1,3,3,0,0,1,3-3,1,1,0,0,0,1-1V27A1,1,0,0,0,55,26Z">
                        </path>
                        <circle cx="32" cy="32" r="8" fill="#fff042"></circle>
                        <circle cx="18" cy="32" r="3" fill="#f7a600"></circle>
                        <circle cx="46" cy="32" r="3" fill="#f7a600"></circle>
                        <path fill="#f7a600"
                            d="M32.67,31H31.33c-.15,0-.33-.21-.33-.5s.18-.5.33-.5h2a1,1,0,0,0,0-2H33V25a1,1,0,0,0-2,0v3a2.51,2.51,0,0,0,.33,5h1.34c.15,0,.33.21.33.5s-.18.5-.33.5h-2a1,1,0,0,0,0,2H31v3a1,1,0,0,0,2,0V36a2.51,2.51,0,0,0-.33-5Z">
                        </path>
                        <path fill="#f7a600"
                            d="M32,40a8,8,0,1,1,6.57-12.55A7.85,7.85,0,0,1,40,32,8,8,0,0,1,32,40Zm0-14.77A6.77,6.77,0,1,0,38.77,32,6.79,6.79,0,0,0,32,25.23Z">
                        </path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="cancel"
                        v-if="data.Status === 'cancel_payment'">
                        <g transform="translate(0 -1028.362)">
                            <circle cx="657.054" cy="437.094" r="15.268" fill="#ef4c45" fill-rule="evenodd"
                                transform="translate(-504.421 696.821) scale(.78596)"></circle>
                            <path
                                style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb"
                                fill="#df2209"
                                d="M14.525 23.717a12 12 0 0 0 .686-.154 12 12 0 0 0 1.137-.38 12 12 0 0 0 1.095-.488 12 12 0 0 0 1.041-.597 12 12 0 0 0 .975-.698 12 12 0 0 0 .902-.793 12 12 0 0 0 .817-.877 12 12 0 0 0 .726-.955 12 12 0 0 0 .627-1.021 12 12 0 0 0 .522-1.08 12 12 0 0 0 .412-1.127 12 12 0 0 0 .26-1.016l-7.13-7.129A6.478 6.478 0 0 0 12 5.496a6.478 6.478 0 0 0-4.596 1.906A6.482 6.482 0 0 0 5.496 12a6.48 6.48 0 0 0 1.908 4.596l7.121 7.12z"
                                color="#000" font-family="sans-serif" font-weight="400"
                                transform="translate(0 1028.362)"></path>
                            <path
                                style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb"
                                fill="#fff"
                                d="M8.498 1.994c1.662 0 3.324.635 4.596 1.906a6.494 6.494 0 0 1 0 9.194 6.491 6.491 0 0 1-9.192 0 6.48 6.48 0 0 1-1.879-5.219A6.482 6.482 0 0 1 3.903 3.9a6.478 6.478 0 0 1 4.595-1.906zm2.467 3.522c-.001 0-.003 0-.004.002a.506.506 0 0 0-.342.152L8.496 7.79 6.375 5.67a.506.506 0 0 0-.357-.152c-.397-.002-.635.584-.35.859l2.121 2.121-2.121 2.121c-.383.368.34 1.09.707.707l2.121-2.12 2.123 2.12c.368.383 1.09-.34.707-.707l-2.12-2.121 2.12-2.121c.29-.278.04-.874-.361-.861Z"
                                color="#000" font-family="sans-serif" font-weight="400" overflow="visible"
                                transform="translate(3.503 1031.865)"></path>
                        </g>
                    </svg>
                </div>

                <div class="balancewrapper">
                    <span class="balanceHeading"><span v-if="data.Status !== 'cancel_payment'">{{ data.Detail }}</span>
                        {{ data.Receive }}
                        <DateFormatted :dateString="data.CreatedAt" />
                    </span>
                    <p class="balance"
                        :class="data.Status == 'resive_reward_money' || data.Status == 'resive_reward_ticket' ? 'text-green-400' : 'text-red-200'">
                        <span id="currency" v-if="data.Currency == 'THB'">฿</span>
                        <Numberformat :value="data.Amount" :decimal="2" />
                        <span id="currency" v-if="data.Currency == 'Ticket'">ใบ</span>
                    </p>
                </div>


            </div>
            <div v-else>
                <div class="flex justify-center items-center h-64">
                    <span class="text-gray-400">ไม่มีข้อมูล</span>
                </div>
            </div>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="facthTransections" />
    </div>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
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
        seeDetail(data) {
            Swal.fire({
                title: 'รายละเอียด',
                html: `
                    <div class="text-left">
                        <p>รายละเอียด: ${data.Detail}</p>
                        <p>จำนวน: ${data.Amount}</p>
                        <p>สถานะ: ${data.Status}</p>
                        <p>วันที่: ${data.CreatedAt}</p>
                    </div>
                `,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'ปิด',
                customClass: {
                    cancelButton: 'btn-cancel',
                    title: 'text-custom',
                    htmlContainer: 'text-custom',
                    popup: 'popup-custom swal2-top'
                },
            })
        },
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
