<template>
  <div class="toast-msg" v-if="show">
    <m-icon :icon='iconName'> </m-icon>
    <div class="toast-text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "MToast",
  props: {
    text: {
      type: String,
      default: "",
    },
    iconName: {
      type: String,
      default: "icon-success",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
@import "../css/main.css";
.toast-msg {
  position: absolute;
  right: 20px;
  bottom: 10px;
  height: 44px;
  width: fit-content;
  min-width: 160px;
  padding: 0 20px;
  border: 1px solid #333333;
  border-radius: 4px;
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  z-index: 3;
}
</style>
