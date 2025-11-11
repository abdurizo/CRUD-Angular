import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeachersService } from '../services/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherResponse } from '../models/teachers.model';

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrl: './add-edit-teacher.component.css',
})
export class AddEditTeacherComponent {
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    addres: ['', Validators.required],
    dataOfBirth: ['', Validators.required],
    dataOfRegister: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    telegramUserName: ['', Validators.required],
    specialization: ['', Validators.required],
  });
 
  /**
   * 
   * @param fb 
   * @param $teachers 
   * @param router 
   * @param route 
   */
  constructor(
    private fb: FormBuilder,
    private $teachers: TeachersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.params['id'];
    if (id) {
      $teachers.getById(id).subscribe((teacher)=>{
        this.setFormValues(teacher);        
      })
    }
  }
  private setFormValues(model:TeacherResponse) {
    this.form.controls.name.setValue(model.name);
    this.form.controls.description.setValue(model.description);
    this.form.controls.addres.setValue(model.addres);
    this.form.controls.dataOfBirth.setValue(model.dataOfBirth);
    this.form.controls.dataOfRegister.setValue(model.dataOfRegister);
    this.form.controls.phone.setValue(model.phone);
    this.form.controls.email.setValue(model.email);
    this.form.controls.telegramUserName.setValue(model.telegramUserName);
    this.form.controls.specialization.setValue(model.specialization);
  }

  /**
   *
   */
  add() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const request = this.form.getRawValue();
    this.$teachers.add(request).subscribe((teacher) => {
      if (teacher) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }
    });
  }
  /**
   *
   */
  reset() {
    this.form.reset();
  }
}
