import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
login() {
  this.authService.login(this.model).subscribe(next => {
    console.log('logged in successfull !');
  // tslint:disable-next-line: no-shadowed-variable
  }, error => {
    console.log('failed to login !');
  });
}
loggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}
loggedOut() {
  localStorage.removeItem('token');
  console.log('logged out !');

}
}
