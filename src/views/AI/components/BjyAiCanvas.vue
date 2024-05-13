<template>
    <div class="ext-canvas">
        <div class="ext-canvas-main">
            <BjyAiLoading v-if="loading" title="生成中，预计需要1-3分钟左右" />

            <template v-else>
                <img v-if="!currentImage.id" src="../assets/no_image.png" alt="" />

                <template v-else>
                    <template v-if="formatImgResults(currentImage)">
                        <BjyAiCanvasPane :currentImgResults="formatImgResults(currentImage)" />
                    </template>

                    <BjyAiLoading v-else title="生成中，预计需要1-3分钟左右" />
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import BjyAiLoading from "./BjyAiLoading.vue"
import BjyAiCanvasPane from "./BjyAiCanvasPane.vue"
export default {
    components: {
        BjyAiCanvasPane,
        BjyAiLoading,
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        currentImage: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {}
    },
    methods: {
        formatImgResults(currentImage) {
            if (currentImage && currentImage.imgResults) {
                const json = currentImage.imgResults
                const imgUrl = currentImage.imgUrl

                if (json && typeof json === "string") {
                    try {
                        const results = JSON.parse(json)

                        return Array.isArray(results) && results.length > 0
                            ? [imgUrl, ...results]
                            : false
                    } catch (error) {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        },
    },
}
</script>

<style scoped lang="scss">
.ext-canvas {
    height: 100%;
    padding: 24px;
    box-sizing: border-box;
    background-color: #fafafa;

    &-main {
        height: 100%;
        padding: 32px 48px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
