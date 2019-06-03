import { getValue } from "../helpers/arrayhelper";

class BaseModel{

    is_sync = 0;
    id = 0;
    query;
    args;

    //All Model Errors
    errors = {};

    values = () => { 
        let value = {};
        Object.keys(this.rules()).map((item) => {
            value[item] = this[item];
        });

        return value;
    };

    //Rules Method
    rules;

    //Validate Function
    validate = () => {
        let rules = this.rules();

        Object.keys(rules).some((key) => {
            const validators = rules[key];
            let value = getValue(this, key);

            return validators.some((v) => {
                return this.myValidators(v, value, key);
            });

        })
        
        return this.hasErrors()
    };

    myValidators = (v, value, key) => {
        
        switch(v){
            case 'required':
            if(value == ''){
                this.errors[v] = this.attributeLabel(key) + ' is required' ;
                return true;
            }else{
                return false;
            }
        }
    }

    //Get Errors Functions
    getErrors = () => this.errors;

    //Load Function
    load(data ){
        Object.keys(this.rules()).map((item) => {
            this[item] = data[item];
        })
    }

    hasErrors = () => {
      return (Object.keys(this.errors).length === 0);
    }

    getFirstError = () => {
        let index = Object.keys(this.errors);
        return this.errors[index[0]];
      }

    addError = (attribute, error) => {
        this.errors[attribute] = error;
    }

    attributeLabel = (str) => {
        return str.replace(/_([a-z])/g, function (m, w) {
            return ' '+ w.toUpperCase();
        }).replace(/\w/, c => c.toUpperCase());
    }

    generateUniqueKey = (str) => {
        let key = str.trim().toLowerCase();
        return key.replace(/ /g, '-');
    }

    isNewRecord = () => {
        return (this.id) ? false : true;
    }
}

export default BaseModel;