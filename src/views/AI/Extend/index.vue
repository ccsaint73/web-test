<template>
    <div class="bjy-ext">
        <div class="bjy-ext-menu">
            <BjyExtMenu @submit="handleSubmit" :loading.sync="loading" @refresh="handleRefresh" />
        </div>

        <div class="bjy-ext-main">
            <BjyExtCanvas :loading.sync="loading" :currentImage="currentImage" />
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
import { getToken } from "@/utils/auth"
import { getTicketDetail } from "@/api/home"

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
            ticket: "",
            signature: "",
            appId: "",
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

            // 获取制作进度
            this.getImageExtProgress()
            this.getImageExtHistory()
        },
        getImageExtProgress() {
            if (this.id && this.taskId) {
                clearInterval(this.itl)

                this.itl = setInterval(() => {
                    const params = {
                        token: getToken(),
                        user_id: this.user_id,
                        type: "bjc_digital",
                    }

                    getTicketDetail(params)
                        .then((response) => {
                            const ticket = response.data.ticket
                            const signature = response.data.signature
                            const appId = response.data.app_id

                            getImageExtProgress(this.id, this.taskId, ticket, signature, appId)
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
                        })
                        .catch(() => {
                            this.getImageExtProgress()
                        })
                }, 10000)
            }
        },
        getImageExtHistory() {
            const params = {
                token: getToken(),
                user_id: this.user_id,
                type: "bjc_digital",
            }

            getTicketDetail(params).then((res) => {
                const ticket = res.data.ticket
                const signature = res.data.signature
                const appId = res.data.app_id

                getImageExtHistory(ticket, signature, appId).then((res) => {
                    if (res.code === 200) {
                        this.history = res.data.items

                        if (this.history.length > 0) {
                            this.currentImage = this.history[0]
                        }
                    }
                })
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
