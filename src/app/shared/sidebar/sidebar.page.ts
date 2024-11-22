import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {
  sidebarOpen = false; // Controla si el sidebar está abierto o cerrado

  constructor() {}

  ngOnInit() {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
