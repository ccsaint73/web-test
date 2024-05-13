<template>
    <div class="pic-out">
        <div class="pic-out-title">出图质量</div>
        <div class="pic-out-main">
            <div
                :class="{
                    'pic-out-action': true,
                    'pic-out-active': type === 'stand',
                }"
                @click="handleClick('stand')"
            >
                标清
            </div>
            <div
                :class="{
                    'pic-out-action': true,
                    'pic-out-active': type === 'high',
                }"
                @click="handleClick('high')"
            >
                高清
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "stand",
        }
    },
    methods: {
        handleClick(type) {
            this.type = type
        },
    },
}
</script>

<style scoped lang="scss">
.pic-out {
    margin-top: 24px;
    background-color: #f2f2f2;
    padding: 12px 12px 18px;
    border-radius: 8px;

    &-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
    }

    &-main {
        display: flex;
    }

    &-action {
        padding: 6px 24px;
        border: 1px solid #ddd;
        margin-right: 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    &-active {
        border-color: #d92523;
        color: #d92523;
    }
}
</style>
