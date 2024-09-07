<template>
    <div>
        <div class="contant_style">
            <div class="flex justify-center w-full m-1 mt-1">
                <img class="w-8 h-8" src="/public/assets/logonew.png" /> <span
                    class="mt-1 font-semibold text-gray-600">เกมเก็บคะเเนน</span>
            </div>
            <div class="flex flex-wrap justify-center gap-4 mb-4">
                <div class="card relative bg-white rounded-lg overflow-hidden shadow-xl">
                    <!-- Red tag and heart icon -->


                    <!-- ปุ่ม "กติกา" มุมขวาบน -->
                    <button @click="showRule"
                        class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded-bl-lg">
                        คลิกเพื่ออ่านกติกาเเละข้อกำหนด
                    </button>

                    <!-- Image with rounded corners -->
                    <img class="w-full h-48 object-cover rounded-lg"
                        src="https://pudee.sgp1.digitaloceanspaces.com/plinko.webp" alt="Card image">

                    <!-- Button with reduced font weight -->
                    <button @click="playGame('game-00001')"
                        class="absolute inset-x-2 bottom-2 mx-auto block w-auto bg-white bg-opacity-30 text-white py-2 px-2 border border-white border-opacity-20 rounded transition duration-300 ease-in-out backdrop-filter backdrop-blur-sm text-xs font-semibold">
                        เล่นทันที
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: "game",
    methods: {
        showRule() {
            Swal.fire({
                title: '<span style="font-size: 18px;">กติกาเกมเก็บคะเเนน</span>', // ปรับขนาด font ของ title
                html: `
                    <ol style="text-align: left; font-size: 14px; line-height: 1.5;">
                        <li>เกมเก็บคะแนนนี้ไม่มีการเสียค่าใช้จ่ายใด ๆ ทั้งสิ้นและไม่ถือเป็นการพนัน แต่เป็นกิจกรรมเพื่อสะสมคะแนนสำหรับของรางวัลพิเศษ</li>
                        <li>ผู้เล่นจะได้รับสิทธิ์เล่นเกมจากการจัดอันดับที่ 1, 2, 3 ในหมวดการจัดทีมแบบปกติ และ VIP โดยสิทธิ์ในการเล่นจะได้รับ 1 ครั้งต่อ 1 อันดับ</li>
                        <li> เเละสิทธิ์ในการเล่นเพื่อเก็บคะแนน 1 ครั้งจะมอบให้สำหรับการสนับสนุนตั๋วในการเข้าแข่งขัน VIP ต่อ 1 ใบ</li>
                        <li>ในการเล่นเกม 1 ครั้ง ผู้เล่นสามารถลุ้นคะแนนตั้งแต่ 1 คะแนนถึง 30 คะแนน ซึ่งสามารถนำไปแลกรับของรางวัลพรีเมี่ยมต่าง ๆ ได้</li>
                        <li>อัตราการได้รับคะแนนแต่ละระดับ:</li>
                        <ul>
                            <li>1 คะแนน: 30%</li>
                            <li>2 คะแนน: 40%</li>
                            <li>5 คะแนน: 10%</li>
                            <li>8 คะแนน: 8%</li>
                            <li>10 คะแนน: 5%</li>
                            <li>30 คะแนน: 1%</li>
                        </ul>
                    </ol>
                `,
                customClass: {
                    cancelButton: 'btn-cancel',
                    popup: 'popup-custom',
                    title: 'text-custom',
                    htmlContainer: 'text-custom'
                },
            });
        },
        playGame(path) {
            this.$router.push({ name: path });
        }
    }
};
</script>

<style scoped>
.contant_style {
    background-color: white;
    border-radius: 10px;
    padding: 5px;
}
</style>