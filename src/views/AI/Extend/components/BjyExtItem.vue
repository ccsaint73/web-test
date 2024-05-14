<template>
    <div class="ext-item">
        <div class="ext-item-top">
            <div class="ext-item-title">{{ title }}</div>

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
                v-model="ratioNum"
                :show-tooltip="false"
                :min="100"
                :max="200"
                @change="handleNumChange"
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
            ratio: "125",
            ratioNum: 125,
        }
    },
    methods: {
        handleChange() {
            if (this.ratio >= 100 && this.ratio <= 200) {
                this.ratioNum = parseInt(this.ratio)
                this.$emit("change", this.ratioNum)
            }
        },
        handleNumChange() {
            this.ratio = `${this.ratioNum}`

            this.$emit("change", this.ratioNum)
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

    &-title {
        font-size: 14px;
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
