<template>
    <div class="ext-tab">
        <div class="ext-tab-action">
            <div
                :class="{
                    'ext-tab-item': true,
                    'ext-tab-active': type === 'ratio',
                }"
                @click="handleClick('ratio')"
            >
                等比扩容
            </div>
            <div
                :class="{
                    'ext-tab-item': true,
                    'ext-tab-active': type === 'radom',
                }"
                @click="handleClick('radom')"
            >
                自由扩容
            </div>
        </div>

        <div class="ext-tab-pane">
            <BjyExtItem v-show="type === 'ratio'" @change="handleRatioChange" unit="%"></BjyExtItem>

            <BjyExtItem
                v-show="type !== 'ratio'"
                unit="PX"
                v-for="item in options"
                :key="item.label"
                @change="(val) => handlePxChange(item.key, val)"
            ></BjyExtItem>
        </div>
    </div>
</template>

<script>
import BjyExtItem from "./BjyExtItem.vue"
export default {
  components:{
    BjyExtItem
   },
    data() {
        return {
            type: "ratio",
            options: [
                {
                    label: "上扩容",
                    value: "125",
                    key: "top",
                },
                {
                    label: "下扩容",
                    value: "125",
                    key: "bottom",
                },
                {
                    label: "左扩容",
                    value: "125",
                    key: "left",
                },
                {
                    label: "右扩容",
                    value: "125",
                    key: "right",
                },
            ],
        }
    },
    methods: {
        handleClick(type) {
            this.type = type

            this.$emit("type", type)
        },
        handleRatioChange(ratio) {
            this.$emit("ratio", ratio)
        },
        handlePxChange(key, val) {
            this.options.forEach((item) => {
                if (item.key == key) {
                    item.value = val
                }
            })

            this.$emit("px", this.options)
        },
    },
}
</script>


<style scoped lang="scss">
.ext-tab {
    margin-top: 24px;
    padding: 20px 12px 8px;
    background-color: #f6f6f6;

    &-action {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;

        .ext-tab-item {
            flex: 1;
            height: 36px;
            border: 1px solid #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            background-color: #fff;
        }

        .ext-tab-active {
            color: #d92523;
            border-color: #d92523;
        }
    }
}
</style>
