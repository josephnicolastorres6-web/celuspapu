import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/* IMPORTANTE: Importar el NavbarComponent */
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  /* IMPORTANTE: Agregar NavbarComponent a la lista de imports aquí abajo */
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html', /* Asegúrate que coincida con el nombre de tu archivo html */
  styleUrl: './app.css'      /* Asegúrate que coincida con el nombre de tu archivo css */
})
export class AppComponent {
  title = 'celus-papu';
}