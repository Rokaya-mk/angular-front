import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'naw-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles: any[] = [];

  constructor(private articlesService: ArticlesService, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articlesService.getAllArticles().subscribe((response) => {
      this.articles = response[0];
      console.log(this.articles);
    });
  }

  formatDate(dateString: string): string {
    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    const dateParts: string[] = dateString.split('-');
    const year: number = parseInt(dateParts[0]);
    const month: number = parseInt(dateParts[1]) - 1;
    const day: number = parseInt(dateParts[2]);

    const formattedDate: string = `${months[month]} ${day}, ${year}`;
    return formattedDate;
  }

  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
