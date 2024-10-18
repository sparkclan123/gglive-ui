<template>
  <div>

    asdasdasdasd
    <div role="presentation" class="fixed inset-0 z-[1000] bg-black/60 duration-300 overflow-hidden"
      @click.self.prevent="$emit('close-modal')" :class="{
        '!bg-black/0 pointer-events-none': !showCopyTeamModal,
      }">
      <Transition>
        <main v-if="showCopyTeamModal" class="fixed inset-x-0 bottom-0 max-h-[90dvh] rounded-t-lg flex flex-col">
          {{ }}
          <div class="player-selection bg-color-2 shadow-lg h-full text-gray-200  rounded-lg shadow-xl overflow-y-auto">

            <div class="sticky top-0 bg-[#1e1036] p-4 !rounded-t-xl">
              <span class="text-xs">คัดลอกทีมเกมวีคปัจุบัญ</span>
              <button class="close-button" @click="$emit('close-modal')">

                <span class="close-icon">&times;</span>
              </button>


            </div>
            <div class="cus-bg-card-vip text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer"
              v-if="data_vip.length > 0" v-for="vip in data_vip" @click="copy(vip.id, 'vip', vip.name)">
              <div class="flex items-center justify-between">
                <div class="flex items-center font-semibold justify-between">
                  <div class="flex items-center space-x-1">
                    <div class=" w-7 h-7  ">
                      <img class="w-7 h-7 " src="/public/assets/logonew.png" />
                    </div>
                    <div class="text-xs ">{{ vip.name }}
                      <span class="flex items-center">
                        <DateFormatted :dateString="vip.created_at" class="font-thin text-[10px]" />
                        <i class="fas fa-ticket-alt text-yellow-400 ml-1"></i>
                      </span>
                    </div>

                  </div>
                </div>

              </div>

            </div>
            <div class="cus-bg-card-vip text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer"
              v-else>
              ไม่มีข้อมูลทีมวีค VIP
            </div>
            <div class="cus-bg-card-n text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer"
              v-if="data_n.length > 0" v-for="n in data_n" @click="copy(n.id, 'n', n.name)">
              <div class="flex items-center justify-between">
                <div class="flex items-center font-semibold justify-between">
                  <div class="flex items-center space-x-1">
                    <div class=" w-7 h-7  ">
                      <img class="w-7 h-7 " src="/public/assets/logonew.png" />
                    </div>
                    <div class="text-xs ">{{ n.name }}
                      <span class="flex items-center">
                        <DateFormatted :dateString="n.created_at" class="font-thin text-[10px]" />
                       
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
            <div class="cus-bg-card-n text-gray-800  flex flex-col rounded-xl shadow-lg p-2 m-5 cursor-pointer" v-else>
              ไม่มีข้อมูลทีมวีคปกติ
            </div>
            

          </div>



        </main>
      </Transition>
    </div>
  </div>
</template>

<script>
import { api } from '@axios_inst';
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';
export default {
  props: ['showCopyTeamModal'],
  data() {
    return {
      isLoading: false,
      data_vip: [],
      data_n: [],
    }
  },

  watch: {
    showCopyTeamModal(newVal) {

      if (!newVal) {
        document.body.style.overflow = '';

      }
      if (newVal) {
        this.facthAllMyteam();
      }
    },

  },
  computed: {

  },
  methods: {
    ...mapActions('loading', ['updateLoading']),
    async copy(id, type, name) {
      // ยืนยันที่จะคัดลอกทีมนี้
      const result = await Swal.fire({
        title: `ทีม ${name}`,
        text: `คุณต้องการคัดลอกทีม ใช่หรือไม่?`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่ใช่',
        customClass: {
          cancelButton: 'btn-cancel',
          popup: 'popup-custom',
          title: 'text-custom',
          htmlContainer: 'text-custom'
        }
      });

      if (result.isConfirmed) {
        this.updateLoading(true);
        try {
          const access_token = localStorage.getItem('access_token');
          const response = await api.post(`/premier-league/v1/copy-my-team`, {
            main_id: id,
            type: type
          }, {
            headers: { Authorization: `Bearer ${access_token}` }
          });

          if (response.data.ok) {
            
            this.$emit('copy-player', response.data.data);
            
          }
          this.updateLoading(false);
        } catch (error) {
          console.error('Error fetching matches:', error);
          this.updateLoading(false);
        }
       
      }
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
    async facthAllMyteam() {
      this.updateLoading(true);
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await api.get(`/premier-league/v1/get-all-my-teams`, {
          headers: { Authorization: `Bearer ${access_token}` }
        });
        if (response.data.ok) {
          this.data_vip = response.data.mygamemain;
          this.data_n = response.data.mygamemainN;
        }
        this.updateLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        this.updateLoading(false);
      }
    },
  },
  async mounted() {
    console.log('mounted');
  },
};
</script>

<style scoped>
.cus-bg-card-n {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #8341ca;
  transition: box-shadow 0.3s ease;
}

.cus-bg-card-vip {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #e8b201;
}

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
  position: absolute;
  /* ใช้ absolute เพื่อให้ปุ่มอยู่ตามที่ต้องการ */
  top: -5px;
  /* ระยะจากขอบบน */
  right: 10px;
  /* ระยะจากขอบขวา */
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