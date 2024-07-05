
"use strict";
$(document).ready(function () {

    // lákdjf
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    // biến global lưu dữ liệu menu được chọn
    var gselectedMenuStructure = {
        kichCo: '',
        duongKinh: '',
        suon: '',
        salad: '',
        thanhTien: '',
        soLuongNuoc: '',
    }

    // Biến golbal lưu dữ liệu loại pizza được chọn
    var gselectedPizzaType = {
        loaiPizza: ''
    }

    // Bienes global lưu dữ liệu nước uống
    var gSelectedDrink = {
        idLoaiNuocUong: ''
    }

    // Biến global lưu data input info
    var gInpInfoArr = []

    // Biến lưu discout
    var gDiscout = {
        discout: '',
        giaSauKhiGiam: '',
    }

    // Biến global lưu thông tin combo small size
    var gSmallSizeOption = ['S', '20', 2, '200', '2', 150000]

    // Biến global lưu thông tin combo medium size
    var gMediumSizeOption = ['M', '25', 4, '300', '3', 200000]

    // Biến global lưu thông tin combo large size
    var gLargeSizeOption = ['L', '30', 8, '500', '4', 250000]


    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */

    // Sự kiện load lại trang
    onPageLoading()

    // Gán sự kiện click cho nút chọn size small
    $('#btn-small').click(function () {
        onBtnSmallSizeClick(this)
    })

    // Gán sự kiện click cho nút chọn size medium
    $('#btn-medium').click(function () {
        onBtnMediumSizeClick(this)
    })

    // Gán sự kiện click cho nút chọn size large
    $('#btn-large').click(function () {
        onBtnLargeSizeClick(this)
    })

    // Gán sự kiện click cho nút chọn pizza type seafood
    $('#btn-seafood').click(function () {
        onBtnSeafoodClick(this)
    })

    // Gán sự kiện click cho nút chọn pizza type hawaii
    $('#btn-hawaii').click(function () {
        onBtnHawaiiClick(this)
    })

    // Gán sự kiện click cho nút chọn pizza type bacon
    $('#btn-bacon').click(function () {
        onBtnBaconClick(this)
    })

    // Gán sự kiện khi chọn nước uống
    $('#select-drink').change(function (e) {
        onSelectDrinkChange(e)
    })
    // Gán sự kiên click cho nút gửi đơn
    $('#btn-send').click(function () {
        onBtnSendClick(this)
    })

    // Gán sự kiện cho nút tạo đơn trên modal
    $('#btn-create').click(function () {
        onBtnCreateClick(this)
    })

    // Gán sự kiện cho nút quay lại trên modal
    $('#btn-return').click(function () {
        console.log(1);
        onBtnReturnClick(this)
    })

    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

    // Hàm xử lý sự kiện kho load lại trang
    function onPageLoading() {
        // Gọi hàm call API lấy danh sách nước uống
        var vDrinkListData = getDrinkList()
        // Gọi hàm đỗ dữ liệu vào select drink list
        loadDataToSelectDrinkList(vDrinkListData)
    }

    // Hàm xử lý sự kiện click nút small size
    function onBtnSmallSizeClick(paramBtnElem) {
        // lưu dữ liệu menu được chọn vào biến global
        saveDataMenuComboSelected(gSmallSizeOption)
        // Hiển thị menu đã chọn
        displayMenuComboConsole(gselectedMenuStructure)
        // Đổi màu nút được chọn
        changeColorBtn('S', paramBtnElem)
    }

    // Hàm xử lý sự kiện click nút small size
    function onBtnMediumSizeClick(paramBtnElem) {
        // lưu dữ liệu menu được chọn vào biến global
        saveDataMenuComboSelected(gMediumSizeOption)
        // Hiển thị menu đã chọn
        displayMenuComboConsole(gselectedMenuStructure)
        // Đổi màu nút được chọn
        changeColorBtn('M', paramBtnElem)
    }

    // Hàm xử lý sự kiện click nút small size
    function onBtnLargeSizeClick(paramBtnElem) {
        // lưu dữ liệu menu được chọn vào biến global
        saveDataMenuComboSelected(gLargeSizeOption)
        // Hiển thị menu đã chọn
        displayMenuComboConsole(gselectedMenuStructure)
        // Đổi màu nút được chọn
        changeColorBtn('L', paramBtnElem)
    }

    // Hàm xử lý sự kiện click nút seafood
    function onBtnSeafoodClick(paramBtnElem) {
        // Lưu dữ liệu pizza type được chon vào biến global
        gselectedPizzaType.loaiPizza = 'seafood'
        // Hiễn thị pizza type được chon ra console
        displayPizzaTypeSelected(gselectedPizzaType)
        // Hàm đổi màu nút chọn
        changeColorBtn('seafood', paramBtnElem)
    }

    // Hàm xử lý sự kiện click nút hawaii
    function onBtnHawaiiClick(paramBtnElem) {
        // Lưu dữ liệu pizza type được chon vào biến global
        gselectedPizzaType.loaiPizza = 'hawaii'
        // Hiễn thị pizza type được chon ra console
        displayPizzaTypeSelected(gselectedPizzaType)
        // Hàm đổi màu nút chọn
        changeColorBtn('hawaii', paramBtnElem)
    }

    // Hàm xử lý sự kiện click nút bacon
    function onBtnBaconClick(paramBtnElem) {
        // Lưu dữ liệu pizza type được chon vào biến global
        gselectedPizzaType.loaiPizza = 'bacon'
        // Hiễn thị pizza type được chon ra console
        displayPizzaTypeSelected(gselectedPizzaType)
        // Hàm đổi màu nút chọn
        changeColorBtn('bacon', paramBtnElem)
    }

    // Hàm xủ lý sự kiện khi chọn nước uống
    function onSelectDrinkChange(paramEvent) {
        gSelectedDrink.idLoaiNuocUong = $(paramEvent.target).val();
        console.log('%cBạn đã chọn nước uống: ', 'color: yellow');
        console.log(gSelectedDrink.idLoaiNuocUong);
    }

    // Hàm xử lý sự kiện click nút send
    function onBtnSendClick() {
        getInfoCustomer()
        // Lấy thông tin order
        var vOrderDetailObj = getInfoCustomer()
        console.log('%cSau khi đổi: ', 'color: blue');
        console.log(vOrderDetailObj);
        // kiểm tra order
        var vCheckOrder = checkOrder(vOrderDetailObj)
        if (vCheckOrder) {
            console.log(vOrderDetailObj.idVourcher);
            if (vOrderDetailObj.idVourcher) {
                // lấy discout by icvoucher
                getDiscoutbyVoucherId(vOrderDetailObj)
                console.log('LAY ID NE');
            } else {
                loadInfoCustomer(vOrderDetailObj)
                console.log('KO LAY DC ID NHA');
            }
            // Hiện modal
            $('.modal-order-detail').modal('show');
        }
    }

    // Hàm xủ lý sự kiện click nút create trên modal
    function onBtnCreateClick(paramelementBtn) {
        // lấy order detail để gủi request
        var vOrderDetailObj = getInfoCustomer()
        // gọi hàm call api tạo order mới
        createOrder(vOrderDetailObj)
        // ẩn modal order detail
        $('.modal-order-detail').modal('hide')
        // hiện modal Orderid
        $('.modal-orderId').modal('show')
    }

    // Hàm xủ lý sự kiện click nút return trên modal
    function onBtnReturnClick(paramelementBtn) {
        console.log('2');
        // reset input modal
        resetInputModal()
        // ẩn modal
        $('.modal-order-detail').modal('hide')
    }

    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình */

    // Hàm đổi màu nút được chọn
    function changeColorBtn(paramCombo, paramBtnElem) {
        // Đổi màu nút chọn menu combo
        if (paramCombo === 'S') {
            $(paramBtnElem).attr('class', 'btn btn-success');
            $('#btn-medium').attr('class', 'btn btn-warning');
            $('#btn-large').attr('class', 'btn btn-warning');
        }
        if (paramCombo === 'M') {
            $(paramBtnElem).attr('class', 'btn btn-success');
            $('#btn-small').attr('class', 'btn btn-warning');
            $('#btn-large').attr('class', 'btn btn-warning');
        }
        if (paramCombo === 'L') {
            $(paramBtnElem).attr('class', 'btn btn-success');
            $('#btn-small').attr('class', 'btn btn-warning');
            $('#btn-medium').attr('class', 'btn btn-warning');
        }
        // Đổi màu nút chọn pizza type
        if (paramCombo === 'seafood') {
            $(paramBtnElem).attr('class', 'btn font-weight-bold w-100 btn-success');
            $('#btn-hawaii').attr('class', 'btn font-weight-bold w-100 btn-warning');
            $('#btn-bacon').attr('class', 'btn font-weight-bold w-100 btn-warning');
        }
        if (paramCombo === 'hawaii') {
            $(paramBtnElem).attr('class', 'btn font-weight-bold w-100 btn-success');
            $('#btn-seafood').attr('class', 'btn font-weight-bold w-100 btn-warning');
            $('#btn-bacon').attr('class', 'btn font-weight-bold w-100 btn-warning');
        }
        if (paramCombo === 'bacon') {
            $(paramBtnElem).attr('class', 'btn font-weight-bold w-100 btn-success');
            $('#btn-seafood').attr('class', 'btn font-weight-bold w-100 btn-warning');
            $('#btn-hawaii').attr('class', 'btn font-weight-bold w-100 btn-warning');
        }
    }

    // Hàm lưu dữ liệu menu được chọn vào biến golbal
    function saveDataMenuComboSelected(paramDataMenuComboSelected) {
        gselectedMenuStructure.kichCo = paramDataMenuComboSelected[0]
        gselectedMenuStructure.duongKinh = paramDataMenuComboSelected[1]
        gselectedMenuStructure.suon = paramDataMenuComboSelected[2]
        gselectedMenuStructure.salad = paramDataMenuComboSelected[3]
        gselectedMenuStructure.soLuongNuoc = paramDataMenuComboSelected[4]
        gselectedMenuStructure.thanhTien = paramDataMenuComboSelected[5]
    }

    // Hàm hiểm thị menu combo đã chọn
    function displayMenuComboConsole(paramMenucomboSelected) {
        console.log('%cBạn đã chọn menu combo: ', 'color: chartreuse');
        console.log('Combo: ', gselectedMenuStructure.kichCo);
        console.log('Đường kính: ', gselectedMenuStructure.duongKinh);
        console.log('Sườn nướng: ', gselectedMenuStructure.suon);
        console.log('Salad: ', gselectedMenuStructure.salad);
        console.log('Nước uống: ', gselectedMenuStructure.soLuongNuoc);
        console.log('Giá: ', gselectedMenuStructure.thanhTien);
    }

    // Hàm hiển thị dữ liệu pizza type được chọn ra console
    function displayPizzaTypeSelected(paramPizzaTypeSelected) {
        console.log(`%cBạn đã chọn loại pizza: `, 'color: DarkTurquoise');
        console.log(paramPizzaTypeSelected.loaiPizza);
    }

    // Hàm call API lấy danh sách nước uống
    function getDrinkList() {
        "use strict";
        var dataDrinkList = $.ajax({
            url: "/devcamp-pizza365/drinks",
            type: "GET",
            dataType: "JSON",
            async: false,
            success: function (data) {
                return data
            },
            error: function (error) {
                console.log(error);
            }
        })
        console.log(dataDrinkList.responseJSON);
        return dataDrinkList.responseJSON.drinks
    }

    // Hàm đỗ dữ liệu vào select drink list
    function loadDataToSelectDrinkList(paramDataDrinkList) {
        for (var bI = 0; bI < paramDataDrinkList.length; bI++) {
            $("<option>", {
                html: paramDataDrinkList[bI].tenNuocUong,
                value: paramDataDrinkList[bI].maNuocUong,
            }).appendTo('#select-drink')
        }
    }

    // Hàm lấy thông tin khách hàng 
    function getInfoCustomer() {
        gInpInfoArr = []
        // Lấy giá trị input thông tin khách hàng
        $('input[name="info"]').each(function (_index, element) {
            gInpInfoArr.push($(element).val())
        })
        var vObjectRequest = {
            ...gselectedMenuStructure,
            ...gselectedPizzaType,
            ...gSelectedDrink,

            hoTen: gInpInfoArr[0],
            email: gInpInfoArr[1],
            soDienThoai: gInpInfoArr[2],
            diaChi: gInpInfoArr[3],
            idVourcher: gInpInfoArr[4],
            loiNhan: gInpInfoArr[5],
        }

        return vObjectRequest
    }

    // Hàm kiểm tra thông 
    function checkOrder(paramOrderDetailObject) {
        for (const key in gselectedMenuStructure) {
            if (gselectedMenuStructure[key] == '') {
                alert('Bạn chưa chọn ' + key)
                return false
            }
        }
        if (gselectedPizzaType.loaiPizza == '') {
            alert('bạn chưa chọn loại pizza')
            return false
        }
        if (gSelectedDrink.idLoaiNuocUong == '') {
            alert('Bạn chưa chọn nước uống')
            return false
        }
        if (paramOrderDetailObject.hoTen.trim() == '') {
            alert('Bạn chưa nhập tên')
            return false
        }

        if (paramOrderDetailObject.email.trim() == '') {
            alert('Bạn chưa nhập email')
            return false
        }
        if (checkEmail(paramOrderDetailObject.email.trim()) == false) {
            alert('Email không hợp lệ')
            return false
        }
        if (paramOrderDetailObject.soDienThoai.trim() == '') {
            alert('Bạn chưa nhập số điện thoại')
            return false
        }
        if (checPhoneNumber(paramOrderDetailObject.soDienThoai.trim()) == false) {
            alert('Số điện thoại không hợp lệ')
            return false
        }
        if (paramOrderDetailObject.diaChi.trim() == '') {
            alert('Bạn chưa nhập địa chỉ')
            return false
        }
        return true
    }

    // Hàm kiểm tra email
    function checkEmail(paramEmail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(paramEmail)) {
            return (true)
        }
        return (false)
    }

    // Hàm kiểm tra số điện thoại
    function checPhoneNumber(paramPhoneNumber) {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (vnf_regex.test(paramPhoneNumber) == false) {
            return false
        }
        return true;
    }

    // Hàm lấy phần trăm giảm giá bằng idvoucher
    function getDiscoutbyVoucherId(paramOrderDetailObj) {
        "use strict";
        const vBASE_URL = "/devcamp-voucher-api/voucher_detail/" + paramOrderDetailObj.idVourcher;
        var vDiscout = $.ajax({
            url: vBASE_URL,
            type: "GET",
            dataType: "json",
            success: function (Voucherdata) {
                console.log('CALL API OK');
                console.log(Voucherdata);
                let voucerData = Voucherdata.data
                setDiscout(voucerData, paramOrderDetailObj)
                // load thông tin vào modal
                loadInfoCustomer(paramOrderDetailObj)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('%cKhông tìm thấy voucher', 'color: red');
                // set discout
                gDiscout.discout = 0;
                gDiscout.giaSauKhiGiam = paramOrderDetailObj.thanhTien
                // load order detail vào modal
                loadInfoCustomer(paramOrderDetailObj)
            }
        })
    }

    // Hàm gắn giá trị discout
    function setDiscout(paramRes, paramOrderDetailObj) {
        console.log('check param', paramRes);
        if (paramRes.length == 0) {
            gDiscout.discout = 0;
            gDiscout.giaSauKhiGiam = paramOrderDetailObj.thanhTien
        } else {
            var vDiscout = parseInt(paramRes[0].phanTramGiamGia)
            gDiscout.discout = vDiscout;
            gDiscout.giaSauKhiGiam = paramOrderDetailObj.thanhTien * (1 - vDiscout / 100)
            console.log(gDiscout)
        }

    }

    // Hàm điền thông tin khách hàng vào modal
    function loadInfoCustomer(paramOrderDetailObj) {
        $('input[name="info-modal"]').each(function (index, element) {
            $(element).val(gInpInfoArr[index])
        })

        $('#texterea-info')
            .val(
                `Xác nhận: ${paramOrderDetailObj.hoTen}, ${paramOrderDetailObj.soDienThoai},${paramOrderDetailObj.diaChi}
Menu ${paramOrderDetailObj.kichCo}, sườn nướng ${paramOrderDetailObj.suon}, nước ${paramOrderDetailObj.soLuongNuoc}...
Loại Pizza: ${paramOrderDetailObj.loaiPizza}, Giá: ${paramOrderDetailObj.thanhTien} vnd, Mã giảm giá: ${paramOrderDetailObj.idVourcher}
Phải thanh toán: ${gDiscout.giaSauKhiGiam} vnd (giảm giá ${gDiscout.discout}%)`
            )
    }

    // reset input modal
    function resetInputModal() {
        $('input[name="info-modal"]').each(function (index, element) {
            $(element).val('')
        })

        $('#texterea-info')
            .val('')
    }

    // Hàm xử lý sự kiện tạo order mới
    function createOrder(paramOrderDetailObject) {
        "use strict";
        console.log(paramOrderDetailObject);
        const vBASE_URL = "/devcamp-pizza365/orders";
        $.ajax({
            url: vBASE_URL,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(paramOrderDetailObject),
            success: function (OrderData) {
                console.log(OrderData);
                console.log("Create order success");
                $('#inp-OrderId').val(OrderData.data.orderId)
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        })
    }


});
