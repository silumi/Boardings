import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
login() {
  this.authService.login(this.model).subscribe(next => {
    this.alertifyService.success('logged in successfull !');
  // tslint:disable-next-line: no-shadowed-variable
  }, error => {
    this.alertifyService.error(error);
  });
}
loggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}
loggedOut() {
  localStorage.removeItem('token');
  this.alertifyService.message('logged out !');

}
}
