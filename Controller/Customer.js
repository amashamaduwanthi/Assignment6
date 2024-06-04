<!--    customer -->
import {customers} from "../db/CustomerDb.js";

import {customer} from "../model/CustomerModel.js";

// var customers=[];
var recordIndex;
$('#s1,#s2,#s5,#h2,#b1,#s3').css(
    {
        display:'none'
    }
)
$('#s01,#s02,#s05,#h3,#b01,#s03,#s06').css(
    {
        display:'none'
    }
)
$('#place-order-section').css(
    {
        display:'none'
    }
)

$('#Customer-manage').on('click', () =>{
    $('#s1,#s2,#s5,#h2,#b1,#s3').css(
        {
            display:'block'
        }
    )

    $('#s01,#s02,#s05,#h3,#b01,#s03,#s06').css(
        {
            display:'none'
        }
    )
    $('#s11,#s22,#h44,#d2,#d3').css(
        {
            display:'none'
        }
    )
    $('#place-order-section').css(
        {
            display:'none'
        }
    )
});

$('#Item-manage').on('click', () =>{
    $('#s1,#s2,#s5,#h2,#b1,#s3').css(
        {
            display:'none'
        }
    )

    $('#s01,#s02,#s05,#h3,#b01,#s03,#s06').css(
        {
            display:'block'
        }
    )
    $('#s11,#s22,#h44,#d2,#d3').css(
        {
            display:'none'
        }
    )
    $('#place-order-section').css(
        {
            display:'none'
        }
    )
});
$('#Home-mange').on('click', () =>{
    $('#s1,#s2,#s5,#h2,#b1,#s3').css(
        {
            display:'none'
        }
    )

    $('#s01,#s02,#s05,#h3,#b01,#s03,#s06').css(
        {
            display:'none'
        }
    )
    $('#s11,#s22,#h44,#d2,#d3').css(
        {
            display:'block'
        }
    )
    $('#place-order-section').css(
        {
            display:'none'
        }
    )
});
$('#order-manage').on('click', () =>{
    $('#s1,#s2,#s5,#h2,#b1,#s3').css(
        {
            display:'none'
        }
    )

    $('#s01,#s02,#s05,#h3,#b01,#s03,#s06').css(
        {
            display:'none'
        }
    )
    $('#s11,#s22,#h44,#d2,#d3').css(
        {
            display:'none'
        }
    )
    $('#place-order-section').css(
        {
            display:'block'
        }
    )
});


//    crud Add
function loadTable() {
    $('#Customer-detail').empty();
    customers.map((item, index) => {
        var record = ` <tr>
         <td class="cid">${item.id}</td>
         <td class="cname"> ${item.Name}</td>
         <td class="caddress">${item.Address}</td>
        <td class="ctel">${item.Tel}</td>

         </tr>`
        $('#Customer-detail').append(record);

    });

}

$('#save').on('click' , ()=>{
    let val1 = $('#Nic').val();
    let val2 = $('#Name').val();
    let val3 = $('#Address').val();
    let val4 = $('#Tel').val();

    console.log(val1,val2,val3,val4)
    let customer1 = new customer(val1,val2,val3,val4);

    customers.push(customer1);
    loadTable();


})

$("#Delete").on('click', () => {
    customers.splice(recordIndex, 1);
    loadTable();

});

$('#Customer-detail').on('click','tr',function (){
    let index = $(this).index();
    recordIndex=index;
    var id = $(this).find(".cid").text();
    var name = $(this).find(".cname").text();
    var address = $(this).find(".caddress").text();
    var tel = $(this).find(".ctel").text();


    console.log(id+ " "+name+" "+address+" "+tel+" ");
    $('#CID').val(id);
    $('#Cname').val(name);
    $('#Caddress').val(address);
    $('#Ctel').val(tel);

});
$('#Update').on('click' , ()=> {

    let val1 = $('#CID').val();
    let val2 = $('#Cname').val();
    let val3 = $('#Caddress').val();
    let val4 = $('#Ctel').val();

    let customerObj=customers[recordIndex];
    customerObj.id=val1;
    customerObj.Name=val2;
    customerObj.Address=val3;
    customerObj.Tel=val4;

    console.log("S1: ", customerObj);
    console.log("S2: ", customers[recordIndex]);

    loadTable();

});



