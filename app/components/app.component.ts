import { Component, OnInit } from '@angular/core';

// importing global css file for webpack visibility
import '../css/styles.css';
import './../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css';

// Services | Injectables | Dependencies
import {SearchService} from '../services/search.service';

@Component({
    selector: 'my-app',
    template: `
        <div>
            <label>Host: </label>
            <mat-form-field>
                <input matInput [(ngModel)]="currentSearch.host">
            </mat-form-field>
            <label>Database: </label>
            <mat-form-field>
                <input matInput [(ngModel)]="currentSearch.database">
            </mat-form-field>
            <label>collection: </label>
            <mat-form-field>
                <input matInput [(ngModel)]="currentSearch.collection">
            </mat-form-field>
            <label>query: </label>
            <mat-form-field>
                <input matInput [(ngModel)]="currentSearch.mongoQuery">
            </mat-form-field>
            <button mat-raised-button (click)="runQuery()">Search</button>
        </div>
        <br/>
        <div>
            <label>Values: </label>
            <span>{{currentSearch | json }}</span>
            <br/>
            <label>Results: </label><br/>
            <span>{{searchResults | json}}</span>
        </div>
    `
})
export class AppComponent implements OnInit {
    currentSearch: any = {
        host: null,
        database: null,
        collection: null,
        mongoQuery: null
    };
    searchResults: any[] = [];
    name = 'Angular';

    constructor(private searchService: SearchService) {}

    // life cycle hooks
    ngOnInit(): void {
    }

    // TODO: send parameters
    runQuery(): void {
        this.searchService.getSimpleSearch(
            this.currentSearch.host,
            this.currentSearch.database,
            this.currentSearch.collection,
            JSON.parse(this.currentSearch.mongoQuery) // => parse "{}" to a valid json object type
        ).then(result => {
            this.searchResults = result
            console.log(result);
        });
    };


}
