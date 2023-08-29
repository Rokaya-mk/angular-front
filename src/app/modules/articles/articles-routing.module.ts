import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesComponent } from './components/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
    title: 'Nawloan - Articles',
    children: [
      {
        path: 'all',
        component: ArticlesListComponent
      },
      {
        path: ':id',
        component: SingleArticleComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
