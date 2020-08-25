import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../list/list.component';
import { EstateService } from 'src/app/estate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public estate: PeriodicElement;
  id: string;
  size: boolean;

  constructor(private estService: EstateService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
    });

    this.estService.listEstate(this.id).subscribe((result:any) => {
      this.estate =  <PeriodicElement> result; 
      this.size = this.estate.size == 0;
    },
    err => {
      this.toastr.error('Invalid username or password.', 'Auth failed.');
    });
  };  
}
