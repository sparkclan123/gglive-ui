<template>
    <div v-if="showAdjustPlayerModal" role="presentation" class="dialog-overlay">
        <dialog role="dialog" aria-labelledby="dialog-title" class="styled-dialog" open>
            <div role="document">
                <div class="dialog-header">
                    <h2 id="dialog-title" class="dialog-heading">{{ playerName }}</h2>
                    <div class="close-button-wrap">
                        <button class="close-button" @click="$emit('close-modal')">
                            <span class="close-label">close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                class="close-icon">
                                <polygon fill-rule="evenodd"
                                    points="16 13.56 10.441 8 16 2.44 13.56 0 8.001 5.56 2.441 0 .001 2.44 5.561 8 0 13.56 2.44 16 8.001 10.44 13.56 16">
                                </polygon>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="dialog-body">
                    <ul>
                        <li class="dialog-button-item">
                            <button @click="setCaptain" type="button"
                                class="set-captan-info-button">ตั้งเป็นกับตันทีม</button>
                        </li>
                        <!-- <li class="dialog-button-item">
                            <button @click="removePlayer" type="button"
                                class="player-info-button">รายละเอียดผู้เล่น</button>
                        </li> -->
                        <li class="dialog-button-item">
                            <button @click="removePlayer" type="button" class="remove-player-button">ลบ ผู้เล่น</button>
                        </li>

                    </ul>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script>
export default {
    props: {
        showAdjustPlayerModal: {
            type: Boolean,
            required: true
        },
        playerName: {
            type: String,
            required: true
        }
    },
    methods: {
        setCaptain() {
            this.$emit('set-captain');
        },
        removePlayer() {
            this.$emit('remove-player');
        }
    }
};
</script>

<style scoped>
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
    /* Semi-transparent background */
}

.styled-dialog {
    z-index: 120;
    max-width: 90%;
    max-height: 90%;
    padding: 0;
    border: 0;
    border-radius: 6px;
    width: 640px;
    color: currentcolor;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 12px 24px;
    background-repeat: no-repeat;
    background-position: right top, center, center;
    background-image: linear-gradient(rgba(255, 255, 255, 0) 10px, rgba(255, 255, 255, 0.2) 30px, white 60px), linear-gradient(to right, #b594ce, #b594ce);
}

.dialog-header {
    position: relative;
    text-align: center;
    margin-bottom: 2rem;
    padding-top: 2.4rem;
}

.dialog-heading {
    font-size: 1.3rem;
}

.close-button-wrap {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}

.close-button {
    padding: 0.5rem 0.8rem;
    border: 0;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.3);
    line-height: 0;
    cursor: pointer;
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

.remove-player-button {
    display: block;
    padding: 0.9rem;
    border: 0;
    border-radius: 3px;
    font-size: 0.8rem;
    cursor: pointer;
    background: rgb(158, 31, 42);
    color: white;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 8px;
    width: 100%;
}
.set-captan-info-button {
    display: block;
    padding: 0.9rem;
    border: 0;
    border-radius: 3px;
    font-size: 0.8rem;
    cursor: pointer;
    background: rgb(30, 122, 25);
    color: white;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 8px;
    width: 100%;
}

.player-info-button {
    display: block;
    padding: 0.9rem;
    border: 0;
    border-radius: 3px;
    font-size: 0.8rem;
    cursor: pointer;
    background: rgb(239, 239, 239);
    color: black;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 8px;
    width: 100%;
}
</style>