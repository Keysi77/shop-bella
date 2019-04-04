import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
	providedIn: 'root'
})
export class AdminAuthGuardService {
	constructor(private auth: AuthService, private userService: UserService) {}

	canActivate(): Observable<boolean> {
		return this.auth.appUser$.pipe(
			// SwitchMap premiestneny do AuthServicu aby sa dal na viacerych miestach pouzit
			map((appUser) => appUser.isAdmin)
		);
	}
}
