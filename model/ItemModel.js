export class ItemModel{
    constructor(code,desc,unitPrice,qty) {
        this._code=code;
        this._desc=desc;
        this._unitPrice=unitPrice;
        this._qty=qty;

    }
    get code(){
        return this._code;
    }
    set code(code){
        this._code=code;
    }
    get desc(){
        return this._desc;
    }
    set desc(desc){
        this._desc=desc;
    }
    get unitPrice(){
        return this._unitPrice;
    }
    set unitPrice(unitPrice){
        this._unitPrice=unitPrice;
    }
    get qty(){
        return this._qty;
    }
    set qty(qty){
        this._qty=qty;
    }
}