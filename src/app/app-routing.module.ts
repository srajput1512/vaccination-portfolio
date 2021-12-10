import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const appRoutes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("./user/user.module").then(
        m => m.UserModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
