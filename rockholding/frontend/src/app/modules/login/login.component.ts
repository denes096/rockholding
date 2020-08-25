import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.authService.checkLoginStatus()) {
      this.router.navigateByUrl('/ingatlan/lista');
    }
    
    this.formGroup = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value);
    }
  }
}
