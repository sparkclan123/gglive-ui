<template>
    <div>
        <div v-show="loading">
            <LodingSceen style="display: flex; justify-content: space-around;" />
        </div>
        <div class="contant_style">
            <div class="walletBalanceCard">
                <div class="svgwrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="credit-card">
                        <linearGradient id="a" x1="68.899" x2="477.019" y1="501.901" y2="93.781"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#fcc60e"></stop>
                            <stop offset="1" stop-color="#e92e29"></stop>
                        </linearGradient>
                        <path fill="url(#a)"
                            d="M106.297 354.81H67.638c-9.61 0-17.429 7.818-17.429 17.429v10.373c0 9.61 7.818 17.429 17.429 17.429h38.659c9.61 0 17.429-7.818 17.429-17.429v-10.373c0-9.611-7.819-17.429-17.429-17.429zm1.429 27.801c0 .774-.654 1.429-1.429 1.429H67.638a1.448 1.448 0 0 1-1.429-1.429v-10.373c0-.774.654-1.429 1.429-1.429h38.659c.774 0 1.429.654 1.429 1.429v10.373zm87.911-27.801h-38.658c-9.61 0-17.43 7.818-17.43 17.429v10.373c0 9.61 7.819 17.429 17.43 17.429h38.658c9.61 0 17.43-7.818 17.43-17.429v-10.373c-.001-9.611-7.82-17.429-17.43-17.429zm1.429 27.801c0 .774-.654 1.429-1.43 1.429h-38.658c-.775 0-1.43-.654-1.43-1.429v-10.373c0-.774.654-1.429 1.43-1.429h38.658c.775 0 1.43.654 1.43 1.429v10.373zm-78.764-151.795H64.59c-7.93 0-14.381 6.451-14.381 14.381v38.29c0 7.93 6.451 14.382 14.381 14.382h53.712c7.93 0 14.381-6.452 14.381-14.382v-38.29c0-7.929-6.452-14.381-14.381-14.381zm-1.619 51.053H66.209v-35.053h50.474v35.053zm120.457-59.603a8 8 0 0 1 8-8h138.607a8 8 0 0 1 0 16H245.14a8 8 0 0 1-8-8zm154.607 28.125a8 8 0 0 1-8 8h-77.993a8 8 0 0 1 0-16h77.993a8 8 0 0 1 8 8zm43.848 39.2v-7.171l62.891-36.31c12.921-7.46 17.363-24.041 9.903-36.962L395.44 13.516C391.837 7.273 386 2.804 379.004.93c-6.992-1.872-14.284-.923-20.526 2.682L72.264 168.856H27.059C12.139 168.856 0 180.995 0 195.915v225.897c0 14.92 12.139 27.059 27.059 27.059h268.197C314.104 486.278 352.872 512 397.54 512 460.653 512 512 460.653 512 397.54c0-49.778-31.943-92.228-76.405-107.949zm54.89-57.336-54.891 31.691v-68.031c0-14.92-12.138-27.059-27.058-27.059H285.695L421.413 90.5l73.121 126.648c3.047 5.281 1.232 12.058-4.049 15.107zm-289.652-63.399L400.197 53.754l13.216 22.891-159.716 92.212h-52.864zM366.478 17.467c2.54-1.466 5.521-1.851 8.386-1.082 2.867.768 5.254 2.59 6.721 5.13l10.614 18.383-223.364 128.958h-64.573L366.478 17.467zM27.059 432.871c-6.098 0-11.059-4.961-11.059-11.059V195.915c0-6.098 4.961-11.059 11.059-11.059h381.479c6.098 0 11.058 4.961 11.058 11.059v89.305a114.594 114.594 0 0 0-22.055-2.141c-48.417 0-89.906 30.219-106.605 72.785a17.453 17.453 0 0 0-5.958-1.054H246.32c-9.61 0-17.429 7.818-17.429 17.429v10.373c0 9.61 7.818 17.429 17.429 17.429h36.792a113.902 113.902 0 0 0 5.556 32.831H27.059zm219.26-48.831a1.448 1.448 0 0 1-1.429-1.429v-10.373c0-.774.654-1.429 1.429-1.429h38.658c.449 0 .85.242 1.117.588a113.97 113.97 0 0 0-2.216 12.642h-37.559zM397.54 496c-54.292 0-98.461-44.169-98.461-98.46 0-54.292 44.169-98.461 98.461-98.461 54.291 0 98.46 44.169 98.46 98.461 0 54.291-44.169 98.46-98.46 98.46zm33.699-86.257h-.011c-7.514.003-14.577 2.932-19.889 8.246-5.311 5.315-8.234 12.38-8.231 19.895.003 7.514 2.932 14.577 8.246 19.888 5.313 5.31 12.373 8.232 19.883 8.232h.011c7.514-.003 14.577-2.931 19.889-8.245 5.312-5.315 8.235-12.38 8.232-19.895s-2.932-14.578-8.246-19.889c-5.312-5.309-12.374-8.232-19.884-8.232zm.003 40.261h-.004a12.052 12.052 0 0 1-8.574-3.55c-2.292-2.29-3.555-5.336-3.556-8.576s1.26-6.287 3.55-8.579 5.336-3.555 8.576-3.556h.004c3.239 0 6.284 1.261 8.575 3.55a12.05 12.05 0 0 1 3.556 8.577c.002 6.689-5.437 12.132-12.127 12.134zm-67.39-64.668c7.514-.003 14.577-2.931 19.888-8.245 5.312-5.315 8.235-12.38 8.232-19.895-.003-7.514-2.932-14.577-8.246-19.889-5.313-5.309-12.374-8.231-19.884-8.231h-.011c-7.514.002-14.577 2.931-19.888 8.245-5.312 5.315-8.235 12.38-8.232 19.895.003 7.514 2.932 14.577 8.246 19.889 5.313 5.309 12.374 8.231 19.884 8.231h.011zm-12.141-28.126a12.054 12.054 0 0 1 3.55-8.579 12.05 12.05 0 0 1 8.575-3.555h.005c3.239 0 6.284 1.261 8.575 3.55 2.292 2.29 3.555 5.336 3.556 8.576s-1.26 6.287-3.55 8.578a12.05 12.05 0 0 1-8.576 3.556h-.004a12.053 12.053 0 0 1-8.575-3.55 12.05 12.05 0 0 1-3.556-8.576zm90.661-7.909-75.443 105.073a7.992 7.992 0 0 1-6.505 3.335 7.961 7.961 0 0 1-4.659-1.503 8 8 0 0 1-1.832-11.164l75.443-105.073a7.996 7.996 0 0 1 11.164-1.832 8 8 0 0 1 1.832 11.164z">
                        </path>
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

            <div class="qr-code-container">
                <h2 class="mb-2 text-gray-800 font-semibold">กรุณาโอนเงินตามจำนวน
                    <Numberformat :value="sumValue" :decimal="2" />
                </h2>
                <div class="mb-2 text-gray-800 font-semibold">
                    <div class="flex justify-between">
                        <img src="/public/assets/kbank.jpg"
                            class="w-5 h-5 object-cover drop-shadow-xl rounded-full mr-2" alt="slip image" >
                        <button class="copyaccount mr-2" @click="copyaccount"><span class="plussign ">คัดลอก เลข บช</span></button>
                    </div>
                </div>

                <img :src="payurl" alt="QR Code" class="qr-code drop-shadow-xl ">
                <!-- <button @click="downloadQRCode" class="download-button">บันทึกรูป</button> -->
            </div>

            <div class="flex items-center space-x-4 m-2">
                <div class="w-16 h-16 bg-blue-300/20 overflow-hidden flex-shrink-0">
                    <img :src="imageSelect ? imageSelect : 'default-image.jpg'"
                        class="w-full h-full object-cover drop-shadow-xl" alt="slip image">
                </div>
                <div class="button-container2">
                    <input type="file" name="slip" id="upload_slip" hidden @change="onFileChange">
                    <label for="upload_slip" class="flex items-center justify-center cursor-pointer">
                        <div class="cssbuttons-io-button flex items-center">

                            <span>อัฟโหลด สลิป</span>
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



            <div class="walletBalanceCard mb-2 mt-2" v-if="payment">
                <div class="svgwrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="97" height="96" fill="none" viewBox="0 0 97 96"
                        id="clock-fast-forward">
                        <path fill="url(#paint0_linear_1124_1436)" fill-rule="evenodd"
                            d="M12.5 48C12.5 28.3939 28.3939 12.5 48 12.5C67.6061 12.5 83.5 28.3939 83.5 48C83.5 49.3807 84.6193 50.5 86 50.5C87.3807 50.5 88.5 49.3807 88.5 48C88.5 25.6325 70.3675 7.5 48 7.5C25.6325 7.5 7.5 25.6325 7.5 48C7.5 70.3675 25.6325 88.5 48 88.5C48.8492 88.5 49.6925 88.4738 50.5291 88.4222C62.8829 87.6608 73.7381 81.3597 80.6394 71.9818C81.4577 70.8697 81.2197 69.3048 80.1076 68.4865C78.9956 67.6681 77.4307 67.9062 76.6123 69.0182C70.5164 77.3017 60.919 82.8365 50.0065 83.4443C49.3425 83.4813 48.6736 83.5 48 83.5C28.3939 83.5 12.5 67.6061 12.5 48ZM48.8152 29.2227C48.8152 27.8419 47.6959 26.7227 46.3152 26.7227C44.9345 26.7227 43.8152 27.8419 43.8152 29.2227V46.5287C43.8152 49.1557 44.7999 51.6873 46.5751 53.6238L56.9499 64.9418C57.8829 65.9596 59.4643 66.0284 60.4821 65.0954C61.4999 64.1624 61.5687 62.581 60.6357 61.5632L50.2608 50.2452C49.331 49.2308 48.8152 47.9047 48.8152 46.5287V29.2227ZM76.2322 50.2322C75.2559 51.2085 75.2559 52.7915 76.2322 53.7678L80.6967 58.2322C83.6256 61.1612 88.3744 61.1612 91.3033 58.2322L95.7678 53.7678C96.7441 52.7914 96.7441 51.2085 95.7678 50.2322C94.7915 49.2559 93.2085 49.2559 92.2322 50.2322L87.7678 54.6967C86.7915 55.673 85.2085 55.673 84.2322 54.6967L79.7678 50.2322C78.7915 49.2559 77.2085 49.2559 76.2322 50.2322Z"
                            clip-rule="evenodd"></path>
                        <defs>
                            <linearGradient id="paint0_linear_1124_1436" x1="52" x2="52" y1="7.5" y2="88.5"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FF1F00"></stop>
                                <stop offset="1" stop-color="#FF8A00"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div class="balancewrapper_2">
                    <span class="balanceHeading_2" v-if="payment.payment_method === 'promptpay'">ตั๋ว {{ payment?.value
                        }}ใบ {{ payment?.amount / 100 }}฿</span>
                    <span class="balanceHeading_2" v-if="payment.payment_method === 'own_pay'">ตั๋ว {{ payment?.value
                        }}ใบ {{ payment?.amount }}฿</span>
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

export default {
    data() {
        return {
            payurl: "https://image-lobby.sgp1.digitaloceanspaces.com/IMG_7776.JPG",
            loading: false,
            value: 1,
            qrCode: null, // เพิ่มตัวแปรนี้เพื่อเก็บ base64 QR code
            disable: false,
            payment: null,
            selectedFile: null,
            imageSelect: null,
        };
    },
    computed: {
        sumValue() {
            return this.value * 100.00;
        }
    },
    methods: {
        downloadQRCode() {
            const link = document.createElement('a');
            link.href = this.payurl;
            link.download = 'QRCode.jpg';
            link.click();
        },
        copyaccount(){
            navigator.clipboard.writeText('1903512276').then(() => {
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
