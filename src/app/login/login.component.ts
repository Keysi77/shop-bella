import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Inject NIE AngularFireAuth, ale vlastnu servicu, kde je logika
  constructor(private auth: AuthService) { }
  
  // login zo auth.service injectnuty
  login(){
    this.auth.login();
  }


}
