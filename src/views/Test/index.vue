<template>
    <div>
        <div class="box" ref="box"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        let num = 1

        let str = "1\n2"

        // str.replace(/\n/g, "<br>")

        // console.log(str)

        // setInterval(() => {
        //     console.log(this.$refs.box)
        //     num++

        this.$refs.box.innerHTML = str
        // }, 1000)
    },
}
</script>

<style scoped>
.box {
    height: 300px;
    white-space: pre-wrap;
}
</style>
