
import { customers } from "../db/CustomerDb.js";
import { customer } from "../model/CustomerModel.js";

var recordIndex;

// Hide sections initially
$('#s1,#s2,#s5,#h2,#b1,#s3').css({ display: 'none' });
$('#s01,#s02,#s05,#h3,#b01,#s03,#s06').css({ display: 'none' });
$('#place-order-section').css({ display: 'none' });

// Handle button clicks to manage visibility
$('#Customer-manage').on('click', () => {
    toggleSections(['#s1', '#s2', '#s5', '#h2', '#b1', '#s3'], ['#s01', '#s02', '#s05', '#h3', '#b01', '#s03', '#s06', '#s11', '#s22', '#h44', '#d2', '#d3', '#place-order-section']);
});

$('#Item-manage').on('click', () => {
    toggleSections(['#s01', '#s02', '#s05', '#h3', '#b01', '#s03', '#s06'], ['#s1', '#s2', '#s5', '#h2', '#b1', '#s3', '#s11', '#s22', '#h44', '#d2', '#d3', '#place-order-section']);
});

$('#Home-mange').on('click', () => {
    toggleSections(['#s11', '#s22', '#h44', '#d2', '#d3'], ['#s1', '#s2', '#s5', '#h2', '#b1', '#s3', '#s01', '#s02', '#s05', '#h3', '#b01', '#s03', '#s06', '#place-order-section']);
});

$('#order-manage').on('click', () => {
    toggleSections(['#place-order-section'], ['#s1', '#s2', '#s5', '#h2', '#b1', '#s3', '#s01', '#s02', '#s05', '#h3', '#b01', '#s03', '#s06', '#s11', '#s22', '#h44', '#d2', '#d3']);
});

// Function to toggle sections
function toggleSections(showSelectors, hideSelectors) {
    showSelectors.forEach(selector => $(selector).css({ display: 'block' }));
    hideSelectors.forEach(selector => $(selector).css({ display: 'none' }));
}

// Load table with customer data
function loadTable() {
    $('#Customer-detail').empty();
    customers.forEach((item, index) => {
        var record = `
            <tr>
                <td class="cid">${item.id}</td>
                <td class="cname">${item.Name}</td>
                <td class="caddress">${item.Address}</td>
                <td class="ctel">${item.Tel}</td>
            </tr>`;
        $('#Customer-detail').append(record);
    });
}

// Validate form inputs
function validateInputs(val1, val2, val3, val4) {
    if (!val1 || !val2 || !val3 || !val4) {
        alert('All fields are required');
        return false;
    }
    return true;
}

// Add customer
$('#save').on('click', () => {
    let val1 = $('#Nic').val();
    let val2 = $('#Name').val();
    let val3 = $('#Address').val();
    let val4 = $('#Tel').val();

    if (!validateInputs(val1, val2, val3, val4)) return;

    console.log(val1, val2, val3, val4);
    let customer1 = new customer(val1, val2, val3, val4);

    customers.push(customer1);
    loadTable();
});

// Delete customer
$("#Delete").on('click', () => {
    if (recordIndex == null) {
        alert('Please select a customer to delete');
        return;
    }
    customers.splice(recordIndex, 1);
    recordIndex = null;
    loadTable();
});

// Handle row click for editing
$('#Customer-detail').on('click', 'tr', function () {
    let index = $(this).index();
    recordIndex = index;
    var id = $(this).find(".cid").text();
    var name = $(this).find(".cname").text();
    var address = $(this).find(".caddress").text();
    var tel = $(this).find(".ctel").text();

    console.log(id + " " + name + " " + address + " " + tel);
    $('#CID').val(id);
    $('#Cname').val(name);
    $('#Caddress').val(address);
    $('#Ctel').val(tel);
});

// Update customer
$('#Update').on('click', () => {
    if (recordIndex == null) {
        alert('Please select a customer to update');
        return;
    }

    let val1 = $('#CID').val();
    let val2 = $('#Cname').val();
    let val3 = $('#Caddress').val();
    let val4 = $('#Ctel').val();

    if (!validateInputs(val1, val2, val3, val4)) return;

    let customerObj = customers[recordIndex];
    customerObj.id = val1;
    customerObj.Name = val2;
    customerObj.Address = val3;
    customerObj.Tel = val4;

    console.log("S1: ", customerObj);
    console.log("S2: ", customers[recordIndex]);

    loadTable();
});