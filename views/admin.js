"use strict";

// ================================================================================
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
// ================================================================================

// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gORDER_COLS = [
  "orderId", "kichCo", "loaiPizza", "idLoaiNuocUong", "thanhTien",
  "hoTen", "soDienThoai", "trangThai", "action"
];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gVOUCHER_ORDERID_COL = 0;
const gVOUCHER_KICHCO_COL = 1;
const gVOUCHER_LOAIPIZZA_COL = 2;
const gVOUCHER_NUOC_COL = 3;
const gVOUCHER_THANHTIEN_COL = 4;
const gVOUCHER_HOTEN_COL = 5;
const gVOUCHER_SODIENTHOAI_COL = 6;
const gVOUCHER_TRANGTHAI_COL = 7;
const gVOUCHER_ACTION_COL = 8;

// Biến toàn cục để hiển lưu STT
var gSTT = 1;

// Biến global voucher id
var gId = '';

// Biến global voucher id
var gUserId = '';

// Biến global order data response
var gOrderDataResponse = []

// Khai báo DataTable & mapping collumns
var gOrderTable = $("#table-order").DataTable({
  columns: [
    { data: gORDER_COLS[gVOUCHER_ORDERID_COL] },
    { data: gORDER_COLS[gVOUCHER_KICHCO_COL] },
    { data: gORDER_COLS[gVOUCHER_LOAIPIZZA_COL] },
    { data: gORDER_COLS[gVOUCHER_NUOC_COL] },
    { data: gORDER_COLS[gVOUCHER_THANHTIEN_COL] },
    { data: gORDER_COLS[gVOUCHER_HOTEN_COL] },
    { data: gORDER_COLS[gVOUCHER_SODIENTHOAI_COL] },
    { data: gORDER_COLS[gVOUCHER_TRANGTHAI_COL] },
    { data: gORDER_COLS[gVOUCHER_ACTION_COL] },

  ],
  columnDefs: [
    // { // định nghĩa lại cột STT
    //   targets: gVOUCHER_STT_COL,
    //   render: function () {
    //     return gSTT++;
    //   }
    // },
    { // định nghĩa lại cột action
      targets: gVOUCHER_ACTION_COL,
      defaultContent: `
        <i  class="order-detail text-success fa-solid fa-pen-to-square" style="font-size: 1.5rem ;cursor:pointer;"></i>
        &ensp;
        <i class="delete-user text-danger fa-solid fa-trash-can" style="font-size: 1.5rem ;cursor:pointer;"></i>
      `
    }
  ]
});


// ================================================================================
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
// ================================================================================


$(document).ready(function () {

  // thêm sự kiện cho nút lọc dữ liệu
  $('#btn-filter').on('click', function () {
    onBtnFilter()
  })

  // thêm sự kiện khi click nút thêm 
  $('#btn-adduser').on('click', function (e) {
    onBtnAddUserClick()
  })

  $('#select-kich-co').change(function () {
    loadOrderCombo()
  })

  // thêm sụ kiện khi click nút insert
  $('#btn-insert-user').on('click', function (e) {
    onBtnInsertClick()
  })

  // thêm sự kiện cho nút chi tiết
  $('#table-order').on('click', '.order-detail', function (e) {
    onBtnDetailClick(this)
  })

  // thêm sự kiện click cho nút confirm tren modal sua
  $('#btn-confirm').on('click', function (e) {
    onBtnConfirmClick(this)
  })

  // thêm sự kiện click nút update trong modal sua
  $('#btn-cancel').on('click', function (e) {
    onBtnCancelClick()
  })

  // them su kien click nut open trong modal sua
  $('#btn-open').on('click', function (e) {
    onBtnOpenClick()
  })

  // thêm sự kiện cho nút delete
  $('#table-order').on('click', '.delete-user', function (e) {
    onBtnXoaClick(this)
  })

  // them sự kiện click cho nút confirm modal delete
  $('#btn-confirm-delete-voucher').on('click', function () {
    onBtnConfirmDeleteClick($('.delete-user'))
  })
})


