import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';

import { ArticlesComponent } from './components/articles.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';



@NgModule({
  declarations: [
    ArticlesComponent,
    SingleArticleComponent,
    ArticlesListComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
