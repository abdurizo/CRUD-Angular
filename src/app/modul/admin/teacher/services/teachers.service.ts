import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeacherResponse } from '../models/teachers.model';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  /**
   *
   */
  url = 'http://localhost:3000/teachers';
  /**
   *
   */
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<TeacherResponse[]>(this.url)
  }
}
