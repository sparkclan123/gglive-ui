<template>
  <Teleport to="body">
    <div v-if="showAdjustPlayerModal" class="builder-modal-backdrop" @click.self="$emit('close-modal')" @keydown.esc="$emit('close-modal')">
      <section v-member-dialog ref="dialog" role="dialog" aria-modal="true" aria-label="จัดการนักเตะ" class="builder-modal builder-captain-modal">
        <div class="builder-modal-handle" aria-hidden="true"></div>
        <button ref="close" class="builder-close" @click="$emit('close-modal')" aria-label="ปิด">×</button>
        <p class="builder-eyebrow">PLAYER ACTIONS</p><h2>{{ playerName }}</h2><p>เลือกกัปตัน 1 คน เพื่อเป็นผู้นำทีมของคุณ</p>
        <button @click="$emit('set-captain')" class="builder-button builder-captain-action"><b>C</b> ตั้งเป็นกัปตันทีม</button>
        <button @click="$emit('remove-player')" class="builder-button builder-secondary">ลบนักเตะออกจากทีม</button>
      </section>
    </div>
  </Teleport>
</template>
<script>
export default {
  props: { showAdjustPlayerModal: { type: Boolean, required: true }, playerName: { type: String, required: true } },
  emits: ['close-modal', 'set-captain', 'remove-player'],

};
</script>
<style src="../../styles/builder.css"></style>
