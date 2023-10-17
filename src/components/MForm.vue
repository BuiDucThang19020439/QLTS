<template>
  <div class="add-asset" v-on:keyup.esc="udtClose">
    <div class="add-asset-container">
      <div class="form-header">
        <div class="form-title">{{ formTitle }}</div>
        <div class="btn-icon tooltip" @click="udtClose">
          <m-icon icon="icon-close"></m-icon>
          <div class="tooltip-text">Đóng</div>
        </div>
      </div>
      <div class="form-body">
        <div class="form-body-child form-body-left">
          <div class="text-input-container">
            <label for="asset-code">
              Mã tài sản
              <span class="require-information">*</span>
            </label>
            <input
              type="text"
              id="asset-code"
              v-model="this.asset.assetCodeContent"
              :class="{ 'input-is-invalid': !assetCodeIsValid }"
              tabindex="1"
              ref="assetCodeRef"
            />
            <p v-show="!assetCodeIsValid" class="invalid-text">
              Mã tài sản không hợp lệ.
            </p>
          </div>
          <div class="text-input-container">
            <label for="department-code">
              Mã bộ phận sử dụng
              <span class="require-information">*</span>
            </label>
            <m-combobox
              inputId="department-code"
              type="input-and-icon"
              :data="this.asset.departmentCodeContent"
              :class="{ 'input-is-invalid': !departmentCodeIsValid }"
              @click="departmentFilter()"
              v-on:keyup.enter="departmentFilter"
              :showListItems="showDepartmentList"
              @updateShow="showDepartmentList = $event"
              tab="3"
            >
              <div class="option-list">
                <div
                  class="option-item"
                  v-for="(item, index) in departmentList"
                  :key="index"
                  @click="
                    getDepartmentForCombobox(
                      item.department_code,
                      item.department_name,
                      item.department_id
                    )
                  "
                >
                  {{ item.department_code }}
                </div>
              </div>
            </m-combobox>
            <p v-show="!departmentCodeIsValid" class="invalid-text">
              Mã bộ phận sử dụng không hợp lệ.
            </p>
          </div>

          <div class="text-input-container">
            <label for="category-code">
              Mã loại tài sản
              <span class="require-information">*</span>
            </label>
            <m-combobox
              inputId="category-code"
              type="input-and-icon"
              :data="this.asset.categoryCodeContent"
              :class="{ 'input-is-invalid': !categoryCodeIsValid }"
              @click="categoryFilter()"
              v-on:keyup.enter="categoryFilter"
              :showListItems="showCategoryList"
              @updateShow="showCategoryList = $event"
              tab="4"
            >
              <div class="option-list">
                <div
                  class="option-item"
                  v-for="(item, index) in categoryList"
                  :key="index"
                  @click="
                    getCategoryForCombobox(
                      item.fixed_asset_category_code,
                      item.fixed_asset_category_name,
                      item.fixedassetcategory_id,
                      item.life_time
                    )
                  "
                >
                  {{ item.fixed_asset_category_code }}
                </div>
              </div>
            </m-combobox>
            <p v-show="!categoryCodeIsValid" class="invalid-text">
              Mã loại tài sản không hợp lệ.
            </p>
          </div>

          <div class="text-input-container">
            <label for="asset-number">
              Số lượng
              <span class="require-information">*</span>
            </label>

            <div class="input-and-icon">
              <input
                type="number"
                id="asset-number"
                v-model="this.asset.numberOfAssets"
                :class="{ 'input-is-invalid': !numberOfAssetsIsValid }"
                tabindex="5"
              />

              <div class="icon-up-and-down">
                <div
                  class="icon icon-up"
                  @click="changValueQuantity('increase')"
                ></div>
                <div
                  class="icon icon-down"
                  @click="changValueQuantity('decrease')"
                ></div>
              </div>
            </div>

            <p v-show="!numberOfAssetsIsValid" class="invalid-text">
              Số lượng không hợp lệ.
            </p>
          </div>

          <div class="text-input-container">
            <label for="wear-rate">
              Tỷ lệ hao mòn năm (%)
              <!-- <span class="require-information">*</span> -->
            </label>

            <div class="input-and-icon">
              <input
                type="number"
                id="wear-rate"
                v-model="this.asset.depreciationRate"
                readonly
              />
            </div>
          </div>

          <div class="text-input-container">
            <label for="buy-date">
              Ngày mua
              <!-- <span class="require-information">*</span> -->
            </label>
            <input
              type="date"
              id="buy-date"
              tabindex="7"
              v-model="this.asset.buyDateContent"
            />
          </div>
        </div>

        <div class="form-body-child form-body-right">
          <div class="text-input-container">
            <label for="asset-name">
              Tên tài sản
              <span class="require-information">*</span>
            </label>
            <input
              type="text"
              id="asset-name"
              v-model="this.asset.assetNameContent"
              :class="{ 'input-is-invalid': !assetNameIsValid }"
              tabindex="2"
            />
            <p v-show="!assetNameIsValid" class="invalid-text">
              Tên tài sản không hợp lệ.
            </p>
          </div>

          <div class="text-input-container">
            <label for="department-name">Tên bộ phận sử dụng</label>
            <input
              type="text"
              id="department"
              :value="this.asset.departmentNameContent"
              readonly
            />
          </div>

          <div class="text-input-container">
            <label for="asset-category-name">Tên loại tài sản</label>
            <input
              type="text"
              id="asset-category-name"
              v-model="this.asset.categoryNameContent"
              readonly
            />
          </div>

          <div class="form-body-grandchild">
            <div class="text-input-container">
              <label for="origin-cost">
                Nguyên giá
                <span class="require-information">*</span>
              </label>
              <input
                type="number"
                id="origin-cost"
                v-model="this.asset.originalCost"
                :class="{ 'input-is-invalid': !originalCostIsValid }"
                tabindex="6"
              />
              <p v-show="!originalCostIsValid" class="invalid-text">
                Nguyên giá không hợp lệ.
              </p>
            </div>
            <div class="text-input-container">
              <label for="life-time">
                Số năm sử dụng
                <!-- <span class="require-information">*</span> -->
              </label>
              <input
                type="number"
                id="life-time"
                v-model="this.asset.lifeTime"
                readonly
              />
            </div>
          </div>

          <div class="form-body-grandchild">
            <div class="text-input-container">
              <label for="depreciation value">
                Giá trị hao mòn năm
                <!-- <span class="require-information">*</span> -->
              </label>
              <input
                type="number"
                id="depreciation value"
                v-model="this.asset.depreciationCost"
                readonly
              />
            </div>
            <div class="text-input-container">
              <label for="tracked-year">Năm theo dõi</label>
              <input
                type="number"
                id="tracked-year"
                readonly
                v-model="this.asset.trackedYear"
              />
            </div>
          </div>

          <div class="form-body-grand-child">
            <div class="text-input-container">
              <label for="begin-day-use">
                Ngày bắt đầu sử dụng
                <!-- <span class="require-information">*</span> -->
              </label>
              <input
                type="date"
                id="begin-day-use"
                v-model="this.asset.buyDateContent"
                tabindex="8"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <m-button
          type="btn-secondary"
          text="Hủy"
          tabindex="10"
          @click="showAddWarning(0)"
        ></m-button>
        <m-button
          type="btn-primary"
          text="Lưu"
          tabindex="9"
          v-if="formTitle == this.$resource.formTitle.addAsset"
          @click="addNewAssetOnClick"
        ></m-button>
        <m-button
          type="btn-primary"
          text="Lưu"
          tabindex="9"
          v-if="formTitle == this.$resource.formTitle.modifyAsset"
          @click="putNewAssetOnClick(this.putId)"
        ></m-button>
        <m-button
          type="btn-primary"
          text="Lưu"
          tabindex="9"
          v-if="formTitle == this.$resource.formTitle.copyAsset"
          @click="addNewCopyAsset"
        ></m-button>
      </div>
    </div>
  </div>
  <m-warning
    v-if="showWarning"
    :text="this.warningText"
    :mode="this.warningMode"
    :closeWarn="showWarning"
    ref="formWarning"
    @updateWarning="(showWarning = $events), (this.validateMsg = [])"
    @closeFormInWarningOnClick="closeFormInWarning = $event"
  >
    <template
      v-slot:validate
      v-if="this.warningMode == this.$enum.warningMode.validate"
    >
      <div
        v-for="(item, index) in this.validateMsg"
        :key="index"
        class="validate-text-container"
      >
        <p class="validate-message">{{ item }}</p>
      </div>
    </template>
  </m-warning>
