<template>
    <div class="member-support member-payment">
        <div>
            <LodingSceen :loading="loading" />
        </div>
        <header class="member-page-header"><h1>ซื้อตั๋ว VIP</h1><p>เลือกจำนวนตั๋ว โอนเงิน และแนบสลิปเพื่อบันทึกรายการ</p></header>
        <div class="contant_style">
            <div class="walletBalanceCard">
                <div class="svgwrapper">
                    <MemberIcon name="ticket" />
                </div>

                <div class="balancewrapper">
                    <span class="balanceHeading">จำนวนตั๋ว {{ value }} ใบ</span>
                    <p class="balance"><span id="currency">฿</span>
                        <Numberformat :value="sumValue" :decimal="2" />
                    </p>
                </div>

                <div class="control-buttons">
                    <button class="delmoney" @click="adjustValue('-')"><span class="plussign">ลบ</span></button>
                    <input type="tel" aria-label="จำนวนตั๋ว" inputmode="numeric" v-model="value" maxlength="3" class="ticket-input" />
                    <button class="addmoney" @click="adjustValue('+')"><span class="plussign">เพิ่ม</span></button>
                </div>
            </div>

            <div class="qr-code-container">
                <h2 class="mb-2 text-gray-800 font-semibold">กรุณาโอนเงินตามจำนวน
                    <Numberformat :value="sumValue" :decimal="2" />
                </h2>
                <span class="text-xs mb-2 text-red-800 font-semibold">*สามารถคัดลอกเลขบัญชี เเทนการเเสกน qr ได้</span>
                <div class="mb-2 text-gray-800 font-semibold">
                    <div class="flex justify-between">
                        <!-- <img src="/public/assets/kbank.jpg"
                            class="w-5 h-5 object-cover drop-shadow-xl rounded-full mr-2" alt="slip image"> -->
                            ธ.กรุงเทพ
                        <button class="copyaccount mr-2" @click="copyaccount"><span class="plussign ">คัดลอก เลข
                                บช</span></button>
                    </div>
                </div>

                <img :src="payurl" alt="QR Code" class="qr-code drop-shadow-xl ">
                <!-- <button @click="downloadQRCode" class="download-button">บันทึกรูป</button> -->
            </div>

            <span class="text-xs mb-2 text-red-800 font-semibold">*เมื่อโอนเงินเเล้ว upload สลิป เเล้วทำการ
                บันทึกรายการ</span> <br>
            <span class="text-xs mb-2 text-red-800 font-semibold">*กรุณาตรวจสอบการเลือกตั๋วของท่านต้องตรงกับจำนวน</span>

            <div class="member-slip-actions">
                <div class="member-slip-preview">
                    <img v-if="imageSelect" :src="imageSelect"
                        class="w-full h-full object-cover drop-shadow-xl" alt="สลิปที่เลือก">
                    <MemberIcon v-else name="list" />
                </div>
                <div class="button-container2">
                    <input type="file" name="slip" id="upload_slip" hidden @change="onFileChange">
                    <label for="upload_slip" class="flex items-center justify-center cursor-pointer" tabindex="0" @keydown.enter="$el.querySelector('#upload_slip').click()" @keydown.space.prevent="$el.querySelector('#upload_slip').click()">
                        <div class="cssbuttons-io-button flex items-center">

                            <span>อัพโหลด สลิป</span>
                        </div>
                    </label>
                </div>
                <div class="button-container2">
                    <button @click="buyTicketN" class="flex items-center justify-center cursor-pointer">
                        <div class="cssbuttons-io-button2 flex items-center">

                            <span>บันทึกรายการ</span>
                        </div>
                    </button>
                </div>
            </div>
            <span class="text-xs mb-2 text-red-800 font-semibold">*เวลาทำการในการปรับยอดตั๋ว
                แอดมินขอสงวนสิทธิ์ User ที่โอนเงินและส่งสลิปมาให้ช่วงหลัง <span class="text-green-700"> 24.00 น. </span>
                แอดมินจะอนุมัติตั๋วให้อีกครั้ง <span class="text-green-700"> 08.00
                    น. </span> ของวันต่อไป ยกเว้นวันปิดรับส่งทีม จะอนุมัติตั๋วให้จนถึง 75 นาทีก่อนคู่แรกลงสนาม
            </span><br>
            <span class="text-xs mb-2 text-red-800 font-semibold">*สอบถามข้อมูลเพิ่มเติม LINE <span
                    class="text-green-700"><a :href="$memberBrand.lineUrl" target="_blank" rel="noopener noreferrer">{{ $memberBrand.lineLabel }}</a></span> </span>


            <div class="walletBalanceCard mb-2 mt-2" v-if="payment" @click="refresh" role="button" tabindex="0" @keydown.enter="refresh" @keydown.space.prevent="refresh">
                <div class="svgwrapper">
                    <MemberIcon name="clock" />
                </div>

                <div class="balancewrapper_2">
                    <span class="balanceHeading_2" v-if="payment.payment_method === 'promptpay'">ตั๋ว {{ payment?.value
                        }}ใบ {{ payment?.amount / 100 }}฿ </span>
                    <span class="balanceHeading_2" v-if="payment.payment_method === 'own_pay'">ตั๋ว {{ payment?.value
                        }}ใบ {{ payment?.amount }}฿
                        <span v-if="isRefreshing"> (รอ {{ countdown }} วินาที)</span>
                        <span v-else> (กดเพื่อ refresh)</span>
                    </span>
                    <p class="balance_2">
                        มีรายการรอดำเนินการ 1รายการ
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
import '../../styles/member-support.css';

