import BaseModel from './base.model';

export default class GroupFormModel extends BaseModel {

  farm_id;
  name;
  size;
  type_of_animal;
  comments;

  rules = () => {
    return {
      farm_id: ['required'],
      name: ['required'],
      size: ['required'],
      type_of_animal: ['required'],
      comments: [],
      id: [],
      is_sync: [],
    }
  }

  save = () => {
    if (!this.validate()) {
      return false
    }

    this.args = [
      this.farm_id, this.name, this.size, this.type_of_animal, this.comments, this.is_sync
    ];

    if (this.isNewRecord()) {
      this.query = `INSERT INTO groups(
          farm_id,name,size,type_of_animal,comments, is_sync
          ) VALUES (?,?,?,?,?,?)`;


    } else {
      this.query = `UPDATE groups SET 
              farm_id=?,name=?,size=?,type_of_animal=?,comments=?, is_sync=?
              WHERE id= ${this.id}`;
    }

    return true;
  }

}