import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfile } from '../models/iprofile';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user : IProfile;
  public previousUser : IProfile;
  public form: FormGroup;
  public savingForm: boolean;
  public errorName: boolean;
  public errorEmail: boolean;
  public loadedForm: boolean;
  public error: string;

  constructor(fb: FormBuilder, private _profileService: ProfileService) {
    this.form = fb.group({
      firstName: [""],
      lastName: [""],
      username: [{value: "", disabled: true}]
    });
  
    this.errorName = false;
    this.errorEmail = false;
    this.savingForm = false;
    this.loadedForm = false;
  }

  ngOnInit(): void {

    this.loadProfile();
  }

  loadProfile():void {
    var profilePromise = this._profileService.getProfileUser();
    profilePromise.then((res) => {
      this.user = res;
      this.previousUser = Object.assign({}, this.user);
      this.loadedForm = true;
    }).catch((err) => {
        this.loadProfile(); //call it again
    });
  }


  saveProfile(): void {
    this.enableForm(false);
    this.errorEmail = false;
    this.errorName = false;

    var formPromise = this._profileService.setName(this.form.value.firstName, this.form.value.lastName);
    formPromise.then((res) => {
      this.user.firstName = res["firstName"];
      this.user.lastName = res["lastName"];

      return  this._profileService.setEmail(this.form.value.firstName, this.form.value.lastName);

    }).then((res) => {
      
      this.user.username = res["username"];
      
      this.previousUser = Object.assign({}, this.user);
      this.enableForm(true);

    }).catch((err) => {
      this.error = err.error;
      if(err.error === "Invalid name") this.errorName = true;
      else this.errorEmail = true;
      
      this.form.reset(this.previousUser);
      this.enableForm(true);
    });
  }

  
  enableForm(enable: boolean): void{
    if(enable){
      this.form.enable();
      this.savingForm = false;
      this.form.get('username').disable();
    }else{
      this.form.disable();
      this.savingForm = true;
    }
  }


}
