<template>
  <div class="header">
    <div class="header-right">
      <div class="header-text">Danh sách tài sản</div>
      <div class="header-item-list">
        <div class="header-company-name">Sở Tài Chính</div>
        <div class="header-select-year">
          <label>Năm</label>
          <input type="text" class="text-input" />
          <div class="icon-up-and-down">
            <m-icon icon="icon-up"></m-icon>
            <m-icon icon="icon icon-down"></m-icon>
          </div>
        </div>
        <div class="btn-icon">
          <m-icon icon="icon-bell"></m-icon>
        </div>
        <div class="btn-icon">
          <m-icon icon="icon-four-squares"></m-icon>
        </div>
        <div class="btn-icon">
          <m-icon icon="icon icon-help"></m-icon>
        </div>
        <div class="btn-icon user-avatar">
          <m-icon icon="icon-default-avatar"></m-icon>
          <m-icon icon="icon-triangle-down"></m-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style scope>
@import "../css/icon.css";
@import "../css/layout/header.css";
@import "../css/textfield.css";
@import "../css/tooltip.css";
</style>
