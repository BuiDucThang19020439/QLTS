<template>
    <div class="icon" :class="icon"></div>
</template>

<script>
    export default {
        name: "MIcon",
        props: {
            /**
            *  icon: các loại icon
            */
            icon: {
                type: String,
                default: ""
            }
        }
    };
</script>

<style>
    @import "../css/main.css";
    @import "../css/icon.css";
</style>