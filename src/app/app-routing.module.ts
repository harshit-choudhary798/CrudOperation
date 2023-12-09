import { UnknownrouteComponent } from './unknownroute/unknownroute.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent ,canActivate: [AuthService]},
  {path:'login',component:LoginComponent},
  {path:'contact',component:ContactComponent},
  {path:"**",component:UnknownrouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
