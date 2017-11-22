import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
	moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{
  	title = 'to home page';

  	constructor (
  		private router: Router,
  		public globalService: GlobalService
  	) { }

  	ngOnInit () {
  		localStorage.clear();
  		this.globalService.currentPath = this.router.url;
  	}
}