// CORE
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// PAGES
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TaleplerComponent } from './pages/talepler/talepler.component';
import { GorevlerimComponent } from './pages/gorevlerim/gorevlerim.component';
import { YonetimComponent } from './pages/yonetim/yonetim.component';
import { MudurluklerComponent } from './pages/mudurlukler/mudurlukler.component';
import { AddMudurlukComponent } from './pages/mudurlukler/dialogs/add-mudurluk/add-mudurluk.component';
import { GorevAtamaComponent } from './pages/talepler/dialogs/gorev-atama/gorev-atama.component';
import { BekleyenStepperComponent } from './pages/talepler/steppers/bekleyen-stepper/bekleyen-stepper.component';
import { AtananStepperComponent } from './pages/talepler/steppers/atanan-stepper/atanan-stepper.component';
import { TamamlananStepperComponent } from './pages/talepler/steppers/tamamlanan-stepper/tamamlanan-stepper.component';
import { OnaylananStepperComponent } from './pages/talepler/steppers/onaylanan-stepper/onaylanan-stepper.component';
import { TumStepperComponent } from './pages/talepler/steppers/tum-stepper/tum-stepper.component';

// NG MAT
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
//OWN
import { AddUserComponent } from './pages/yonetim/dialogs/add-user/add-user.component';
import { SuccessComponent } from './dialogs/success/success.component';
import { AllUsersComponent } from './pages/yonetim/tabs/all-users/all-users.component';
import { YetkiliKullaniciComponent } from './pages/yonetim/tabs/yetkili-kullanici/yetkili-kullanici.component';
import { YetkiliKullaniciEkleDialogComponent } from './pages/yonetim/dialogs/yetkili-kullanici-ekle-dialog/yetkili-kullanici-ekle-dialog.component';
import { FailComponent } from './dialogs/fail/fail.component';
import { ProfilComponent } from './pages/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TaleplerComponent,
    GorevlerimComponent,
    YonetimComponent,
    MudurluklerComponent,
    AddMudurlukComponent,
    AddUserComponent,
    SuccessComponent,
    AllUsersComponent,
    YetkiliKullaniciComponent,
    YetkiliKullaniciEkleDialogComponent,
    FailComponent,
    GorevAtamaComponent,
    BekleyenStepperComponent,
    AtananStepperComponent,
    TamamlananStepperComponent,
    OnaylananStepperComponent,
    TumStepperComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSortModule,
    MatStepperModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
