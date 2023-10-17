<template>
  <button class="btn" :class="type" :disabled="disabled" v-if="showByNumberPage <= 5">
    {{ text }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MButton",
  props: {
    /**
    *  type: loại button
    *  gồm:  btn-primary: nút chính
    *        btn-secondary: nút phụ
    *        btn-link: nút link
    *        btn-icon: nút icon
    */
    type: {
      type: String,
      default: "btn-primary",
    },
    /**
     * disable: nút có bị vô hiệu hóa hay không
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     *  text: nội dung button
     */
    text: {
      type: String,
      default: "",
    },
    /**
     * hiển thị nút phân trang, nếu số trang lớn hơn 6 thì làm cách khác
     */
    showByNumberPage: {
      type: Number,
      default: 5,
    }
  },
};
</script>

<style scope>
@import "../css/main.css";
@import "../css/button.css";
</style>
