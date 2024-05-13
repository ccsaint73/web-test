<template>
    <div class="ai-hist">
        <div class="ai-hist-title">历史记录</div>

        <div class="ai-hist-main">
            <div
                :class="{
                    'ai-hist-item': true,
                    'ai-hist-active': active == idx,
                }"
                v-for="(item, idx) in dataSource"
                :key="idx"
                @click="handleClick(idx)"
            >
                <template v-if="formatImgResults(item.imgResults)">
                    <div
                        class="ai-hist-sub"
                        v-for="(subItem, subIdx) in formatImgResults(item.imgResults)"
                        :key="subIdx"
                    >
                        <div class="sub-inner">
                            <div class="sub-inner-img">
                                <img :src="subItem" alt="" />
                            </div>
                        </div>
                    </div>
                </template>
                <div v-else class="ai-hist-loading">
                    <BjyAiLoading />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BjyAiLoading from "./BjyAiLoading.vue"

export default {
    components: {
        BjyAiLoading,
    },
    props: {
        dataSource: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            active: 0,
        }
    },
    methods: {
        handleClick(idx) {
            this.active = idx

            this.$emit("select", this.dataSource[idx])
        },
        formatImgResults(json) {
            if (json && typeof json === "string") {
                try {
                    const results = JSON.parse(json)

                    return Array.isArray(results) && results.length > 0 ? results : false
                } catch (error) {
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
.ai-hist {
    height: 100%;
    background-color: #fff;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-title {
        color: #1c1d1f;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        padding-bottom: 12px;
    }

    &-main {
        flex: 1;
        overflow: scroll;

        &::-webkit-scrollbar {
            width: 0px;
        }
    }

    &-item {
        width: 174px;
        height: 174px;
        border: 1px solid #ddd;
        margin-bottom: 12px;
        border-radius: 8px;
        padding: 6px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
    }

    &-active {
        border-color: #d92523;
    }

    &-sub {
        width: 50%;
        padding: 3px;
        box-sizing: border-box;

        .sub-inner {
            width: 75px;
            height: 75px;
            background-color: #efefef;
            border-radius: 8px;

            &-img {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;

                img {
                    width: 100%;
                }
            }
        }
    }

    &-img {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }

    &-loading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
