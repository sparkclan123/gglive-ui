<template>
    <div>
        <div class="flex justify-center items-center flex-col">
            <div class="match-group" v-for="(matches, date) in groupedMatches" :key="date">
                <div class="date m-2">{{ formatDate(date) }}</div>
                <div class="match-results">
                    <div class="match" v-for="match in matches" :key="match.id">
                        <div class="team-wrapper text-xs font-bold" style="justify-content: end;">
                            <div>{{ truncateTeamName(match.team1) }}</div>
                        </div>
                        <div class="score-container">
                            <img :src="getTeamImage(match.alt_ids_opta_1)" alt="Team 1" class="team-img">
                            <div class="score">{{ match.score1 }} - {{ match.score2 }}</div>
                            <img :src="getTeamImage(match.alt_ids_opta_2)" alt="Team 2" class="team-img">
                        </div>
                        <div class="team-wrapper text-xs font-bold" style="justify-content: start;">
                            <div>{{ truncateTeamName(match.team2) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@axios_inst';

export default {
    data() {
        return {
            matches: []
        };
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
        ...mapActions('loading', ['updateLoading']),
        async fetchMatches() {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/result', {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                if (response.data.ok) {
                    this.matches = response.data.matches.map(match => ({
                        id: match.ID,
                        date: match.DateVs,
                        team1: match.Team1Name,
                        score1: match.Score1,
                        score2: match.Score2,
                        team2: match.Team2Name,
                        alt_ids_opta_1: match.Team1Code,
                        alt_ids_opta_2: match.Team2Code
                    }));
                    setTimeout(() => {
                        this.updateLoading(false);
                    }, 50);
                }
            } catch (error) {
                setTimeout(() => {
                    this.updateLoading(false);
                }, 50);
                console.error('Error fetching matches:', error);
            }
        },
        truncateTeamName(name) {
            return name.length > 12 ? name.slice(0, 12) + '...' : name;
        },
        getTeamImage(alt_ids_opta) {
            return `/assets/team/${alt_ids_opta}.png`;
        },
        formatDate(date) {
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(date).toLocaleDateString('en-GB', options);
        }
    },
    created() {
        this.updateLoading(true);
        this.fetchMatches();
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

.match-group {
    margin-bottom: 20px;
    width: 100%;
}

.date {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
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
    width: 120px;
    text-align: center;
    white-space: nowrap;
}

.team {
    margin-left: 5px;
}

.team-img {
    width: 30px;
    height: 30px;
    object-fit: contain;
}

.score-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.score {
    width: 70px;
    text-align: center;
    background-color: #37003c;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    padding: 5px;
    white-space: nowrap;
}
</style>
