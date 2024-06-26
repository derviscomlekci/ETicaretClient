import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {    
  }

  frm: FormGroup;


  ngOnInit(): void {
    this.frm=this.formBuilder.group({
      nameSurname:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)]],
      username:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)]],
      email:["",[
        Validators.required,
        Validators.maxLength(250),
        Validators.email]],
      password:["",[
        Validators.required
      ]],
      passwordAgain:["",[
        Validators.required
      ]]
    },{validators:(group: AbstractControl):ValidationErrors | null=>
      {
        let password=group.get("password").value;
        let passwordAgain=group.get("passwordAgain").value;
        return password==passwordAgain ? null :{notSame: true};
    }})
  }

  get component(){
    return this.frm.controls;
  }

  submitted:boolean=false;
  onSubmit(data: User){
    this.submitted=true;
    if(this.frm.invalid)
      return;
    debugger;
  }

  


}
