<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div class="contant_style">
            <div class="walletBalanceCard">
                <div class="svgwrapper">
                    <svg viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.539915" y="6.28937" width="21" height="4" rx="1.5"
                            transform="rotate(-4.77865 0.539915 6.28937)" fill="#7D6B9D" stroke="black"></rect>
                        <circle cx="11.5" cy="5.5" r="4.5" fill="#E7E037" stroke="#F9FD50" stroke-width="2"></circle>
                        <path
                            d="M2.12011 6.64507C7.75028 6.98651 12.7643 6.94947 21.935 6.58499C22.789 6.55105 23.5 7.23329 23.5 8.08585V24C23.5 24.8284 22.8284 25.5 22 25.5H2C1.17157 25.5 0.5 24.8284 0.5 24V8.15475C0.5 7.2846 1.24157 6.59179 2.12011 6.64507Z"
                            fill="#BF8AEB" stroke="black"></path>
                        <path
                            d="M16 13.5H23.5V18.5H16C14.6193 18.5 13.5 17.3807 13.5 16C13.5 14.6193 14.6193 13.5 16 13.5Z"
                            fill="#BF8AEB" stroke="black"></path>
                    </svg>
                </div>

                <div class="balancewrapper">
                    <span class="balanceHeading">จำนวนตั๋ว {{ value }} ใบ</span>
                    <p class="balance"><span id="currency">฿</span>
                        <Numberformat :value="sumValue" :decimal="2" />
                    </p>
                </div>

                <div class="control-buttons">
                    <button class="delmoney" @click="adjustValue('-')"><span class="plussign">ลบ</span></button>
                    <input type="tel" v-model="value" maxlength="3" class="ticket-input" />
                    <button class="addmoney" @click="adjustValue('+')"><span class="plussign">เพิ่ม</span></button>
                </div>
            </div>
            <div class="button-container mt-2">
                <button type="submit" class="button-save" @click="buyTicketN()">สนับสนุนเรา</button>
            </div>

            <div v-if="qrCode" class="qr-code-container">
                <h2 class="mb-2 text-gray-800">เเคปรูปที่หน้าจอ</h2>
                <img :src="`data:image/svg+xml;base64,${qrCode}`" alt="QR Code" class="qr-code">
                <!-- <button @click="downloadQRCode" class="download-button">บันทึกรูป</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            loading: false,
            value: 1,
            qrCode: null, // เพิ่มตัวแปรนี้เพื่อเก็บ base64 QR code
            disable: false,
        };
    },
    computed: {
        sumValue() {
            return this.value * 100.00;
        }
    },
    methods: {
        adjustValue(operator) {
            if (operator === '+') {
                this.value++;
            } else if (operator === '-' && this.value > 1) {
                this.value--;
            }
        },
        async buyTicketN() {
            if (this.disable) {
                return;
            }
            this.disable = true;
            this.loading = true;
            const result = await Swal.fire({
                title: 'ยืนยันการสนับสนุน!',
                text: `คุณต้องการสนับสนุนเราด้วยจำนวน ${this.value} ใบ ใช่หรือไม่?`,
                showCancelButton: true,
                cancelButtonText: 'ไม่ใช่',
                confirmButtonText: 'ใช่',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
            });

            if (!result.isConfirmed) {
                this.disable = false;
                this.loading = false;
                return;
            }

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
                    this.disable = false;
                    this.loading = false;
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
                this.loading = false;
                console.log(error);
            }
        },
        downloadQRCode() {
            const link = document.createElement('a');
            link.href = `data:image/svg+xml;base64,${this.qrCode}`;
            link.download = 'qrcode.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
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
    justify-content: flex-start;
    gap: 12px;
    padding: 0px 12px;
    font-family: Arial, Helvetica, sans-serif;
}

.svgwrapper {
    width: 28px;
    display: flex;
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
    font-size: 8px;
    color: rgb(214, 214, 214);
    font-weight: 100;
    letter-spacing: 0.6px;
}

.balance {
    font-size: 13.5px;
    color: white;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.control-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    gap: 5px;
}

.addmoney {
    padding: 1px 15px;
    border-radius: 20px;
    background-color: #2f7525;
    color: white;
    border: none;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.delmoney {
    padding: 1px 15px;
    border-radius: 20px;
    background-color: #b63923;
    color: white;
    border: none;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ticket-input {
    width: 40px;
    padding: 2px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.plussign {
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-container {
    display: flex;
    justify-content: center;
    /* ทำให้ปุ่มอยู่ตรงกลาง */
    width: 100%;
}

.button-save {
    width: 50%;
    margin: 0 auto;
    font-size: 18px;
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow, transform;
    background: radial-gradient(100% 100% at 100% 0%, #6af984 0%, #15720e 100%);
    box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%), 0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%), inset 0px -0.01em 0px rgb(58 65 111 / 50%);
    padding: 0 2em;
    border-radius: 0.3em;
    color: #fff;
    height: 2.6em;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease, transform 0.15s ease;
    font-family: Arial, Helvetica, sans-serif;
}

.button-save {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%), 0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%), inset 0px -0.1em 0px #0f580a;
    transform: translateY(-0.1em);
}

.button-save:active {
    box-shadow: inset 0px 0.1em 0.6em #0f580a;
    transform: translateY(0em);
}

.qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.qr-code {
    max-width: 200px;
    width: 100%;
    height: auto;
    margin-bottom: 10px;
}

.download-button {
    background-color: #15720e;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.download-button:hover {
    background-color: #145a0c;
}
</style>
