<template>
    <div>
        <div class="flex flex-col items-center">
            <div class="flex justify-center w-full mt-2">
                <img class="w-8 h-8" src="/public/assets/logonew.png" /> 
                <span class="mt-1 font-semibold text-gray-600">การเเข่งขัน</span>
            </div>
            <div class="match-group " v-for="(matches, date) in groupedMatches" :key="date">
                <div class="date m-2">{{ formatDate(date) }}</div>
                <div class="match-results">
                    <div class="match  shadow-lg" v-for="match in matches" :key="match.id">
                        <div class="team-info">
                            <div class="team-name">{{ match.team1 }}</div>
                            <div class="score">{{ match.score1 }}</div>
                        </div>
                        <div class="team-info">
                            <div class="team-name">{{ match.team2 }}</div>
                            <div class="score">{{ match.score2 }}</div>
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
    margin-bottom: 5px;
    width: 100%;
}

.date {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    color: #1e1036;
    width: 100%;
}

.match-results {
    text-align: left;
  
    border-radius: 10px;
    padding: 5px;
}

.match {
    display: flex;
    flex-direction: column;
    padding: 5px 5px 5px 10px;
    margin: 2px 0;
    background-color: #1e1036;
    border-radius: 10px;
    position: relative;
}

.team-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 2px;
}

.team-name {
    font-size: 0.7rem;
    color: #FFFFFF;
    white-space: nowrap;
    text-align: left;
}

.score {
    padding: 0px 5px;
    font-size: 0.8rem;
    font-weight: bold;
    color: #FFFFFF;
    text-align: right;
}



</style>