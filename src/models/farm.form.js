import BaseModel from './base.model';

export default class FarmFormModel extends BaseModel {

    name;
    location;
    created_by;
    created_at;
    updated_at;
    noofsows;
    genetics;
    feedsupplier;
    notes;
    veterinarian;
    farm_manager;
    phone;
    email;


    rules = () => {
        return {
            name: [''],
            location: [''],
            created_by: [''],
            created_at: [''],
            updated_at: [''],
            noofsows: [''],
            genetics: [''],
            feedsupplier: [''],
            notes: [''],
            veterinarian: [''],
            farm_manager: [''],
            phone: [''],
            email: [''],
            is_sync: [],
            is_active: [],
            id: []
        }
    }

    save = () => {
        if (!this.validate()) {
            return false
        }

        this.args = [
            this.name, this.location, this.is_sync, this.is_active, this.noofsows, this.genetics, this.feedsupplier, this.notes, this.veterinarian,
            this.farm_manager, this.phone, this.email, this.created_by, this.created_at, this.updated_at,
        ];

        if (this.isNewRecord()) {
            this.query = `INSERT INTO farms(
                name,location,is_sync,is_active,noofsows,genetics,feedsupplier,notes,veterinarian,
                farm_manager,phone,email,created_by,created_at,updated_at
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;


        } else {
            this.query = `UPDATE farms SET 
                    name= ?,location= ?,is_sync =?,is_active =?,noofsows=?,genetics=?,feedsupplier=?,notes=?,veterinarian=?,
                    farm_manager=?,phone=?,email=?,created_by=?,created_at=?,updated_at=?
                    WHERE id= ${this.id}`;
        }

        return true;
    }
}