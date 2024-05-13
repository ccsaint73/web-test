<template>
    <div class="ext-prompt">
        <div class="ext-prompt-title">提示词</div>

        <div class="ext-prompt-title">
            <el-input
                type="textarea"
                resize="none"
                :autosize="{ minRows: 4, maxRows: 6 }"
                placeholder="请输入提示词"
                v-model="prompt"
                @input="handleInput"
            ></el-input>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            prompt: "",
        }
    },
    methods: {
        handleInput() {
            this.$emit("change", this.prompt)
        },
    },
}
</script>

<style scoped lang="scss">
.ext-prompt {
    &-title {
        font-size: 16px;
        font-weight: 500;
        margin: 12px 0px;
    }
}
</style>
