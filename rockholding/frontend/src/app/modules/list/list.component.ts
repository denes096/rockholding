import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstateService } from '../../estate.service';

export interface PeriodicElement {
  external_id: string;
  user_external_idposition: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  postal_code: number;
  settlement: string;
  sync_address: number;
  type: string;
  size: number;
  status: string;
  ad_type: string;
  rentability: number,
  new: number;
  description: string;
  state: string;
  plot: number;
  price: number;
  street: string;
  rooms: string;
  heating: string;
  sitting: string;
  utilities: string;
  images: string[];
}



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public estates: PeriodicElement[];
  displayedColumns: string[] = [
    'images',
    'external_id',
    'type',
    'settlement',
    'user_name',
    'price',
    'size'
  ];
  
  constructor(private estService: EstateService, private toastr: ToastrService) { }

  ngOnInit(): void {
   
    this.estService.listAllEstate().subscribe((result:any) => {
      console.log(result);
      this.estates =  <PeriodicElement[]> result; 
    },
    err => {
      this.toastr.error('Invalid username or password.', 'Auth failed.');
    });
  };  

}
