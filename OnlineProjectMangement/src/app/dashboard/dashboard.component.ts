import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  TotalProject: any;

  RunningProject?: any[];
  ClosedProject?: any[];
  CancelledProject?: any[];
  // running?: Number;
  // closed?: Number;
  // cancelled?: Number;
  chart: any;
  str?: any[];
  fin?: any[];
  qlt?: any[];
  man?: any[];
  sto?: any[];
  hr?: any[];
  strClosed?: any[];
  qltClosed?: any[];
  finClosed?: any[];

  constructor(private service: ServiceService, private datePipe: DatePipe) {
    service.ProjectObservable.subscribe((val => {
      console.log("val", val);
      this.TotalProject = val.length

      this.RunningProject = val.filter(((e: { Status: string; }) => e.Status == "Running"))
      this.ClosedProject = val.filter(((e: { Status: string; }) => e.Status == "Closed"))
      this.CancelledProject = val.filter(((e: { Status: string; }) => e.Status == "Cancelled"))


      this.str = val.filter(((e: { Dept: string; }) => e.Dept == "Str"))
      this.strClosed = val.filter(((e: { Status: string; Dept: string; }) => e.Status == "Closed" && e.Dept == "Str"))

      this.qlt = val.filter(((e: { Dept: string; }) => e.Dept == "Qlt"))
      this.qltClosed = val.filter(((e: { Status: string; Dept: string; }) => e.Status == "Closed" && e.Dept == "Qlt"))

      this.fin = val.filter(((e: { Dept: string; }) => e.Dept == "Fin"))
      this.finClosed = val.filter(((e: { Status: string; Dept: string; }) => e.Status == "Closed" && e.Dept == "Fin"))

      console.log("strClosed", this.strClosed);


      this.chart.data[0].dataPoints[0].y = this.TotalProject;
      this.chart.data[0].dataPoints[1].y = this.str?.length;
      this.chart.data[0].dataPoints[2].y = this.qlt?.length;
      this.chart.data[0].dataPoints[3].y = this.fin?.length;


      this.chart.data[1].dataPoints[0].y = this.RunningProject?.length;
      this.chart.data[1].dataPoints[1].y = this.strClosed?.length;
      this.chart.data[1].dataPoints[2].y = this.qltClosed?.length;
      this.chart.data[1].dataPoints[3].y = this.finClosed?.length;
    }))

  }

  ngOnInit(): void {
    this.service.sendMessage("GetProject", "GetProject")
    this.chart = {
      title: {
        text: "registration"
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          name: "Total Project",
          legendText: "Total Project",
          showInLegend: true,
          dataPoints: [
            { label: "Total & Running", y: 2 },
            { label: "str", y: 5 },
            { label: "qlt", y: 3 },
            { label: "fin", y: 3 }

          ]
        },
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          name: "Closed project",
          legendText: "Closed project",
          showInLegend: true,
          dataPoints: [
            { label: "Total & Running", y: 2 },
            { label: "str", y: 5 },
            { label: "qlt", y: 3 },
            { label: "fin", y: 3 }

          ]
        }
      ]
    };
    console.log("chart", this.chart)

    // this.running = this.chart.options.data[0].dataPoints[0].length;
    //  largest no program
    var arr = [3, 6, 2, 56, 32, 5, 89, 32];
    var largest = arr[0];
    for (let i = 0; i < arr.length; i++) {
      if (largest < arr[i]) {
        largest = arr[i];
      }
    }
    console.log(largest);

    var string = "Welcome to this Javascript Guide!";
    // Output becomes !ediuG tpircsavaJ siht ot emocleW
    var reverseEntireSentence = reverseBySeparator(string, "");
    // Output becomes emocleW ot siht tpircsavaJ !ediuG
    var reverseEachWord = reverseBySeparator(reverseEntireSentence, " ");
    function reverseBySeparator(string: string, separator: string) {
      return string.split(separator).reverse().join(separator)
    }
    console.log('reverseEachWord', reverseEachWord);
    console.log('reverseEntireSentence', reverseEntireSentence)

    function isInt(num: number) {
      return num % 1 === 0;
    }
    console.log(isInt(4)); // true
    console.log(isInt(12.2)); // false
    console.log(isInt(0.3)); // false
  }

  ngAfterViewInit() {

  }

  // chartFun(){ }
}
function subtract(d: string | null, arg1: number, arg2: string) {
  throw new Error('Function not implemented.');
}

