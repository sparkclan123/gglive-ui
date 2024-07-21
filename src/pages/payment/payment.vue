<template>
    <div class="card mt-2" @click="buyTicketN()">
        <div class="border"></div>
        <div class="content">
            <span class="logo-bottom-text"><i class="fas fa-ticket-alt text-gray-400"></i> PUDEE </span>
            <span class="logo-bottom-text1">ตั๋วปกติ 100 บาท </span>
        </div>
        <span class="bottom-text">คลิกเพื่อชำระเงิน</span>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            value: 1,
        };
    },

    components: {

    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        async buyTicketN() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.post('/premier-league/v1/buy-ticket', {
                    value: this.value
                }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {

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

                console.log(error);
            }
        },
    },
    computed: {
        ...mapGetters('loading', ['getLoading']),


    },
    mounted() {

    },
};
</script>
<style scoped>
.card {
    height: 140px;
    background: #243137;
    position: relative;
    display: grid;
    place-content: center;
    border-radius: 10px;
    overflow: hidden;

}

#logo-main,
#logo-second {
    height: 100%;
}

#logo-main {
    fill: #bd9f67;
}

#logo-second {
    padding-bottom: 10px;
    fill: none;
    stroke: #bd9f67;
    stroke-width: 1px;
}

.border {
    position: absolute;
    inset: 0px;
    border: 2px solid #8f4cb6;
    opacity: 0;
    transform: rotate(10deg);
}

.bottom-text {
    position: absolute;
    left: 50%;
    bottom: 13px;
    transform: translateX(-50%);
    font-size: 6px;
    text-transform: uppercase;
    padding: 0px 5px 0px 8px;
    color: #bd9f67;
    background: #243137;
    opacity: 0;
    letter-spacing: 7px;
}


.content .logo {
    height: 35px;
    position: relative;
    width: 33px;
    overflow: hidden;
}

.content .logo .logo1 {
    height: 33px;
    position: absolute;
    left: 0;
}


.content .logo .trail {
    position: absolute;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
}

.content .logo-bottom-text {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    margin-top: 0px;
    color: #bd9f67;
    padding-left: 8px;
    font-size: 18px;

    /* letter-spacing: none; */
}

.content .logo-bottom-text1 {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    margin-top: 15px;
    color: #bd9f67;
    padding-left: 8px;
    font-size: 15px;

    /* letter-spacing: none; */
}



.card .logo {
    width: 134px;
}

.card .border {
    inset: 15px;
    opacity: 1;
    transform: rotate(0);
    border-radius: 10px;
}

.card .bottom-text {
    letter-spacing: 3px;
    opacity: 1;
}

.card .content .logo-bottom-text {
    letter-spacing: 1.5px;
}
</style>
