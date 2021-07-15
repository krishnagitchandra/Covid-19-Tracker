import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/models/global-data';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed:any = 0;
  totalActive:any = 0;
  totalDeaths:any = 0;
  totalRecovered:any = 0;
  globalData :GlobalDataSummary[] | undefined;

  constructor(private dataService :DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
        next : (result)=>{
          console.log(result);
          this.globalData = result;
          result.forEach(cs =>
            {
              if(!Number.isNaN(cs.confirmed)){
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.recovered
              }

            })
        }
      }
    )
  }

}
