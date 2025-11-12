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
   * @param model 
   * @returns 
   */
  edit(id: number,model:TeacherResquest,){
    return this.http.put<TeacherResponse>(`${this.url}/${id}`, model) 
  }
  /**
   * 
   */
  getById(id: number) {
  return this.http.get<TeacherResponse>(`${this.url}/${id}`);
}
} 
