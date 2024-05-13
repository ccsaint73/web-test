<template>
    <div class="ext-item">
        <div class="ext-item-top">
            <div>{{ title }}</div>

            <el-input
                style="width: 120px"
                v-model="ratio"
                size="mini"
                placeholder="0"
                @input="handleChange"
            >
                <template slot="suffix">{{ unit }}</template>
            </el-input>
        </div>
        <div class="ext-item-bottom">
            <el-slider
                v-model="ratio"
                :show-tooltip="false"
                :min="100"
                :max="200"
                @change="handleChange"
            ></el-slider>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        unit: {
            type: String,
            default: "",
        },
        item: {
            type: Number,
            default: 125,
        },
    },
    data() {
        return {
            ratio: 125,
        }
    },
    methods: {
        handleChange() {
            this.$emit("change", this.ratio)
        },
    },
    watch: {
        item: {
            handle(val) {
                this.ratio = val
            },
        },
    },
}
</script>

<style scoped lang="scss">
.ext-item {
    &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
}

::v-deep .el-slider__button {
    border-color: #fff;
}

::v-deep .el-slider__bar {
    background-color: #d92523;
    height: 3px;
}

::v-deep .el-slider__runway {
    width: 92%;
    left: 12px;
    height: 3px;
}

::v-deep .el-slider__button-wrapper {
    top: -17px;
}
</style>
