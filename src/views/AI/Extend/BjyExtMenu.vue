<template>
    <div class="ext-menu">
        <div class="ext-menu-main">
            <BjyAiUpload @upload="handleUpload" />

            <BjyExtTab @type="handleTypeChange" @ratio="handleRatioChange" @px="handlePxChange" />

            <BjyAiNum @change="handleNumChange" />
        </div>

        <div class="ext-menu-submit" @click="handleSubmit">开始生成图片</div>
    </div>
</template>

<script>
import BjyAiUpload from "../components/BjyAiUpload.vue"
import BjyAiNum from "../components/BjyAiNum.vue"
import BjyExtTab from "./components/BjyExtTab.vue"

import { getToken } from "@/utils/auth"
import { getTicketDetail } from "@/api/home"
import { handleImageExt } from "../service"

export default {
    components: {
        BjyAiUpload,
        BjyAiNum,
        BjyExtTab,
    },
    data() {
        return {
            type: "ratio",
            ratio: 125,
            pixel: 125,
            options: [
                {
                    label: "上扩容",
                    value: "125",
                    key: "top",
                },
                {
                    label: "下扩容",
                    value: "125",
                    key: "bottom",
                },
                {
                    label: "左扩容",
                    value: "125",
                    key: "left",
                },
                {
                    label: "右扩容",
                    value: "125",
                    key: "right",
                },
            ],
            params: {
                imgUrl: "",
                prompt: "",
                generateNum: 1,
            },
        }
    },
    methods: {
        handleUpload(imgUrl) {
            this.params.imgUrl = imgUrl
        },
        handleChange(prompt) {
            this.params.prompt = prompt
        },
        handleSubmit() {
            if (!this.params.imgUrl || this.params.imgUrl === "") {
                this.$message.error("请上传图片")

                return
            }

            // 拼接参数
            const params = {
                ...this.params,
            }

            if (this.type === "ratio") {
                params.expandRatio = (parseFloat(this.ratio - 100) / 100).toFixed(3)
            } else {
                let extPx = {}

                this.options.forEach((item) => {
                    extPx[item.key] = item.value
                })

                params.freeExpandPixel = JSON.stringify(extPx)
            }

            this.$emit("update:loading", true)

            const tp = {
                token: getToken(),
                user_id: this.user_id,
                type: "bjc_digital",
            }

            getTicketDetail(tp).then((res) => {
                const ticket = res.data.ticket
                const signature = res.data.signature
                const appId = res.data.app_id

                handleImageExt(params, ticket, signature, appId).then((res) => {
                    if (res.code === 200) {
                        this.$emit("refresh", res.data.id, res.data.taskId)
                    }

                    this.$emit("submit")
                })
            })
        },
        handleNumChange(generateNum) {
            this.params.generateNum = generateNum
        },
        handleTypeChange(type) {
            this.type = type
        },
        handleRatioChange(ratio) {
            this.ratio = ratio
        },
        handlePxChange(options) {
            this.options = options
        },
    },
}
</script>

<style scoped lang="scss">
.ext-menu {
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
