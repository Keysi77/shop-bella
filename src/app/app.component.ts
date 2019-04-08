import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router){
    auth.user$.subscribe(user => {
      //TODO: reverznut Ifka - !user
      if(user){
        // ked sa pouzivatel prihlasi, ulozi sa do DATABAZY pomocou UserService
        userService.save(user);

        // ak bude uzivatel precitame localStorage
        let returnUrl = localStorage.getItem('returnUrl');
        // ulozi sa do localstora a aby po kazdom refreshi neslo na /root
        if (returnUrl) {
          // zmaze sa URL - zluzi len pre autentifikaciu
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    })
  }
}
