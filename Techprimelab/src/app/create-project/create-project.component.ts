import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  @ViewChild('ProjectForm', { static: true })
  ProjectForm!: NgForm;
  creatProjectdto = new creatProjectdto;

  tatus: any[] = [
    { id: '1', Status: 'Running' },
    { id: '2', Status: 'Closed' },
    { id: '3', Status: 'Cancelled' }
  ]

  constructor(private service: ServiceService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.creatProjectdto.Status = "Running";
  }

  CreateProject(data: any) {
    console.log("data", data.value)
    if (data.valid) {
      this.service.sendMessage("InsertProjectn", data.value)
      this.ProjectForm.resetForm();
      this.toastr.success('data added success')
    } else {
      this.toastr.error('Check All Field')
    }
  }

  reset(projectForm: NgForm) {
    projectForm.resetForm();
  }

}
export class creatProjectdto {
  ProjectName?: string;
  Reason?: string;
  Category?: string;
  Dept?: string;
  Division?: string;
  Location?: string;
  Priority?: string;
  Type?: string;
  Status?: string;
  StartDate?: Date;
  EndDate?: Date;
}
export class Status {
  id?: string;
  status?: string;
}