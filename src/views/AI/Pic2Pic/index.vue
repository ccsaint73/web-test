<template>
    <div class="bjy-txt">
        <div class="bjy-txt-menu">
            <BjyPicMenu @submit="handleSubmit" :loading.sync="loading" @refresh="handleRefresh" />
        </div>

        <div class="bjy-txt-main">
            <BjyPicCanvas :loading.sync="loading" :currentImage="currentImage" extend />
        </div>

        <div class="bjy-txt-history">
            <BjyPicHistory :dataSource="history" @select="handleSelect" />
        </div>
    </div>
</template>

<script>
import BjyPicMenu from "./BjyPicMenu.vue"
import BjyPicCanvas from "../components/BjyAiCanvas.vue"
import BjyPicHistory from "../components/BjyAiHistory.vue"

import { getTxt2ImgProgress, getTxt2ImgHistory } from "../service"

export default {
    components: {
        BjyPicMenu,
        BjyPicCanvas,
        BjyPicHistory,
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
        this.getTxt2ImgProgress()
        this.getTxt2ImgHistory()
    },
    methods: {
        handleSelect(currentImage) {
            this.currentImage = currentImage
        },
        handleRefresh(id, taskId) {
            this.id = id
            this.taskId = taskId

            this.getTxt2ImgProgress()
            this.getTxt2ImgHistory()
        },
        handleSubmit() {
            // 制作中
            this.loading = true
        },
        getTxt2ImgProgress() {
            if (this.id && this.taskId) {
                clearInterval(this.itl)

                this.itl = setInterval(() => {
                    getTxt2ImgProgress(this.id, this.taskId)
                        .then((res) => {
                            if (res.code === 200 && res.data) {
                                if (res.data.status === 0) {
                                    this.loading = true
                                } else {
                                    this.loading = false
                                    this.getTxt2ImgHistory()
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
        getTxt2ImgHistory() {
            getTxt2ImgHistory(2).then((res) => {
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
.bjy-txt {
    height: 100%;
    display: flex;
    overflow: hidden;

    &-menu {
        width: 390px;
        padding: 20px 0px;
        background-color: #fafafa;
    }

    &-main {
        flex: 1;
    }

    &-history {
        width: 200px;
    }
}
</style>
