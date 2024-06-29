<template>
    <div>
        <div class="card">
            <div class="card__info">
                <div class="card__logo">รายการ ทีมของคุณ</div>
                <div class="card__chip">
                    <svg class="card__chip-lines" role="img" width="20px" height="20px" viewBox="0 0 100 100"
                        aria-label="Chip">
                        <g opacity="0.8">
                            <polyline points="0,50 35,50" fill="none" stroke="#000" stroke-width="2"></polyline>
                            <polyline points="0,20 20,20 35,35" fill="none" stroke="#000" stroke-width="2"></polyline>
                            <polyline points="50,0 50,35" fill="none" stroke="#000" stroke-width="2"></polyline>
                            <polyline points="65,35 80,20 100,20" fill="none" stroke="#000" stroke-width="2"></polyline>
                            <polyline points="100,50 65,50" fill="none" stroke="#000" stroke-width="2"></polyline>
                            <polyline points="35,35 65,35 65,65 35,65 35,35" fill="none" stroke="#000" stroke-width="2">
                            </polyline>
                            <polyline points="0,80 20,80 35,65" fill="none" stroke="#000" stroke-width="2"></polyline>
                            <polyline points="50,100 50,65" fill="none" stroke="#000" stroke-width="2"></polyline>
                            <polyline points="65,65 80,80 100,80" fill="none" stroke="#000" stroke-width="2"></polyline>
                        </g>
                    </svg>
                    <div class="card__chip-texture"></div>
                </div>
                <div class="card__type">debit</div>
                <div class="card__number">
                    <span class="card__digit-group">0123</span>
                    <span class="card__digit-group">4567</span>
                    <span class="card__digit-group">8901</span>
                    <span class="card__digit-group">2345</span>
                </div>
                <div class="card__valid-thru" aria-label="Valid thru">Valid<br>thru</div>
                <div class="card__exp-date"><time datetime="2038-01">01/38</time></div>
                <div class="card__name" aria-label="Dee Stroyer">Jk Huger</div>
                <div class="card__vendor" role="img" aria-labelledby="card-vendor">
                    <span id="card-vendor" class="card__vendor-sr">Mastercard</span>
                </div>
                <div class="card__texture"></div>
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
                    คะเเนนรวม: {{ data.total_point }}
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
.card__texture {
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
}

.card {
    animation-name: rotate_500;
    background-color: var(--primary);
   
    border-radius: 0.5em;
    box-shadow: 0 0 0 hsl(0, 0%, 80%),
        0 0 0 hsl(0, 0%, 100%),
        -0.2rem 0 0.75rem 0 hsla(0, 0%, 0%, 0.3);
    color: hsl(0, 0%, 100%);
    /* width: 10.3em; */
    height: 6.8em;
    transform: translate3d(0, 0, 0);
}

.card__info,
.card__chip-texture,
.card__texture {
    position: absolute;
}

.card__chip-texture,
.card__texture {
    animation-name: texture;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
}

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
    margin-bottom: 0.25rem;
    width: 50%;
}

.card__valid-thru {
    font-size: 0.3rem;
    padding-right: 0.25rem;
    text-align: right;
}

.card__exp-date,
.card__name {
    font-size: 0.6rem;
}

.card__exp-date {
    padding-left: 0.25rem;
}

.card__name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 6.25rem;
}

.card__vendor,
.card__vendor:before,
.card__vendor:after {
    position: absolute;
}

.card__vendor {
    right: 0.375rem;
    bottom: 0.375rem;
    width: 2.55rem;
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

.card__vendor:before {
    background-color: #e71d1a;
    left: 0;
}

.card__vendor:after {
    background-color: #fa5e03;
    box-shadow: -1.05rem 0 0 #f59d1a inset;
    right: 0;
}

.card__vendor-sr {
    clip: rect(1px, 1px, 1px, 1px);
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.card__texture {
    animation-name: texture;
    background-image: linear-gradient(-80deg, hsla(0, 0%, 100%, 0.3) 25%, hsla(0, 0%, 100%, 0) 45%);
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
    :root {
        --bg: hsl(var(--hue), 10%, 30%);
        --fg: hsl(var(--hue), 10%, 90%);
    }
}

/* Animation */
@keyframes rotate_500 {

    from,
    to {
        animation-timing-function: ease-in;
        box-shadow: 0 0 0 hsl(0, 0%, 80%),
            0.1rem 0 0 hsl(0, 0%, 100%),
            -0.2rem 0 0.75rem 0 hsla(0, 0%, 0%, 0.3);
        transform: rotateY(-10deg);
    }

    25%,
    75% {
        animation-timing-function: ease-out;
        box-shadow: 0 0 0 hsl(0, 0%, 80%),
            0 0 0 hsl(0, 0%, 100%),
            -0.25rem -0.05rem 1rem 0.15rem hsla(0, 0%, 0%, 0.3);
        transform: rotateY(0deg);
    }

    50% {
        animation-timing-function: ease-in;
        box-shadow: -0.1rem 0 0 hsl(0, 0%, 80%),
            0 0 0 hsl(0, 0%, 100%),
            -0.3rem -0.1rem 1.5rem 0.3rem hsla(0, 0%, 0%, 0.3);
        transform: rotateY(10deg);
    }
}

@keyframes texture {

    from,
    to {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(-20%, 0, 0);
    }
}
</style>