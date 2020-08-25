import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router, private toastr:ToastrService) { }

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

  signupSubmit() {
    if (this.formGroup.valid) {
      this.authService.signup(this.formGroup.value);
    }
  }

}
