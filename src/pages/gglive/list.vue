<template>
    <div v-if="userinfo">
        <div class="card">
            <div class="card__info">
                <div class="card__logo">

                    <span class="left">

                        รายการ ทีมของคุณ
                    </span>
                    <span class="right">คะเเนนสะสม</span>
                </div>
                <div class="card__type mt-1 text-green-500">2345</div>
                <div class="card__number">

                </div>
                <div class="card__valid-thru" aria-label="Valid thru"></div>
                <div class="card__exp-date"><time datetime="2038-01"></time></div>

                <div class="logo-container mt-4">
                    <img :src="userinfo.ImageURL ? userinfo.ImageURL : '/public/assets/logo.webp'" alt="Logo"
                        class="logo rounded-full shadow-lg">

                </div>
                <div class="card__name mt-4 ml-1" aria-label="Dee Stroyer">{{ truncatedUsername }}</div>

                <button
                    class="card__vendor bg-green-500 hover:bg-green-700 text-gray-700 font-bold py-1 px-2 rounded text-xs ">
                    เเลกคะเเนน
                </button>

            </div>
        </div>
        <!-- component -->
        <div class="cus-bg-card text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer"
            v-for="data in datas" @click="seeDetailAndEdit(data)">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="rounded-full w-5 h-5  ">
                        <img class="w-5 h-5 rounded-full" src="/public/assets/favicon-32x32.png" />
                    </div>
                    <div class="text-sm ">ฤดูการ {{ data.season }} เกมวีค {{ data.week }}
                        <DateFormatted :dateString="data.created_at" />
                    </div>
                </div>
                <div class="flex items-center space-x-4" v-if="data.is_vip">
                    <div class="text-orange-600 font-bold cursor-pointer">
                        VIP
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="mt-4 text-gray-800  text-xs space-x-4">
                    ชื่อทีม: {{ data.name }}
                </div>
                <div class="mt-4 text-gray-800 font-bold  text-sm space-x-4">
                    คะเเนนรวม: <span class="text-green-800"> {{ data.total_point }} </span>
                </div>
            </div>
        </div>
        <Pagination :page="page" :pages="pages" @page-change="fetchDataMyGameWeek" />
    </div>
</template>

<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            datas: [],
            total: 0,
            page: 1,
            limit: 10,
            pages: 1,
        };
    },
    computed: {
        ...mapGetters('auth', ['userinfo']),
        truncatedUsername() {
            return this.userinfo.Email.length > 20
                ? this.userinfo.Email.substring(0, 20) + '..'
                : this.userinfo.Email;
        },
    },
    methods: {
        ...mapActions('loading', ['updateLoading']),
        async fetchDataMyGameWeek(page = 1, limit = 10) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/game-week-player-user', {
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
        seeDetailAndEdit(data) {
            if (!data) {
                return;
            }
            let id = data.id;
            this.$router.push({ name: 'pitch-detail', params: { id } });
        },
    },
    created() {
        this.updateLoading(true);
        this.fetchDataMyGameWeek();
    },

};
</script>

<style scoped>
.cus-bg-card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.cus-bg-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card,
.card__chip {
    overflow: hidden;
    position: relative;
}

.card,
.card__chip-texture,


.card {
    background-image: linear-gradient(to bottom, #8141b157, #b077db57);
    border-radius: 0.5em;
    box-shadow: 0 0 0 hsl(0, 0%, 80%),
        0 0 0 hsl(0, 0%, 100%),
        -0.2rem 0 0.75rem 0 hsla(0, 0%, 0%, 0.3);
    color: hsl(0, 0%, 100%);
    /* width: 10.3em; */
    height: 6.8em;

}

.card__info,
.card__chip-texture,


.card__chip-texture,

.card__info {
    font: 0.75em/1 "DM Sans", sans-serif;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.75rem;
    inset: 0;
}

.card__logo,
.card__number {
    width: 100%;
}



.card__logo {
    font-weight: bold;
    font-style: italic;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card__chip {
    background-image: linear-gradient(hsl(0, 0%, 70%), hsl(0, 0%, 80%));
    border-radius: 0.2rem;
    box-shadow: 0 0 0 0.05rem hsla(0, 0%, 0%, 0.5) inset;
    width: 1.25rem;
    height: 1.25rem;
    transform: translate3d(0, 0, 0);
}

.card__chip-lines {
    width: 100%;
    height: auto;
}

.card__chip-texture {
    background-image: linear-gradient(-80deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.6) 48% 52%, hsla(0, 0%, 100%, 0));
}

.card__type {
    align-self: flex-end;
    margin-left: auto;
}

.card__digit-group,
.card__exp-date,
.card__name {
    background: linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 85%) 15% 55%, hsl(0, 0%, 70%) 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Courier Prime", monospace;
    filter: drop-shadow(0 0.05rem hsla(0, 0%, 0%, 0.3));
}

.card__number {
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
}

.card__valid-thru,
.card__name {
    text-transform: uppercase;
}

.card__valid-thru,
.card__exp-date {
    /* margin-bottom: 0.25rem; */
    width: 50%;
}

/* .card__valid-thru {
    font-size: 0.3rem;
    padding-right: 0.25rem;
    text-align: right;
} */

.card__exp-date,
.card__name {
    font-size: 0.6rem;
}

.card__exp-date {
    padding-left: 0.25rem;
}

/* .card__name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 6.25rem;
} */

.card__vendor,
.card__vendor:before,
.card__vendor:after {
    position: absolute;
}

.card__vendor {
    right: 0.575rem;
    bottom: 1.15rem;
    width: 5.55rem;
    height: 1.5rem;
}

.card__vendor:before,
.card__vendor:after {
    border-radius: 50%;
    content: "";
    display: block;
    top: 0;
    width: 1.5rem;
    height: 1.5rem;
}

.card__vendor-sr {
    clip: rect(1px, 1px, 1px, 1px);
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.logo-container {
    position: relative;
    width: 40px;
    height: 40px;
}
</style>