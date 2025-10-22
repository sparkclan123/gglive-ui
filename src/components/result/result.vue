<template>
    <div class="p-4">
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
                        <div class="separator"></div>
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
            return new Date(date).toLocaleDateString('th-TH', options);
        }
    }
};
</script>

<style scoped>
.match-group {
    margin-bottom: 1.5rem;
    width: 100%;
}

.date {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 6px;
    text-align: left;
    color: #4b0082;
    padding-left: 10px;
}

.match-results {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.match {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #1e1036, #3f2c74);
    border-radius: 10px;
    padding: 6px 12px;
    transition: all 0.25s ease;
    color: #fff;
}

.match:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.team-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 48%;
}

.team-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: #fff;
}

.score {
    font-size: 0.9rem;
    font-weight: 700;
    color: #facc15;
}
</style>