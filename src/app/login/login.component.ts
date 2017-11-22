import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
  	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	model: any = {};

  	constructor(
  		private http: Http,
  		private toastr: ToastrService,
      private router: Router
  	) { }

  ngOnInit() {

  }

  signIn() {
  	this.http.post('/api/login',this.model).map((response: Response) => response.json()).subscribe(
  		data => {
        if (data.status) {
          this.toastr.success(data.success_msg,'Success');
          localStorage.setItem('hasToken', 'true');
          this.router.navigate(['/empadd']);
        } else {
          this.toastr.error(data.error_msg,'Error');
        }
  		},
  		error => {
        this.toastr.error(error.error_msg,'Error');
  		}
  	)
  }

}
