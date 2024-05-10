export class customer{
    constructor(id,Name,Address,Tel) {
        this._id=id;
        this._Name=Name;
        this._Address=Address;
        this._Tel=Tel;

    }
    get id(){
        return this._id;
    }
    set id(id){
        this._id=id;
    }

    get Name(){
        return this._Name;
    }
    set Name(name){
        this._Name=name;
    }

    get Address(){
        return this._Address;
    }
    set Address(Address){
        this._Address=Address;
    }

    get Tel(){
        return this._Tel;
    }
    set Tel(Tel){
        this._Tel=Tel
    }






}