<template>
  <div class="container">
    <div class="container-header">
      <div class="container-header-left">
        <div class="container-header-left-child">
          <m-icon icon="icon-find-dark"></m-icon>
          <input type="text" placeholder="Tìm kiếm tài sản theo mã" id="find-asset" v-model="filterAsset"/>
        </div>
        <m-combobox
          type="container-header-left-child"
          placeholder="Loại tài sản"
          inputId="category-asset"
          @click="categoryFilter()"
          :data="dataCategory"
          :hasIcon="true"
          :showListItems = "showCategoryList"
          @updateShow = "showCategoryList = $event"
        >
          <div class="option-list">
            <div class="option-item" @click="getValueForCategory('', null)">Tất cả</div>
            <div
              class="option-item"
              v-for="(item, index) in categoryList"
              :key="index"
              @click="getValueForCategory(item.fixed_asset_category_name, item.fixed_asset_category_code)"
            >
              {{ item.fixed_asset_category_name }}
            </div>
          </div>
        </m-combobox>

        <m-combobox
          type="container-header-left-child"
          placeholder="Bộ phận sử dụng"
          inputId="department-filter"
          @click="departmentFilter()"
          :data="dataCombox"
          :hasIcon="true"
          :showListItems = "showDepartmentList"
          @updateShow = "showDepartmentList = $event"
        >
          <div class="option-list">
            <div class="option-item" @click="getValueForCombobox('', null)">Tất cả</div>
            <div
              class="option-item"
              v-for="(item, index) in departmentList"
              :key="index"
              @click="getValueForCombobox(item.department_name, item.department_code)"
            >
              {{ item.department_name }}
            </div>
          </div>
        </m-combobox>
      </div>
      <div class="container-header-right">
        <m-button
          type="btn-primary"
          text="+ Thêm tài sản"
          @click="showAddForm"
        ></m-button>

        <div class="btn-icon tooltip">
          <m-icon icon="icon-excel"></m-icon>
          <div class="tooltip-text">Xuất Excel</div>
        </div>
        <div class="btn-icon tooltip" @click="openDeleteWarning">
          <m-icon icon="icon-trash-bin"></m-icon>
          <div class="tooltip-text">Xóa</div>
        </div>
      </div>
    </div>
    <div class="container-table">
      <m-table ref="tableRef"
      :assetCode="filterAsset"
      :departmentCode="filterDepartment"
      :categoryCode="filterCategory"
      > </m-table>
    </div>
  </div>

  <!-- ẩn hiện form khi nhấn nút x, theo showForm
    Để đóng form. Đầu tiên, ở component cha, binding closeForm = showForm.

    Component con là MForm nhận closeForm trong prop.
    Bên MForm khai báo emit updateClose để phát sự kiện đến cha.
    Tạo hàm udtClose gọi đến emit updateClose và để nút Hủy  gọi phương thức này

    Bên component cha gọi emit @updateClose

   -->
  <m-form
    :formTitle="this.$resource.formTitle.addAsset"
    v-if="showForm"
    :closeForm="showForm"
    @updateClose="showForm = $event"
    @updateSubmit="updateTableAfterSubmit"
    @updateToast="toastData = $event"
  ></m-form>

  <m-warning
   v-if="showWarning"
   :text="this.warningText"
   :mode="this.warningMode"
   @updateWarning="(showWarning = $events)"
   @confirmDelete="this.deleteAsset()"
  >

  </m-warning>

  <m-toast
   :show = "showToast"
   ref="toastRef"
   :text="this.toastText" 
   :iconName="this.toastIcon" 
  ></m-toast>
</template>

