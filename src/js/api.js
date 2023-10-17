import axios from "axios";
import Enum from "@/helper/enum.js";

const baseURL = "https://localhost:7117/api/v1/";

/**
 * api lấy toàn bộ bộ phận sử dụng
 * @returns danh sách bộ phận sử dụng tài sản
 * CreatedBy: BDThang (30/08/2023)
 */
export const getDepartment = async () => {
  let response;
  try {
    response = await axios.get(baseURL + "Departments");
  } catch (error) {
    console.log(error);
  }
  return response;
};

/**
 * api lấy toàn bộ loại tài sản
 * @returns danh sách loại tài sản
 * CreatedBy: BDThang (30/08/2023)
 */
export const getCategory = async () => {
  let response;
  try {
    response = await axios.get(baseURL + "FixedAssetCategories");
  } catch (error) {
    console.log(error);
  }
  return response;
};

/**
 * api lọc tài sản, sử dụng phân trang khi lọc
 * @param {số trang} numberPage
 * @param {số bản ghi một trang} numberEntityAPage
 * @param {mã tài sản} assetCode
 * @param {mã loại tài sản} categoryCode
 * @param {mã bọ phận sử dụng} departmentCode
 * @returns danh sách tài sản đã được phân trang
 */
export const assetFilter = async (
  numberPage,
  numberEntityAPage,
  assetCode,
  categoryCode,
  departmentCode
) => {
  let response;
  let param = "";
  if (assetCode != null) param += "&assetCode=" + assetCode;
  if (categoryCode != null) param += "&categoryCode=" + categoryCode;
  if (departmentCode != null) param += "&departmentCode=" + departmentCode;
  try {
    response = await axios.get(
      baseURL +
        "FixedAssets/filter?numberPage=" +
        numberPage +
        "&numberEntityAPage=" +
        numberEntityAPage +
        param
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

/**
 * Hàm lấy tất cả tài sản
 * @returns danh sách tất cả tài sản
 * CreatedBy: BDThang (30/08/2023)
 */
export const getAllAsset = async () => {
  let response;
  try {
    response = await axios.get(baseURL + "FixedAssets");
  } catch (error) {
    console.log(error);
  }
  return response;
};

/**
 * Hàm gọi api xóa tài sản
 * @returns danh sách tất cả tài sản
 * CreatedBy: BDThang (30/08/2023)
 */
export const deleteAsset = async (id) => {
  try {
    await axios.delete(baseURL + "FixedAssets/id?id=" + id);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Hàm check trùng mã
 * @param {code tài sản} code
 * @returns giá trị bool có trùng hay không
 * CreatedBy: BDThang (05/09/2023)
 */
export const checkDuplicateCode = async (code) => {
  let response;
  try {
    response = await axios.get(baseURL + "FixedAssets/exist-code?code=" + code);
  } catch (error) {
    console.log(error);
  }
  return response;
};

/**
 * Hàm thêm tài sản
 * @param {tài sản được thêm} asset
 * CreatedBy: BDThang (10/09/2023)
 */
export const addAsset = async (asset) => {
  try {
    checkDuplicateCode(asset.assetCodeContent);
    await axios.post(baseURL + "FixedAssets", {
      fixed_asset_code: asset.assetCodeContent,
      fixed_asset_name: asset.assetNameContent,
      fixedassetcategory_id: asset.categoryId,
      fixed_asset_category_code: asset.categoryCodeContent,
      fixed_asset_category_name: asset.categoryNameContent,
      department_id: asset.departmentId,
      department_code: asset.departmentCodeContent,
      department_name: asset.departmentNameContent,
      quantity: asset.numberOfAssets,
      cost: asset.originalCost,
      depreciation_rate: asset.depreciationRate / 100,
      purchase_date: asset.buyDateContent,
      tracked_year: asset.trackedYear,
      life_time: asset.lifeTime,
      production_year: 2012,
      active: Enum.Active.active,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Hàm sửa tài sản
 * @param {tài sản bị sửa} asset
 * @param {id tài sản bị sửa} id
 * CreatedBy: BDThang (10/09/2023)
 */
export const modifyAsset = async (asset, id) => {
  try {
    if(id != asset.assetCodeContent) {
    checkDuplicateCode(asset.assetCodeContent);
    }
    await axios.put(baseURL + "FixedAssets/id?id=" + id, {
      fixed_asset_code: asset.assetCodeContent,
      fixed_asset_name: asset.assetNameContent,
      fixed_asset_category_code: asset.categoryCodeContent,
      fixed_asset_category_name: asset.categoryNameContent,
      department_code: asset.departmentCodeContent,
      department_name: asset.departmentNameContent,
      quantity: asset.numberOfAssets,
      cost: asset.originalCost,
      depreciation_rate: asset.depreciationRate / 100,
      life_time: asset.lifeTime,
      tracked_year: asset.trackedYear,
      purchase_date: asset.buyDateContent.concat("T19:05:15"),
      active: Enum.Active.active,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Hàm nhân bản tài sản
 * @param {tài sản được thêm} asset
 * CreatedBy: BDThang (10/09/2023)
 */
export const copyAsset = async (asset) => {
  try {
    checkDuplicateCode(asset.assetCodeContent);
    await axios.post(baseURL + "FixedAssets", {
      fixed_asset_code: asset.assetCodeContent,
      fixed_asset_name: asset.assetNameContent,
      fixedassetcategory_id: asset.categoryId,
      fixed_asset_category_code: asset.categoryCodeContent,
      fixed_asset_category_name: asset.categoryNameContent,
      department_id: asset.departmentId,
      department_code: asset.departmentCodeContent,
      department_name: asset.departmentNameContent,
      quantity: asset.numberOfAssets,
      cost: asset.originalCost,
      depreciation_rate: asset.depreciationRate / 100,
      purchase_date: asset.buyDateContent,
      tracked_year: asset.trackedYear,
      life_time: asset.lifeTime,
      production_year: 2012,
      active: Enum.Active.active,
    });
  } catch (error) {
    console.log(error);
  }
};
