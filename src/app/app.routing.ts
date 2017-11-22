import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./Home/home.component";
import { AddEmpComponent } from "./AddEmp/addemp.component";
import { EmpComponent } from "./Emp/emp.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent},
  { path: 'empadd', component: AddEmpComponent },
  { path: 'emplist', component: EmpComponent },

  { path:'**', redirectTo : 'home' }
]

export const routing = RouterModule.forRoot(appRoutes);
