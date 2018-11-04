import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../comment.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
    id: number;
    private sub: any;
    comments: any;

  constructor(private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.id = params['id']; 
       this.commentService.getMovieComments(this.id).subscribe(data => {
        this.comments =  data
       });
     });
    
    
  }
 
}
