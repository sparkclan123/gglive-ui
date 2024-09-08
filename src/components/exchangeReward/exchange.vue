<template>
    <div>
        <!-- แสดงคะแนนที่มุมขวาบน -->
        <div class="top-bar m-3">
            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" viewBox="0 0 24 24"
                id="coin">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <g fill="#757575">
                    <path
                        d="M4.086 5C4.562 4.595 6.216 4 8 4s3.438.595 3.914 1H14c0-2.243-4.121-3-6-3s-6 .757-6 3v12c0 2.245 4.121 3 6 3 .287 0 .631-.021 1-.058v-2.009A7.97 7.97 0 0 1 8 18c-1.916 0-3.682-.684-4-1.086v-.693c1.32.555 2.985.779 4 .779.288 0 .631-.021 1-.058v-2.009A7.97 7.97 0 0 1 8 15c-1.937 0-3.709-.697-4-1.098v-.682c1.32.556 2.985.78 4 .78.288 0 .631-.021 1-.058v-2.009A7.97 7.97 0 0 1 8 12c-1.937 0-3.709-.697-4-1.098v-.682c1.32.556 2.985.78 4 .78.288 0 .631-.021 1-.058V8.934C8.675 8.974 8.342 9 8 9c-1.937 0-3.709-.697-4-1.098v-.681C5.32 7.776 6.985 8 8 8c.288 0 .631-.021 1-.058V5.935A8.37 8.37 0 0 1 8 6c-1.784 0-3.438-.593-3.914-1z">
                    </path>
                    <path
                        d="M16 7c-1.879 0-6 .757-6 3v9c0 2.245 4.121 3 6 3s6-.755 6-3v-9c0-2.243-4.121-3-6-3zm4 5.902c-.291.401-2.063 1.098-4 1.098s-3.709-.697-4-1.098v-.682c1.32.556 2.985.78 4 .78s2.68-.224 4-.779v.681zm0 3c-.291.401-2.063 1.098-4 1.098s-3.709-.697-4-1.098v-.682c1.32.556 2.985.78 4 .78s2.68-.224 4-.779v.681zM16 9c1.784 0 3.438.595 3.914 1-.476.407-2.13 1-3.914 1s-3.438-.593-3.914-1c.476-.405 2.13-1 3.914-1zm0 11c-1.916 0-3.682-.684-4-1.086v-.693c1.32.555 2.985.779 4 .779s2.68-.224 4-.779v.693c-.318.402-2.084 1.086-4 1.086z">
                    </path>
                </g>
            </svg>
            <span class="text-gray-700 ">คะแนน: {{ point }}</span>
        </div>

        <!-- ส่วนของรูปและปุ่มแลกคะแนน -->
        <div class="flex flex-wrap justify-center gap-4 m-2 ">
            <div class="flex flex-wrap justify-center gap-4  p-1 bg-gray-100 rounded-lg shadow-lg">
                <span class="text-gray-600 font-semibold text-md text-center">
                    ของรางวัลจะมีการเปลี่ยนเเปลงในอนาคต
                </span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(item, index) in items" :key="index"
                    class="card relative bg-white rounded-lg overflow-hidden shadow-xl">
                    <!-- ปุ่ม "กติกา" มุมขวาบน -->
                    <button class="absolute top-0 right-0 bg-purple-900 text-white text-xs py-1 px-2 rounded-bl-lg">
                        {{ item.detail }}
                    </button>

                    <!-- Image with rounded corners -->
                    <img class="w-full h-48 object-cover rounded-lg" :src="item.image" alt="Card image">

                    <!-- ปุ่มแลกคะแนน -->
                    <button @click="exchange(item.truepoint)"
                        class="absolute inset-x-2 bottom-2 mx-auto block w-auto bg-white bg-opacity-30 text-green-900 py-2 px-2 border border-white border-opacity-20 rounded transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs font-semibold">
                        แลก {{ item.points }} คะแนน
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '@axios_inst';
import Swal from 'sweetalert2';
export default {
    name: "exchange",
    data() {
        return {
            detail: '',
            point: 0,
            items: [
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange1.png', points: '4,600', truepoint: 4600, detail: 'เกรด Player เลือกทีมได้' },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange2.png', points: '2,900', truepoint: 2900, detail: 'เกรด Replica เลือกทีมได้' },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange3.png', points: '1,600', truepoint: 1600, detail: 'เป๋าสะพาย Man utd' },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange4.png', points: '1,090', truepoint: 1090, detail: 'เกรดแฟนบอล เลือกทีมได้' },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange5.png', points: '1,000', truepoint: 1000, detail: 'หมวก Man utd' },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange6.png', points: '750', truepoint: 750, detail: 'หมวก Man city' },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange7.png', points: '590', truepoint: 590, detail: 'ผ้าพันคอ Liverpool' },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/exchange8.png', points: '250', truepoint: 250, detail: 'แก้วน้ำ Liverpool' },
            ]
        };
    },
    methods: {
        async exchange(truepoint) {

            const { value: formValues } = await Swal.fire({
                title: '<h2 style="font-size: 14px;">กรอกรายละเอียดการจัดส่ง</h2>',
                html:
                    `<style>
            .custom-input, .custom-textarea {
                font-size: 12px;
                padding: 10px;
                width: 100%;
                box-sizing: border-box;
            }
            .swal2-textarea {
                resize: none;
                height: 80px;
            }
        </style>
        <input id="swal-input1" class="swal2-input custom-input" placeholder="ชื่อ">
        <textarea id="swal-input2" class="swal2-textarea custom-textarea" placeholder="บ้านเลขที่-ที่อยู่-ตำบล-อำเภอ-จังหวัด"></textarea>
        <input id="swal-input4" class="swal2-input custom-input" placeholder="รหัสไปรษณีย์">
        <input id="swal-input5" class="swal2-input custom-input" placeholder="เบอร์โทร">`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'แลกของรางวัล',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    confirmButton: 'btn-confirm',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
                preConfirm: () => {
                    const name = document.getElementById('swal-input1').value;
                    const address = document.getElementById('swal-input2').value;
                    const postalCode = document.getElementById('swal-input4').value;
                    const phone = document.getElementById('swal-input5').value;

                    if (!name || !address || !postalCode || !phone) {
                        Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบทุกช่อง');
                        return;
                    }

                    return {
                        name,
                        address,
                        postalCode,
                        phone
                    };
                }
            });

            if (!formValues) {
                // ถ้าผู้ใช้ยกเลิกหรือไม่ได้กรอกข้อมูล
                return;
            }

            // ตรวจสอบว่า formValues ไม่ใช่ undefined และมีข้อมูลทั้งหมด
            const { name, address, houseNumber, postalCode, phone } = formValues;

            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.post('/premier-league/v1/exchange', {
                    point: truepoint,
                    detail: name + ' ' + address + ' ' + houseNumber + ' ' + postalCode + ' ' + phone
                }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                if (response.data.ok) {
                    this.getPoint();
                    Swal.fire({
                        title: '<h2 style="font-size: 14px;">แลกคะแนนสำเร็จ</h2> ',
                        text: 'คุณได้ทำการแลกของรางวัลสำเร็จ',

                        customClass: {
                            confirmButton: 'btn-confirm',
                            popup: 'popup-custom',
                            title: 'text-custom',
                            htmlContainer: 'text-custom'
                        },
                    });
                }
            } catch (error) {
                Swal.fire({
                    text: error.response.data.error,
                    customClass: {
                        confirmButton: 'btn-confirm',
                        popup: 'popup-custom',
                        title: 'text-custom',
                        htmlContainer: 'text-custom'
                    },

                });
            }
        },
        async getPoint() {
            try {

                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/get-point', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                });
                if (response.data.ok) {
                    this.point = response.data.point;
                }
            } catch (error) {
                console.error("Error fetching point:", error);
            }
        },

    },
    created() {
        this.getPoint();
    }
};
</script>

<style scoped>
/* ขนาดของคะแนนที่มุมขวาบน */
.fixed {
    position: fixed;
}

.card {
    width: 100%;
}

/* ปรับการแสดงผลในจอใหญ่และเล็ก */
@media (min-width: 768px) {
    .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 768px) {
    .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
    }
}

.top-bar {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: 600;
}
</style>
