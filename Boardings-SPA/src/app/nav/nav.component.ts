import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public authService: AuthService, private alertifyService: AlertifyService, 
              private router: Router) { }

  ngOnInit() {
  }
login() {
  this.authService.login(this.model).subscribe(next => {
    this.alertifyService.success('logged in successfull !');
  // tslint:disable-next-line: no-shadowed-variable
  }, error => {
    this.alertifyService.error(error);
  }, () => {
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate(['/boardings']);
  }
  );
}
loggedIn() {
  return this.authService.loggedIn();
}
loggedOut() {
  localStorage.removeItem('token');
  this.alertifyService.message('logged out !');
  this.router.navigate(['/home']);

}
}
