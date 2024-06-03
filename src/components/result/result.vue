<template>
    <div>
        <div class="flex justify-center items-center flex-col">
            <div class="match-group" v-for="(matches, date) in groupedMatches" :key="date">
                <div class="date m-2">{{ formatDate(date) }}</div>
                <div class="match-results">
                    <div class="match" v-for="match in matches" :key="match.id">
                        <div class="team-wrapper text-xs font-bold" style="justify-content: end;">
                           
                            <div >{{ match.team1 }}</div>
                        </div>
                        
                        <div class="score-container">
                          
                            <img :src="getTeamImage(match.alt_ids_opta_1)" alt="Team 1" class="team-img">
                            <div class="score">
                                {{ match.score1 }} - {{ match.score2 }}
                            </div>
                            <img :src="getTeamImage(match.alt_ids_opta_2)" alt="Team 2" class="team-img">
                        </div>
                        <div class="team-wrapper text-xs font-bold" style="justify-content: start;">
                            <div >{{ match.team2 }}</div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            matches: [
                { id: 1, date: '2024-05-19', team1: 'Arsenal', score1: 2, score2: 1, team2: 'Everton', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 2, date: '2024-05-19', team1: 'Brentford', score1: 2, score2: 4, team2: 'Newcastle', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 3, date: '2024-05-19', team1: 'Brighton', score1: 0, score2: 2, team2: 'Man Utd', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 4, date: '2024-05-19', team1: 'Burnley', score1: 1, score2: 2, team2: 'Nott\'m Forest', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 5, date: '2024-05-19', team1: 'Chelsea', score1: 2, score2: 1, team2: 'Bournemouth', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 6, date: '2024-05-19', team1: 'Crystal Palace', score1: 5, score2: 0, team2: 'Aston Villa', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 7, date: '2024-05-19', team1: 'Liverpool', score1: 2, score2: 0, team2: 'Wolves', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 8, date: '2024-05-19', team1: 'Luton', score1: 2, score2: 4, team2: 'Fulham', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 9, date: '2024-05-19', team1: 'Man City', score1: 3, score2: 1, team2: 'West Ham', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 10, date: '2024-05-19', team1: 'Sheffield Utd', score1: 0, score2: 3, team2: 'Spurs', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 11, date: '2024-05-20', team1: 'Leeds', score1: 1, score2: 2, team2: 'Leicester', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' },
                { id: 12, date: '2024-05-20', team1: 'Southampton', score1: 0, score2: 1, team2: 'Norwich', alt_ids_opta_1: 't3', alt_ids_opta_2: 't4' }
            ]
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
