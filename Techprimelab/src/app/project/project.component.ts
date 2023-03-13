import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  Projectdata: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  searchText!: '';
  searchData: any;
  SortBy!: string;
  SortByData!: string;

  constructor(private service: ServiceService) {
    this.getdata();
  }

  ngOnInit(): void {
    this.service.sendMessage("GetProject", "GetProject")
  }

  getdata() {
    this.service.ProjectObservable.subscribe((val => {
      console.log("val", val);
      this.Projectdata = val;
      this.searchData = this.Projectdata;
      /*   this.SortByData = this.Projectdata.map((val: any) => val.Dept == "Man");
        console.log(this.SortByData) */
    }))
  }

  SortByFun(e: string) {
    // this.SortByData = this.searchData.filter((val: any) => val == e);
    console.log(e);
  }

  search(value: string): void {
    this.Projectdata = this.searchData.filter((val: any) =>
      val[this.SortBy].toLowerCase().includes(value.toLowerCase()) 
      // || val.Location.toLowerCase().includes(value)
    );
  }


  ChangeStatus(data: any, Status: string) {
    console.log(data, Status)
    this.service.sendMessage("UpdateStatus", { "data": data, "Status": Status });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getdata();
  }

  /* onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getdata();
  } */

}
