<template>
    <div>

        <div class="flex items-center m-2">
            <button @click="toggleModel" class="bg-green-700 text-white px-3 py-1 rounded ml-2 text-xs">สร้าง</button>
            <button @click="toggleModelJoin"
                class="bg-yellow-700 text-white px-3 py-1 rounded ml-2 text-xs">เข้าร่วม</button>
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
                                    ชื่อเเข่งขัน
                                </p>
                            </div>
                        </th>
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                            <p
                                class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                code</p>
                        </th>
                        <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-left">
                            <p
                                class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                รายละเอียด</p>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="match in selfMatchs" :key="match.id">
                        <td class="p-1 border-b border-blue-gray-50 cursor-pointer">
                            <div class="flex items-center gap-3">

                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                    {{ match.name }}
                                </p>
                            </div>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 pl-4 text-center">
                            <p class="block antialiased text-xs leading-normal text-green-800  font-bold">
                                <button @click="copyToClipboard(match.code_generated)"
                                    class="bg-blue-500 text-white px-3 py-1 rounded text-xs">คัดลอก Code</button>
                            </p>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 text-left">
                            <p
                                class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                <button class="bg-yellow-800 text-white px-3 py-1 rounded text-xs">รายละเอียด</button>
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

export default {
    data() {
        return {
            selfMatchs: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
            teamName: '',
            joinCode: ''

        };
    },
    methods: {
        async facthAllSelfMatch(page = 1, limit = 10) {
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/get-self_match`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    this.selfMatchs = response.data.selfMatch;
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.$emit('set-loading', false);
                }
            } catch (error) {
                console.log(error);
                this.$emit('set-loading', false);
            }
        },
        async toggleModelJoin() {
            Swal.fire({
                title: 'เข้าร่วมการเเข่งขัน',
                text: 'กรอกโค้ดการเเข่งขันจากเพื่อนของคุณ',
                input: 'text',
                inputPlaceholder: 'กรอกโค้ดการเเข่งขัน',
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
        async toggleModel() {
            Swal.fire({
                title: 'สร้างการเเข่งขัน',
                text: 'สร้างการเเข่งขันของคุณเเละเพื่อนๆของคุณ',
                input: 'text',
                inputPlaceholder: 'ตั้งชื่อการเเข่งของคุณ',
                showCancelButton: true,
                confirmButtonText: 'สร้าง',
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
                preConfirm: (teamName) => {
                    // ไม่เกิน 15 ตัวอักษร
                    if (teamName.length > 15) {
                        Swal.showValidationMessage('ชื่อการเเข่งขันต้องไม่เกิน 15 ตัวอักษร');
                    }
                    if (!teamName) {
                        Swal.showValidationMessage('กรุณากรอกชื่อการเเข่งขัน');
                    }
                    return teamName;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.teamName = result.value;
                    this.confirmCreateMatch();
                }
            });
        },
        async joinMatch() {
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/join-self_match`,
                    {
                        code: this.joinCode,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    }
                );
                if (response.data.ok) {
                    Swal.fire({
                        icon: 'success',
                        text: 'เข้าร่วมการเเข่งขันเรียบร้อย',
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
                    this.facthAllSelfMatch();
                    this.$emit('set-loading', false);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: error.response.data.error,
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

                this.$emit('set-loading', false);
            }
        },

        async confirmCreateMatch() {
            try {
                this.$emit('set-loading', true);
                const access_token = localStorage.getItem('access_token');
                const response = await api.post(`/premier-league/v1/create-self_match`,
                    {
                        teamName: this.teamName,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        },
                    }
                );
                if (response.data.ok) {
                    this.facthAllSelfMatch();
                    this.$emit('set-loading', false);
                }
            } catch (error) {
                console.log("asdasdas", error.data);
                this.$emit('set-loading', false);
            }
        },
        copyToClipboard(code) {
            navigator.clipboard.writeText(code).then(() => {
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
        this.facthAllSelfMatch();
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
