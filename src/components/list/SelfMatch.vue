<template>
    <div>

        <div class="flex items-center m-2">
            <button @click="toggleModel" class="bg-green-700 text-white px-3 py-1 rounded ml-1 text-xs">สร้าง</button>
            <button @click="toggleModelJoin"
                class="bg-yellow-700 text-white px-3 py-1 rounded ml-1 text-xs">เข้าร่วม</button>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" id="info" class="ml-2" width="24" height="24"
                @click="showinformation">
                <g>
                    <circle cx="260" cy="260" r="230" fill="#f04d3d"></circle>
                    <path fill="#b43a2e"
                        d="M353.89257,164.16667,160.16991,349.62733,297.45829,486.91572A230.12211,230.12211,0,0,0,486.95608,297.23017Z">
                    </path>
                    <circle cx="260" cy="260" r="134.167" fill="#fff"></circle>
                    <path fill="#d4dde0"
                        d="M145,260A134.0751,134.0751,0,0,1,269.58333,126.31706c-3.17787-.22519-6.34814-.48373-9.58333-.48373a134.16667,134.16667,0,0,0,0,268.33334c3.23519,0,6.40546-.25854,9.58333-.48373A134.0751,134.0751,0,0,1,145,260Z">
                    </path>
                    <rect width="38.333" height="115" x="240.833" y="231.25" fill="#fbae04" rx="19.167" ry="19.167">
                    </rect>
                    <path fill="#fe9c0f"
                        d="M250.41667,327.08333V250.41667a19.12154,19.12154,0,0,1,14.375-18.48875,18.93344,18.93344,0,0,0-23.95834,18.48875v76.66666a18.93344,18.93344,0,0,0,23.95834,18.48875A19.12154,19.12154,0,0,1,250.41667,327.08333Z">
                    </path>
                    <circle cx="260" cy="183.333" r="19.167" fill="#fbae04"></circle>
                    <path fill="#fe9c0f"
                        d="M250.41667,183.33333a19.12153,19.12153,0,0,1,14.375-18.48874,19.16854,19.16854,0,1,0,0,36.97749A19.12154,19.12154,0,0,1,250.41667,183.33333Z">
                    </path>
                </g>
            </svg>
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
                                    name tournament
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
                                Detail</p>
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
                                    class="bg-blue-500 text-white px-3 py-1 rounded text-xs">Copy Code</button>
                            </p>
                        </td>
                        <td class="p-1 border-b border-blue-gray-50 text-left">
                            <p
                                class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                <button @click="seeMatchDetail(match.id, match.game_week_id)"
                                    class="bg-yellow-800 text-white px-3 py-1 rounded text-xs">Detail</button>
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
        showinformation() {
            Swal.fire({
                icon: 'info',
                html: `
    <div class="text-custom" style="text-align: left;">
  <p> - Self-managed competitions can only create up to 3 competitions per active game.</p>
  <p> - You can create your own competition or join competitions hosted by your friends.</p>
  <p> - We are not involved in the management of your competition, except for scoring decisions based on the system.</p>
</div>

  `,
                showConfirmButton: true,
                confirmButtonText: 'Got it',
                customClass: {
                    cancelButton: 'btn-cancel',
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
            });
        },
        async seeMatchDetail(id, gameWeekID) {
            console.log(id);
            this.$router.push({
                name: 'self-match-detail',
                params: {
                    id: id,
                    gameWeekID: gameWeekID
                }
            });
        },
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
                title: 'Join the competition.',
                text: 'Enter the competition code from your friend.',
                input: 'text',
                inputPlaceholder: 'Enter the competition code.',
                showCancelButton: true,
                confirmButtonText: 'Enter',
                cancelButtonText: 'cancel',
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
                        Swal.showValidationMessage('Enter the competition code.');
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
                title: 'Create Competition',
                text: 'Create your own competition and invite your friends to join.',
                input: 'text',
                inputPlaceholder: 'Set a name for your competition.',
                showCancelButton: true,
                confirmButtonText: 'create',
                cancelButtonText: 'cancel',
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
                    if (teamName.length > 20) {
                        Swal.showValidationMessage('The competition name must not exceed 20 characters.');
                    }
                    if (!teamName) {
                        Swal.showValidationMessage('Please enter a competition name.');
                    }
                    return teamName;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.teamName = result.value;
                    this.confirmCreateMatch();
                }
            }).catch((error) => {
                console.log(error);
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
                        text: 'Successfully joined the competition.',
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
                this.$emit('set-loading', false);
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
            }
        },
        copyToClipboard(code) {
            navigator.clipboard.writeText(code).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Copy!',
                    text: 'Copy to clipboard.',
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
