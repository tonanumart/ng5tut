import { AuthService } from './../_services/auth.service';
import { Component, EventEmitter , OnInit, Input , Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService) { }
  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('register successfully');
    }, error => {
      console.log('register failed');
    });
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
