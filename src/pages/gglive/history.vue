<template>
    <section class="member-support member-history">
        <LodingSceen :loading="loading" />
        <header class="member-page-header"><h1>ประวัติรายการ</h1><p>รายการตั๋ว รางวัล และการชำระเงินของคุณ</p></header>
        <div class="content-container">
            <button v-for="data in datas" :key="data.id" type="button" class="wallet-card" @click="seeDetail(data)">
                <span class="icon-wrapper"><MemberIcon :name="data.Currency === 'Ticket' ? 'ticket' : 'clock'" /></span>
                <span class="balance-section">
                    <span class="balance-detail"><span v-if="data.Status !== 'cancel_payment'">{{ data.Detail }}</span> {{ data.Receive }}<DateFormatted :dateString="data.CreatedAt" /></span>
                    <span class="amount" :class="data.Status == 'resive_reward_money' || data.Status == 'resive_reward_ticket' ? 'text-green-400' : 'text-red-300'"><span v-if="data.Currency == 'THB'">฿</span><Numberformat :value="data.Amount" :decimal="2" /><span v-if="data.Currency == 'Ticket'"> ใบ</span></span>
                </span>
            </button>
            <div v-if="!loading && !datas.length" class="member-empty"><h2>ยังไม่มีรายการ</h2><p>ประวัติการรับรางวัลและการซื้อตั๋วจะแสดงที่นี่</p></div>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="facthTransections" />
    </section>
</template>

<script>
import '../../styles/member-support.css';
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
