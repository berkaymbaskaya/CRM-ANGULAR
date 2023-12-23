import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TaleplerComponent } from './pages/talepler/talepler.component';
import { GorevlerimComponent } from './pages/gorevlerim/gorevlerim.component';
import { YonetimComponent } from './pages/yonetim/yonetim.component';
import { MudurluklerComponent } from './pages/mudurlukler/mudurlukler.component';
import { ProfilComponent } from './pages/profil/profil.component';
const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"anasayfa",component:HomeComponent},
  {path:"talepler",component:TaleplerComponent},
  {path:"gorevlerim",component:GorevlerimComponent},
  {path:"yonetim",component:YonetimComponent},
  {path:"mudurlukler",component:MudurluklerComponent},
  {path:"profil",component:ProfilComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