// ================================================================================
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// ================================================================================


// hàm thực thi khi trang được load
function onPageLoading() {
  // call api lấy dữ liệu từ server
  getDataUserFromServer()
  // load drink list vào select
  getDrinkListFromSever()
}

// hảm xử lý nút lọc dữ liệu
function onBtnFilter() {
  // lấy giá trị người dùng đã chọn để lọc
  var vPizatypeSelected = $('#select-pizatype-filter').val()
  var vStatusSelected = $('#select-status-filter').val()
  // dùng hàm filter để lọc
  var resultFilter = gOrderDataResponse.filter(function (info, index) {
    return ((info.loaiPizza.toLowerCase().includes(vPizatypeSelected.toLowerCase()) || vPizatypeSelected.toLowerCase() == 'none')
      && (info.trangThai.toLowerCase().includes(vStatusSelected.toLowerCase()) || vStatusSelected.toLowerCase() == 'none'))
  })
  loadDataToVoucherTable(resultFilter)
}

// hàm xử lý ấn nút thêm user (chỉ hiện ra modal)
function onBtnAddUserClick() {
  $('#insert-user-modal').modal('show');
}

// hàm xử lý ấn nút insert thêm trên modal
function onBtnInsertClick() {
  var vUserObj = {
    kichCo: "",
    duongKinh: "",
    suon: null,
    salad: "",
    soLuongNuoc: null,
    thanhTien: null,

    loaiPizza: "",

    idLoaiNuocUong: "",

    hoTen: "",
    email: "",
    soDienThoai: "",
    diaChi: "",
    idVourcher: "",
    loiNhan: "",
  }
  // lấy dữ liệu từ form
  var vUserInpObject = getInputUser(vUserObj)
  console.log(vUserInpObject);
  // kiểm tra dữ liệu
  var vcheckInpUser = checkInputUser(vUserInpObject)
  if (vcheckInpUser) {
    // call Api update user
    insertUser(vUserObj)
    // Làm rỗng + Ẩn modal insert
    resetInsertModal()
  }
}


// hàm xử lý sự kiện án nút chi tiết
function onBtnDetailClick(paramElement) {
  // lấy orderid trong row
  var vOrderId = $(paramElement).closest('tr').find('td:eq(0)').html()
  // tìm id bằng orderid
  for (let index = 0; index < gOrderDataResponse.length; index++) {

    if (gOrderDataResponse[index].orderId == vOrderId) {
      console.log(gOrderDataResponse[index].orderId);
      gId = gOrderDataResponse[index].orderId

    }
  }
  // hiện modal
  $('#edit-user-modal').modal('show');
  // Load giá trị vào input
  loadDataUserToInput(vOrderId)
}

// hàm xử lý ấn nút confirm trên modal
function onBtnConfirmClick(paramElement) {
  var vObjectRequest = {
    trangThai: "confirmed"
  }
  // gọi hàm update status
  updateUser(vObjectRequest, gId)
  // ẩn modal & reload
  resetModalAndReload()
}

// hàm xử lý ấn nút cancel trên modal
function onBtnCancelClick() {
  var vObjectRequest = {
    trangThai: "cancel"
  }
  // gọi hàm update status
  updateUser(vObjectRequest, gId)
  // ẩn modal & reload
  resetModalAndReload()
}

// ham xu ly na nut open tren modal
function onBtnOpenClick() {
  var vObjectRequest = {
    trangThai: "open"
  }
  // gọi hàm update status
  updateUser(vObjectRequest, gId)
  // ẩn modal & reload
  resetModalAndReload()
}

// hàm xử lý án nút xóa
function onBtnXoaClick(paramElement) {
  var vUserId = $(paramElement).closest('tr').find('td:eq(1)').html()
  gUserId = vUserId
  console.log('Khi nhấn nút xóa: ' + vUserId);
  // hiện confrim modal
  $('#delete-confirm-modal').modal('show');

}

