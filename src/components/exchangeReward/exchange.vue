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
