import {orderArr,customers,items} from "../db/CustomerDb.js";
import {OrderModel} from "../model/orderModel.js";

let cartItemsArr=[];
let totalPrice=0;
let subTotalPrice=0;
var discountPercentage=0;
let balance=0;

function initialize() {
    loadCustomers();
    loadItems();
}
$('#customerIdSelector').on('click', function() {
    loadCustomers();
})
$('#itemIdSelector').on('click', function() {
    loadItems();
})
function loadCustomers() {
    $('#customerIdSelector').empty();
    $.each(customers, function(index, customer) {
        $('#customerIdSelector').append('<option value="' + customer.id + '">' + customer.Name + '</option>');
    });
}
function loadItems() {
    $('#itemIdSelector').empty();
    $.each(items, function(index, item) {
        $('#itemIdSelector').append('<option value="' + item.code + '">' + item.desc + '</option>');
    });
}
function updateCustomerInfo() {
    var selectedCustomerId = $('#customerIdSelector').val();
    var selectedCustomer=null;
    try{
        selectedCustomer = customers.find(s => s.id === selectedCustomerId);
    }catch (error){
        console.log("fetching User Details Failed..",error)
    }
    if(selectedCustomer) {
        $('#selectedCustomerIdPlaceOrder').val(selectedCustomer.id);
        $('#selectedCustomerNamePlaceOrder').val(selectedCustomer.Name);
        $('#selectedCustomerAddressPlaceOrder').val(selectedCustomer.Address);
        $('#order-tbl-tbody').empty();
        cartItemsArr = [];
        totalPrice = 0;
        $('#totalPrice').text("Total :");
    }
}

function updateItemInfo() {
    var selectedItemId = $('#itemIdSelector').val();
    var selectedItem=null;
    try{
        selectedItem = items.find(s => s.code === selectedItemId);
    }catch (error){
        console.log("fetching Item Details Failed..",error)
    }
    if(selectedItem) {
        $('#itemCode').val(selectedItem.code);
        $('#itemName').val(selectedItem.desc);
        $('#itemPrice').val(selectedItem.unitPrice);
        $('#itemQty').val(selectedItem.qty);
    }
}

$('#customerIdSelector').change(updateCustomerInfo);
$('#itemIdSelector').change(updateItemInfo);

