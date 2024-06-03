<template>
    <div>
        <div class="tabs rounded-t-lg ml-3 text-white  flex">
            <div class="tab-item" :class="{ 'active': activeTab === 'tab1' }" @click="activeTab = 'tab1'">ผลการเเข่ง
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab2' }" @click="activeTab = 'tab2'">เกมวีค VIP
            </div>
            <div class="tab-item" :class="{ 'active': activeTab === 'tab3' }" @click="activeTab = 'tab3'">กติกา</div>
        </div>
        <div class=" rounded-xl shadow-lg  min-h-screen  bg-white">

            <div class="">
                <div v-if="activeTab === 'tab1'">
                    <Result />
                </div>
                <div v-if="activeTab === 'tab2'">
                    <!-- Content for Tab 2 -->
                    Content for Tab 2
                </div>
                <div v-if="activeTab === 'tab3'">
                    <!-- Content for Tab 3 -->
                    Content for Tab 3
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Result from '../../components/result/result.vue';
export default {
    name: 'challenge',

    data() {
        return {
            activeTab: 'tab1'
        };
    },
    components: {
        Result
    },
    methods: {
        

    },
    computed: {

    },
    created() {

    }
};
</script>

<style scoped>
.colot-h {
    color: #1e1037;
}


.tabs {
    display: flex;
    font-size: 0.7rem;
}

.tab-item {
    margin-right: 3px;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #37003c;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

}

.tab-item.active {
    background-color: white;
    color: rgb(0, 0, 0);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.no-top-left-radius {
    border-top-left-radius: 0;
}

.glow-border {
    position: relative;
}

.glow-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, rgba(255, 255, 0, 0.6), rgba(255, 255, 0, 0.3));
    z-index: -1;
    filter: blur(4px);
    opacity: 0.75;
    border-radius: inherit;
}
</style>
