import BaseModel from './base.model';

export default class EvaluationFormModel extends BaseModel {

    name;
    consulation_date;
    first_name;
    last_name;
    role;
    primary_email;
    secondary_email;
    telephone;
    is_sync;
    address1_address;
    address1_suite;
    address1_city;
    address1_state;
    address1_zipcode;
    address2_address;
    address2_suite;
    address2_city;
    address2_state;
    address2_zipcode;
    farm_id;


    rules = () => {
        return {
            first_name: [''],
            last_name: [''],
            role: [],
            primary_email: [],
            secondary_email: [],
            telephone: [''],
            is_sync: [],
            address1_address: [],
            address1_suite: [],
            address1_city: [],
            address1_state: [],
            address1_zipcode: [],
            address2_address: [],
            address2_suite: [],
            address2_city: [],
            address2_state: [],
            address2_zipcode: [],
            farm_id: ['required'],
            id: [],
            consulation_date: ['']
        }
    }

    save = () => {
        if (!this.validate()) {
            return false
        }

        // this.consulation_date = new Date().toISOString().slice(0, 10);
        this.args = [
            "", this.consulation_date, this.first_name, this.last_name, this.role,
            this.primary_email, this.secondary_email, this.telephone, this.is_sync,
            this.address1_address, this.address1_suite, this.address1_city, this.address1_state, this.address1_zipcode,
            this.address2_address, this.address2_suite, this.address2_city, this.address2_state, this.address2_zipcode,
            this.farm_id
        ];

        if (this.isNewRecord()) {
            this.query = `INSERT INTO evaluations(
        name,consulation_date,first_name,last_name,role,
        primary_email,secondary_email,telephone,is_sync,
        address1_address,address1_suite,address1_city,address1_state,address1_zipcode,
        address2_address,address2_suite,address2_city,address2_state,address2_zipcode,
        farm_id
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        } else {
            this.query = `update evaluations set
                name =? ,consulation_date= ?,first_name =? ,last_name= ?,role= ?,
                primary_email=?,secondary_email=?,telephone=?,is_sync=?,
                address1_address=?,address1_suite=?,address1_city=?,address1_state=?,address1_zipcode=?,
                address2_address=?,address2_suite=?,address2_city=?,address2_state=?,address2_zipcode=?,
                farm_id=?
                WHERE id= ${this.id}`;
        }

        return true;
    }
}