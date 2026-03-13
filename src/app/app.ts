import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  ContainerComponent, 
  HeaderComponent,
  HeaderNavComponent,
  NavItemComponent,
  NavLinkDirective
} from '@coreui/angular';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ContainerComponent,
    HeaderComponent,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    IconDirective
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title: string = 'IA Word Agent';

  constructor(private iconSetService: IconSetService) {
    this.iconSetService.icons = { ...iconSubset };
  }
}