<script>
import { getCategory, getDepartment } from "@/js/api";
export default {
  name: "TheContainer",
  data() {
    return {
      showForm: false,
      showToast: false,
      toastData: null,
      toastText: "",
      toastIcon: "",
      showWarning: false,
      warningText: "",
      warningMode: 0,

      departmentList: null,
      categoryList: null,
      showDepartmentList: false,
      showCategoryList: false,
      dataCombox: "",
      dataCategory: "",
      filterAsset: "",
      filterDepartment: "",
      filterCategory: "",
    };
  },

  watch: {
    /**
     * Gán các giá trị cho thông điệp
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    toastData() {
      this.showToast = this.toastData.success;
      this.toastText = this.toastData.msg;
      this.toastIcon = this.toastData.icon;
      setTimeout(() => {
        this.showToast = false;
        this.toastText = "";
        this.toastIcon = "";
      }, 2500);
    }
  },
  methods: {
    /**
     * Ẩn hiện toast
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
     showToastMsg(msg, icon) {
      this.toastText = msg;
      this.toastIcon = icon;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
        this.toastText = "";
        this.toastIcon = "";
      }, 3000);
    },

    /**
     * Đặt showForm = true để mở form nhập tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    showAddForm() {
      this.showForm = true;
    },

    /**
     * Đặt showForm = false để đóng form nhập tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    hideForm() {
      this.showForm = false;
    },

    /**
     * Xóa tài sản được check, cha gọi dến phương thức của con thông qua ref
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
     openDeleteWarning() {
      let list = this.$refs.tableRef.getCheckedList();
      console.log(list);
      if(this.$refs.tableRef.checkedList == null || this.$refs.tableRef.checkedList == "") {
        this.showWarning = true;
        this.warningText = this.$resource.warning.noCheckedAsset;
        this.warningMode = this.$enum.warningMode.validate;
      } else if (list.length == 1){
        this.showWarning = true;
        this.warningMode = this.$enum.warningMode.delete;
        this.warningText = this.$resource.warning.deleteAnAsset 
            + "<< " + list[0].fixed_asset_code + " - " + list[0].fixed_asset_name + ">> ?";  
      } else {
        this.showWarning = true;
        this.warningMode = this.$enum.warningMode.delete;
        this.warningText = list.length + this.$resource.warning.deleteManyAsset;
      }   
    },

    /**
     * Xóa tài sản được check, cha gọi dến phương thức của con thông qua ref
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    deleteAsset() {
      this.$refs.tableRef.delAsset();
      this.showToastMsg(this.$resource.toastMessage.successDelete, this.$resource.toastIcon.delete);
      this.showWarning = false;
    },

    /**
     * đóng cảnh báo
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */


    /**
     * Cập nhật bảng sau khi submit
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    updateTableAfterSubmit() {
      try {
        this.$refs.tableRef.pagination(1,10);
        console.log("cập nhật bảng sau submit tại container");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lọc bản ghi theo loại tài sản
     * CreatedBy: Bùi Đức Thắng (28/08/2023)
     */
     async categoryFilter() {
      try {
        let response = await getCategory();
        this.categoryList = response.data;
        if (this.showCategoryList === false) {
          this.showCategoryList = true;
        } else {
          this.showCategoryList = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lọc bản ghi theo bộ phận sử dụng
     * CreatedBy: Bùi Đức Thắng (28/08/2023)
     */
    async departmentFilter() {
      try {
        let response = await getDepartment();
        this.departmentList = response.data;
        if (this.showDepartmentList === false) {
          this.showDepartmentList = true;
        } else {
          this.showDepartmentList = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lọc bản ghi theo bộ phận sử dụng
     * CreatedBy: Bùi Đức Thắng (28/08/2023)
     */
    getValueForCombobox(item, code) {
      this.dataCombox = item;
      this.filterDepartment = code;
    },

    /**
     * Lọc bản ghi theo bộ phận sử dụng
     * CreatedBy: Bùi Đức Thắng (28/08/2023)
     */
     getValueForCategory(item,code) {
      this.dataCategory = item;
      this.filterCategory = code;
    },

    /**
     * 
     */
    outsideClick(event) {
      if(!this.$refs.depFilter.contains(event.target)) {
        this.showCategoryList = false;
        console.log(this.showCategoryList);
      }
    }
  },
};
</script>

<style>
@import "../css/layout/main-content.css";
</style>
