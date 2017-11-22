import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent implements OnInit {
	model: any = {};

	constructor(
		private http: Http,
		private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
	) { }

	ngOnInit() {
		
  	}

  	signUp() {
  		this.http.post('/api/signup',this.model).map((response: Response) => response.json()).subscribe(
  			data => {
  				if (data.status) {
  					this.toastr.success(data.res_success, 'Success');
            this.router.navigate(['/login']);
  				} else {
  					this.toastr.error(data.res_error, 'Error');
  				}
  			},
  			error => {
  				this.toastr.error(error.res_failed, 'Error');
  			}
  		)
  	}

}