// hàm xử lý ấn nút confirm xóa trên modal
function onBtnConfirmDeleteClick(paramElement) {
  // lấy orderid trong row
  var vOrderId = $(paramElement).closest('tr').find('td:eq(0)').html()
  console.log(vOrderId)
  // tìm id bằng orderid
  for (let index = 0; index < gOrderDataResponse.length; index++) {

    if (gOrderDataResponse[index].orderId == vOrderId) {
      console.log(gOrderDataResponse[index].orderId);
      gId = gOrderDataResponse[index].orderId

    }
  }
  deleteUser(vOrderId);
  // tắt bảng modal
  $('#delete-confirm-modal').modal('hide');
}


// ========================================================================================
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// ========================================================================================


// hàm call api lấy data user
function getDataUserFromServer() {
  const gORDER_DATA = []

  $.ajax({
    url: "/orders",
    type: "GET",
    dataType: "json",
    async: false,
    success: function (res) {
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        const gORDER_DATA_ITEM = {
          orderId: "",
          kichCo: "",
          loaiPizza: "",
          idLoaiNuocUong: "",
          thanhTien: "",
          trangThai: "",

          hoTen: "",
          soDienThoai: "",
        }
        console.log(res.data[index].orders);
        if (res.data[index].orders.length > 0) {
          gORDER_DATA_ITEM.hoTen = res.data[index].hoTen
          gORDER_DATA_ITEM.soDienThoai = res.data[index].soDienThoai
          gORDER_DATA_ITEM.orderId = res.data[index].orders[0]._id
          gORDER_DATA_ITEM.kichCo = res.data[index].orders[0].kichCo
          gORDER_DATA_ITEM.loaiPizza = res.data[index].orders[0].loaiPizza
          gORDER_DATA_ITEM.idLoaiNuocUong = res.data[index].orders[0].idLoaiNuocUong
          gORDER_DATA_ITEM.thanhTien = res.data[index].orders[0].thanhTien
          gORDER_DATA_ITEM.trangThai = res.data[index].orders[0].trangThai
          console.log(gORDER_DATA_ITEM);
          gORDER_DATA.push(gORDER_DATA_ITEM)
        }

      }
      console.log(gORDER_DATA);
      // load table
      loadDataToVoucherTable(gORDER_DATA);
      // gán order list vào biến global
      gOrderDataResponse = gORDER_DATA
    },
    error: function (error) {
      console.log(error);
    }
  })
}

// gọi API Load all users
function loadDataToVoucherTable(paramVoucherArr) {
  gSTT = 1;
  gOrderTable.clear();
  gOrderTable.rows.add(paramVoucherArr);
  gOrderTable.draw();
}

// gọi Api lấy drink list
function getDrinkListFromSever() {
  "use strict";
  var vBASE_URL = "/devcamp-pizza365/drinks"
  $.ajax({
    url: vBASE_URL,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let drinkData = data.drinks
      loadDrinkListToSelectModal(drinkData)
    },
    error: function (err) {
      console.log(err);
    }
  })
}

// hàm load drink list vào select trên modal 
function loadDrinkListToSelectModal(paramDrinkList) {
  for (let bI = 0; bI < paramDrinkList.length; bI++) {
    $('<option>', {
      value: paramDrinkList[bI].maNuocUong,
      html: paramDrinkList[bI].tenNuocUong
    }).appendTo('#select-nuoc-uong');
  }
}

