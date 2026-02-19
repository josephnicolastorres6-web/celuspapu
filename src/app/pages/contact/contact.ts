import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// IMPORTANTE: Importamos FormsModule para darle inteligencia al formulario
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule], // Lo agregamos aquí
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  
  // Esta variable controlará si mostramos el formulario o el mensaje de éxito
  mensajeEnviado = false; 

  // Esta función se ejecuta cuando el usuario le da a "Enviar"
  enviarFormulario(formulario: any) {
    if (formulario.valid) {
      // Si todo está lleno correctamente, mostramos el éxito
      this.mensajeEnviado = true;

      // Hacemos que el mensaje de éxito desaparezca después de 4 segundos
      setTimeout(() => {
        this.mensajeEnviado = false;
        formulario.reset(); // Limpia los campos para un nuevo mensaje
      }, 4000);
      
    } else {
      // Si falta algo, le avisamos al usuario
      alert('Por favor, llena todos los campos correctamente, crack.');
    }
  }
}