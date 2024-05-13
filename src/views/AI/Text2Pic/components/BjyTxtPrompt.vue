<template>
    <div class="txt-pmt">
        <div class="txt-pmt-title">提示词</div>

        <div class="txt-pmt-main">
            <el-input
                type="textarea"
                resize="none"
                :autosize="{ minRows: 4, maxRows: 6 }"
                placeholder="请输入提示词"
                v-model="txt"
                @input="handleInput"
            ></el-input>

            <div class="txt-pmt-bottom">
                <div class="txt-pmt-count">0/800</div>
                <div class="txt-pmt-clear">清空</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            txt: "",
        }
    },
    methods: {
        handleInput() {},
    },
}
</script>

<style scoped lang="scss">
.txt-pmt {
    &-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
    }

    &-main {
        padding: 12px;
        background-color: #fff;
        border: 1px solid #ececec;
        border-radius: 4px;
    }

    &-bottom {
        display: flex;
        justify-content: flex-end;
    }

    &-clear {
        margin-left: 12px;
        color: #d92523;
        cursor: pointer;
    }
}

::v-deep .el-textarea__inner {
    border: none;
    padding: 0px;
}
</style>
