import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  baseurl: string = 'https://vat.erply.com/numbers?vatNumber=';
  
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  getValues(vatNumber:string) {
		return new Promise((resolve, reject) => {
      console.log(vatNumber)
      var url = this.baseurl + vatNumber ;
      console.log(url)
      
			// this will call  api url for fetching vat details
			this.http.get(url).map(res => res).subscribe((data) => {

				console.log("api  data API -> ", data);
				// Save data to Local Storage
				// this.storage.set('categories', data);
				resolve(data);
			},
				err => {
					console.log(err);
					reject(err);
				});
		});
	}

}
