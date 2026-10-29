<template>
    <header class="member-team-header">
        <div class="member-team-heading">
            <button type="button" class="member-team-back" aria-label="กลับ" @click="$emit('back')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="m14 6-6 6 6 6M8 12h12" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <img v-if="avatar" :src="avatar" alt="" class="member-team-avatar">
            <div class="member-team-identity">
                <h1>{{ team.name || 'คะแนนทีม' }}</h1>
                <div v-if="team.week != null || team.season || competition" class="member-team-context">
                    <span v-if="team.week != null">เกมวีค {{ team.week }}</span>
                    <span v-if="team.season">ฤดูกาล {{ team.season }}</span>
                    <span v-if="competition" class="member-team-competition">{{ competition }}</span>
                </div>
            </div>
        </div>

        <dl class="member-team-stats">
            <div v-for="stat in stats" :key="stat.label" class="member-team-stat">
                <dt>{{ stat.label }}</dt>
                <dd>
                    <NumberDisplay v-if="stat.format === 'budget'" :number="stat.value" />
                    <span v-else>{{ stat.value ?? '—' }}</span>
                    <small v-if="stat.unit">{{ stat.unit }}</small>
                </dd>
            </div>
            <div v-if="createdAt" class="member-team-stat member-team-created">
                <dt>เวลาสร้างทีม</dt>
                <dd><DateFormatted :dateString="createdAt" /></dd>
            </div>
        </dl>

        <div v-if="editMode" class="member-team-editor">
            <div v-if="editMode === 'staged'" class="member-team-actions">
                <button type="button" class="member-team-save" @click.stop="$emit('save')">บันทึกแก้ไขทีม</button>
                <button type="button" class="member-team-reset" @click.stop="$emit('reset')">รีเซ็ต</button>
            </div>
            <p v-if="editMode === 'staged'">นำออก เพิ่มนักเตะ หรือเลือกกัปตัน แล้วกดบันทึกแก้ไขทีม</p>
            <p v-else>แตะนักเตะเพื่อเปลี่ยนตัวหรือเลือกกัปตัน การเปลี่ยนแปลงจะบันทึกทันที</p>
        </div>
    </header>
</template>

<script>
export default {
    name: 'MemberTeamHeader',
    props: {
        team: { type: Object, required: true },
        stats: { type: Array, required: true },
        avatar: { type: String, default: '' },
        competition: { type: String, default: '' },
        createdAt: { type: String, default: '' },
        editMode: { type: String, default: '' },
    },
    emits: ['back', 'save', 'reset'],
};
</script>

<style scoped>
.member-team-header {
    min-width: 0;
    overflow: hidden;
    color: var(--member-text);
    background: var(--member-panel);
    border: 1px solid var(--member-line);
    border-radius: 16px;
    font-family: var(--member-body);
}
.member-team-heading {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px 12px;
    min-width: 0;
}
.member-team-back {
    display: grid;
    place-items: center;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    padding: 10px;
    border: 1px solid var(--member-line);
    border-radius: 12px;
    color: var(--member-text);
    background: var(--member-panel-raised);
    cursor: pointer;
}
.member-team-back svg { width: 22px; height: 22px; }
.member-team-back:hover, .member-team-reset:hover { background: var(--member-hover); }
.member-team-header button:focus-visible { outline: 2px solid var(--member-soft); outline-offset: -3px; }
.member-team-avatar {
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    border: 1px solid var(--member-line);
    border-radius: 50%;
    object-fit: cover;
    background: var(--member-panel-raised);
}
.member-team-identity { min-width: 0; flex: 1; }
.member-team-identity h1 {
    margin: 0;
    color: var(--member-text);
    font-size: 18px;
    font-weight: 650;
    line-height: 1.45;
    letter-spacing: 0;
    overflow-wrap: anywhere;
}
.member-team-context {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px 10px;
    color: var(--member-muted);
    font-size: 10px;
    line-height: 1.7;
}
.member-team-context > span { white-space: nowrap; }
.member-team-competition { color: var(--member-soft); font-weight: 700; }
.member-team-stats {
    display: flex;
    align-items: stretch;
    gap: 0;
    margin: 0;
    padding: 9px 12px;
    border-top: 1px solid var(--member-line);
    background: var(--member-subtle);
}
.member-team-stat { flex: 1; min-width: 0; padding: 0 12px; }
.member-team-stat:first-child { padding-left: 0; }
.member-team-stat:last-child { padding-right: 0; }
.member-team-stat + .member-team-stat { border-left: 1px solid var(--member-line); }
.member-team-stat dt { color: var(--member-muted); font-size: 10px; line-height: 1.6; margin: 0 0 2px; }
.member-team-stat dd {
    display: flex;
    align-items: baseline;
    gap: 3px;
    margin: 0;
    color: var(--member-text);
    font: 600 27px/1.05 var(--member-display);
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
}
.member-team-stat:first-child dd { color: var(--member-soft); }
.member-team-stat dd :deep(span) { color: inherit; }
.member-team-stat dd small { color: var(--member-muted); font: 500 11px/1.4 var(--member-body); }
.member-team-created { flex: 1.75; }
.member-team-created dd { font: 500 11px/1.55 var(--member-body); }
.member-team-created :deep(p) { margin: 0; color: inherit; }
.member-team-editor { display: grid; gap: 7px; padding: 10px 12px; border-top: 1px solid var(--member-line); }
.member-team-editor p { margin: 0; color: var(--member-muted); font-size: 10px; line-height: 1.7; }
.member-team-actions { display: flex; gap: 8px; }
.member-team-actions button {
    min-height: 44px;
    padding: 9px 16px;
    border-radius: 10px;
    font: 600 12px/1.5 var(--member-body);
    cursor: pointer;
}
.member-team-save { flex: 1; background: var(--member-primary); color: #fff; border: 1px solid var(--member-primary); }
.member-team-reset { background: var(--member-panel-raised); color: var(--member-text); border: 1px solid var(--member-line); }
@media (min-width: 640px) {
    .member-team-heading { padding: 12px 16px; gap: 12px; }
    .member-team-identity h1 { font-size: 21px; }
    .member-team-context { font-size: 11px; }
    .member-team-stats { padding: 10px 16px; }
    .member-team-stat dt { font-size: 11px; }
    .member-team-stat dd { font-size: 30px; }
    .member-team-created dd { font-size: 12px; }
    .member-team-editor { grid-template-columns: 1fr auto; align-items: center; padding: 10px 16px; gap: 14px; }
    .member-team-editor p { grid-column: 1; grid-row: 1; font-size: 11px; }
    .member-team-actions { grid-column: 2; grid-row: 1; }
}
@media (max-width: 359px) {
    .member-team-heading { gap: 7px; padding: 8px; }
    .member-team-identity h1 { font-size: 16px; }
    .member-team-context { gap: 1px 7px; font-size: 9px; }
    .member-team-avatar { width: 26px; height: 26px; flex-basis: 26px; }
    .member-team-stats { padding: 8px; }
    .member-team-stat { padding: 0 8px; }
    .member-team-stat dd { font-size: 24px; }
    .member-team-created dd { font-size: 10px; }
    .member-team-editor { padding: 8px; }
}
</style>
