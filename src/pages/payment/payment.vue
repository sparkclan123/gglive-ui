<template>
    <div>
        <!-- <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div> -->
        <div class="master-container">
            <div class="card cart">
                <label class="title">Your cart</label>
                <div class="products">
                    <div class="product">
                        <img src="../../../public/assets/logo.webp" alt="QR Code">
                        <div>
                            <span>Cheese Burger</span>
                            <p>Extra Spicy</p>
                            <p>No mayo</p>
                        </div>
                        <div class="quantity">
                            <button @click="adjustValue('-')" >
                                <svg fill="none" viewBox="0 0 24 24" height="14" width="14"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5"
                                        stroke="#47484b" d="M20 12L4 12"></path>
                                </svg>
                            </button>
                            <label>{{ value }}</label>
                            <button @click="adjustValue('+')">
                                <svg fill="none" viewBox="0 0 24 24" height="14" width="14"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5"
                                        stroke="#47484b" d="M12 4V20M20 12H4"></path>
                                </svg>
                            </button>
                        </div>
                        <label class="price small">฿{{sumValue}}</label>
                    </div>
                </div>
            </div>

            <div class="card checkout">
                <label class="title">Checkout</label>
                <div class="details">
                    <span>Your cart subtotal:</span>
                    <span>47.99$</span>
                    <span>Discount through applied coupons:</span>
                    <span>3.99$</span>
                    <span>Shipping fees:</span>
                    <span>4.99$</span>
                </div>
                <div class="checkout--footer">
                    <label class="price"><sup>$</sup>57.99</label>
                    <button class="checkout-btn">Checkout</button>
                </div>
            </div>
        </div>

        <!--         
        <div class="card mt-2" @click="buyTicketN()">
            <div class="border"></div>
            <div class="content">
                <span class="logo-bottom-text"><i class="fas fa-ticket-alt text-gray-400"></i> PUDEE </span>
                <span class="logo-bottom-text1">ตั๋วปกติ 100 บาท </span>
            </div>
            <span class="bottom-text">คลิกเพื่อชำระเงิน</span>
        </div>
        <div v-if="qrCode">
            <h2>Scan the QR Code to Pay</h2>
            <img :src="`data:image/svg+xml;base64,${qrCode}`" alt="QR Code">
        </div> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            value: 1,
            qrCode: null, // เพิ่มตัวแปรนี้เพื่อเก็บ base64 QR code
        };
    },
    computed: {
        sumValue() {
            return this.value * 100.00;
        }
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        adjustValue(operator) {
            if (operator === '+') {
                this.value++;
            } else if (operator === '-' && this.value > 1) {
                this.value--;
            }
        },
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
                    this.qrCode = response.data.qrCodeBase64; // เก็บ base64 QR code
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
};
</script>

