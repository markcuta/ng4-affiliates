import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import CryptoJS from 'crypto-js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistrationService {
    private _baseUrl: string = "http://process.xflirt.com/v1/accounts"
    private _accessKeyId = "AKID9QBXVYFP2HVXHAEQ";
    private _accessKeySecret = "ptQRwT7GDyoN_Co4U9mxsT1kv8jCKqyMdieTOfNQZQI";

    constructor(private http: Http) { }

    private computeSignature() {
        let date = (new Date()).toISOString();
        let k_date = CryptoJS.HmacSHA256(date, this._accessKeySecret);
        let signature = CryptoJS.enc.Hex.stringify(
            CryptoJS.HmacSHA256('dnx_request_v1', k_date)
        );
        return `DNX-DATING-V1 credentials=${this._accessKeyId}; date=${date}; signature=${signature}`;
    }

    post(user) {
        let url = `${this._baseUrl}`;
        let authToken = this.computeSignature();
        let header = new Headers({ 'Authorization': authToken });
        return this.http
            .post(url, user, { headers: header })
            .map(res => res.json());
    }

    checkEmailNotTaken(email: string) {
        let url = `${this._baseUrl}/exists_by_email?email=${email}`;
        let authToken = this.computeSignature();
        let header = new Headers({ 'Authorization': authToken });
        return this.http
            .get(url, { headers: header })
            .map(() => false)
            .catch(() => Promise.resolve(true));        
    }
}
