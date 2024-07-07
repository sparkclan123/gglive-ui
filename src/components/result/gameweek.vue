<template>
    <div class="mt-2" v-if="datas">
        <div class="notification cursor-pointer" v-for="data in datas" @click="seeDetailGameWeek(data)">
            <div class="notiglow"></div>
            <div class="notiborderglow"></div>
            <div class="notititle">ฤดูกาล {{ data.season.label }} เกมวีค {{ data.week }}</div>
            <div class="notibody">ทีมที่ชนะเงินรางวัล <Numberformat class="text-green-400" :value="data.reward" :decimal="1"/> {{ data.who_win }} </div>
        </div>
        
        <Pagination :page="page" :pages="pages" @page-change="facthGameWeeks" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';
export default {
    name: 'result-game-week',

    data() {
        return {
            datas: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
        };
    },
    components: {

    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        seeDetailGameWeek(data) {
            this.$router.push({
                name: 'result-list-gameweek',
                params: {
                    gameWeekID: data.id
                }
            });
        },
        async facthGameWeeks(page = 1, limit = 10) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get(`/premier-league/v1/game-week-all`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    params: {
                        page: page,
                        limit: limit
                    }
                });
                if (response.data.ok) {
                    this.datas = response.data.data;
                    this.total = response.data.total;
                    this.page = response.data.page;
                    this.limit = response.data.limit;
                    this.pages = response.data.pages;
                    this.updateLoading(false);
                }
            } catch (error) {
                console.log(error);
                this.updateLoading(false);
            }
        },

    },
    computed: {

    },
    created() {
        this.updateLoading(true);
        this.facthGameWeeks()
    }
};
</script>
<style scoped>
.notification {
    display: flex;
    flex-direction: column;
    isolation: isolate;
    position: relative;

    height: 70px;
    border-radius: 1rem;
    overflow: hidden;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
    --gradient: linear-gradient(to bottom, #1b7939, #32b05a, #80faa6);
    --color: #eadbff
}

.notification:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #1e1037;
}

.notification:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
   
    z-index: 4;
}



.notititle {
    color: var(--color);
    padding: 0.65rem 0.25rem 0.4rem 1.25rem;
    font-weight: 500;
    font-size: 1rem;
  
    z-index: 5;
}



.notibody {
    color: #f3f3f3;
    padding: 0 1.25rem;
    font-size: 13px;
    z-index: 5;
}



.notiglow,
.notiborderglow {
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle closest-side at center, white, transparent);
    opacity: 0;
   
}

.notiglow {
    z-index: 3;
}

.notiborderglow {
    z-index: 1;
}

.notification .notiglow {
    opacity: 0.1
}

.notification .notiborderglow {
    opacity: 0.1
}
</style>