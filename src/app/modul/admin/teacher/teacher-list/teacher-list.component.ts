import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../services/teachers.service';
import { TeacherResponse } from '../models/teachers.model';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css',
})
export class TeacherListComponent implements OnInit {
  /**
   *
   */
  teachers: TeacherResponse[] = [];
  /***
   *
   */
  constructor(
    private $teachers: TeachersService,) {}
  /**
   *
   */
  ngOnInit(): void {
    this.getAll();
  }
  /**
   * 
   */
  private getAll() {
    this.$teachers.getAll().subscribe((result) => {
      this.teachers = result;
    });
  }

  /**
   * 
   */
  delete(id:number){
    this.$teachers.delete(id).subscribe((w)=>{
      
      this.getAll()
      
    })
  }
}
