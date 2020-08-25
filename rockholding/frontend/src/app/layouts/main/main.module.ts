import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../modules/login/login.component';
import { SignupComponent } from '../../modules/signup/signup.component';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ListComponent } from '../../modules/list/list.component';
import { ProfileComponent } from '../../modules/profile/profile.component'; 
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    SignupComponent,
    ListComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
  ]
})
export class MainModule { }
