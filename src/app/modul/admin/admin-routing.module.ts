import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    title: 'Admin',
    children: [
      {
        path: 'teacher',
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
        title: 'Teacher',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
