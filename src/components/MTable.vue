<template>
  <table>
    <thead>
      <tr>
        <th><input type="checkbox" class="checkbox" /></th>
        <th class="tooltip">
          STT
          <div class="tooltip-text">Số thứ tự</div>
        </th>
        <th>Mã tài sản</th>
        <th>Tên tài sản</th>
        <th>Loại tài sản</th>
        <th>Bộ phận sử dụng</th>
        <th class="data-number">Số lượng</th>
        <th class="data-number">Nguyên giá</th>
        <th class="data-number tooltip">
          HM/KH lũy kế
          <div class="tooltip-text">Hao mòn/Khấu hao lũy kế</div>
        </th>
        <th class="data-number">Giá trị còn lại</th>
        <th class="table-func">Chức năng</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <input type="checkbox" class="checkbox" v-model="item.checked" />
        </td>
        <td>{{ index + 1 }}</td>
        <td>{{ item.fixed_asset_code }}</td>
        <td>{{ item.fixed_asset_name }}</td>
        <td>{{ item.fixed_asset_category_name }}</td>
        <td>{{ item.department_name }}</td>
        <td class="data-number">
          {{ formatNumber(item.quantity, "vi-VI", ".") }}
        </td>
        <td class="data-number">
          {{ formatNumber(item.cost, "vi-VI", ".") }}
        </td>
        <td class="data-number">
          {{ formatNumber(item.cost * item.depreciation_rate, "vi-VI", ".") }}
        </td>
        <td class="data-number">
          {{
            formatNumber(
              minusCost(item.cost, item.cost * item.depreciation_rate),
              "vi-VI",
              "."
            )
          }}
        </td>
        <td class="table-func">
          <div
            class="icon icon-modify"
            @click="
              showAddForm(
                item.fixedasset_id,
                this.$resource.formTitle.modifyAsset
              )
            "
          ></div>
          <div
            class="icon icon-copy"
            @click="
              showAddForm(
                item.fixedasset_id,
                this.$resource.formTitle.copyAsset
              )
            "
          ></div>
        </td>
      </tr>
    </tbody>
    <tr class="footer">
      <td colspan="6" class="footer-left">
        <span class="total-row">
          Tổng:
          <pre>   {{ this.totalRecord }}  </pre>
          bản ghi
        </span>
        <div class="paging">
          <select
            id="tfoot-number-of-row"
            v-model="selectedOption"
            @change="updateNumberRecordAPage"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <div class="select-page">
            <div class="btn-icon" @click="pageOnClickPrev">
              <m-icon icon="icon-prev" ></m-icon>
            </div>

            <m-button
              :showByNumberPage="this.totalPage"
              type="btn-secondary"
              v-for="page in this.totalPage"
              :key="page"
              @click="this.currentPage = page"
              :class="{ 'selected-page-number-button': this.currentPage == page }"
              >{{ page }}
            </m-button>

            <div class="paging-button-list" v-if="this.totalPage > 5">
              <m-button
                type="btn-secondary"
                :class="{ 'selected-page-number-button': this.currentPage == 1 }"
                @click="this.currentPage = 1"
                >1</m-button
              >
              <m-button 
                type="btn-secondary" 
                @click="this.currentPage = 2"
                :class="{ 'selected-page-number-button': this.currentPage == 2 }"
                >2</m-button
              >
              <div class="btn-icon" @click="this.selectPage">
                <m-icon icon="icon-horizontal-three-dots"></m-icon>
              </div>
              <input
                type="number"
                v-if="this.showSelectPage"
                class="select-page-number-of-page"
                v-model="numberPageSelect"
                placeholder="Tới"
                v-on:keyup.enter="this.paginationKeyUpEnter()"
              />
              <m-button 
                type="btn-secondary" 
                v-if="this.currentPage > 2 && this.currentPage < this.totalPage"
                @click="this.currentPage = this.numberPageSelect"
                :class="{ 'selected-page-number-button': true}"
                >{{ this.currentPage }}</m-button
              >

              <m-button
                type="btn-secondary"
                @click="this.currentPage = this.totalPage"
                :class="{ 'selected-page-number-button': this.currentPage == this.totalPage }"
                >{{ this.totalPage }}</m-button
              >
            </div>

            <div class="btn-icon" @click="pageOnClickNext">
              <m-icon icon="icon-next" ></m-icon>
            </div>
          </div>
        </div>
      </td>
      <td class="data-number">
        {{ formatNumber(totalQuantity, "vi-VI", ".") }}
      </td>
      <td class="data-number">{{ formatNumber(totalOgCost, "vi-VI", ".") }}</td>
      <td class="data-number">
        {{ formatNumber(totalDepreciation, "vi-VI", ".") }}
      </td>
      <td class="data-number">
        {{ formatNumber(totalRestCost, "vi-VI", ".") }}
      </td>
      <td></td>
    </tr>
  </table>

  <m-form
    :formTitle="formTitleInTable"
    :putId="assetId"
    ref="modifyForm"
    v-if="showForm"
    :closeForm="showForm"
    @updateClose="showForm = $event"
    @updateSubmit="updateTableAfterSubmit"
    @updateToast="toastData = $event"
  ></m-form>

  <m-toast
    :show="showToast"
    ref="toastRef"
    :text="this.toastText"
    :iconName="this.toastIcon"
  ></m-toast>
