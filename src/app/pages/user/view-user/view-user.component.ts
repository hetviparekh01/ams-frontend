import { ColDef } from '@ag-grid-community/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { CustomRendererComponent } from 'src/app/shared/custom-renderer/custom-renderer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {


  constructor(private userServie:UserService){}
  ngOnInit(): void {
    this.getUser()
  }
  columnDefs:ColDef[]=[
		{ headerName: 'Name', field: 'name' },
		{ headerName: 'UniqueSchoolId', field: 'uniqueSchId' },
		{ headerName: 'State', field: 'state' },
		{ headerName: 'City', field: 'city' },
		{ headerName: 'Role', field: 'role' },
		{ headerName: '', field: 'role',cellRenderer:CustomRendererComponent,cellRendererParams:{
      updateData:(id:string)=>this.updateUser(id),
      deleteData:(id:string)=>this.deleteUser(id)
    } },
	];
  deleteUser(id: string) {
    console.log(id);
  }
  updateUser(id: string) {
    console.log(id);
  }
  rowData:any;
  userData:any
  async getUser(){
    this.userServie.getUser().subscribe({
      next:(response)=>{
        if(response.status){
          this.userData=response.message
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.message
          });
        }
      },
      error:(error)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message
        });
      }
    })
  }
}
