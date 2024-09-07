<template>
    <div>
        <!-- แสดงคะแนนที่มุมขวาบน -->
        <div class="top-bar m-3">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"
                id="coin">
                <defs>
                    <linearGradient id="a">
                        <stop offset="0" stop-color="#000092" stop-opacity="1"></stop>
                        <stop offset="1" stop-color="#ff00f3" stop-opacity="1"></stop>
                    </linearGradient>
                    <linearGradient xlink:href="#a" id="b" x1="4" x2="28" y1="15.5" y2="15.5"
                        gradientUnits="userSpaceOnUse"></linearGradient>
                </defs>
                <path
                    d="M18 3c-1.1 0-2 .9-2 2 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2 0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 28 23c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 28 20c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 28 17c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 28 14c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 28 11c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 28 8c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 28 5c0-1.1-.9-2-2-2h-8zm-2 23c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 16 23c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 16 20c0-.598-.273-1.133-.693-1.5A1.99 1.99 0 0 0 16 17c0-1.1-.9-2-2-2h-.693A5.996 5.996 0 0 0 16 10c0-3.308-2.692-6-6-6s-6 2.692-6 6a5.996 5.996 0 0 0 2.693 5H6c-1.1 0-2 .9-2 2 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 .599.272 1.133.693 1.5-.42.367-.693.902-.693 1.5 0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2zm2-22h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1zm-8 1c2.767 0 5 2.233 5 5s-2.233 5-5 5-5-2.233-5-5 2.233-5 5-5zM7.578 6.26l1.258 2.48h-1.25v1h1.758l.135.268v.732H7.586v1h1.893v2h1v-2h1.937v-1h-1.937v-.648l.177-.352h1.76v-1h-1.252l1.258-2.48h-1.137L10.03 8.74h-.054L8.717 6.26H7.578zM18 7h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1zm0 3h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1zm0 3h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1zM6 16h8c.563 0 1 .437 1 1s-.437 1-1 1H6c-.563 0-1-.437-1-1s.437-1 1-1zm12 0h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1zM6 19h8c.563 0 1 .437 1 1s-.437 1-1 1H6c-.563 0-1-.437-1-1s.437-1 1-1zm12 0h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1zM6 22h8c.563 0 1 .437 1 1s-.437 1-1 1H6c-.563 0-1-.437-1-1s.437-1 1-1zm12 0h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1zM6 25h8c.563 0 1 .437 1 1s-.437 1-1 1H6c-.563 0-1-.437-1-1s.437-1 1-1zm12 0h8c.563 0 1 .437 1 1s-.437 1-1 1h-8c-.563 0-1-.437-1-1s.437-1 1-1z"
                    style="fill:url(#b)"></path>
            </svg>
            <span class="text-gray-700 ">คะแนน: {{ point }}</span>
        </div>

        <!-- ส่วนของรูปและปุ่มแลกคะแนน -->
        <div class="flex flex-wrap justify-center gap-4 m-2 ">
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(item, index) in items" :key="index"
                    class="card relative bg-white rounded-lg overflow-hidden shadow-xl">
                    <!-- ปุ่ม "กติกา" มุมขวาบน -->
                    <button
                        class="absolute top-0 right-0 bg-green-800 text-white text-xs font-semibold py-1 px-2 rounded-bl-lg">
                        super-sport
                    </button>

                    <!-- Image with rounded corners -->
                    <img class="w-full h-48 object-cover rounded-lg" :src="item.image" alt="Card image">

                    <!-- ปุ่มแลกคะแนน -->
                    <button
                        class="absolute inset-x-2 bottom-2 mx-auto block w-auto bg-white bg-opacity-30 text-white py-2 px-2 border border-white border-opacity-20 rounded transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs font-semibold">
                        แลก {{ item.points }} คะแนน
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '@axios_inst';
export default {
    name: "exchange",
    data() {
        return {
            point: 0,
            items: [
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/plinko.webp', points: 10 },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/plinko.webp', points: 20 },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/plinko.webp', points: 30 },
                { image: 'https://pudee.sgp1.digitaloceanspaces.com/plinko.webp', points: 40 },
            ]
        };
    },
    methods: {
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
