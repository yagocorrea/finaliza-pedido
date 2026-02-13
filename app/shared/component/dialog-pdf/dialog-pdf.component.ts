import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { custom } from 'src/customizacao/custom';
import { StorageService } from '../../core/services/storage/storage.service';
import { Proposta } from '../../core/models';
import { StorageEnum } from '../../core/enum';

@Component({
    imports: [PdfViewerModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    selector: 'app-dialog-pdf',
    templateUrl: './dialog-pdf.component.html',
    styleUrls: ['./dialog-pdf.component.scss']
})
export class DialogPdfComponent implements DoCheck {
  constructor(private storageService: StorageService) {}

  @ViewChild('modal') private modal?: ElementRef<HTMLDialogElement>;
  planoSelecionado = {
    id: 0,
    termoPdf: '',
    coberturasPdf: '',
  };
  pdfSrc = '';

  ngDoCheck(): void {
    const proposta = this.storageService.getData<Proposta>(
      StorageEnum.Proposta
    );
    if (proposta) {
      const result = custom.sistema.planosValidos.find(
        (v) => v.id === proposta.idPlano
      );
      if (result) {
        this.planoSelecionado = result;
      }
    }
  }
  private get modalElement() {
    return this.modal?.nativeElement as HTMLDialogElement;
  }

  modalOpenTermo() {
    this.pdfSrc = this.planoSelecionado.termoPdf;
    this.modalElement.showModal();
  }

  modalOpenCoberturas() {
    this.pdfSrc = this.planoSelecionado.coberturasPdf;
    this.modalElement.showModal();
  }

  modalClose() {
    this.modalElement.close();
  }
}
