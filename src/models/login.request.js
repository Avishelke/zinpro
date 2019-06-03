import BaseModel from './base.model';
import {
    isRequired, chain,
    isValidEmail
} from '../helpers/simple.object.validation';

export class LoginRequestModel extends BaseModel {

    email;
    password;

    rules = () => {
        return {
            email: chain([
                isRequired,
                isValidEmail
            ])('Email'),
            password: chain([
                isRequired,
            ])('Password')
        }
    }
}