<template>
  <div class="min-h-screen bg-gray-100">
    <LodingSceen :loading="loading" />

    <!-- Tabs -->
    <div class="flex justify-center pt-4">
      <div
        class="flex bg-white/80 backdrop-blur-md shadow-md rounded-xl overflow-hidden"
      >
        <button
          class="px-5 py-2 text-sm font-medium transition-all duration-300"
          :class="activeTab === 'tab2' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'text-gray-600 hover:text-blue-600'"
          @click="SetactiveTab('tab2')"
        >
          คะเเนนนักเตะ
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <transition name="slide" mode="out-in" @before-enter="beforeEnter" @leave="leave">
        <component :is="currentTabComponent" :key="activeTab" v-bind="currentTabProps"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import WeekPoint from "../../components/detailpoint/weekpoint.vue";
import TablePoint from "../../components/detailpoint/tablePoint.vue";

export default {
  name: "challenge",
  data() {
    return {
      activeTab: "tab2",
    };
  },
  components: {
    WeekPoint,
    TablePoint,
  },
  computed: {
    currentTabComponent() {
      return this.activeTab === "tab2" ? "WeekPoint" : "TablePoint";
    },
    currentTabProps() {
      return {};
    },
  },
  methods: {
    SetactiveTab(tab) {
      this.activeTab = "tab2";
      localStorage.setItem("point-tab", tab);
    },
    beforeEnter(el) {
      el.style.transform = "translateX(100%)";
      el.style.opacity = 0;
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        el.style.transform = "translateX(0)";
        el.style.opacity = 1;
      });
    },
    leave(el, done) {
      el.style.transform = "translateX(0)";
      el.style.opacity = 1;
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        el.style.transform = "translateX(-100%)";
        el.style.opacity = 0;
        setTimeout(done, 300);
      });
    },
  },
  created() {
    const tab = localStorage.getItem("point-tab");
    if (tab) this.activeTab = "tab2";
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
