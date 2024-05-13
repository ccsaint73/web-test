<template>
    <div class="bjy-pic">
        <div class="bjy-pic-menu">
            <BjyPicMenu @submit="handleSubmit" />
        </div>

        <div class="bjy-pic-main">
            <BjyAiCanvas />
        </div>

        <div class="bjy-pic-history">
            <BjyAiHistory />
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
import BjyPicMenu from "./BjyPicMenu.vue"
import BjyAiCanvas from "../components/BjyAiCanvas.vue"
import BjyAiHistory from "../components/BjyAiHistory.vue"
</script>

<style scoped lang="scss">
.bjy-pic {
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
