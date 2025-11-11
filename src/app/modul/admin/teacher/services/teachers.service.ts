import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeacherResponse, TeacherResquest } from '../models/teachers.model';

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
  /**
   * 
   * @param model 
   * @returns 
   */
  add(model:TeacherResquest){
    return this.http.post<TeacherResponse>(this.url, model)
  }
  /**
   * 
   */
  getById(id: string) {
  return this.http.get<TeacherResponse>(`${this.url}/${id}`);
}
} 
