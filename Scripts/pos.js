<!--    customer -->
var customers=[];
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
$('#s111,#s222,#h444,#h33,#b111,#s333,#s4,#h22').css(
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
    $('#s111,#s222,#h444,#h33,#b111,#s333,#s4,#h22').css(
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
    $('#s111,#s222,#h444,#h33,#b111,#s333,#s4,#h22').css(
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
    $('#s111,#s222,#h444,#h33,#b111,#s333,#s4,#h22').css(
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
    $('#s111,#s222,#h444,#h33,#b111,#s333,#s4,#h22').css(
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

    // // create object
    let customer ={
        id: val1,
        Name:val2,
        Address:val3,
        Tel:val4,
    }
    // // push to the array
    customers.push(customer);
    loadTable();


    // $('#SID').val("");
    // $('#fname').val("");
    // $('#Lname').val("");
    // $('#address').val("");

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


var items=[]


//     Item crud
$('#item-save').on('click' , ()=>{
    let code = $('#code1').val();
    let desc = $('#desc1').val();
    let unitPrice = $('#price1').val();
    let qty = $('#qty1').val();

    console.log(code,desc,unitPrice,qty)


    // // create object
    let item ={
        code: code,
        desc:desc,
        unitPrice:unitPrice,
        qty:qty,
    }
    // // push to the array
    items.push(item);
    loadItemTable();


    // $('#SID').val("");
    // $('#fname').val("");
    // $('#Lname').val("");
    // $('#address').val("");

})
function loadItemTable() {
    $('#item-details').empty();
    items.map((item, index) => {
        var record = ` <tr>
         <td class="code">${item.code}</td>
         <td class="description"> ${item.desc}</td>
         <td class="unitprice">${item.unitPrice}</td>
        <td class="qty">${item.qty}</td>

         </tr>`
        $('#item-details').append(record);


    });
}
$('#item-details').on('click','tr',function (){
    let index = $(this).index();
    recordIndex=index;
    var code = $(this).find(".code").text();
    var desc = $(this).find(".description").text();
    var price = $(this).find(".unitprice").text();
    var qty = $(this).find(".qty").text();


    console.log(code+ " "+desc+" "+price+" "+qty+" ");
    $('#Code').val(code);
    $('#Desc').val(desc);
    $('#Price').val(price);
    $('#Qty').val(qty);

});
loadItemTable();

$("#item-delete").on('click', () => {
    items.splice(recordIndex, 1);
    loadItemTable();

});
$('#item-update').on('click' , ()=> {

    let val1 = $('#Code').val();
    let val2 = $('#Desc').val();
    let val3 = $('#Price').val();
    let val4 = $('#Qty').val();

    let itemObj=items[recordIndex];
    itemObj.code=val1;
    itemObj.desc=val2;
    itemObj.price=val3;
    itemObj.qty=val4;

    console.log("S1: ", itemObj);
    console.log("S2: ", items[recordIndex]);

    loadItemTable();

});
