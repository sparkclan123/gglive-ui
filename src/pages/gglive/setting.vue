<template>
    <div>
        <div class=" mx-auto flex gap-4">
            <div class="w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                <div>
                    <h1
                        class="lg:text-xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                        ข้อมูลส่วนตัว
                    </h1>
                    <form @submit.prevent="updateProfile">
                        <div>
                            <div class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                                :style="{ backgroundImage: `url(${profile.image_url})` }">
                                <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                                    <input type="file" name="profile" id="upload_profile" hidden @change="onFileChange">
                                    <label for="upload_profile">
                                        <svg data-slot="icon" class="w-6 h-5 text-blue-700" fill="none"
                                            stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                            </path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 justify-center w-full">
                            <div class="w-full mb-4 mt-6">
                                <label for="name" class="mb-2 dark:text-gray-300">ชื่อ</label>
                                <input v-model="profile.name" type="text"
                                    class="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="ชื่อ" id="name">
                            </div>
                            <div class="w-full mb-4 mt-6">
                                <label for="phone" class="dark:text-gray-300">เบอร์โทร<span
                                        class="text-red-500">*</span></label>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    สำคัญใช้ในการติดต่อกรณีได้รับเงินรางวัล</div>
                                <input v-model="profile.phone" type="text"
                                    class="mt-2 p-2 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="080xxxxxxx" id="phone">
                            </div>
                        </div>
                        <div class="w-full rounded-lg bg-green-500 mt-2 text-white text-lg font-semibold">
                            <button type="submit" class="w-full p-4">บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
import heic2any from 'heic2any';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            profile: {
                name: '',
                phone: '',
                image_url: ''
            },
            selectedFile: null
        };
    },
    computed: {
        ...mapGetters('auth', ['userinfo']),
    },
    methods: {
        ...mapActions('auth', ['facthUserInfo']),
        async onFileChange(event) {
            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                if (this.selectedFile.type === 'image/heic') {
                    try {
                        const blob = await heic2any({
                            blob: this.selectedFile,
                            toType: 'image/jpeg',
                            quality: 0.7
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
                    const maxWidth = 300;
                    const maxHeight = 300;
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
                            this.profile.image_url = e.target.result;
                        };
                        reader.readAsDataURL(this.selectedFile);
                    }, 'image/jpeg', 0.8);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        },
        async updateProfile() {

            const result = await Swal.fire({
                title: 'กรุณาอ่าน!',
                text: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน',
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
                return;
            }

            try {
                const access_token = localStorage.getItem('access_token');
                if (this.selectedFile) {
                    const formData = new FormData();
                    formData.append('profile', this.selectedFile);

                    const uploadResponse = await api.post('/premier-league/v1/upload-profile', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${access_token}`
                        }
                    });
                    if (uploadResponse.data.ok) {
                        this.profile.image_url = uploadResponse.data.image_url;
                    } else {
                        Swal.fire({
                            text: 'Error uploading profile image',
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
                        console.error('Error uploading profile image:', uploadResponse.data.error);
                        // alert('Error uploading profile image', uploadResponse.data.error);
                        return;
                    }
                }

                const updateData = {
                    name: this.profile.name,
                    phone: this.profile.phone,
                };

                if (this.selectedFile) {
                    updateData.image_url = this.profile.image_url;
                }

                await api.post('/premier-league/v1/user-update', updateData, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                Swal.fire({
                    text: 'อัพเดทข้อมูลสำเร็จ',
                    showCancelButton: true,
                    cancelButtonText: 'ยืนยัน',
                    showConfirmButton: false,
                    customClass: {
                        cancelButton: 'btn-cancel',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },
                    buttonsStyling: false,
                });
                // alert('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
                Swal.fire({
                    text: 'Error updating profile',
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
            }
        }
    },
    watch: {
        userinfo: {
            handler: function (val) {
                if (val) {
                    this.profile = {
                        name: val.Name,
                        phone: val.Phone,
                        image_url: val.ImageURL
                    };
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.facthUserInfo();
    }
};
</script>