// hàm điển dữ liệu khi khách hàn chọn combo
function loadOrderCombo() {
  if ($('#select-kich-co').val() == 'none') {

    $('#input-duongkinh').val("")
    $('#input-suonnuong').val('')
    $('#input-salad').val("")
    $('#input-soluongnuoc').val('')
    $('#input-thanhtien').val('')
  }
  if ($('#select-kich-co').val() == 's') {

    $('#input-duongkinh').val("20")
    $('#input-suonnuong').val(2)
    $('#input-salad').val("200")
    $('#input-soluongnuoc').val(2)
    $('#input-thanhtien').val(150000)
  }
  if ($('#select-kich-co').val() == 'm') {

    $('#input-duongkinh').val("25")
    $('#input-suonnuong').val(4)
    $('#input-salad').val("300")
    $('#input-soluongnuoc').val(3)
    $('#input-thanhtien').val(200000)
  }
  if ($('#select-kich-co').val() == 'l') {

    $('#input-duongkinh').val("30")
    $('#input-suonnuong').val(8)
    $('#input-salad').val("500")
    $('#input-soluongnuoc').val(4)
    $('#input-thanhtien').val(250000)
  }
}

// hàm lấy dữ liệu từ input insert modal
function getInputUser(paramUserObj) {
  if ($('#select-kich-co').val() == 's') {
    paramUserObj.kichCo = "S"
    paramUserObj.duongKinh = "20"
    paramUserObj.suon = 2
    paramUserObj.salad = "200"
    paramUserObj.soLuongNuoc = 2
    paramUserObj.thanhTien = 150000
  }
  if ($('#select-kich-co').val() == 'm') {
    paramUserObj.kichCo = "M"
    paramUserObj.duongKinh = "25"
    paramUserObj.suon = 4
    paramUserObj.salad = "300"
    paramUserObj.soLuongNuoc = 3
    paramUserObj.thanhTien = 200000
  }
  if ($('#select-kich-co').val() == 'l') {
    paramUserObj.kichCo = "L"
    paramUserObj.duongKinh = "30"
    paramUserObj.suon = 8
    paramUserObj.salad = "500"
    paramUserObj.soLuongNuoc = 4
    paramUserObj.thanhTien = 250000
  }
  paramUserObj.loaiPizza = $('#select-loai-pizza').val().trim()
  paramUserObj.idLoaiNuocUong = $('#select-nuoc-uong').val().trim()

  paramUserObj.hoTen = $('#input-hovaten').val().trim()
  paramUserObj.email = $('#input-email').val().trim()
  paramUserObj.soDienThoai = $('#input-sodienthoai').val().trim()
  paramUserObj.diaChi = $('#input-diachi').val().trim()
  paramUserObj.idVourcher = $('#input-voucherid').val().trim()
  paramUserObj.loiNhan = $('#input-loinhan').val().trim()

  return paramUserObj
}

// hàm kiểm tra input form insert
function checkInputUser(paramUserObj) {
  var isValid = false
  for (const key in paramUserObj) {
    if (paramUserObj.hasOwnProperty.call(paramUserObj, key)) {
      var vOrderArr = Object.values(paramUserObj)
      for (let bI = 0; bI < vOrderArr.length - 2; bI++) {
        if (vOrderArr[bI] == '' || vOrderArr[bI] == 'none') {
          isValid = false
          if (vOrderArr[9] != '') {
            if (checkEmail(vOrderArr[9])) {
              isValid = true
            } else {
              return
            }
          }
          if (vOrderArr[10] != '') {
            if (checPhoneNumber(vOrderArr[10])) {
              isValid = true
            } else {
              return
            }
          }
          alert('Bạn chưa order xong')
          return false
        } else {
          isValid = true
        }

      }

    }
  }
  return isValid
}

// Hàm kiểm tra email
function checkEmail(paramEmail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(paramEmail)) {
    return (true)
  }
  alert('email không hợp lệ')
  return (false)
}

// Hàm kiểm tra số điện thoại
function checPhoneNumber(paramPhoneNumber) {
  var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (vnf_regex.test(paramPhoneNumber) == false) {
    alert("Số điện thoại không hợp lệ")
    return false
  }
  return true;
}

// hàm call Api insert user
function insertUser(paramUserObj) {
  $.ajax({
    url: "/devcamp-pizza365/orders",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(paramUserObj),
    async: false,
    success: function (data) {
      console.log(data);
      alert('Thêm user Thành công')
    },
    error: function (data) {
      console.log(data);
    }
  })
}

