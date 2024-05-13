<template>
    <div class="canvas-pane">
        <div ref="imgBox" class="canvas-pane-img">
            <img
                ref="currentImg"
                v-if="currentImg"
                :width="size.width"
                :height="size.height"
                :src="currentImg"
                alt=""
            />
        </div>
        <div class="canvas-pane-tab">
            <div class="tab-inner">
                <div
                    class="tab-inner-item"
                    @click="handleClick(item)"
                    v-for="(item, idx) in currentImgResults"
                    :key="idx"
                >
                    <img :src="item" alt="" />
                    <div class="tab-inner-cover" v-if="currentImg != item"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentImgResults: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentImg: null,
            size: {
                width: 300,
                height: 300,
            },
        }
    },
    mounted() {
        window.addEventListener("resize", () => {
            if (this.currentImg) {
                this.resize(this.currentImg)
            }
        })
    },
    methods: {
        async getImageSize(imgUrl) {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = function () {
                    resolve({
                        width: img.width,
                        height: img.height,
                    })
                }
                img.onerror = reject
                img.src = imgUrl
            })
        },
        handleClick(item) {
            this.currentImg = item
        },
        resize(url) {
            if (url) {
                this.getImageSize(url).then((size) => {
                    if (this.$refs.imgBox) {
                        const offsetWidth = this.$refs.imgBox.offsetWidth
                        const offsetHeight = this.$refs.imgBox.offsetHeight

                        console.log(offsetWidth, offsetHeight)

                        if (offsetWidth / offsetHeight > size.width / size.height) {
                            this.size.height = offsetHeight
                            this.size.width = (size.width / size.height) * offsetHeight
                        } else {
                            this.size.width = offsetWidth
                            this.size.height = offsetWidth / (size.width / size.height)
                        }
                    } else {
                        setTimeout(() => {
                            this.resize(url)
                        }, 200)
                    }
                })
            }
        },
    },
    watch: {
        currentImg: {
            handler(val) {
                setTimeout(() => {
                    this.resize(val)
                }, 0)
            },
            immediate: true,
        },
        currentImgResults: {
            handler(val) {
                if (val.length > 1) {
                    this.currentImg = this.currentImgResults[1]
                }
            },
            immediate: true,
            deep: true,
        },
    },
}
</script>

<style scoped lang="scss">
.canvas-pane {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-img {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        overflow: hidden;

        img {
            border-radius: 8px;
        }
    }

    &-tab {
        flex-shrink: 0;
        height: 120px;
        padding-top: 24px;
        width: 100%;
        overflow-x: scroll;
        display: flex;

        .tab-inner {
            display: flex;
            gap: 12px;
            margin: 0 auto;

            &-item {
                position: relative;
                width: 120px;
                height: 120px;
                overflow: hidden;
                display: flex;
                flex-shrink: 0;
                align-items: center;
                cursor: pointer;

                img {
                    width: 100%;
                }
            }

            &-cover {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: #efefef99;
            }
        }
    }
}

@media (max-width: 1440px) {
    .canvas-pane {
        &-tab {
            .tab-inner {
                &-item {
                    width: 90px;
                    height: 90px;
                }
            }
        }
    }
}
</style>
