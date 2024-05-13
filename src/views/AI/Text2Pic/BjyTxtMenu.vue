<template>
    <div class="txt-menu">
        <div class="txt-menu-main">
            <BjyTxtPrompt />

            <BjyTxtRatio />

            <BjyAiNum />
        </div>

        <div class="txt-menu-submit">开始生成图片</div>
    </div>
</template>

<script setup>
import BjyTxtPrompt from "./components/BjyTxtPrompt.vue"
import BjyTxtRatio from "./components/BjyTxtRatio.vue"
import BjyAiNum from "../components/BjyAiNum.vue"
</script>

<style scoped lang="scss">
.txt-menu {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    border-right: 1px dashed #cecece;
    box-sizing: border-box;

    &-main {
        flex: 1;
        overflow: scroll;

        &::-webkit-scrollbar {
            width: 0px;
        }
    }

    &-submit {
        height: 44px;
        border-radius: 22px;
        background-color: #d92523;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        cursor: pointer;
    }
}
</style>
