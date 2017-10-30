import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    // get simple search results
    getSimpleSearch(
        host: string,
        db: string,
        collection: string,
        mongoQuery: any
    ): Promise<any[]> {

        return this.http.post(
            `/rest/simple/${db}/${collection}`,
            {host: host, mongoQuery: mongoQuery},
            {headers: this.headers})
            .toPromise()
            .then(response => response.text()) // => .text() means :: get body
            .catch(this.handleError);
    }

    // TODO: needs work
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