</template>

<script>
import { assetFilter, deleteAsset } from "@/js/api";
import { debounce } from "lodash";

export default {
  name: "MTable",
  data() {
    return {
      dataList: null,
      checkedList: null,
      showForm: false,
      assetId: "",
      totalRecord: 0,
      totalPage: 1,
      currentPage: 1,
      currentRecord: 1,
      numberRecordAPage: 10,
      selectedOption: 10,
      totalQuantity: 0,
      totalOgCost: 0,
      totalDepreciation: 0,
      totalRestCost: 0,
      formTitleInTable: "",

      showToast: false,
      toastData: null,
      toastText: "",
      toastIcon: "",

      showSelectPage: false,
      numberPageSelect: 1,
      isPageNumberSelected: true,
    };
  },

  props: ["assetCode", "departmentCode", "categoryCode"],

  created() {
    this.pagination(this.currentPage, this.numberRecordAPage);
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
    },

    /**
     * số bản ghi một trang thay đổi, phân trang lại, quay lại về trang nhất
     * @param {giá trị số bản ghi một trang mới} newValue
     * CreatedBy: BDThang(01/09/2023)
     */
    numberRecordAPage(newValue) {
      this.currentPage = 1;
      this.pagination(this.currentPage, newValue);
    },

    /**
     * số trang hiện tại thay đổi, phân trang lại
     * @param {số trang hiện tại mới} newValue
     * CreatedBy: BDThang(01/09/2023)
     */
    currentPage(newValue) {
      this.pagination(newValue, this.numberRecordAPage);
    },

    /**
     * trong lọc bản ghi, mã tài sản thay đổi, phân trang lại, dùng debounce để delay mất 1s
     * CreatedBy: BDThang(01/09/2023)
     */
    assetCode: debounce(function () {
      this.pagination(this.currentPage, this.numberRecordAPage);
    }, 1000),

    /**
     * trong lọc bản ghi, mã bộ phận sử dụng thay đổi, phân trang lại
     * CreatedBy: BDThang(01/09/2023)
     */

    departmentCode() {
      this.currentPage = 1;
      this.pagination(this.currentPage, this.numberRecordAPage);
    },

    /**
     * trong lọc bản ghi, mã loại tài sản thay đổi, phân trang lại
     * CreatedBy: BDThang(01/09/2023)
     */
    categoryCode() {
      this.currentPage = 1;
      this.pagination(this.currentPage, this.numberRecordAPage);
    },
  },

  methods: {
    /**
     * Ẩn hiện toast
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    showToastMsg(msg, icon) {
      console.log("toast thay đổi");
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
     * format số theo định dạng chia hàng ngàn
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    formatNumber(x, locale, separator) {
      return x
        .toLocaleString(locale, {
          useGrouping: true,
          minimumFractionDigits: 0,
        })
        .replace(/[,.]/g, separator);
    },

    /**
     * lấy a - b
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    minusCost(a, b) {
      return a - b;
    },

    /**
     * lấy danh sách các hàng đã được checked
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */

    getCheckedList() {
      this.checkedList = this.dataList.filter((item) => {
        return item.checked;
      });
      return this.checkedList;
    },

    /**
     * xóa dữ liệu database(local), xóa xong gọi lại hàm phân trang
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    delAsset() {
      try {
        let leng = this.dataList.length;
        for (let i = 0; i < leng; i++) {
          if (this.dataList[i].checked == true) {
            deleteAsset(this.dataList[i].fixedasset_id).then((response) => {
              this.pagination(this.currentPage, this.numberRecordAPage);
              console.log(response);
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật bảng sau khi submit
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    updateTableAfterSubmit() {
      try {
        this.pagination(this.currentPage, this.numberRecordAPage);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Đặt showForm = true để mở form nhập tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    showAddForm(id, title) {
      this.assetId = id;
      this.showForm = true;
      this.formTitleInTable = title;
    },

    /**
     * Phân trang
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    async pagination(pageNumber, numberEntityAPage) {
      try {
        const res = await assetFilter(
          pageNumber,
          numberEntityAPage,
          this.assetCode,
          this.categoryCode,
          this.departmentCode
        );

        this.dataList = res.data.listEntity;
        this.totalRecord = res.data.totalRecord;
        this.totalPage = res.data.totalPage;
        this.currentRecord = res.data.currentRecord;

        this.totalQuantity = 0;
        this.totalOgCost = 0;
        this.totalDepreciation = 0;
        this.totalRestCost = 0;

        for (let i = 0; i < this.dataList.length; i++) {
          this.totalQuantity += this.dataList[i].quantity;
          this.totalOgCost += this.dataList[i].cost;
          this.totalDepreciation +=
            this.dataList[i].cost * this.dataList[i].depreciation_rate;
          this.totalRestCost = this.totalOgCost - this.totalDepreciation;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * thay đổi số bản ghi một trang
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    updateNumberRecordAPage() {
      this.numberRecordAPage = this.selectedOption;
    },

    /**
     * ẩn hiện ô thay đổi số bản ghi một trang
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    selectPage() {
      if (!this.showSelectPage) {
        this.showSelectPage = true;
      } else {
        this.showSelectPage = false;
      }
    },

    /**
     *enter để thay đổi số trang
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    paginationKeyUpEnter() {
      this.currentPage = this.numberPageSelect;
      this.showSelectPage = false;
      console.log(this.currentPage);
      console.log(this.numberPageSelect);
    },

    /**
     * chọn trang tiếp theo
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    pageOnClickNext() {
      console.log("old current page: " + this.currentPage);

      if (this.currentPage != this.totalPage) {
        this.currentPage += 1;
        this.numberPageSelect = this.currentPage;

      }
      console.log("new current page after next: " + this.currentPage);
    },
    /**
     * chọn trang trước
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    pageOnClickPrev() {
      console.log("old current page: " + this.currentPage);
      if (this.currentPage != 1) {
        this.currentPage -= 1;
        this.numberPageSelect = this.currentPage;
      }
      console.log("new current page after prev: " + this.currentPage);
    },
  },
};
</script>

<style>
@import "../css/layout/table.css";
@import "../css/scrollbar.css";
@import "../css/tooltip.css";

/**click ra ngoài nút phân trang, nút đó vẫn có viền */
.selected-page-number-button {
  border: 1px solid var(--color-focus) !important;
  outline: 1px solid var(--color-focus);
}
</style>
