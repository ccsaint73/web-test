<template>
    <div class="txt-menu">
        <div class="txt-menu-main">
            <BjyTxtPrompt @change="handleChange" />

            <BjyTxtRatio @select="handleSelect" />

            <BjyAiNum @change="handleNumChange" />
        </div>

        <div class="txt-menu-submit" @click="handleSubmit">开始生成图片</div>
    </div>
</template>

<script>
import BjyTxtPrompt from "./components/BjyTxtPrompt.vue"
import BjyTxtRatio from "./components/BjyTxtRatio.vue"
import BjyAiNum from "../components/BjyAiNum.vue"

import { handleTxt2Img } from "../service"

export default {
    components: {
        BjyTxtPrompt,
        BjyTxtRatio,
        BjyAiNum,
    },
    data() {
        return {
            params: {
                ratio: "4:3",
                generateNum: 2,
                type: 1,
                prompt: "",
            },
        }
    },
    methods: {
        handleChange(prompt) {
            this.params.prompt = prompt
        },
        handleSelect(item) {
            this.params.ratio = item.title
        },
        handleNumChange(generateNum) {
            this.params.generateNum = generateNum
        },
        handleSubmit() {
            if (!this.params.prompt || this.params.prompt === "") {
                this.$message.error("请输入提示词")

                return
            }

            this.$emit("update:loading", true)

            handleTxt2Img(this.params).then((res) => {
                if (res.code === 200) {
                    this.$emit("refresh", res.data.id, res.data.taskId)
                }

                this.$emit("submit")
            })
        },
    },
}
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