export default {
    data() {
        return {
            payurl: "https://pudee.sgp1.digitaloceanspaces.com/IMG_7776%20(2).JPG",
            loading: false,
            value: 1,
            qrCode: null, // เพิ่มตัวแปรนี้เพื่อเก็บ base64 QR code
            disable: false,
            payment: null,
            selectedFile: null,
            imageSelect: null,
            isRefreshing: false,
            countdown: 10,
        };
    },
    computed: {
        sumValue() {
            return this.value * 100.00;
        }
    },
    methods: {
        ...mapActions('ticket', ['facthTicket']),
        refresh() {
            if (this.isRefreshing) return;

            this.isRefreshing = true;
            this.getPaymentPending();
            this.facthTicket();
            this.startCountdown();
        },
        startCountdown() {
            this.countdown = 10;
            const interval = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                    clearInterval(interval);
                    this.isRefreshing = false;
                }
            }, 1000);
        },
        downloadQRCode() {
            const link = document.createElement('a');
            link.href = this.payurl;
            link.download = 'QRCode.jpg';
            link.click();
        },
        copyaccount() {
            navigator.clipboard.writeText('3210656504').then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'คัดลอก!',
                    text: 'คัดลอกเลขบัญชีเรียบร้อย',
                    timer: 1500,
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        confirmButton: 'btn-confirm',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                });
            }).catch(err => {
                console.log('Something went wrong', err);
            });

        },
        adjustValue(operator) {
            if (operator === '+') {
                this.value++;
            } else if (operator === '-' && this.value > 1) {
                this.value--;
            }
        },
        async onFileChange(event) {
            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                if (this.selectedFile.type === 'image/heic') {
                    try {
                        const blob = await heic2any({
                            blob: this.selectedFile,
                            toType: 'image/jpeg',
                            quality: 0.8
                        });
                        this.selectedFile = new File([blob], this.selectedFile.name.replace(/\.[^.]+$/, '.jpeg'), { type: 'image/jpeg' });
                        this.resizeAndConvertImage(this.selectedFile);
                    } catch (err) {
                        console.error('Error converting HEIC to JPEG:', err);
                    }
                } else {
                    this.resizeAndConvertImage(this.selectedFile);
                }
            }
        },
        resizeAndConvertImage(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 400;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const newFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpeg'), { type: 'image/jpeg' });
                        this.selectedFile = newFile;
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.imageSelect = e.target.result;
                        };
                        reader.readAsDataURL(this.selectedFile);
                    }, 'image/jpeg', 0.8);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        },
        async buyTicketN() {
            if (this.disable) {
                return;
            }

            if (!this.selectedFile) {
                Swal.fire({
                    text: 'กรุณาอัพโหลดสลิป',
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
                // ตรวจสอบค่า ปรับเป็น int ได้ไหม ถ้าได้ให้ปรับเป็น int ถ้าไม่ได้ให้ return ออก
                if (isNaN(this.value)) {
                    Swal.fire({
                        text: 'กรุณากรอกจำนวนตั๋วเป็นตัวเลข',
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
                    return;
                }

                if (this.selectedFile) {

                    const formData = new FormData();
                    formData.append('value', parseInt(this.value));
                    if (this.selectedFile) {
                        formData.append('slip', this.selectedFile);
                    }

                    const access_token = localStorage.getItem('access_token');
                    const response = await api.post('/premier-league/v1/buy-ticket-own', formData, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    });
                    if (response.data.ok) {
                        this.selectedFile = null,
                            this.imageSelect = null,
                            this.getPaymentPending();
                        this.disable = false;
                        this.loading = false;
                    }
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
            }
        },
        async getPaymentPending() {
            try {
                this.loading = true;
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/charge-own`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                if (response.data.ok) {
                    this.payment = response.data.data;
                    this.loading = false;
                }
            } catch (error) {
                this.payment = null;
                console.log('error', error);
                this.loading = false;

            }
        }
    },
    mounted() {
        this.getPaymentPending();
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

.balancewrapper_2 {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 250px;
    gap: 0px;
}

.balanceHeading {
    font-size: 8px;
    color: rgb(214, 214, 214);
    font-weight: 100;
    letter-spacing: 0.6px;
}

.balanceHeading_2 {
    font-size: 10px;
    color: rgb(250, 250, 250);
    font-weight: 300;
    letter-spacing: 0.6px;
}


.balance {
    font-size: 13.5px;
    color: white;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.balance_2 {
    font-size: 13.5px;
    color: rgb(245, 206, 86);
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


.copyaccount {
    padding: 1px 15px;
    border-radius: 20px;
    background-color: #2340b6;
    color: white;
    border: none;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.copyslip {
    padding: 1px 15px;
    border-radius: 20px;
    background-color: #5623b6;
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
    font-size: 15px;
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
    margin-top: 10px;
}

.qr-code {
    max-width: 240px;
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

/* From Uiverse.io by adamgiebl */
.cssbuttons-io-button {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 500;
    font-size: 12px;
    padding: 0.5em 0.8em 0.5em 0.8em;
    color: white;
    background: #ad5389;
    background: linear-gradient(0deg, rgb(15, 96, 133) 0%, rgb(64, 118, 168) 100%);
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #1482a798;
    letter-spacing: 0.05em;
    border-radius: 20em;
}

.cssbuttons-io-button svg {
    margin-right: 6px;
}

.cssbuttons-io-button:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #1485a798;
}

.cssbuttons-io-button:active {
    box-shadow: 0 0.3em 1em -0.5em #149ba798;
}

.cssbuttons-io-button2 {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 500;
    font-size: 12px;
    padding: 0.5em 0.8em 0.5em 0.8em;
    color: white;
    background: #ad5389;
    background: linear-gradient(0deg, rgb(15, 133, 48) 0%, rgb(64, 168, 72) 100%);
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
    letter-spacing: 0.05em;
    border-radius: 20em;
}

.cssbuttons-io-button2 svg {
    margin-right: 6px;
}

.cssbuttons-io-button2:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #14a73e98;
}

.cssbuttons-io-button2:active {
    box-shadow: 0 0.3em 1em -0.5em #14a73e98;
}





.button-container2 label {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
}
</style>
