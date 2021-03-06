import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import {GlobalDataSummary} from 'src/models/global-data'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http : HttpClient) { }

  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-12-2021.csv';
  getGlobalData(){
    return this.http.get(this.globalDataUrl , {responseType : 'text'}).pipe(
      map(result =>{ 
        let data : GlobalDataSummary[] = [];
        let raw:any = {}

        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/)

          let cs = {
            country :cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10]
          };
          let temp:any =raw[cs.country]
          

          if(temp)
          {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed +temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered

            raw[cs.country] =temp;
          }
          else
          raw[cs.country] =cs;

          // data.push({
          //   // country :cols[3],
          //   // confirmed : +cols[7],
          //   // deaths : +cols[8],
          //   // recovered : +cols[9],
          //   // active : +cols[10]

          // })
        })
        console.log(raw);

        return <GlobalDataSummary[]>Object.values(raw);
           })

    )

  }
}
