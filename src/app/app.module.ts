import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/index';
import { AddEmpComponent } from './AddEmp/index';
import { EmpComponent } from './Emp/index';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

import { GlobalService } from './global.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    routing,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    AddEmpComponent,
    EmpComponent,
    SignUpComponent,
    LoginComponent
  ],

  providers: [
    GlobalService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
