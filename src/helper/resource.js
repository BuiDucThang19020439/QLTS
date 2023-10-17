const Resource = {
    formTitle: {
        addAsset: "Thêm tài sản",
        modifyAsset: "Sửa tài sản",
        copyAsset: "Nhân bản tài sản",
    },

    toastMessage: {
        successAdd: "Thêm tài sản thành công",
        failAdd: "Thêm tài sản thất bại",
        successModify: "Sửa tài sản thành công",
        failModify: "Sửa tài sản thất bại",
        successDelete: "Xóa thành công",       
    },

    toastIcon: {
        success: "icon-success",
        fail: "icon-warning",
        delete: "icon-trash-bin",
    },

    validateConflictCode: {
        assetCode: "Mã tài sản đã tồn tại",
    },

    validateLength: {
        assetCode: "Mã tài sản quá 20 kí tự",
        assetName: "Mã tài sản quá 255 kí tự",
    },
    
    validateEmpty: {
        assetCode: "Mã tài sản ko được để trống",
        categoryCode: "Mã loại tài sản ko được để trống",
        departmentCode: "Mã bộ phận sử dụng tài sản ko được để trống",
        assetName: "Tên tài sản không được để trống",
        quantity: "Số lượng không được để trống",
        originalCost: "Nguyên giá không được để trống",
        lifeTime: "Số năm sử dụng không được để trống",
        depreciationRate: "Tỷ lệ hao mòn không được để trống",
        depreciationCost: "Giá trị hao mòn không được để trống",
        buyDate: "Ngày mua không được để trống",
        useDate: "Ngày bắt đầu sử dụng không được phép để trống",
    },

    warning: {
        cancelForm: "Bạn có chắc chắn muốn hủy không",
        validateForm: "Thông tin bạn gửi không hợp lệ: ",
        noCheckedAsset: "Bạn chưa chọn tài sản nào!",
        deleteAnAsset: "Bạn có xóa tài sản: ",
        deleteManyAsset: " tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
    }
}

export default Resource; 