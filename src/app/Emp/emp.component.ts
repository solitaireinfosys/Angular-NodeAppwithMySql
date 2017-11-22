import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
    templateUrl: 'emp.component.html'
})
export class EmpComponent implements OnInit{
	model: any = {};
	data = [];
	totalRecords: number = 0;
	editMode = false;
	p: number = 1;
	pageSize: number = 10;

	constructor(
		private http: Http,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit(){
		var loginStatus = localStorage.getItem('hasToken');
		if (loginStatus != 'true') {
			this.router.navigate(['/login']);
		} else {
			this.loadAllEmployees();
		}
	}

	loadAllEmployees(){
		this.http.get('/api/empdata/page='+ this.p +'/page_size='+ this.pageSize).map((response: Response) => response.json()).subscribe(
			data => {
				this.totalRecords = data[0][0].totalRecords;
				this.data = data[1];
			},
			error => {
				this.toastr.error(error, 'Error');
			}
		)
	}

	loadMore(currpage){
		this.http.get('/api/empdata/page='+ currpage +'/page_size='+ this.pageSize).map((response: Response) => response.json()).subscribe(
			data => {
				this.totalRecords = data[0][0].totalRecords;
				this.data = data[1];
			},
			error => {
				this.toastr.error(error, 'Error');
			}
		)
	}

	editEmployee(empDetails){
		this.editMode = true;
		this.model = empDetails;
	}

	updateEmployee(){
		this.http.put('/api/empupdate', this.model).map((response: Response) => response.json()).subscribe(
			data => {
				this.toastr.success('Employee details updated successfully','Success');
				this.model = {};
        		this.loadAllEmployees();
			},
			error => {
				this.toastr.error(error,'Error');
			}
		)
	}

	deleteEmployee(emailId){
        this.http.delete('/api/empdelete/' + emailId).map((response: Response) => response.json()).subscribe(
        	data => {
        		this.toastr.error('Employee deleted successfully','Success');
        		this.loadAllEmployees();
        	},
        	error => {
        		this.toastr.warning('Something went wrong. Please contact admin.','Error');
        	}
        )
    }
}