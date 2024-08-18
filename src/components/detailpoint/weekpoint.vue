<template>
    <div>

        
        <div class="rounded-xl shadow-lg min-h-screen bg-fixcolor-p tab-container">
            <div class="flex flex-col items-center ">
                <div class="flex justify-center w-full m-1 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512"
                        width="25px" height="25px" class="mt-1 mr-1" id="trophy">
                        <linearGradient id="a" x1="472.743" x2="39.257" y1="-8.648" y2="424.837"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ef3e3d"></stop>
                            <stop offset="1" stop-color="#ffc828"></stop>
                        </linearGradient>
                        <path fill="url(#a)" d="M100.083,175.093c-5.853-1.641-11.356-3.716-16.516-6.222L100.083,175.093z M100.083,173.827V0h311.834v24.443
	v149.384c0,85.755-70.162,155.918-155.917,155.918S100.083,259.582,100.083,173.827z M176.459,147.014l42.96,37.73l-12.579,55.775
	L256,211.321l49.158,29.198l-12.578-55.775l42.96-37.729l-56.933-5.272L256,89.225l-22.608,52.517L176.459,147.014z M83.567,157.211
	c-13.895-7.92-24.683-19.727-32.365-35.42c-10.576-21.606-15.538-50.616-14.886-87.025h47.251V24.443V14.12H26.339h-9.851
	l-0.431,9.879c-1.947,44.525,3.613,80.134,16.677,106.824c11.45,23.391,28.439,39.868,50.966,49.437
	c-0.08-2.136-0.133-4.278-0.133-6.432v-4.957V157.211z M495.942,23.999l-0.432-9.879h-9.85h-57.228v10.323v10.323h47.251
	c0.651,36.409-4.311,65.419-14.887,87.025c-7.682,15.693-18.47,27.5-32.365,35.42v11.66v4.957c0,2.155-0.054,4.297-0.133,6.432
	c22.526-9.568,39.516-26.046,50.966-49.437C492.33,104.133,497.889,68.525,495.942,23.999z M177.514,442.81h156.971v-44.375H177.514
	V442.81z M177.514,459.324L126.42,512h259.16l-51.095-52.676H177.514z M428.433,168.871l-16.516,6.222
	C417.77,173.452,423.273,171.377,428.433,168.871z M256,346.26c-7.657,0-15.2-0.513-22.601-1.492
	c-2.422,14.884-7.973,27.267-16.649,37.151h78.499c-8.676-9.884-14.227-22.267-16.649-37.151
	C271.2,345.747,263.658,346.26,256,346.26z"></path>
                    </svg>
                    <span class="mt-1 font-semibold text-gray-600">รายละเอียดคะเเนนนักเตะ</span>
                </div>
                <div class="mt-2 w-full" v-if="gameweekData.datas">
                    <div class="cus-bg-card  text-gray-700  flex flex-col rounded-xl shadow-lg p-2 mb-5 mr-5 ml-5 cursor-pointer"
                        v-for="data in gameweekData.datas" @click="seeDetailGameWeek(data)">
                        <div class="flex items-center justify-between font-semibold">
                            <div class="flex items-center space-x-1">
                                <div class=" w-7 h-7  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48"
                                        viewBox="0 0 48 48" id="trophy-cup">
                                        <linearGradient id="a" x1="9.638" x2="37.724" y1="24" y2="24"
                                            gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stop-color="#fd6700"></stop>
                                            <stop offset="1" stop-color="#ffce00"></stop>
                                        </linearGradient>
                                        <path fill="url(#a)" d="M29.87256,23.93463c3.80432-1.55646,6.49359-5.14636,6.86475-9.22662
		C36.85364,13.43512,35.78546,12.25,34.5,12.25c-0.0025,0-1.18945,0-2.03607,0c0.14032-1.57092-1.13788-3-2.72955-3
		c-0.01093,0-11.46875,0-11.46875,0c-1.5874,0-2.87073,1.4259-2.72955,3H13.5c-1.3045,0-2.35541,1.15955-2.2373,2.45801
		c0.37115,4.08026,3.06042,7.67017,6.86475,9.22662c0.81128,1.00446,1.87225,1.79187,3.08191,2.27557
		c-0.125,1.77277-0.6828,3.49603-1.62927,5.03979H18c-0.36621,0-0.67969,0.26514-0.74023,0.62646c0,0-1,6-1.00002,6.0001
		C16.18467,38.32944,16.5389,38.75,17,38.75c0.00002,0,14,0,14.00002,0c0.45946-0.00001,0.8156-0.41923,0.74022-0.87354l-1-6
		C30.67969,31.51514,30.36621,31.25,30,31.25h-1.58606c-0.96429-1.52899-1.52472-3.25049-1.63739-5.03363
		C27.99213,25.73315,29.05811,24.94305,29.87256,23.93463z M35.24316,14.57257c-0.25507,2.80682-1.78796,5.33838-4.05835,6.93915
		c0.14154-0.44043,0.24432-0.89911,0.30347-1.37256L32.2868,13.75H34.5C34.92896,13.75,35.28186,14.14655,35.24316,14.57257z
		 M14.20892,18.80249C13.76233,18.10071,11.64728,13.75,13.5,13.75c0.00104,0,1.36627,0,2.2132,0
		c0.28052,2.24451,0.79852,6.38916,0.79852,6.38916c0.06024,0.48242,0.16681,0.94904,0.31256,1.39703
		C15.78656,20.80725,14.89197,19.87592,14.20892,18.80249z M18,19.95361l-0.97461-7.79883
		C16.93414,11.42194,17.52502,10.75,18.26562,10.75c0.02692,0,11.46875,0,11.46875,0c0.73096,0,1.33124,0.67694,1.24023,1.40527
		C30.97223,12.17426,30,19.95361,30,19.95361C29.62305,22.97314,27.04297,25.25,24,25.25S18.37695,22.97314,18,19.95361z
		 M30.11426,37.25H17.88574l0.75-4.5h10.72852L30.11426,37.25z M26.68176,31.25h-5.37927
		c0.75427-1.44727,1.22583-3.01141,1.38031-4.61877C23.11169,26.70734,23.55133,26.75,24,26.75
		c0.44293,0,0.87689-0.04224,1.30066-0.11646C25.44556,28.24811,25.91766,29.81116,26.68176,31.25z"></path>
                                        <linearGradient id="b" x1="9.638" x2="37.724" y1="17.509" y2="17.509"
                                            gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stop-color="#fd6700"></stop>
                                            <stop offset="1" stop-color="#ffce00"></stop>
                                        </linearGradient>
                                        <path fill="url(#b)" d="M25.34766,21.53662
		c0.85466,0.63819,1.96869-0.27676,1.66211-1.24658l-0.5127-1.625c0,0,1.30292-0.97402,1.30566-0.97607
		c0.8104-0.60583,0.40482-2.01465-0.63476-2.01465h-1.61621c0,0-0.52268-1.65077-0.52441-1.65624
		c-0.31608-0.99829-1.74043-0.99801-2.05469-0.00001l-0.52441,1.65625c0,0-1.61045,0-1.6162,0
		c-1.04669,0-1.4522,1.40387-0.63576,2.01465l1.30664,0.97607c0,0-0.51144,1.62103-0.51269,1.62499
		c-0.30661,0.97181,0.81123,1.88107,1.66308,1.24659L24,20.53027C24,20.53027,25.34307,21.5332,25.34766,21.53662z
		 M22.79395,19.55859l0.2168-0.68701c0.14551-0.45898-0.01172-0.95898-0.3916-1.24609l-0.60449-0.45117h0.74805
		c0.4707,0,0.88379-0.30908,1.02734-0.76807L24,15.74316l0.20898,0.66211c0.14453,0.45996,0.55762,0.76904,1.02832,0.76904h0.74805
		l-0.60645,0.45361c-0.37793,0.28467-0.53516,0.78467-0.38965,1.24414l0.2168,0.68652l-0.57031-0.42578
		c-0.38086-0.28418-0.89062-0.28369-1.27148-0.00049L22.79395,19.55859z"></path>
                                    </svg>

                                </div>
                                <div class="text-sm ">ฤดูกาล {{ data.season.label }} เกมวีค {{ data.week }}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="mt-4 text-gray-700 text-xs space-x-4">
                                รายละเอียดคะเเนนนักเตะ เกมวีค {{ data.week }}
                            </div>
                            <div class="mt-4 text-gray-800 font-bold  text-sm space-x-4">
                                <!-- คะเเนนรวม: <span class="text-green-800"> {{ data.total_point }} </span> -->
                            </div>
                        </div>

                    </div>
                    <Pagination :page="gameweekData.page" :pages="gameweekData.pages" @page-change="fetchGameWeeks" />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { api } from '@axios_inst';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            loading: false,
            gameweekData: {
                datas: [],
                total: 0,
                page: 1,
                limit: 10,
                pages: 1,
            },
        }
    },
    methods: {
        seeDetailGameWeek(data) {
            this.$router.push({
                name: 'player-detail-point-table',
                params: {
                    id: data.id,
                    seasonID: data.season_id,
                }
            });
        },
        async fetchGameWeeks(page = 1, limit = 10) {
           
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
                    this.gameweekData.datas = response.data.data;
                    this.gameweekData.total = response.data.total;
                    this.gameweekData.page = response.data.page;
                    this.gameweekData.limit = response.data.limit;
                    this.gameweekData.pages = response.data.pages;
                  
                }
            } catch (error) {
                console.log(error);
              
            }
        },
    },
    async mounted() {
      
        await this.fetchGameWeeks();
    }
};
</script>

<style scoped>
.cus-bg-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #ca5141;
    transition: box-shadow 0.3s ease;
}

.bg-fixcolor-p {
    background-color: #f6f6f8;
}
</style>
