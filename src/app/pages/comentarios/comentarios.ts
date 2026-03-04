import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css'
})
export class ComentariosComponent {
  
  // Reseñas iniciales
  listaComentarios = [
    { nombre: 'Juan k.', modelo: 'iPhone 15 Pro Max', estrellas: 5, texto: 'El equipo llegó melo. ¡Garantizado, papu! 🗿📱', fecha: 'hace 2 días' },
    { nombre: 'Stiven G.', modelo: 'Xiaomi Redmi Note 13', estrellas: 4, texto: 'Buen servicio, el Xiaomi vuela. Solo que el envío tardó un poco.', fecha: 'hace 1 semana' },
    { nombre: 'Mayerli T.', modelo: 'POCO X6 Pro', estrellas: 5, texto: 'Es una bestia para jugar Free Fire. ⚡', fecha: 'hace 3 días' }
  ];

  // Variables para el formulario
  nuevoNombre: string = '';
  nuevoModelo: string = '';
  nuevoTexto: string = '';
  nuevaCalificacion: number = 5;

  // VARIABLE NUEVA: Rastrear qué comentario está abierto por su posición (index)
  // -1 significa que todos están cerrados al inicio
  comentarioAbierto: number = -1;

  // FUNCIÓN NUEVA: Abre o cierra el comentario al hacer clic
  toggleComentario(index: number) {
    if (this.comentarioAbierto === index) {
      this.comentarioAbierto = -1; // Si ya está abierto, lo cierra
    } else {
      this.comentarioAbierto = index; // Abre el que clickeaste
    }
  }

  publicarComentario() {
    if (this.nuevoNombre.trim() !== '' && this.nuevoTexto.trim() !== '' && this.nuevoModelo.trim() !== '') {
      
      const nuevaResena = {
        nombre: this.nuevoNombre,
        modelo: this.nuevoModelo,
        estrellas: this.nuevaCalificacion,
        texto: this.nuevoTexto,
        fecha: new Date().toLocaleDateString()
      };

      this.listaComentarios.unshift(nuevaResena);
      this.descargarJSON(nuevaResena);

      // Resetear formulario y cerrar cualquier acordeón abierto
      this.comentarioAbierto = -1;
      this.nuevoNombre = '';
      this.nuevoModelo = '';
      this.nuevoTexto = '';
      this.nuevaCalificacion = 5;
    } else {
      alert("¡Llena todos los campos para publicar tu reseña, Papu! 🗿");
    }
  }

  descargarJSON(datos: any) {
    const jsonString = JSON.stringify(datos, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resena_${datos.nombre.replace(/\s+/g, '_')}_CelusPapu.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}