<template>
  <div role="presentation" class="fixed inset-0 z-[1000] bg-black/60 duration-300 overflow-hidden"
    @click.self.prevent="$emit('close-modal')" :class="{
      '!bg-black/0 pointer-events-none': !showAdjustPlayerModal,
    }">
    <Transition>
      <main v-if="showAdjustPlayerModal" class="fixed inset-x-0 bottom-0 max-h-[90dvh] rounded-t-lg flex flex-col">

        <div class="player-selection bg-color-2 shadow-lg h-full text-gray-200  rounded-lg shadow-xl overflow-y-auto">

          <div class="sticky top-0 bg-[#1e1036] p-4 !rounded-t-xl">

            <button class="close-button" @click="$emit('close-modal')">
              <span class="close-icon">&times;</span>
            </button>

            <div class="flex flex-wrap gap-4 mb-4  ">

              <div class="flex-1 min-w-[100px]">

                <div class="flex items-center mb-1 text-gray-100 text-xs">
                  <label for="switch" class="mr-2">ทีม</label>
                  <div class="checkbox-wrapper-35 flex items-center">
                    <input v-model="is_check_player" name="switch" id="switch" type="checkbox" class="switch">
                    <label for="switch" class="flex items-center">
                      <span class="switch-x-text text-gray-200">นักเตะ </span>
                      <span class="switch-x-toggletext flex items-center ">
                        <span class="switch-x-unchecked mr-1 text-yellow-400">
                          <span class=" switch-x-text switch-x-hiddenlabel">Unchecked:</span>off
                        </span>
                        <span class="switch-x-checked text-green-400">
                          <span class="switch-x-text switch-x-hiddenlabel ">Checked:</span>on
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <select v-model="selectedTeam" @change="filterPlayers"
                  class="p-1  rounded w-full text-gray-600 focus:outline-none focus:border-blue-500 text-sm">
                  <optgroup v-for="group in options" :key="group.label" :label="group.label">
                    <option v-for="option in group.options" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </optgroup>
                </select>
              </div>
              <div class="flex-1 min-w-[100px]">

                <label class="block mb-1 text-gray-100 text-xs">ตำเเหน่ง
                  <span class="text-green-400">คงเหลือ {{ (remainingAmount + detailPlayer.price).toFixed(2) }}$</span>
                </label>



                <select v-model="selectedPosition" @change="filterPlayers"
                  class="p-1  rounded w-full text-gray-600 focus:outline-none focus:border-blue-500 text-sm">
                  <option value="">ทุกตำเเหน่ง</option>
                  <option v-for="option in optionsPosition" :key="option.value" :value="option.value">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex flex-wrap gap-4">
              <div class="flex-1 min-w-[100px] ">
                <label class="block mb-1 text-gray-100 text-xs">ค้นหา..</label>
                <input type="text" placeholder="Search for player..." v-model="searchTerm" @input="filterPlayers"
                  class="p-1 border rounded w-full text-gray-600 text-sm">
              </div>
              <div class="flex-1 min-w-[100px]">
                <label class="block mb-1 text-gray-100 text-xs">งบไม่เกิน</label>
                <input type="number" placeholder="Max cost" v-model="maxCost" @input="filterPlayers"
                  class="p-1 border rounded w-full text-gray-600 text-sm">
              </div>

            </div>
          </div>

          <div class="px-4 flex-1 min-h-[300px]">
            <table class="min-w-full bg-gray-300 rounded-lg text-xs">
              <thead>
                <tr>

                  <th class="w-1/3 py-1 pl-2 text-left text-gray-900 border-b border-gray-400">นักเตะ</th>
                  <!-- <th class=" py-1 pl-2 text-left text-gray-900 border-b border-gray-400">ทีม</th> -->
                  <th class="w-[1%] py-1  pl-2 text-left text-gray-900 border-b border-gray-400">ราคา</th>
                  <!-- <th class="w-[1%] py-1  pl-2 text-left text-gray-900 border-b border-gray-400">%</th> -->
                  <th class="w-[1%] py-1  pl-2 text-left text-gray-900 border-b border-gray-400">🟨</th>
                  <th class="w-[1%] py-1  pl-2 text-left text-gray-900 border-b border-gray-400">🟥</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player in paginatedPlayers" :key="player.id" class="bg-gray-50">
                  <td class="w-1/3 py-1 px-2 border-b border-r border-gray-400 text-gray-900 cursor-pointer"
                    @click="selectPlayer(player)">
                    <div class="flex items-center">
                      <img :src="getShirtImage(player)" alt="team logo" class="w-6 h-8 mr-2">
                      <div class="truncate">
                        <div>{{ truncateText(player.name) }}</div>
                        <div class="text-xs text-gray-600">{{ player.position }}
                          <span style="font-size: 9px;margin-right: 3px;" class="text-yellow-800">
                            {{ key_team[player.team_code] }}</span>
                          <span style="font-size: 9px;">{{ player.team_vs }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <!-- <td class=" py-1 px-2 border-b border-gray-400 text-gray-900">
                        <div class="flex items-center">
                            <img :src="`/public/assets/team/${player.team_code}.png`" alt="team logo" class="w-4 h-4 mr-1">
                        </div>
                    </td> -->
                  <td class=" py-1 px-2 border-b border-gray-400 text-gray-900">
                    <Numberformat :value="player.price" :decimal="1" />
                  </td>
                  <!-- <td class=" py-1 px-2 border-b border-gray-400 text-gray-900"
                    v-if="getGameWeekPercentPlayer && getGameWeekPercentPlayer[player.player_id]">
                    <Numberformat :value="getGameWeekPercentPlayer[player.player_id]" :decimal="1" />%
                  </td>
                  <td class=" py-1 px-2 border-b border-gray-400 text-gray-900" v-else>0.0%</td> -->
                  <td class=" py-1 px-2 border-b border-gray-400 text-gray-900">{{ player.yellows_card }}
                  </td>
                  <td class=" py-1 px-2 border-b border-gray-400 text-gray-900">{{ player.reds_card }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="sticky bottom-0 bg-[#1e1036] p-3">
          <PaginationJavascript :page="currentPage" :pages="totalPages" @page-change="handlePageChange" />
        </div>


      </main>
    </Transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';
export default {
  props: ['showAdjustPlayerModal', 'players', 'position', 'detailPlayer', 'remainingAmount'],
  data() {
    return {
      isDataReady: false,
      is_check_player: true,
      currentPage: 1,
      playersPerPage: 50,
      selectedTeam: 'view',
      selectedPosition: '',
      sortBy: 'total_points',
      maxCost: null,
      searchTerm: '',
      options: [
        {
          label: 'ตัวเลือก',
          options: [
            { name: 'ทั้งหมด', value: 'view' }
          ]
        },
        {
          label: 'Teams',
          options: []
        }
      ],
      optionsPosition: [
        { name: 'GoalKeeper', value: 'G' },
        { name: 'Defenders', value: 'D' },
        { name: 'Midfielders', value: 'M' },
        { name: 'Forwards', value: 'F' }
      ],
      key_team: {
        "t3": "ARS",
        "t7": "AVL",
        "t37": "BAR",
        "t41": "BIR",
        "t5": "BLB",
        "t92": "BLP",
        "t30": "BOL",
        "t91": "BOU",
        "t55": "BRA",
        "t94": "BRE",
        "t36": "BHA",
        "t90": "BUR",
        "t97": "CAR",
        "t33": "CHA",
        "t8": "CHE",
        "t9": "COV",
        "t31": "CRY",
        "t24": "DER",
        "t11": "EVE",
        "t54": "FUL",
        "t38": "HUD",
        "t88": "HUL",
        "t40": "IPS",
        "t2": "LEE",
        "t13": "LEI",
        "t14": "LIV",
        "t102": "LUT",
        "t43": "MCI",
        "t1": "MUN",
        "t25": "MID",
        "t4": "NEW",
        "t45": "NOR",
        "t17": "NFO",
        "t105": "OLD",
        "t47": "POR",
        "t52": "QPR",
        "t108": "RDG",
        "t49": "SHU",
        "t19": "SHW",
        "t20": "SOU",
        "t110": "STK",
        "t56": "SUN",
        "t80": "SWA",
        "t46": "SWI",
        "t6": "TOT",
        "t57": "WAT",
        "t35": "WBA",
        "t21": "WHU",
        "t111": "WIG",
        "t1736": "WIM",
        "t39": "WOL"
      }
    }
  },

  watch: {
    showAdjustPlayerModal(newVal) {
      if (!newVal) {
        document.body.style.overflow = '';
        this.fadeOut();

      }
    },
    position(newPosition) {
      this.selectedPosition = newPosition;

    }
  },
  computed: {
    ...mapGetters('Teams', ['getTeams']),
    filteredPlayers() {
      console.log(this.selectedPosition)
      if (this.maxCost < 1) {
        this.maxCost = null;
      }
      // is_injured
      return this.players.filter(player => {
        return (
          (this.selectedTeam === 'view' || player.team_id === this.selectedTeam) &&
          (this.selectedPosition === '' || player.position === this.selectedPosition) &&
          (!this.maxCost || player.price <= this.maxCost) &&
          (this.is_check_player ? player.is_ban === false && player.is_injured === false : true) &&
          (this.searchTerm === '' || player.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
      }).sort((a, b) => {

        return b.price - a.price;


      });
    },
    paginatedPlayers() {
      const start = (this.currentPage - 1) * this.playersPerPage;
      const end = start + this.playersPerPage;
      return this.filteredPlayers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPlayers.length / this.playersPerPage);
    },
  },
  methods: {
    filterPlayers() {
      this.handlePageChange(1);

    },
    async selectPlayer(player) {

      if (player.is_ban || player.is_injured) {
        Swal.fire({
          text: 'นักเตะนี้ไม่สามารถเล่นได้',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          showConfirmButton: false,
          customClass: {
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
          buttonsStyling: false,
        });
        return;
      }

      if (player.price - this.detailPlayer.price > this.remainingAmount) {
        Swal.fire({
          text: 'งบไม่เพียงพอ',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          showConfirmButton: false,
          customClass: {
            cancelButton: 'btn-cancel',
            popup: 'popup-custom',
            title: 'text-custom',
            htmlContainer: 'text-custom'
          },
          buttonsStyling: false,
        });
        return;
      }

      if (this.detailPlayer) {
        let player_name_old = this.detailPlayer.name;
        let player_name_new = player.name;
        let svgArrow = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="back-arrow">
                    <g fill="none" fill-rule="evenodd">
                        <rect width="24" height="24"></rect>
                        <g fill="#2CBD3E" transform="translate(1 1)">
                            <circle cx="11" cy="11" r="9" fill-opacity=".24"></circle>
                            <path fill-rule="nonzero" d="M10,13.5857864 L10,6 C10,5.44771525 10.4477153,5 11,5 C11.5522847,5 12,5.4477153 12,6 L12,13.5857864 L14.2928932,11.2928932 C14.6834175,10.9023689 15.3165825,10.9023689 15.7071068,11.2928932 C16.0976311,11.6834175 16.0976311,12.3165825 15.7071068,12.7071068 L11.7071068,16.7071068 C11.3165825,17.0976311 10.6834175,17.0976311 10.2928932,16.7071068 L6.29289322,12.7071068 C5.90236893,12.3165825 5.90236893,11.6834175 6.29289322,11.2928932 C6.68341751,10.9023689 7.31658249,10.9023689 7.70710678,11.2928932 L10,13.5857864 Z M22,11 C22,17.0751322 17.0751322,22 11,22 C4.92486775,22 3.01561176e-16,17.0751322 6.7355574e-16,11 C1.0455503e-15,4.92486775 4.92486775,0 11,0 C17.0751322,0 22,4.92486775 22,11 Z M20,11 C20,6.02943725 15.9705627,2 11,2 C6.02943725,2 2,6.02943725 2,11 C2,15.9705627 6.02943725,20 11,20 C15.9705627,20 20,15.9705627 20,11 Z" transform="rotate(90 11 11)"></path>
                        </g>
                    </g>
                </svg>
            `;

        const { value: confirm } = await Swal.fire({
          title: 'ยืนยันการเปลี่ยนผู้เล่น',
          html: `<div style="display: flex; align-items: center; justify-content: center;">
                             <span>${player_name_old} </span>
                            ${svgArrow}
                             <span> ${player_name_new}</span>
                           
                       </div>`,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ใช่, เปลี่ยนผู้เล่น!',
          cancelButtonText: 'ยกเลิก',
          customClass: {
            cancelButton: 'btn-cancel',
            title: 'text-custom',
            htmlContainer: 'text-custom',
            popup: 'popup-custom swal2-top'
          },
        });

        if (confirm) {
          this.$emit('change-player', player);
        }
        return;
      }
    },
    truncateText(text) {
      if (text.length > 13) {
        return text.slice(0, 13) + '...';
      } else {
        return text;
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    stripTeamCode(teamCode) {
      return teamCode.replace('t', '');
    },
    getShirtImage(player) {
      const teamCode = this.stripTeamCode(player.team_code);
      const suffix = player.position === 'G' ? '_1-66' : '-66';
      return `https://pudee.sgp1.digitaloceanspaces.com/shirt_${teamCode}${suffix}.webp`;
    },
    fadeOut() {
      const overlay = document.querySelector('.dialog-overlay');
      if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          this.$emit('close-modal');
        }, 300);
      }
    },
    updateTeamOptions() {
      const teams = this.getTeams;
      if (teams && Array.isArray(teams)) {
        this.options.find(option => option.label === 'Teams').options = teams.map(team => ({
          name: team.name,
          value: team.team_id
        }));
      } else {
        console.error('getTeams is null or not an array');
      }
    },
    checkTeamsData() {
      if (this.getTeams && Array.isArray(this.getTeams)) {
        this.updateTeamOptions();
      } else {
        console.error('Teams data is not available yet');
        setTimeout(this.checkTeamsData, 1000);
      }
    },
  },
  async mounted() {
    await this.checkTeamsData();
    this.isDataReady = true;
  }
};
</script>

<style scoped>
.swal2-top {
  z-index: 2000 !important;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
}

.dialog-overlay {
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease-in-out;
}

.styled-dialog {
  z-index: 120;
  max-width: 90%;
  max-height: 90%;
  padding: 0;
  border: 0;
  border-radius: 8px;
  width: 640px;
  color: currentcolor;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 12px 24px;
}

.dialog-header {
  position: relative;
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 2.4rem;
}

.dialog-heading {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.close-button {
  position: absolute; /* ใช้ absolute เพื่อให้ปุ่มอยู่ตามที่ต้องการ */
  top: -5px; /* ระยะจากขอบบน */
  right: 10px; /* ระยะจากขอบขวา */
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  z-index: 1100;
  padding: 5px;
  line-height: 1;
  transition: transform 0.3s ease, color 0.3s ease;
}

.close-button:hover {
  transform: scale(1.2);
  color: #ff0000;
}

.close-icon {
  font-weight: bold;
}

.close-label {
  border: 0;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.close-icon {
  width: 16px;
  height: 16px;
}

.dialog-body {
  max-height: calc(90vh - 61px);
  overflow-y: auto;
  margin: 2rem 1.5rem;
}

.dialog-button-item {
  margin-bottom: 1rem;
}

.remove-player-button,
.set-captan-info-button,
.player-info-button {
  display: block;
  padding: 0.9rem;
  border: 0;
  border-radius: 3px;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 8px;
  width: 100%;
  transition: background 0.3s ease, transform 0.3s ease;
}

.remove-player-button {
  background: rgb(31, 37, 158);
  color: white;
}

.set-captan-info-button {
  background: rgb(30, 122, 25);
  color: white;
}

.player-info-button {
  background: rgb(239, 239, 239);
  color: black;
}

.remove-player-button:hover,
.set-captan-info-button:hover,
.player-info-button:hover {
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


.fade-in {
  animation: fadeIn 0.2s ease-in-out;
}

.bg-color-2 {
  background-color: #261442;
}

.bg-color-1 {
  background-color: #261442;
}

.player-selection {
  height: calc(100vh - 100px);
  /* ตั้งค่า height ให้เต็มที่ */
  overflow-y: auto;
  /* เปิดการเลื่อนในแนวตั้ง */
}

main {
  max-height: calc(100dvh - 50px);
  /* เพื่อให้มั่นใจว่าเนื้อหาจะไม่ล้น */
  overflow-y: auto;
  /* ให้เนื้อหาที่ล้นสามารถเลื่อนดูได้ */
}

.checkbox-wrapper-35 .switch+label .switch-x-text {
  display: block;
  margin-right: .3em;
}

.checkbox-wrapper-35 .switch {
  display: none;
}

.checkbox-wrapper-35 .switch+label {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #78768d;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 15px;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-wrapper-35 .switch+label::before,
.checkbox-wrapper-35 .switch+label::after {
  content: '';
  display: block;
}

.checkbox-wrapper-35 .switch+label::before {
  background-color: #7c77ae;
  border-radius: 500px;
  height: 15px;
  margin-right: 8px;
  -webkit-transition: background-color 0.125s ease-out;
  transition: background-color 0.125s ease-out;
  width: 25px;
}

.checkbox-wrapper-35 .switch+label::after {
  background-color: #fff;
  border-radius: 13px;
  box-shadow: 0 3px 1px 0 rgba(37, 34, 71, 0.05), 0 2px 2px 0 rgba(37, 34, 71, 0.1), 0 3px 3px 0 rgba(37, 34, 71, 0.05);
  height: 13px;
  left: 1px;
  position: absolute;
  top: 1px;
  -webkit-transition: -webkit-transform 0.125s ease-out;
  transition: -webkit-transform 0.125s ease-out;
  transition: transform 0.125s ease-out;
  transition: transform 0.125s ease-out, -webkit-transform 0.125s ease-out;
  width: 13px;
}



.checkbox-wrapper-35 .switch+label .switch-x-toggletext {
  display: block;
  height: 15px;
  overflow: hidden;
  position: relative;
  width: 25px;
}

.checkbox-wrapper-35 .switch+label .switch-x-unchecked,
.checkbox-wrapper-35 .switch+label .switch-x-checked {
  left: 0;
  position: absolute;
  top: 0;
  -webkit-transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
  transition: opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
  transition: transform 0.125s ease-out, opacity 0.125s ease-out;
  transition: transform 0.125s ease-out, opacity 0.125s ease-out, -webkit-transform 0.125s ease-out;
}

.checkbox-wrapper-35 .switch+label .switch-x-unchecked {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
}

.checkbox-wrapper-35 .switch+label .switch-x-checked {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.checkbox-wrapper-35 .switch+label .switch-x-hiddenlabel {
  position: absolute;
  visibility: hidden;
}

.checkbox-wrapper-35 .switch:checked+label::before {
  background-color: #08c224;
}

.checkbox-wrapper-35 .switch:checked+label::after {
  -webkit-transform: translate3d(10px, 0, 0);
  transform: translate3d(10px, 0, 0);
}

.checkbox-wrapper-35 .switch:checked+label .switch-x-unchecked {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.checkbox-wrapper-35 .switch:checked+label .switch-x-checked {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
}
</style>