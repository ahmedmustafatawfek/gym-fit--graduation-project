import { Component, OnInit } from '@angular/core';
import { Gym } from 'app/_Models/Gym';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GymService } from 'app/_services/gym.service';
import { FuncsService } from 'app/_services/funcs.service';
import { environment } from 'environments/environment';
import { ModalService } from 'app/_modal';

@Component({
  selector: 'app-Gyms',
  templateUrl: './Gyms.component.html',
  styleUrls: ['./Gyms.component.scss']
})
export class GymsComponent implements OnInit {
  gyms : Gym[]=[];
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  url:string;
  constructor(private service:GymService, private globalFuncs:FuncsService, public modalService:ModalService) { }

  ngOnInit() {
    this.gyms = [];
    this.service.getGyms().subscribe(res => {
      this.gyms = res['Gyms'];
      this.dtTrigger.next();
    });
  }

  DeleteGym(id:number){
    this.service.toggleGym(id.toString()).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this.gyms.find(s=>s.ID == id).Deleted = !this.gyms.find(s=>s.ID == id).Deleted;
    }, err => {
      this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
      
    });
  }

  viewImage(imageName) {
    this.url = environment.imagesUrl +  imageName;
    console.log(this.url)
    this.modalService.open('view-Image');
  }
}
