<template>
  <div class="add-warning">
    <div class="warning-container">
      <!-- icon và dòng thông báo lỗi -->
      <div class="warn-top">
        <div class="icon icon-warning"></div>
        <div class="warn-text">
          {{ text }}
               
        </div>  
      </div>
      <slot name="validate"></slot> 
      <!-- Khi bấm nút hủy trong form -->
      <div class="warn-bottom" v-if="mode == 0">
        <m-button
          type="btn-secondary"
          text="Không"
          @click="udtWarning"
        ></m-button>
        <m-button
          type="btn-primary"
          text="Hủy bỏ"
          @click="udtCloseForm"
        ></m-button>
      </div>
      <!-- Khi validate form -->
      <div class="warn-bottom" v-if="mode == 1">
        <m-button
          type="btn-primary"
          text="Xác nhận"
          @click="udtWarning"
        ></m-button>   
      </div>
       <!-- Khi chọn xóa -->
       <div class="warn-bottom" v-if="mode == 2">
        <m-button
          type="btn-secondary"
          text="Không"
          @click="udtWarning"
        ></m-button>
        <m-button
          type="btn-primary"
          text="Xóa"
          @click="confirmDelete"
        ></m-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MWarning",
  props: {
    closeWarn: {},
    closeFormInWarning: {},
    text: {
      type: String,
      default: "Đây là một cảnh báo",
    },
    mode: {
      type: Number,
      default: 0,
    },
  },
  emits: ["updateWarning", "closeFormInWarningOnClick", "clearMessage", "confirmDelete"],
  data() {
    return {};
  },
  methods: {
    /**
     * Khi nhấn nút Không thì sẽ đóng cảnh báo, quay lại form nhập tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    udtWarning() {
      this.$emit("updateWarning", false);
      this.$emit("clearMessage",[])
    },

    /**
     * Đóng form
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    udtCloseForm() {
      this.$emit("closeFormInWarningOnClick", false);
    },

    /**
     * Xác nhận xóa
     */
    confirmDelete() {
      this.$emit("confirmDelete");
    }
  },
};
</script>

<style>
@import "../css/layout/warning.css";
</style>
