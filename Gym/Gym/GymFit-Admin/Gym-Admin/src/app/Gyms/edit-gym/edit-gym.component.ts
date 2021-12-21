import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gym } from 'app/_Models/Gym';
import { FuncsService } from 'app/_services/funcs.service';
import { GymService } from 'app/_services/gym.service';

@Component({
  selector: 'app-edit-gym',
  templateUrl: './edit-gym.component.html',
  styleUrls: ['./edit-gym.component.scss']
})
export class EditGymComponent implements OnInit {
  gym:Gym={};
  constructor(private service:GymService, private globalFuncs:FuncsService,private _location:Location, private route:ActivatedRoute) { }

  ngOnInit() {
    this.gym.ID = this.route.snapshot.params['id'];
    this.service.getGymById(this.gym.ID.toString()).subscribe(res=>{
      this.gym = res['Gym'];
    });
  }

  OnSubmit(){
    this.service.updateGym(this.gym).subscribe(res => {
      this.globalFuncs.showNotification('top','center',res['Message'],'success');
      this._location.back();
    }, err => {
      console.log(err);
      this.globalFuncs.parseObject(err.error);
      if(err.error["Message"]) this.globalFuncs.showNotification('top','center',err.error['Message'],'danger');
    });
  }
  onSelectFile(file: any){
    this.gym.Image = <File>file.target.files[0];
  }
}
