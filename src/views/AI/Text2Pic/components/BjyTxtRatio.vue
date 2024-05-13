<template>
    <div class="txt-ratio">
        <div class="txt-ratio-title">画布比例</div>
        <div class="txt-ratio-main">
            <div
                :class="{
                    'txt-ratio-item': true,
                    'txt-ratio-active': active === idx,
                }"
                @click="handleClick(idx)"
                v-for="(item, idx) in ratios"
                :key="idx"
            >
                <div
                    class="ratio-item-box"
                    :style="`width: ${item.width}px; height: ${item.height}px;`"
                ></div>
                <div class="ratio-item-title">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            ratios: [
                {
                    title: "4:3",
                    width: 48,
                    height: 36,
                },
                {
                    title: "3:4",
                    width: 36,
                    height: 48,
                },
                {
                    title: "16:9",
                    width: 48,
                    height: 27,
                },
                {
                    title: "9:16",
                    width: 27,
                    height: 48,
                },
                {
                    title: "1:1",
                    width: 48,
                    height: 48,
                },
            ],
        }
    },
    methods: {
        handleClick(idx) {
            this.active = idx
        },
    },
}
</script>

<style scoped lang="scss">
.txt-ratio {
    margin-top: 24px;
    background-color: #f2f2f2;
    border-radius: 8px;
    padding: 6px;

    &-title {
        padding: 6px;
    }

    &-main {
        padding: 6px 6px 12px;
        display: flex;
        gap: 6px;
    }

    &-item {
        flex: 1;
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 6px 3px;
        height: 63px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        .ratio-item-box {
            background-color: #ddd;
        }

        .ratio-item-title {
            text-align: center;
        }
    }

    &-active {
        border-color: #d92523;

        .ratio-item-box {
            background-color: #d92523;
        }
    }
}
</style>
