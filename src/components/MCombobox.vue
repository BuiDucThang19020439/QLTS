<template>
  <div :class="type" ref="comboboxRef">
    <m-icon icon="icon-filter" v-if="hasIcon"></m-icon>
    <input
      type="text"
      :placeholder="placeholder"
      :id="inputId"
      :value="data"
      :readonly="readOnly"
      :tabindex="tab"
    />
    <m-icon icon="icon-triangle-down"></m-icon>
    <slot v-if="showListItems"></slot>
  </div>
</template>

<script>
export default {
  name: "MCombobox",
  props: {
    type: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputId: {
      type: String,
      default: "",
    },
    data: {
      type: String,
      default: "",
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    showListItems: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: true,
    },
    tab: {
      type: String,
      default: "10",
    }
  },
  emits: ["updateShow"],
  mounted() {
    /**
     * thêm sự kiện click ra ngoài combobox thì đóng nó
     * CreatedBy: BDThang (28/08/2023)
     */
    document.addEventListener("click", this.outsideClick);
  },

  beforeUnmount() {
    /**
     * xóa sự kiện click ra ngoài combobox thì đóng nó
     * CreatedBy: BDThang (28/08/2023)
     */
    document.removeEventListener("click", this.outsideClick);
  },
  data() {
    return {
      dataValue: "",
    };
  },
  methods: {
    /**
     * khi click ra ngoài combobox thì đóng nó
     * @param {*} event
     * CreatedBy: BDThang (28/08/2023)
     */
    outsideClick(event) {
      if (!this.$refs.comboboxRef.contains(event.target)) {
        this.$emit("updateShow", false);
      }
    },
  },
};
</script>

<style scoped>
@import "../css/main.css";
@import "../css/textfield.css";
input {
  outline: none !important;
  background-color: white !important;
}

input:focus-visible,
input:focus{
  border: 1px solid var(--color-focus) !important;
  outline: 1px solid var(--color-focus) !important;
}


</style>
