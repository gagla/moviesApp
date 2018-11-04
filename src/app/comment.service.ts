import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieService } from './movie.service';
@Injectable()
export class CommentService {

    private apiUrl = 'https://young-headland-62697.herokuapp.com/comments';


    constructor(public http: HttpClient, public movieService: MovieService) { }

    getComments() {
        return this.http.get(this.apiUrl);
    }
    postComment(id, text) {
        return this.http.post(this.apiUrl, {"id": id, "text": text})
    }
    getMovieComments(id) {
        return this.http.get(this.apiUrl + '/' + id);
    }
}