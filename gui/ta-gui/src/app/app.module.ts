import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoService } from './alunos/shared/aluno.service';
import { AppComponent } from './app.component';
import { AutoAvaliacaoComponent } from './autoAvaliacao/autoAvaliacao.component';
import { MetasComponent } from './metas/metas.component';
import { DiscrepanciasComponent } from './discrepancias/discrepancias.component';

@NgModule({
  declarations: [
    AppComponent,
    MetasComponent,
    AlunosComponent,
    AutoAvaliacaoComponent,
    DiscrepanciasComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'alunos',
        component: AlunosComponent,
      },
      {
        path: 'metas',
        component: MetasComponent,
      },
      {
        path: 'autoAvaliacao',
        component: AutoAvaliacaoComponent,
      },
      {
        path: 'discrepancias',
        component: DiscrepanciasComponent,
      },
    ]),
  ],
  providers: [AlunoService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
