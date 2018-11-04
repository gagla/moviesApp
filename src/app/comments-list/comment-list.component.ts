import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: any;
  movieID: String;
  commentText: String;

  constructor(public commentService: CommentService, private router: Router) { }

  ngOnInit() {
    this.getComments();
  }
  getComments() {
    this.commentService.getComments().subscribe(comments => {
      this.comments = comments;
    }
    )
  }
  addComment(movID, comText) {
    this.commentService.postComment(movID, comText).subscribe(
      comment=> {
        this.getComments();
        return true
      }
    )
  }
  viewComment(id){
         this.router.navigate(['/comments', id]);
      }
}
