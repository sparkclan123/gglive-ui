<template>
    <div class="w-full px-4 mb-8 mx-auto">
        <div class="flex flex-col items-center my-10">
            <div class="flex text-gray-700">
                <div @click="previousPage" class="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer" :class="{ 'cursor-not-allowed': page === 1 }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-4 h-4">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </div>
                <div class="flex h-8 font-medium rounded-full bg-gray-200">
                    <div v-for="pageNumber in pagesToShow" :key="pageNumber" @click="goToPage(pageNumber)" class="w-8 md:flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full" :class="{ 'bg-purple-600 text-white': pageNumber === page }">
                        {{ pageNumber }}
                    </div>
                </div>
                <div @click="nextPage" class="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer" :class="{ 'cursor-not-allowed': page === pages }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right w-4 h-4">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        page: {
            type: Number,
            required: true,
        },
        pages: {
            type: Number,
            required: true,
        },
    },
    computed: {
        pagesToShow() {
            const range = [];
            const displayRange = 5;
            const halfRange = Math.floor(displayRange / 2);
            
            if (this.pages <= displayRange) {
                for (let i = 1; i <= this.pages; i++) {
                    range.push(i);
                }
            } else {
                if (this.page <= halfRange + 1) {
                    for (let i = 1; i <= displayRange; i++) {
                        range.push(i);
                    }
                    range.push('...');
                    range.push(this.pages);
                } else if (this.page >= this.pages - halfRange) {
                    range.push(1);
                    range.push('...');
                    for (let i = this.pages - displayRange + 1; i <= this.pages; i++) {
                        range.push(i);
                    }
                } else {
                    range.push(1);
                    range.push('...');
                    for (let i = this.page - halfRange; i <= this.page + halfRange; i++) {
                        range.push(i);
                    }
                    range.push('...');
                    range.push(this.pages);
                }
            }
            return range;
        },
    },
    methods: {
        previousPage() {
            if (this.page > 1) {
                this.$emit('page-change', this.page - 1);
            }
        },
        nextPage() {
            if (this.page < this.pages) {
                this.$emit('page-change', this.page + 1);
            }
        },
        goToPage(page) {
            if (page !== '...') {
                this.$emit('page-change', page);
            }
        },
    },
};
</script>

<style scoped>
.cursor-not-allowed {
    pointer-events: none;
    opacity: 0.5;
}
.w-8 {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
