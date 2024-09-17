<template>
    <div>

        <div class="flex items-center m-2">
            <button @click="copyToClipboard"
                class="bg-blue-700 text-white px-3 py-1 rounded ml-1 text-xs">คัดลอกรหัสของคุณ</button>
            <button @click="toggleModelJoin" v-if="userinfo && userinfo.ParentID == 0"
                class="bg-yellow-700 text-white px-3 py-1 rounded ml-1 text-xs">เข้าร่วมพันธมิตร </button>



        </div>
        <div class="flex items-center m-2">
            <span @click="copyToClipboardLink" class="text-xs text-blue-700 font-xs leading-none  ml-2"
                v-if="userinfo">https://pudee-club.com/register?ref={{ userinfo.UserID }}</span>

            <button @click="copyToClipboardLink" class="bg-blue-700 text-white px-3 py-1 rounded ml-1 text-xs">คัดลอก
                URL</button>
        </div>
        <div class="flex items-center m-2">
            <People class="w-6 h-6" />
            <span class="text-xs text-blue-700 font-xs   leading-none  ml-2" v-if="userinfo">หัวหน้าทีมของคุณชื่อ :
                90</span>
        </div>

        <div class="flex items-center m-2">
            <Peoples class="w-6 h-6" />
            <span class="text-xs text-blue-700 font-xs   leading-none  ml-2" v-if="userinfo">ลูกทีมของคุณ :
                90 คน</span>
        </div>

        <div class="flex items-center m-2">
            <Coin class="w-6 h-6" />
            <span class="text-xs text-purple-900 font-xs font-semibold leading-none ml-2" v-if="userinfo">คะแนนสะสม :
                90</span>
            <button @click="toggleModelExchange"
                class="bg-green-700 text-white px-2 py-1 rounded ml-2 text-xs">เเลกรางวัล</button>
        </div>

        <div class="p-1 overflow-scroll px-0">
            <table class="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                            <div class="flex items-center">
                                <img class="w-4 h-4" src="/public/assets/logonew32x32.png" />
                                <p
                                    class="ml-2 block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    การทำรายการของทีมคุณ
                                </p>
                            </div>
                        </th>
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                            <p
                                class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                </p>
                        </th>
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                            <p
                                class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                เเต้ม</p>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="p-1 border-b border-blue-gray-50 cursor-pointer">
                            <div class="flex items-center gap-3">

                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">

                                </p>
                            </div>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 pl-4 text-center">
                            <p class="block antialiased text-xs leading-normal text-green-800  font-bold">

                            </p>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 text-left">
                            <p
                                class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">

                            </p>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="facthAllSelfMatch" />
    </div>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
import { mapGetters, mapActions } from 'vuex';
import Coin from '../icon/CoineIcon.vue';
import People from '../icon/People.vue';
import Peoples from '../icon/Peoples.vue';
export default {
    data() {
        return {
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,

        };
    },
    components: {
        Coin,
        People,
        Peoples
    },
    computed: {
        ...mapGetters('auth', ['userinfo']),
    },
    methods: {
        ...mapActions('auth', ['facthUserInfo']),

        async toggleModelJoin() {
            Swal.fire({
                title: 'เข้าร่วมเป็นพันธมิตร',
                text: 'กรอกโค้ด พันธมิตร จากเพื่อนของคุณ',
                input: 'text',
                inputPlaceholder: 'กรอกโค้ดพันธมิตร',
                showCancelButton: true,
                confirmButtonText: 'เข้าร่วม',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    input: 'swal-input', // Add custom class for input
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
                preConfirm: (joinCode) => {
                    if (!joinCode) {
                        Swal.showValidationMessage('กรุณากรอกโค้ดการเเข่งขัน');
                    }
                    return joinCode;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.joinCode = result.value;
                    this.joinMatch();
                }
            });
        },

        async toggleModelExchange() {
            Swal.fire({
                title: 'กรอกคะเเนนเพื่อเเลกรางวัล',
                text: 'ขั้นต่ำ 100 คะเเนนเมื่อกรอกเสร็จกรุณาติดต่อทีมงาน ผ่าน Line หรือ Facebook Fanpage',
                input: 'text',
                inputPlaceholder: 'กรอกเเต้มที่ต้องการเเลก',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    input: 'swal-input', // Add custom class for input
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                buttonsStyling: false,
                preConfirm: (joinCode) => {
                    if (!joinCode) {
                        Swal.showValidationMessage('กรุณากรอกโค้ดการเเข่งขัน');
                    }
                    return joinCode;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.joinCode = result.value;
                    this.joinMatch();
                }
            });
        },
        copyToClipboardLink() {
            navigator.clipboard.writeText(`https://pudee-club.com/register?ref=${this.userinfo.UserID}`).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'คัดลอก!',
                    text: 'คัดลอกลิ้งค์เรียบร้อย',
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
        copyToClipboard() {
            navigator.clipboard.writeText(this.userinfo.UserID).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'คัดลอก!',
                    text: 'คัดลอกโค้ดเรียบร้อย',
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
        }
    },
    created() {

    }
};
</script>

<style scoped>
/* Custom SweetAlert2 styles */
.swal2-popup {
    font-size: 1.2rem !important;
}

.swal2-input {
    color: white !important;
    /* Change input text color to white */
}

.btn-cancel {
    background-color: #f27474 !important;
    color: white !important;
    border: none !important;
    padding: 10px 20px !important;
    border-radius: 5px !important;
    font-size: 1rem !important;
}

.btn-confirm {
    background-color: #3085d6 !important;
    color: white !important;
    border: none !important;
    padding: 10px 20px !important;
    border-radius: 5px !important;
    font-size: 1rem !important;
}

.popup-custom {
    background: #f7f9fc !important;
    border-radius: 10px !important;
    padding: 20px !important;
}

.text-custom {
    color: #333 !important;
}
</style>