// hàm reset insert modal
function resetInsertModal() {
  // làm trăng modal
  $('#inp-firstname').val('')
  $('#inp-lastname').val('')
  $('#inp-firstname').val('')
  $('#inp-subject').val('')

  // ẩn modal
  $('#insert-user-modal').modal('hide')

  // load lại trang
  location.reload(true)
}

// hàm load giá trị vào ô input
function loadDataUserToInput(paramOrderId) {
  var vDataRow = []
  var vOrderData = []

  const vBASE_URL = "/orders"
  $.ajax({
    url: vBASE_URL + '/' + paramOrderId,
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      for (let index = 0; index < res.data.length; index++) {
        const gORDER_DATA_ITEM = {
          orderId: "",
          kichCo: "",
          loaiPizza: "",
          idLoaiNuocUong: "",
          thanhTien: "",
          trangThai: "",

          hoTen: "",
          soDienThoai: "",

        }

        if (res.data[index].orders.length > 0) {
          gORDER_DATA_ITEM.orderId = res.data[index]._id
          gORDER_DATA_ITEM.kichCo = res.data[index].orders[0].kichCo
          gORDER_DATA_ITEM.duongKinh = res.data[index].orders[0].duongKinh
          gORDER_DATA_ITEM.suon = res.data[index].orders[0].suon
          gORDER_DATA_ITEM.salad = res.data[index].orders[0].salad
          gORDER_DATA_ITEM.loaiPizza = res.data[index].orders[0].loaiPizza
          gORDER_DATA_ITEM.idVourcher = res.data[index].orders[0].idVourcher
          gORDER_DATA_ITEM.thanhTien = res.data[index].orders[0].thanhTien
          gORDER_DATA_ITEM.thanhTien = res.data[index].orders[0].thanhTien
          gORDER_DATA_ITEM.idLoaiNuocUong = res.data[index].orders[0].idLoaiNuocUong
          gORDER_DATA_ITEM.soLuongNuoc = res.data[index].orders[0].soLuongNuoc
          gORDER_DATA_ITEM.hoTen = res.data[index].hoTen
          gORDER_DATA_ITEM.hoTen = res.data[index].email
          gORDER_DATA_ITEM.soDienThoai = res.data[index].soDienThoai
          gORDER_DATA_ITEM.diaChi = res.data[index].diaChi
          gORDER_DATA_ITEM.trangThai = res.data[index].orders[0].trangThai
          gORDER_DATA_ITEM.loiNhan = res.data[index].orders[0].loiNhan
          gORDER_DATA_ITEM.createdAt = res.data[index].orders[0].createdAt
          gORDER_DATA_ITEM.updatedAt = res.data[index].orders[0].updatedAt

          vOrderData.push(gORDER_DATA_ITEM)
        }
      }
      for (const key in vOrderData[0]) {
        vDataRow.push(vOrderData[0][key])
      }
      console.log('chekc', vDataRow);
      $('input[name="edit"]').each(function (index, element) {
        $(element).val(vDataRow[index]);
      })
    },
    error: function (response) {
      console.log(response);
    }
  })
}

// hàm update trạng thái
function updateUser(paramDataStatusObj, paramOrderId) {

  $.ajax({
    url: `/devcamp-pizza365/orders/${paramOrderId}`,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(paramDataStatusObj),
    async: false,
    success: function (data) {
      alert('Sửa thành công')
    },
    error: function (data) {
      console.log(data);
    }
  })
}

// hàm ẩn modal và reload
function resetModalAndReload() {
  $('#edit-user-modal').modal('hide');
  window.location.reload();
}

// hàm xóa user
function deleteUser(paramUserId) {
  $.ajax({
    url: `/users/${paramUserId}`,
    type: 'DELETE',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    async: true,
    success: function (data) {
      console.log(data);
      // location.reload()
      getDataUserFromServer()
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  })
}