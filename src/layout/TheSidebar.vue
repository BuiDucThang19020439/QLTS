<template>
  <div class="sidebar" v-if="isSidebarExpand">
    <div class="sidebar-header">
      <m-icon icon="icon-logo"></m-icon>
      <div class="logo-title tooltip">MISA QLTS <span class="tooltip-text">Quản lý tài sản</span></div>
    </div>
    <div class="nav">
      <div class="nav-item">
        <m-icon icon="icon-overview"></m-icon>
        <div class="nav-text">Tổng quan</div>
      </div>
      <div class="nav-item">
        <m-icon icon="icon-asset"></m-icon>
        <div class="nav-text">Tài sản</div>
        <m-icon icon="icon-v-down"></m-icon>
      </div>
      <div class="nav-item tooltip">
        <m-icon icon="icon-other-asset"></m-icon>
        <div class="nav-text">Tài sản HT-ĐB</div>
        <m-icon icon="icon-v-down"></m-icon>
        <span class="tooltip-text">Tài sản hoàn thành đảm bảo</span>
      </div>
      <div class="nav-item">
        <m-icon icon="icon-tool"></m-icon>
        <div class="nav-text">Công cụ dụng cụ</div>
        <m-icon icon="icon-v-down"></m-icon>
      </div>
      <div class="nav-item">
        <m-icon icon="icon-category"></m-icon>
        <div class="nav-text">Danh mục</div>
      </div>
      <div class="nav-item">
        <m-icon icon="icon-find"></m-icon>
        <div class="nav-text">Tra cứu</div>
        <m-icon icon="icon-v-down"></m-icon>
      </div>
      <div class="nav-item">
        <m-icon icon="icon-report"></m-icon>
        <div class="nav-text">Báo cáo</div>
        <m-icon icon="icon-v-down"></m-icon>
      </div>
    </div>
    <div class="collapse" @click="expandSidebarOnclick">
      <m-icon icon="icon-collapse"></m-icon>
    </div>
  </div>

  <div class="sidebar" v-if="!isSidebarExpand" :class="{'collapse-sidebar': !isSidebarExpand}">
    <div class="sidebar-header tooltip">
      <m-icon icon="icon-logo"></m-icon>
      <div class="tooltip-text">Quản lý tài sản</div>
    </div>
    <div class="nav">
      <div class="nav-item tooltip">
        <m-icon icon="icon-overview"></m-icon>
        <div class="tooltip-text">Tổng quan</div>
      </div>
      <div class="nav-item tooltip">
        <m-icon icon="icon-asset"></m-icon>
        <div class="tooltip-text">Tài sản</div>
      </div>
      <div class="nav-item tooltip">
        <m-icon icon="icon-other-asset"></m-icon>
        <div class="tooltip-text">Tài sản hoàn thành đảm bảo</div>
      </div>
      <div class="nav-item tooltip">
        <m-icon icon="icon-tool"></m-icon>
        <div class="tooltip-text">Công cụ dụng cụ</div>
      </div>
      <div class="nav-item tooltip" >
        <m-icon icon="icon-category"></m-icon>
        <div class="tooltip-text">Danh mục</div>
      </div>
      <div class="nav-item tooltip">
        <m-icon icon="icon-find"></m-icon>
        <div class="tooltip-text">Tra cứu</div>
      </div>
      <div class="nav-item tooltip">
        <m-icon icon="icon-report"></m-icon>
        <div class="tooltip-text">Báo cáo</div>
      </div>
    </div>
    <div class="collapse" @click="expandSidebarOnclick">
      <m-icon icon="icon-expand"></m-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSidebar",
  data() {
    return {
      isSidebarExpand: true,
    }
  },
  methods: {
    expandSidebarOnclick() {
      if (this.isSidebarExpand) {
        this.isSidebarExpand = false;
      } else {
        this.isSidebarExpand = true;
      }
    }
  }
};
</script>

<style>
@import "../css/main.css";
@import "../css/icon.css";
@import "../css/layout/sidebar.css";
@import "../css/tooltip.css";
@import "../css/layout/header.css";



</style>
