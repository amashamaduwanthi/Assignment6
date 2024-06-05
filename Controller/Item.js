import { items } from "../db/CustomerDb.js";
import { ItemModel } from "../model/ItemModel.js";

var recordIndex;

// Add item
$('#item-save').on('click', () => {
    let code = $('#code1').val();
    let desc = $('#desc1').val();
    let unitPrice = $('#price1').val();
    let qty = $('#qty1').val();

    if (!validateItemInputs(code, desc, unitPrice, qty)) return;

    console.log(code, desc, unitPrice, qty);
    let item1 = new ItemModel(code, desc, unitPrice, qty);

    items.push(item1);
    loadItemTable();
    clearItemInputs();
});

// Validate form inputs
function validateItemInputs(code, desc, unitPrice, qty) {
    if (!code || !desc || !unitPrice || !qty) {
        alert('All fields are required');
        return false;
    }
    if (isNaN(unitPrice) || isNaN(qty)) {
        alert('Unit Price and Quantity must be numbers');
        return false;
    }
    return true;
}

// Load table with item data
function loadItemTable() {
    $('#item-details').empty();
    items.forEach((item, index) => {
        var record = `
            <tr>
                <td class="code">${item.code}</td>
                <td class="description">${item.desc}</td>
                <td class="unitprice">${item.unitPrice}</td>
                <td class="qty">${item.qty}</td>
            </tr>`;
        $('#item-details').append(record);
    });
}

// Clear form inputs
function clearItemInputs() {
    $('#code1').val('');
    $('#desc1').val('');
    $('#price1').val('');
    $('#qty1').val('');
}

// Handle row click for editing
$('#item-details').on('click', 'tr', function () {
    let index = $(this).index();
    recordIndex = index;
    var code = $(this).find(".code").text();
    var desc = $(this).find(".description").text();
    var unitPrice = $(this).find(".unitprice").text();
    var qty = $(this).find(".qty").text();

    console.log(code + " " + desc + " " + unitPrice + " " + qty);
    $('#Code').val(code);
    $('#Desc').val(desc);
    $('#Price').val(unitPrice);
    $('#Qty').val(qty);
});

// Delete item
$("#item-delete").on('click', () => {
    if (recordIndex == null) {
        alert('Please select an item to delete');
        return;
    }
    items.splice(recordIndex, 1);
    recordIndex = null;
    loadItemTable();
    clearItemInputs();
});

// Update item
$('#item-update').on('click', () => {
    if (recordIndex == null) {
        alert('Please select an item to update');
        return;
    }

    let code = $('#Code').val();
    let desc = $('#Desc').val();
    let unitPrice = $('#Price').val();
    let qty = $('#Qty').val();

    if (!validateItemInputs(code, desc, unitPrice, qty)) return;

    let itemObj = items[recordIndex];
    itemObj.code = code;
    itemObj.desc = desc;
    itemObj.unitPrice = unitPrice;
    itemObj.qty = qty;

    console.log("S1: ", itemObj);
    console.log("S2: ", items[recordIndex]);

    loadItemTable();
    clearItemInputs();
});

// Initial load of the item table
loadItemTable();