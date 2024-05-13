<template>
    <div class="bjy-ext">
        <div class="bjy-ext-menu">
            <BjyExtMenu @submit="handleSubmit" :loading.sync="loading" @refresh="handleRefresh" />
        </div>

        <div class="bjy-ext-main">
            <BjyExtCanvas :loading.sync="loading" :currentImage="currentImage" extend />
        </div>

        <div class="bjy-ext-history">
            <BjyAIHistory :dataSource="history" @select="handleSelect" />
        </div>
    </div>
</template>

<script>
import BjyExtMenu from "./BjyExtMenu.vue"
import BjyExtCanvas from "../components/BjyAiCanvas.vue"
import BjyAIHistory from "../components/BjyAiHistory.vue"

import { getImageExtProgress, getImageExtHistory } from "../service"

export default {
    components: {
        BjyExtMenu,
        BjyExtCanvas,
        BjyAIHistory,
    },
    data() {
        return {
            history: [],
            loading: false,
            currentImage: {},
            itl: null,
            id: "",
            taskId: "",
        }
    },
    mounted() {
        this.getImageExtProgress()
        this.getImageExtHistory()
    },
    methods: {
        handleSelect(currentImage) {
            this.currentImage = currentImage
        },
        handleRefresh(id, taskId) {
            this.id = id
            this.taskId = taskId

            this.getImageExtProgress()
            this.getImageExtHistory()
        },
        handleSubmit() {
            // 制作中
            this.loading = true
        },
        getImageExtProgress() {
            if (this.id && this.taskId) {
                clearInterval(this.itl)

                this.itl = setInterval(() => {
                    getImageExtProgress(this.id, this.taskId)
                        .then((res) => {
                            if (res.code === 200 && res.data) {
                                if (res.data.status === 0) {
                                    this.loading = true
                                } else {
                                    this.loading = false
                                    this.getImageExtHistory()
                                    clearInterval(this.itl)
                                }
                            }
                        })
                        .catch((err) => {
                            clearInterval(this.itl)
                        })
                }, 10000)
            }
        },
        getImageExtHistory() {
            getImageExtHistory().then((res) => {
                if (res.code === 200) {
                    this.history = res.data.items
                    if (this.history.length > 0) {
                        this.currentImage = this.history[0]
                    }
                }
            })
        },
    },
    beforeDestroy() {
        clearInterval(this.itl)
    },
}
</script>

<style scoped lang="scss">
.bjy-ext {
    height: 100%;
    display: flex;
    overflow: hidden;

    &-menu {
        width: 390px;
        padding: 20px 0px;
        background-color: #fafafa;
        flex-shrink: 0;
    }

    &-main {
        flex: 1;
        overflow: hidden;
    }

    &-history {
        width: 200px;
        flex-shrink: 0;
    }
}
</style>
