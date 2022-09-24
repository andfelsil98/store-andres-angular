import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface File {
  originalName: string;
  fileName: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = `${environment.API_URL}/api/files`;
  constructor(
    private http: HttpClient
  ) { }
// metodo para descargar archivos
  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    )
  }
// metodo para subir archivos
  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto);
  }
}