function loadCartItems() {
    $('#order-tbl-tbody').empty();
    $.each(cartItemsArr, function(index, item) {
        var row = `<tr>
            <td id="item-code-tbl">${item.code}</td>
            <td id="item-name-tbl">${item.Name}</td>
            <td id="item-price-tbl">${item.unitPrice}</td>
            <td id="order-qty-tbl">${item.orderQty}</td>
            <td id="total-tbl">${item.total}</td>
            <td>
                <button class="btn btn-danger cart-remove" data-id="${item.code}">Remove</button>
               <!-- <button class="btn btn-secondary reduce-amount" data-bs-toggle="modal"  data-bs-target="#order-items-modal">Reduce Qty</button>-->
            </td>
        </tr>`;
        $('#order-tbl-tbody').append(row);
    });
}
$('tbody').on('click', '.cart-remove', function() {
    var itemId = $(this).data('id');
    let removingRequestedItem = cartItemsArr.find(s=>s.code===itemId);
    if(removingRequestedItem){
        let currentItemQty = parseInt(items.find(s=>s.code===itemId).qty);
        let updatedItemQty = currentItemQty+parseInt(removingRequestedItem.orderQty);
        items.find(s=>s.code===itemId).qtyOnHand=updatedItemQty;
        totalPrice-=removingRequestedItem.total;
        $('#totalPrice').text("Total : Rs."+totalPrice);
    }
    cartItemsArr.find(s=>s.code===itemId).total=0;
    cartItemsArr = cartItemsArr.filter(s => s.code !== itemId);
    loadCartItems();
    clearItemFields(); Swal.fire({
            title: "OOPS",
            text: "No Customer Found",
            icon: "error"
        });
})
$('#btnAddToCart').on('click',(e)=>{
    if(!$('#orderQty').val()||$('#orderQty').val()===0){
        Swal.fire({
            title: "OOPS!",
            text: "Order Quantity cannot be 0",
            icon: "warning"
        });
        return;
    }else if(!$('#itemCode').val()){
        Swal.fire({
            title: "OOPS!",
            text: "Item Code cannot be empty",
            icon: "warning"
        });
        return;
    }else if($('#itemQty').val()<$('#orderQty').val()){
        Swal.fire({
            title: "OOPS!",
            text: "Order Quantity cannot be greater than Item Quantity",
            icon: "warning"
        });
        return;
    }
    let totalForCurrentItem=($('#itemPrice').val()*$('#orderQty').val());
    try{
        if(cartItemsArr.find(s => s.itemId === $('#itemCode').val())) {
            let indexOfItem = cartItemsArr.findIndex(s => s.code === $('#itemCode').val());
            cartItemsArr[indexOfItem].orderQty=parseInt($('#orderQty').val())+parseInt(cartItemsArr[indexOfItem].orderQty);
            cartItemsArr[indexOfItem].total+=totalForCurrentItem;
            loadCartItems();
        }else{
            cartItemsArr.push({
                code: $('#itemCode').val(),
                Name: $('#itemName').val(),
                unitPrice: $('#itemPrice').val(),
                orderQty: $('#orderQty').val(),
                total: totalForCurrentItem
            });
        }
        let indexOfItem = items.find(s => s.code === $('#itemCode').val());
        console.log("Index of Item : ",indexOfItem)
        indexOfItem.qty-=parseInt($('#orderQty').val());
        clearItemFields();
    }catch (error){
        Swal.fire({
            title: "Something went wrong",
            text: "Adding Item Failed..",
            icon: "error"
        });
        console.log("Adding Item Failed..",error)
    }
    console.log(cartItemsArr);
    totalPrice+=totalForCurrentItem;
    $('#totalPrice').text("Total : Rs."+totalPrice);
    loadCartItems();
});
function clearItemFields(){
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#itemPrice').val("");
    $('#itemQty').val("");
    $('#orderQty').val("");
}
function clearAllFields(){
    $('#customerIdSelector').val("")
    $('#selectedCustomerIdPlaceOrder').val("")
    $('#selectedCustomerNamePlaceOrder').val("")
    $('#selectedCustomerAddressPlaceOrder').val("")
    $('#itemIdSelector').val("");
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#itemPrice').val("");
    $('#itemQty').val("");
    $('#customerPayingAmount').val("");
    $('#discount').val("");
}
$('#discount').on('click',()=>{
    try{
        var payingAmount = Number($('#customerPayingAmount').val());
        discountPercentage = $('#discount').val();

        if (payingAmount < totalPrice || isNaN(payingAmount)) {
            Swal.fire({
                title: "OOPS.!",
                text: "Invalid Amount, Check and Try Again",
                icon: "warning"
            });
            /*alert("Invalid Amount, Check and Try Again");*/
            return;
        }
        subTotalPrice=totalPrice/100*(100-discountPercentage);
        balance = payingAmount-subTotalPrice;
        $('#subTotalPrice').text("Sub Total : Rs."+subTotalPrice);
        $('#balancePrice').text("Balance : Rs."+balance);
    }catch (error){
        Swal.fire({
            title: "Something went wrong",
            text: "Discounting Failed..",
            icon: "error"
        });
        console.log("Discounting Failed..",error)
    }
});
$('#btnPlaceOrder').on('click',()=>{
    if(cartItemsArr.length===0){
        // Swal.fire({
        //     title: "OOPS.!",
        //     text: "Cart is Empty,Couldn't Place Order",
        //     icon: "warning"
        // });
        return;
    }else if(!$('#customerPayingAmount').val()){
        // Swal.fire({
        //     title: "OOPS.!",
        //     text: "Paying Amount cannot be empty",
        //     icon: "warning"
        // });
        return;
    }

    $('#place-order-modal').modal('show');
    $('#orderCustomerNameSpan').text($('#selectedCustomerNamePlaceOrder').val());
    $('#orderItemCountSpan').text(cartItemsArr.length);
    $('#totalAmountSpan').text("Rs."+totalPrice);
    $('#cashAmountSpan').text("Rs."+$('#customerPayingAmount').val());
    var discountPercentage =Math.min(100,Math.max(0,parseInt($('#discount').val())))
    $('#discountPercentageSpan').text(discountPercentage+"%");
    $('#balanceAmountSpan').text("Rs."+balance);
    $('#subTotalAmountSpan').text("Rs."+subTotalPrice);
});
$('#btnConfirmPlaceOrder').on('click',()=>{
    $('#place-order-modal').modal('hide');
    try{
        let newOrderId = generateId();
        let newPlaceOrder = new OrderModel(newOrderId,$('#selectedCustomerIdPlaceOrder').val(),getTodayDate(),totalPrice,discountPercentage,balance,subTotalPrice,cartItemsArr);
        orderArr.push(newPlaceOrder)
        console.log(orderArr)
        if(newPlaceOrder){
            Swal.fire({
                title: "Place Order Successful..",
                text: "Order confirmed.. Order Id : \""+newOrderId+"\" ",
                icon: "success"
            });
            clearAllFields();
            initialize();
        }
    }catch (error){
        Swal.fire({
            title: "Place Order Failed..",
            text: "Couldn't Place Order due to an error",
            icon: "error"
        });
        console.log("Placing Order Failed..",error)
    }
});
function generateId() {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = now.getFullYear();
    var hh = String(now.getHours()).padStart(2, '0');
    var min = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    var ms = String(now.getMilliseconds()).padStart(3, '0');

    var id = "O" + dd + mm + ms + hh + yy + ss + min;
    return id;
}
function getTodayDate() {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = now.getFullYear();
    return yy + '-' + mm + '-' + dd;
}
/*function showNotification(heading,body) {
    $('#notification-header').text(heading)
    $('#notification-details').text(body)
    $('#notification').show();
    setTimeout(function() {
        $('#notification').fadeOut();
    }, 5000);
}*/


