import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/models/global-data';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummary[] = [];
  countries: string[] =[];

  constructor(private service :DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country!)
      })
    })

  }

}
