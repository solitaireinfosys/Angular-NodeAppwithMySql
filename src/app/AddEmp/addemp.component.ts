import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
	moduleId: module.id,
    templateUrl: 'addemp.component.html'
})
export class AddEmpComponent implements OnInit {
	model: any = {};
	result = [];
	loading = false;

	constructor(
		private http: Http,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit() { 
		var loginStatus = localStorage.getItem('hasToken');
		if (loginStatus != 'true') {
			this.router.navigate(['/login']);
		} 
	}

	addEmp() {

		this.http.post('/api/register',this.model).map((response: Response) => response.json()).subscribe(
			data => {
				if(data.status){
					this.toastr.success(data.res_success, 'Success');
				}else{
					this.toastr.warning(data.res_error, 'Warning');
				}	
			},
			error => {
				this.toastr.error(error.res_failed, 'Error');
			}
		)

	}
}