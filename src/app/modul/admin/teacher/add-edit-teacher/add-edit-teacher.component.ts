import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeachersService } from '../services/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherResponse, TeacherResquest } from '../models/teachers.model';

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
   */
  get isEdit() {
    return this.id > 0;
  }
  /**
   *
   */
  get id() {
    return Number(this.route.snapshot.params['id']);
  }
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
    if (this.isEdit) {
      $teachers.getById(this.id).subscribe((teacher) => {
        this.setFormValues(teacher);
      });
    }
  }
  private setFormValues(model: TeacherResponse) {
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
  submit() {
    if (this.form.invalid) {
       Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
      // this.updateValueAndValidity();
      return;
    }
    const request: TeacherResquest = this.form.getRawValue();
    if (this.isEdit) {
       this.$teachers.edit(this.id, request).subscribe((teacher) => {
      if (teacher) {
        this.router.navigate(['../../'], { relativeTo: this.route });
        return;
      }
    });
      // this.edit(request);
      // return;
    }
    // this.add(request);
     this.$teachers.add(request).subscribe((teacher) => {
      if (teacher) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }
    });
  }
  
  /**
   *
   * @param request
   */
  // private edit(request: TeacherResquest) {
  //   this.$teachers.edit(this.id, request).subscribe((teacher) => {
  //     if (teacher) {
  //       this.router.navigate(['../../'], { relativeTo: this.route });
  //       return;
  //     }
  //   });
  // }
  /**
   *
   * @param request
   */
  // private add(request: TeacherResquest) {
  //   this.$teachers.add(request).subscribe((teacher) => {
  //     if (teacher) {
  //       this.router.navigate(['../'], { relativeTo: this.route });
  //       return;
  //     }
  //   });
  // }

  /**
   *
   */
  // private updateValueAndValidity() {
  //   Object.values(this.form.controls).forEach((control) => {
  //     if (control.invalid) {
  //       control.markAsDirty();
  //       control.updateValueAndValidity({ onlySelf: true });
  //     }
  //   });
  // }

  /**
   *
   */
  reset() {
    this.form.reset();
  }
}
