<template>
    <!-- Content for Tab 1 -->
    <div class="flex justify-center">

        <img :src="webpSrc" alt="Big Match Coming Soon" class="video-banner2" />


    </div>
</template>

<script>
export default {
    name: 'BigMatch',
    data() {
        return {
            webpSrc: `https://pudee.sgp1.digitaloceanspaces.com/bigmatchcomingsoon.webp`
        };
    },
    methods: {
        resetWebP() {
            this.webpSrc = "";
            this.$nextTick(() => {
                this.webpSrc = `https://pudee.sgp1.digitaloceanspaces.com/bigmatchcomingsoon.webp?${new Date().getTime()}`;
            });
        },
    },
    mounted() {
        this.resetWebP();
    },
};
</script>

<style scoped>
.video-banner2 {

    border-radius: 5px;
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
    /* เพื่อให้ครอบคลุมทั้งพื้นที่ */
}

.bg-color-h {
    background-color: #1e293b;
    position: relative;
    border-radius: 15px;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.15);
    background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    transition: background 1s ease;
}

.text-gray-100 {
    color: #f3f4f6;
}

h2 {
    font-family: "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
    letter-spacing: 0.75px;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.6;
    /* เพิ่ม line-height เพื่อให้ข้อความดูเป็นระเบียบ */
    word-break: break-word;
    /* ตัดคำหากยาวเกินไป */
}

.shadow-lg {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.shadow-inner {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
