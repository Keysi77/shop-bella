import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'bs-navbar',
	templateUrl: './bs-navbar.component.html',
	styleUrls: [ './bs-navbar.component.css' ]
})
export class BsNavbarComponent {
	constructor(public auth: AuthService) {}

	// logout zo auth.service injectnuty
	logout() {
		this.auth.logout();
	}
}
