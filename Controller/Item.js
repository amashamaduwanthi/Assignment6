import {items} from "../db/CustomerDb.js";

import {ItemModel} from "../model/ItemModel.js";

var recordIndex;
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
// var items=[]


//     Item crud
$('#item-save').on('click' , ()=>{
    let code = $('#code1').val();
    let desc = $('#desc1').val();
    let unitPrice = $('#price1').val();
    let qty = $('#qty1').val();

    console.log(code,desc,unitPrice,qty)
  let item1=new ItemModel(code,desc,unitPrice,qty);

    // // create object
    // let item ={
    //     code: code,
    //     desc:desc,
    //     unitPrice:unitPrice,
    //     qty:qty,
    // }
    // // push to the array
    items.push(item1);
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
