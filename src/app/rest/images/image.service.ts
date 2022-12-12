import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface UploadImageDto {
  success: boolean;
  filename: string;
}

@Injectable()
export class ImageService {

  constructor(private readonly http: HttpClient) {}

  uploadImage(image: File): Observable<UploadImageDto> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post<UploadImageDto>('/api/image', formData);
  }

  getImage(filename: string): Observable<Blob> {
    return this.http.get<Blob>(`/api/image/${ filename }`, { responseType: "Blob" as 'json' });
  }
}
