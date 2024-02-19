import { OnInit } from "@angular/core";
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'stock-control';

  constructor(private PrimeNGConfig: PrimeNGConfig) {}


  ngOnInit(): void {
    this.PrimeNGConfig.ripple = true;
  }
}
