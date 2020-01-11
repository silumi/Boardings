import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
register() {
  this.authService.register(this.model).subscribe(() => {
    console.log('registration successfull!');
  // tslint:disable-next-line: no-shadowed-variable
  }, error => {
 console.log(error);
  });
}
cancel() {
  this.cancelRegister.emit(false);
  console.log(' canceled !');
}
}
