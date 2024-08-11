<template>
    <div>
        <!-- Your existing HTML for displaying results -->
        <div class="flex flex-col items-center">
            <div class="flex justify-center w-full mt-2">
                <img class="w-8 h-8" src="/public/assets/logonew.png" />
            </div>
            <div class="match-group" v-for="(matches, date) in groupedMatches" :key="date">
                <div class="date m-2">{{ formatDate(date) }}</div>
                <div class="match-results">
                    <div class="match" v-for="match in matches" :key="match.id">
                        
                        <div class="team-wrapper text-xs font-bold mr-2" style="justify-content: end;">
                            <div>{{ truncateTeamName(match.team1) }}</div>
                        </div>
                       
                        <div class="score-container">
                            <!-- <div > 02:00</div> -->
                            <div class="score">{{ match.score1 }} - {{ match.score2 }}</div>
                          
                        </div>
                        <div class="team-wrapper text-xs font-bold ml-2" style="justify-content: start;">
                            <div>{{ truncateTeamName(match.team2) }}</div> 
                        </div>
                    </div>
                </div>
            </div>
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
        matches: {
            type: Array,
            required: true
        },
        fetchMatches: {
            type: Function,
            required: true
        }
    },
    computed: {
        groupedMatches() {
            return this.matches.reduce((groups, match) => {
                const date = match.date;
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(match);
                return groups;
            }, {});
        }
    },
    methods: {
        truncateTeamName(name) {
            return name.length > 15 ? name.slice(0, 15) + '...' : name;
        },
        getTeamImage(alt_ids_opta) {
            return `/assets/team/${alt_ids_opta}.png`;
        },
        formatDate(date) {
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(date).toLocaleDateString('en-GB', options);
        }
    }
};
</script>

<style scoped>
.match-group {
    margin-bottom: 20px;
    width: 100%;
}

.date {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center; /* Center the date */
    width: 100%;
}

.match-results {
    text-align: center;
}

.match {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    flex-wrap: nowrap;
}

.team-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px; /* Increase width for better centering */
    text-align: center;
    white-space: nowrap;
}

.score-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.score {
    width: 50px;
    text-align: center;
    background-color: #37003c;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    padding: 2px;
    white-space: nowrap;
}
</style>