</template>

<script>
import axios from "axios";
import {
  getDepartment,
  getCategory,
  checkDuplicateCode,
  addAsset,
  modifyAsset,
  copyAsset,
} from "@/js/api";
// import { formatNumber } from "@/helper/format.js";
export default {
  name: "MForm",

  props: {
    closeForm: {},
    formTitle: {
      type: String,
      default: "Thêm tài sản",
    },
    putId: {
      default: "",
    },
  },

  data() {
    return {
      // object gửi lên db
      asset: {
        assetCodeContent: "",
        departmentId: "",
        departmentCodeContent: "",
        departmentNameContent: "",
        categoryId: "",
        categoryCodeContent: "",
        categoryNameContent: "",
        assetNameContent: "",
        numberOfAssets: 0,
        depreciationRate: 0,
        originalCost: 0,
        depreciationCost: 0,
        buyDateContent: new Date().toISOString(),
        lifeTime: 0,
        trackedYear: 2023,
      },

      //các trường dùng cho validate
      assetCodeIsValid: true,
      departmentCodeIsValid: true,
      categoryCodeIsValid: true,
      assetNameIsValid: true,
      originalCostIsValid: true,
      depreciationRateIsValid: true,
      numberOfAssetsIsValid: true,

      //các data dùng cho warning
      showWarning: false,
      closeFormInWarning: true,
      warningText: "",
      warningMode: 0,
      isSubmitValid: true,

      //các trường dùng khi lấy dữ liệu về form
      initRow: "",
      departmentList: [],
      showDepartmentList: false,
      categoryList: [],
      showCategoryList: false,

      // lấy ra các trường validate bị lỗi
      validateMsg: [],
    };
  },
  watch: {
    /**
     * Xem giá trị closeFormInWarning có đổi không, nếu đổi thì gọi emit updateClose để đóng form
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    closeFormInWarning() {
      this.$emit("updateClose", false);
    },

    /**
     * giá trị số năm sử dụng thay đổi, tính lại số năm theo dõi và tỷ lệ hao mòn năm
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getLifeTimeFromObject(newValue, oldValue) {
      this.asset.trackedYear =
        Number(this.asset.buyDateContent.substring(0, 4)) + this.asset.lifeTime;
      this.asset.depreciationRate = Number((1 / this.asset.lifeTime) * 100);
    },

    /**
     * giá trị ngày mua thay đổi, tính lại số năm theo dõi
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getBuyDateFromObject(newValue, oldValue) {
      this.asset.trackedYear =
        Number(this.asset.buyDateContent.substring(0, 4)) + this.asset.lifeTime;
    },

    /**
     * Mã tài sản thay đổi, bỏ lỗi đỏ
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getAssetCodeFromObject(newValue, oldValue) {
      this.assetCodeIsValid = true;
    },

    /**
     * Tên tài sản thay đổi, bỏ lỗi đỏ
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getAssetNameFromObject(newValue, oldValue) {
      this.assetNameIsValid = true;
    },

    /**
     * Mã loại tài sản thay đổi, bỏ lỗi đỏ
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getCategoryCodeFromObject(newValue, oldValue) {
      this.categoryCodeIsValid = true;
    },

    /**
     * Mã loại tài sản thay đổi, bỏ lỗi đỏ
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getDepartmentCodeFromObject(newValue, oldValue) {
      this.departmentCodeIsValid = true;
    },

    /**
     * Mã loại tài sản thay đổi, bỏ lỗi đỏ
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getQuantityFromObject(newValue, oldValue) {
      this.numberOfAssetsIsValid = true;
    },

    /**
     * giá trị nguyên giá thay đổi, tính lại giá trị hao mòn
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getOriginalCostFromObject(newValue, oldValue) {
      this.originalCostIsValid = true;
      if (this.asset.depreciationRate != 0)
        this.asset.depreciationCost =
          (this.asset.originalCost * this.asset.depreciationRate) / 100;
    },

    /**
     * giá trị tỉ lệ hao mòn thay đổi, tính lại số năm theo dõi và giá trị hao mòn
     * CreatedBy: BDThang (10/09/2023)
     */
    // eslint-disable-next-line no-unused-vars
    getDepreciationRateFromObject(newValue, oldValue) {
      this.asset.lifeTime = Math.round(100 / this.asset.depreciationRate);
      if (this.asset.originalCost != 0) {
        this.asset.depreciationCost =
          (this.asset.originalCost * this.asset.depreciationRate) / 100;
      }
    },
  },

  mounted() {
    /**
     * Tự động focus vào ô assetCode
     * CreatedBy: BDThang (30/08/2023)
     */
    this.$refs.assetCodeRef.focus();
  },

  computed: {
    /**
     * hàm trả về mã tài sản
     * CreatedBy: BDThang (10/09/2023)
     */
    getAssetCodeFromObject() {
      return this.asset.assetCodeContent;
    },
    /**
     * hàm trả về tên tài sản
     * CreatedBy: BDThang (10/09/2023)
     */
    getAssetNameFromObject() {
      return this.asset.assetNameContent;
    },
    /**
     * hàm trả về mã bộ phận sử dụng
     * CreatedBy: BDThang (10/09/2023)
     */
    getDepartmentCodeFromObject() {
      return this.asset.departmentCodeContent;
    },
    /**
     * hàm trả về mã loại tài sản
     * CreatedBy: BDThang (10/09/2023)
     */
    getCategoryCodeFromObject() {
      return this.asset.categoryCodeContent;
    },
    /**
     * hàm trả về số năm sử dụng
     * CreatedBy: BDThang (10/09/2023)
     */
    getLifeTimeFromObject() {
      return this.asset.lifeTime;
    },
    /**
     * hàm trả về nguyên giá
     * CreatedBy: BDThang (10/09/2023)
     */
    getOriginalCostFromObject() {
      return this.asset.originalCost;
    },
    /**
     * hàm trả về số lượng
     * CreatedBy: BDThang (10/09/2023)
     */
    getQuantityFromObject() {
      return this.asset.numberOfAssets;
    },
    /**
     * hàm trả về tỉ lệ hao mòn
     * CreatedBy: BDThang (10/09/2023)
     */
    getDepreciationRateFromObject() {
      return this.asset.depreciationRate;
    },
    /**
     * hàm trả về ngày hiện tại
     * CreatedBy: BDThang (10/09/2023)
     */
    getBuyDateFromObject() {
      return this.asset.buyDateContent;
    },
  },

  /**
   * lấy dữ liệu hàng vào form sửa
   * CreatedBy: Bùi Đức Thắng (30/07/2023)
   */
  async beforeMount() {
    if (
      this.formTitle == this.$resource.formTitle.modifyAsset ||
      this.formTitle == this.$resource.formTitle.copyAsset
    ) {
      try {
        this.initRow = await axios.get(
          "https://localhost:7117/api/v1/FixedAssets/" + this.putId
        );
        this.asset.departmentId = this.initRow.data.department_id;
        this.asset.categoryId = this.initRow.data.fixedassetcategory_id;
        if (this.formTitle == this.$resource.formTitle.copyAsset) {
          let str = this.initRow.data.fixed_asset_code;
          this.asset.assetCodeContent = this.autoIncreaseAssetCode(str);
        } else {
          this.asset.assetCodeContent = this.initRow.data.fixed_asset_code;
        }
        this.asset.departmentCodeContent = this.initRow.data.department_code;
        this.asset.categoryCodeContent =
          this.initRow.data.fixed_asset_category_code;
        this.asset.numberOfAssets = this.initRow.data.quantity;
        this.asset.assetNameContent = this.initRow.data.fixed_asset_name;
        this.asset.originalCost = this.initRow.data.cost;
        this.asset.depreciationRate = this.initRow.data.depreciation_rate * 100;
        this.asset.lifeTime = this.initRow.data.life_time;
        this.asset.categoryNameContent =
          this.initRow.data.fixed_asset_category_name;
        this.asset.departmentNameContent = this.initRow.data.department_name;
        this.asset.buyDateContent = this.initRow.data.purchase_date.substr(
          0,
          10
        );
        this.asset.trackedYear = this.initRow.data.tracked_year;
      } catch (error) {
        console.log(error);
      }
    }
  },

  emits: ["updateClose", "updateSubmit", "updateToast"],

  methods: {
    /**
     * Mở toast msg
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    udtToast(isSuccess, message, iconName) {
      this.$emit("updateToast", {
        success: isSuccess,
        msg: message,
        icon: iconName,
      });
    },

    /**
     * Đóng form nhập tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    udtClose() {
      this.$emit("updateClose", false);
    },

    /**
     * Mở cảnh báo
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    showAddWarning(mode) {
      if (mode == this.$enum.warningMode.cancel) {
        this.warningMode = mode;
        this.warningText = this.$resource.warning.cancelForm;
        this.showWarning = "true";
      }
      if (mode == this.$enum.warningMode.validate) {
        this.warningMode = mode;
        this.warningText = this.$resource.warning.validateForm;
        this.showWarning = "true";
      }
    },

    /**
     * Nhán nút Lưu 1 tài sản mới, validate dữ liệu
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */

    async addNewAssetOnClick() {
      try {
        this.validateAll();
        await this.validateAssetCheckDuplicateCode();
        if (this.isSubmitValid == false) {
          this.isSubmitValid = true;
          this.showAddWarning(1);
          this.udtToast(
            true,
            this.$resource.toastMessage.failAdd,
            this.$resource.toastIcon.fail
          );
          return;
        } else {
          await addAsset(this.asset);
          this.udtToast(
            true,
            this.$resource.toastMessage.successAdd,
            this.$resource.toastIcon.success
          );
          this.$emit("updateClose", false);
          this.$emit("updateSubmit");
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Nhấn nút thay đổi dữ liệu 1 hàng
     * CreatedBy: Bùi Đức Thắng (15/08/2023)
     */
    async putNewAssetOnClick(id) {
      try {
        this.validateAll();
        await this.validateAssetCheckDuplicateCode();

        if (this.isSubmitValid == false) {
          this.isSubmitValid = true;
          this.showAddWarning(1);
          this.udtToast(
            true,
            this.$resource.toastMessage.failModify,
            this.$resource.toastIcon.fail
          );
          return;
        } else {
          await modifyAsset(this.asset, id);
          this.udtToast(
            true,
            this.$resource.toastMessage.successModify,
            this.$resource.toastIcon.success
          );
          this.$emit("updateClose", false);
          this.$emit("updateSubmit");
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Nhân bản tài sản
     * CreatedBy: BDThang (05/09/2023)
     */
    async addNewCopyAsset() {
      this.validateAll();
      await this.validateAssetCheckDuplicateCode();
      try {
        if (this.isSubmitValid == false) {
          this.isSubmitValid = true;
          this.showAddWarning(1);
          this.udtToast(
            true,
            this.$resource.toastMessage.failAdd,
            this.$resource.toastIcon.fail
          );
          return;
        } else {
          await copyAsset(this.asset);
          this.udtToast(
            true,
            this.$resource.toastMessage.successAdd,
            this.$resource.toastIcon.success
          );
          this.$emit("updateClose", false);
          this.$emit("updateSubmit");
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * hàm tự tăng mã
     * CreatedBy: Bùi Đức Thắng (07/09/2023)
     */
    autoIncreaseAssetCode(code) {
      let num = Number(code.slice(6, 9)) + 1;
      if (num < 1000) {
        return String(code.slice(0, 6) + num + code.slice(9));
      } else {
        return code;
      }
    },

    /**
     * validate dữ liệu
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    validateAll() {
      this.validateLength();
      this.validateAssetCode();
      this.validateDepartmentCode();
      this.validateCategoryCode();
      this.validateAssetName();
      this.validateNumberOfAsset();
      this.validateOriginalCost();
    },

    /**
     * validate trùng mã tài sản
     * CreatedBy: Bùi Đức Thắng (07/09/2023)
     */
    async validateAssetCheckDuplicateCode() {
      if (this.assetCodeIsValid) {
        let dup = await checkDuplicateCode(
          this.asset.assetCodeContent.toUpperCase()
        );
        if (dup.data == true) {
          this.assetCodeIsValid = false;
          this.isSubmitValid = false;
          this.validateMsg.push(this.$resource.validateConflictCode.assetCode);
        }
        //  else {
        //   this.assetCodeIsValid = true;
        // }
      }
      console.log("duplis: " + this.assetCodeIsValid);
    },

    /**
     * validate độ dài của mã tài sản (<20) và tên tài sản (<255)
     * CreatedBy: Bùi Đức Thắng (07/09/2023)
     */
    validateLength() {
      // độ dài của mã tài sản
      if (this.asset.assetCodeContent.length > 20) {
        this.assetCodeIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateLength.assetCode);
      } else {
        this.assetCodeIsValid = true;
      }
      console.log("length is valid: " + this.assetCodeIsValid);

      //độ dài của tên tài sản
      if (this.asset.assetNameContent > 255) {
        this.assetNameIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateLength.assetName);
      } else {
        this.assetNameIsValid = true;
      }
    },

    /**
     * validate cho mã tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    validateAssetCode() {
      if (
        this.asset.assetCodeContent == null ||
        (this.asset.assetCodeContent == "" && this.assetCodeIsValid)
      ) {
        this.assetCodeIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateEmpty.assetCode);
      }
      // else {
      //   this.assetCodeIsValid = true;
      // }
      console.log("not empty is valid:" + this.assetCodeIsValid);
    },

    /**
     * validate cho mã bộ phận sử dụng
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    validateDepartmentCode() {
      if (
        this.asset.departmentCodeContent == null ||
        this.asset.departmentCodeContent == ""
      ) {
        this.departmentCodeIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateEmpty.departmentCode);
      } else {
        this.departmentCodeIsValid = true;
      }
    },

    /**
     * validate cho mã loại tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    validateCategoryCode() {
      if (
        this.asset.categoryCodeContent == null ||
        this.asset.categoryCodeContent == ""
      ) {
        this.categoryCodeIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateEmpty.categoryCode);
      } else {
        this.categoryCodeIsValid = true;
      }
    },

    /**
     * validate cho tên tài sản
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    validateAssetName() {
      if (
        this.asset.assetNameContent == null ||
        this.asset.assetNameContent == ""
      ) {
        this.assetNameIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateEmpty.assetName);
      } else {
        this.assetNameIsValid = true;
      }
    },

    /**
     * validate cho số lượng
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    validateNumberOfAsset() {
      if (
        this.asset.numberOfAssets == null ||
        this.asset.numberOfAssets == ""
      ) {
        this.numberOfAssetsIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateEmpty.quantity);
      } else {
        this.numberOfAssetsIsValid = true;
      }
    },

    /**
     * validate cho nguyên giá
     * CreatedBy: Bùi Đức Thắng (30/07/2023)
     */
    validateOriginalCost() {
      if (this.asset.originalCost == null || this.asset.originalCost == "") {
        this.originalCostIsValid = false;
        this.isSubmitValid = false;
        this.validateMsg.push(this.$resource.validateEmpty.originalCost);
      } else {
        this.originalCostIsValid = true;
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
     * Thay đổi số lượng
     * CreatedBy: Bùi Đức Thắng (03/08/2023)
     */
    changValueQuantity(type) {
      if (type == "increase") {
        this.asset.numberOfAssets = this.asset.numberOfAssets + 1;
      } else if (type == "decrease") {
        if (this.asset.numberOfAssets - 1 > 0) {
          this.asset.numberOfAssets--;
        } else {
          this.asset.numberOfAssets = 0;
        }
      }
    },

    /**
     * Thay đổi tỷ lệ hao mòn
     * CreatedBy: Bùi Đức Thắng (03/08/2023)
     */
    changDepreciationRate(type) {
      if (type == "increase") {
        this.asset.depreciationRate = this.asset.depreciationRate + 1;
      } else if (type == "decrease") {
        if (this.asset.depreciationRate - 1 > 0) {
          this.asset.depreciationRate--;
        } else {
          this.asset.depreciationRate = 0;
        }
      }
    },

    /**
     * lấy data cho ô input
     * CreatedBy: Bùi Đức Thắng (28/08/2023)
     */
    getDepartmentForCombobox(code, name, id) {
      this.asset.departmentCodeContent = code;
      this.asset.departmentNameContent = name;
      this.asset.departmentId = id;
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
     * lấy data cho ô input
     * CreatedBy: Bùi Đức Thắng (28/08/2023)
     */
    getCategoryForCombobox(code, name, id, lifeTime) {
      this.asset.categoryCodeContent = code;
      this.asset.categoryNameContent = name;
      this.asset.categoryId = id;
      this.asset.lifeTime = lifeTime;
    },
  },
};
</script>

<style scope>
@import "../css/form.css";
.invalid-text {
  color: red;
  font-size: 11px;
  margin: 0;
  padding: 0;
}

.input-is-invalid {
  border: 1px solid red !important;
  outline: 1px solid red !important;
  border-radius: 4px;
}

input[type="number"] {
  text-align: right;
}

.input-and-icon input[type="number"] {
  padding-right: 25px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
