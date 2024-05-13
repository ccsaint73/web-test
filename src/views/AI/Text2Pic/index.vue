<template>
    <div class="bjy-txt">
        <div class="bjy-txt-menu">
            <BjyTxtMenu @submit="handleSubmit" />
        </div>

        <div class="bjy-txt-main">
            <BjyTxtCanvas />
        </div>

        <div class="bjy-txt-history">
            <BjyTxtHistory :dataSource="history" />
        </div>
    </div>
</template>

<script>
import { getImageExtProgress, getImageExtHistory } from "../service"

export default {
    data() {
        return {
            history: [],
        }
    },
    mounted() {
        getImageExtHistory().then((res) => {
            if (res.code === 200) {
                this.history = res.data.items
            }
        })

        // getImageExtProgress().then((res) => {
        //     console.log(res)
        // })
    },
    methods: {
        handleSubmit() {},
    },
}
</script>

<script setup>
import BjyTxtMenu from "./BjyTxtMenu.vue"
import BjyTxtCanvas from "../components/BjyAiCanvas.vue"
import BjyTxtHistory from "../components/BjyAiHistory.vue"
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
