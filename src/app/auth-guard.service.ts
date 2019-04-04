import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// Service pre kontrolovanie stavov pouzivatelov
// pritup k jedntlivym sekciam podla stavu
//TODO: implement CanActivate nefunguje
export class AuthGuardService  {

  constructor(private auth: AuthService, private router: Router) { }

  // metoda, ktora vrati true/false
  // sluzi na kontrolu prihlasenia pouzivatela
  canActivate(router, state: RouterStateSnapshot){
    // metoda sa vola priamo do routingu v app.module
    return this.auth.user$.pipe(
      map(user => {
        // ak bude pouzivatel prihlaseny - true 
        if(user) return true
        // inak false a vrati na strnaku loginu

        // po logine nas nevrati znova na login stranku ale na homepage
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      })
    )
  }
}
