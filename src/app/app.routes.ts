import { Routes } from '@angular/router';
import { Home} from './pages/home/home';
import { ProductsComponent} from './pages/products/products';
import { AboutComponent} from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { ComentariosComponent } from './pages/comentarios/comentarios';

export const routes: Routes = [
  { path: '', component: Home }, // Página de Inicio (por defecto)
  { path: 'productos', component: ProductsComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'comentarios', component: ComentariosComponent },
  { path: 'contactos', component: ContactComponent },
  { path: '**', redirectTo: '' } // Si escriben algo mal, vuelve al inicio
];