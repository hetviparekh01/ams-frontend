import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {



  selectedFile: any;

  constructor(private fb:FormBuilder,private userService:UserService,private router:Router){}
  signupForm!:FormGroup;
  ngOnInit(): void {
    this.signupForm=this.fb.group({
      name:['',Validators.compose([Validators.required])],
      uniqueSchId:['',Validators.compose([Validators.required])],
      city:['',Validators.compose([Validators.required])],
      state:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
      role:['',Validators.compose([Validators.required])],
      filePath:['',Validators.compose([Validators.required])],
      address:this.fb.array([this.createAddress()])
    })
  }
  createAddress(){
    return this.fb.group({
      street:['',Validators.compose([Validators.required])],
      zipcode:['',Validators.compose([Validators.required])]
    })
  }
  get addressList():FormArray{
    return this.signupForm.get('address') as FormArray
  }
  addAddress() {
    this.addressList.push(this.createAddress())
  }
  removeAddress(i: number) {
    this.addressList.removeAt(i)
  }
  onSelectedFile(event:any){
    this.selectedFile=event.target.files[0] 
  }
  selectCity(event:any) {
    const value=event.target.value;
    console.log(value);
    if(value==='Gujarat'){

    }
  }
  onSubmit() {
    if(this.signupForm.valid){
      const formData=new FormData();
      formData.append('name',this.signupForm.get('name')?.value),
      formData.append('role',this.signupForm.get('role')?.value),
      formData.append('uniqueSchId',this.signupForm.get('uniqueSchId')?.value),
      formData.append('state',this.signupForm.get('state')?.value),
      formData.append('city',this.signupForm.get('city')?.value),
      formData.append('password',this.signupForm.get('password')?.value),  
      formData.append('address',JSON.stringify(this.signupForm.get('address')?.value))
      formData.append('filePath',this.selectedFile)
      // console.log("se",this.selectedFile);
      this.userService.signup(formData).subscribe({
        next:(response)=>{
          if(response.status){
            Swal.fire({
              icon: "success",
              title: response.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/login'])
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message
            });
          }
        },
        error:(error)=>{
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.error.message
          });
        }
      })
    }
  }
}

