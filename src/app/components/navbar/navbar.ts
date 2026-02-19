import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // ¡Importante importar esto!
  templateUrl: './navbar.html',
  styleUrl: './navbar.css' // Ojo: asegúrate que diga .css aquí
})
export class NavbarComponent {

}