import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'naw-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent {
  articleId: string | null = '';
  article: any[] = [];

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id');
      this.loadSingleArticle();
    });
  }

  loadSingleArticle(): void {
    this.articlesService.getArticleById(this.articleId).subscribe((response) => {
      this.article = response.data;
      console.log(this.article);
    });
  }
}
