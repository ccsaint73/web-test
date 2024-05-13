<template>
    <div class="ext-upload">
        <div class="ext-upload-title">上传原图</div>

        <el-upload
            class="ext-upload-uploader"
            action="#"
            accept="image/jpeg,image/png"
            :http-request="handleRequest"
            :show-file-list="false"
            :disabled="loading"
        >
            <div class="ext-upload-img" v-if="url && url != ''">
                <img :src="url" alt="" />
            </div>

            <div v-else class="ext-upload-icon">
                <i class="el-icon-upload" v-loading="loading"></i>
            </div>
        </el-upload>
    </div>
</template>

<script>
import { handleUpload } from "../service"
import { getToken } from "@/utils/auth"
import { getTicketDetail } from "@/api/home"

export default {
    data() {
        return {
            loading: false,
            url: "",
        }
    },
    methods: {
        beforeOssUpload() {},
        async handleRequest(res) {
            this.loading = true

            const file = res.file

            try {
                const params = {
                    token: getToken(),
                    user_id: this.user_id,
                    type: "bjc_digital",
                }

                getTicketDetail(params).then(async (res) => {
                    const ticket = res.data.ticket
                    const signature = res.data.signature
                    const appId = res.data.app_id

                    const response = await handleUpload(file, ticket, signature, appId)

                    if (response.data && response.data != "") {
                        this.url = response.data

                        this.$emit("upload", response.data)
                    }

                    this.loading = false
                })
            } catch (error) {
                this.loading = false
            }
        },
    },
}
</script>

<style scoped lang="scss">
.ext-upload {
    &-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
    }

    &-uploader {
        width: 100px;
        height: 100px;
        border: 1px dashed #d9d9d9;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }

    &-tip {
        margin: 6px 0px;
        width: 100px;
        text-align: center;
        color: #999;
    }

    &-img {
        width: 100px;
        height: 100px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 100%;
        }
    }

    &-icon {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

::v-deep .el-icon-upload {
    font-size: 33px;
    margin: 0px;
    color: #c9c9c9;
}
</style>
