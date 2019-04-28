import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: string = "Sibyl System";
  userName: string = "Nombre de usuario";
  isAdmin: boolean = false ;
  toggledClassApplied: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggledClass() {
    this.toggledClassApplied = !this.toggledClassApplied;
  }

}
