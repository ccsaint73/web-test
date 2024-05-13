<template>
    <div class="pic-menu">
        <div class="pic-menu-main">
            <BjyAiUpload />

            <BjyPicOut />
        </div>

        <div class="pic-menu-submit">开始生成图片</div>
    </div>
</template>

<script setup>
import BjyAiUpload from "../components/BjyAiUpload.vue"
import BjyPicOut from "./BjyPicOut.vue"
</script>

<style scoped lang="scss">
.pic-menu {
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
