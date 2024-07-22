<template>
    <div class="flex flex-col items-center">
        <div class="flex justify-center w-full m-1">
            <img class="w-8 h-8" src="/public/assets/logonew.png" />
        </div>
        <div class="mt-2 w-full" v-if="data.datas">
            <div class="notification cursor-pointer mb-2" v-for="data in data.datas" @click="seeDetailGameWeek(data)">
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">ฤดูกาล {{ data.season.label }} เกมวีค {{ data.week }}</div>
            </div>
            <Pagination :page="data.page" :pages="data.pages" @page-change="fetchGameWeeks" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        fetchGameWeeks: {
            type: Function,
            required: true
        }
    },
    methods: {
        seeDetailGameWeek(data) {
            this.$router.push({
                name: 'result-list-gameweek-n',
                params: {
                    gameWeekID: data.id
                }
            });
        }
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
    --gradient: linear-gradient(to bottom, #cdf4d9, #78e79b, #6fcf8d);
    --color: #f3f3f3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add this line for shadow */
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
