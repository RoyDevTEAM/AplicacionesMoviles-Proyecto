import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  constructor(private navCtrl: NavController) {}

  // Navega a la página de inicio
  goToHome() {
    this.navCtrl.navigateRoot('/inicio');
  }
}
