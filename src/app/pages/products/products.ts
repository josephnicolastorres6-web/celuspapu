import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 1. Importamos la interfaz (el molde) y el servicio (la bodega)
import { Prod, ProductosService } from '../../services/productos'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  
  // 2. Aquí declaramos la variable que recibirá los celulares
  productos: Prod[] = [];

  // 3. INYECCIÓN DE DEPENDENCIAS (Esto es lo que te van a calificar)
  constructor(private productService: ProductosService) {
    this.productos = this.productService.getProductos();
  }

  // =========================================
  // DE AQUÍ PARA ABAJO, TU CÓDIGO DEL CARRITO ESTÁ INTACTO
  // =========================================
  
  carrito: any[] = [];
  mostrarModal = false;
  pasoCheckout = 1; 
  
  datosEnvio = {
    nombre: '',
    direccion: '',
    telefono: ''
  };

  agregarAlCarrito(item: string, marca: string) {
    this.carrito.push({ marca: marca, producto: item });
  }

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

  finalizarCompra() {
    const ordenCompleta = {
      fecha: new Date().toLocaleString(),
      cliente: this.datosEnvio,
      productos_comprados: this.carrito
    };

    const jsonString = JSON.stringify(ordenCompleta, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Orden_CelusPapu_${new Date().getTime()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);

    this.pasoCheckout = 3;
    this.carrito = [];
    
    this.datosEnvio = { nombre: '', direccion: '', telefono: '' };
  }
}