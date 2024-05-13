<template>
    <div class="ai-item">
        <div class="ai-item-top">
            <div>图片张数</div>

            <el-input-number
                v-model="generateNum"
                size="mini"
                controls-position="right"
                :min="1"
                :max="4"
                @input="handleChange"
            ></el-input-number>
        </div>
        <div class="ai-item-bottom">
            <el-slider
                @change="handleChange"
                v-model="generateNum"
                :show-tooltip="false"
                :min="1"
                :max="4"
            ></el-slider>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            generateNum: 1,
        }
    },
    methods: {
        handleChange() {
            this.$emit("change", this.generateNum)
        },
    },
}
</script>

<style scoped lang="scss">
.ai-item {
    margin-top: 20px;
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
    //background-color: #409eff;
}

::v-deep .el-slider__bar {
    //background-color: #409eff;
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
