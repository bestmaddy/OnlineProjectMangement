import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empDetails: any;
  Projectdata: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  searchText!: '';
  searchData: any;
  SortBy!: string;
  SortByData!: string;
  chartOptions: any;
  product = "../assets/cocktail.png"

  constructor(private service: ServiceService) {

  }

  ngOnInit(): void {
    this.getData(this.getChart)
  }

  getData(chart: any) {
    this.service.getAll().subscribe(data => {
      console.log("data", data);
      let ans: any[] = [];
      let map = new Map();
      data.forEach(x => {
        if (map.get(x.EmployeeName)) {
          map.set(x.EmployeeName, map.get(x.EmployeeName) + ((new Date(x.EndTimeUtc).valueOf() - new Date(x.StarTimeUtc).valueOf()) / 1000 / 60 / 60));
        } else {
          map.set(x.EmployeeName, ((new Date(x.EndTimeUtc).valueOf() - new Date(x.StarTimeUtc).valueOf()) / 1000 / 60 / 60));
        }
      });
      map.forEach((v, k) => {
        ans.push({ "y": v, "name": k });
      });
      this.empDetails = ans
      chart(this.empDetails);
      // this.chartOptions.data.dataPoints = this.empDetails;

    })
  }

  ngAfterViewInit() {
  }

  getChart = (empDetails: any) => {
    console.log(empDetails);
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Total Time Worked By An Employee"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: 14.1, name: "Toys" },
          { y: 28.2, name: "Electronics" },
          { y: 14.4, name: "Groceries" },
          { y: 43.3, name: "Furniture" }
        ]
      }]
    };
    this.chartOptions.data[0].dataPoints = empDetails;
    let chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
    chart.render();
    console.log("this.chartOptions", this.chartOptions)
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  chartFun(ans: any) {
    console.log("data", ans)
    this.chartOptions.data.dataPoints = ans;
  }

}
