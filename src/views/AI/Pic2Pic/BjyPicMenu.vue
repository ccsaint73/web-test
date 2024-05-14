<template>
    <div class="pic-menu">
        <div class="pic-menu-main">
            <BjyAiUpload @upload="handleUpload" />

            <BjyAiPrompt @change="handleChange" />

            <BjyAiRatio @select="handleSelect" />

            <BjyAiNum @change="handleNumChange" />
        </div>

        <div class="pic-menu-submit" @click="handleSubmit">开始生成图片</div>
    </div>
</template>

<script>
import BjyAiUpload from "../components/BjyAiUpload.vue"
import BjyAiNum from "../components/BjyAiNum.vue"
import BjyAiPrompt from "../components/BjyAiPrompt.vue"
import BjyAiRatio from "../components/BjyAiRatio.vue"

import { handleTxt2Img } from "../service"

export default {
    components: {
        BjyAiUpload,
        BjyAiPrompt,
        BjyAiRatio,
        BjyAiNum,
    },
    data() {
        return {
            params: {
                imgUrl: "",
                type: 2,
                ratio: "4:3",
                generateNum: 1,
                prompt: "",
            },
        }
    },
    methods: {
        handleUpload(imgUrl) {
            this.params.imgUrl = imgUrl
        },
        handleNumChange(generateNum) {
            this.params.generateNum = generateNum
        },
        handleChange(prompt) {
            this.params.prompt = prompt
        },
        handleSelect(item) {
            this.params.ratio = item.title
        },
        handleSubmit() {
            if (!this.params.imgUrl || this.params.imgUrl === "") {
                this.$message.error("请上传图片")

                return
            }

            if (!this.params.prompt || this.params.prompt === "") {
                this.$message.error("请输入提示词")

                return
            }

            console.log(this.params)

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
