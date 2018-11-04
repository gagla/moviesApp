import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class MovieService {

    private apiUrl = 'https://young-headland-62697.herokuapp.com/movies';


    constructor(public http: HttpClient) { }

    getMovies() {
        return this.http.get(this.apiUrl);
    }
    postMovies(movieTitle) {
        return this.http.post(this.apiUrl, {"title": movieTitle})
    }
}