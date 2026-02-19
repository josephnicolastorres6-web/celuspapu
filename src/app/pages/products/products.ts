import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- IMPORTANTE PARA EL FORMULARIO

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- AGREGAR AQUÍ
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  
  // TUS PRODUCTOS ACTUALES (No cambiamos nada aquí)
  productos = [
    {
      marca: 'SAMSUNG', imagen: 'moai-samsung.png',
      gamaAlta: ['Galaxy S24 Ultra: El rey absoluto con cámara de 200MP y S-Pen.', 'Galaxy S24+: Potencia pura en tamaño más cómodo.', 'Galaxy Z Fold 5: El plegable que se hace tablet.'],
      calidadPrecio: ['Galaxy A54 5G: El más equilibrado para fotos y batería.', 'Galaxy A34 5G: Excelente pantalla a un precio más bajo.', 'Galaxy S23 FE: Potencia de gama alta pero un poco más barato.']
    },
    {
      marca: 'iPHONE', imagen: 'moai-iphone.png',
      gamaAlta: ['iPhone 15 Pro Max: Pantalla de 6.7" y el nuevo chip A17 Pro.', 'iPhone 15 Pro: Lo mejor de Apple en un tamaño manejable.', 'iPhone 15 Plus: Pantalla gigante sin pagar el precio del Pro.'],
      calidadPrecio: ['iPhone 14: Sigue siendo una bestia y ahora está a precio de ganga.', 'iPhone 13: El modelo económico que reemplazó al SE.', 'iPhone SE: Para los que quieren diseño clásico y potencia.']
    },
    {
      marca: 'XIAOMI', imagen: 'moai-xiaomi.png',
      gamaAlta: ['Xiaomi 14 Ultra: El monstruo de la fotografía profesional Leica.', 'Xiaomi 13T Pro: Carga de 120W y potencia bruta.', 'Xiaomi Mix Fold 3: El plegable tipo libro más delgado.'],
      calidadPrecio: ['Redmi Note 13 Pro+: Cámara de 200MP y carga ultra rápida.', 'Redmi Note 13: El celular más vendido para el día a día.', 'Redmi 13C: El más barato que realmente funciona bien.']
    },
    {
      marca: 'POCO', imagen: 'moai-poco.png',
      gamaAlta: ['POCO F6 Pro: Lo más potente de la marca, corre cualquier juego.', 'POCO F6: El mejor procesador al precio más bajo.'],
      calidadPrecio: ['POCO X6 Pro: La compra maestra del 2026. Pantalla brutal.', 'POCO X6: El guerrero de la gama media.', 'POCO M6 Pro: Para los que quieren pantalla y batería sin gastar casi nada.']
    }
  ];

  // =========================================
  // LÓGICA DEL CARRITO Y JSON (NUEVO)
  // =========================================
  
  carrito: any[] = [];
  mostrarModal = false;
  pasoCheckout = 1; // 1: Lista del carrito | 2: Formulario de dirección | 3: Éxito
  
  datosEnvio = {
    nombre: '',
    direccion: '',
    telefono: ''
  };

  // 1. Agregar un producto al carrito
  agregarAlCarrito(item: string, marca: string) {
    this.carrito.push({ marca: marca, producto: item });
  }

  // 2. Controlar la ventana emergente
  abrirCarrito() {
    if (this.carrito.length > 0) {
      this.mostrarModal = true;
      this.pasoCheckout = 1;
    } else {
      alert("¡El carrito está vacío, papú! Agrega un celular primero.");
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  irAFormulario() {
    this.pasoCheckout = 2;
  }

  // 3. Generar el JSON y finalizar la compra
  finalizarCompra() {
    // Armamos el objeto con toda la información de la orden
    const ordenCompleta = {
      fecha: new Date().toLocaleString(),
      cliente: this.datosEnvio,
      productos_comprados: this.carrito
    };

    // Convertimos el objeto a texto JSON
    const jsonString = JSON.stringify(ordenCompleta, null, 2);
    
    // Creamos un archivo virtual para descargarlo
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    // Forzamos la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = `Orden_CelusPapu_${new Date().getTime()}.json`; // Nombre del archivo
    a.click();
    window.URL.revokeObjectURL(url);

    // Mostramos pantalla de éxito y limpiamos el carrito
    this.pasoCheckout = 3;
    this.carrito = [];
    
    // Limpiamos el formulario para la próxima
    this.datosEnvio = { nombre: '', direccion: '', telefono: '' };
  }
}