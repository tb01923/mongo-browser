import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Ui Components
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule } from '@angular/material';

// Importing Components
import { AppComponent }  from './components/app.component';

// services & Pipes
import { SearchService } from './services/search.service';

@NgModule({
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        MatInputModule
    ],
    declarations: [
        AppComponent
    ],
    providers:    [ SearchService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
