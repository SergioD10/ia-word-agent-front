import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  CardComponent, 
  CardHeaderComponent, 
  CardBodyComponent,
  RowComponent,
  ColComponent,
  ButtonDirective,
  AlertComponent,
  SpinnerComponent,
  BadgeComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ApiService } from '../services/api';

interface FragmentoMejora {
  pagina: number;
  fragmento: string;
  recomendacion: string;
}

interface IndicadorFaltante {
  aspecto: string;
  descripcion: string;
  impacto: string;
}

interface DocumentAnalysis {
  nombre_archivo: string;
  proyecto: string;
  lider: string;
  compania: string;
  tipo_ejecucion: string;
  porcentaje_aprobacion: number;
  fragmentos_mejora: FragmentoMejora[];
  indicadores_faltantes: IndicadorFaltante[];
  tiempo_procesamiento?: number;
}

@Component({
  selector: 'app-upload',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    AlertComponent,
    SpinnerComponent,
    IconDirective,
    BadgeComponent
  ], 
  templateUrl: './upload.html',
  styleUrls: ['./upload.css']
})
export class UploadComponent {
  file!: File | null;
  analysis: DocumentAnalysis | null = null;
  loading = false;
  isDragging = false;
  error = "";
  startTime: number = 0;
  processingTime: number = 0;
  tipoFormato: string = "new_inntech";

  // Constantes de validación
  readonly MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB en bytes
  readonly ALLOWED_EXTENSIONS = ['.docx'];

  // Tipos de formato disponibles
  readonly TIPOS_FORMATO = [
    { value: 'corona', label: 'GST-FT-005 - Documentación Tecnica Proyectos - Corona', description: '' },
    { value: 'linea_directa', label: 'GST-FT-005 - Documentación Tecnica Proyectos - Linea Directa', description: '' },
    { value: 'new_inntech', label: 'GST-FT-005 - Documentación Tecnica Proyectos - New Inntech', description: '' },
    { value: 'novaventa', label: 'GST-FT-005 - Documentación Tecnica Proyectos - Novaventa - Netw', description: '' },
    { value: 'nutresa_netw', label: 'GST-FT-005 - Documentación Tecnica Proyectos - Nutresa - Netw Pideky', description: '' },
    { value: 'nutresa_proyectos', label: 'GST-FT-005 - Documentación Tecnica Proyectos - Nutresa Proyectos', description: '' },
    { value: 'web_back', label: 'GST-FT-007 - Documentación Tecnica para Soluciones Web - Back', description: '' },
    { value: 'web_front', label: 'GST-FT-008 - Documentación Tecnica para Soluciones Web - Front', description: '' }
  ];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.validateAndSetFile(files[0]);
    }
  }

  onDragOver(event: DragEvent) { 
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.validateAndSetFile(files[0]);
    }
  }

  validateAndSetFile(file: File) {
    this.error = "";
    
    // Validar extensión
    const fileName = file.name.toLowerCase();
    const hasValidExtension = this.ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      this.error = "Solo se permiten archivos Word (.docx)";
      this.file = null;
      return;
    }

    // Validar tamaño
    if (file.size > this.MAX_FILE_SIZE) {
      this.error = `El archivo supera el tamaño máximo permitido de ${this.formatFileSize(this.MAX_FILE_SIZE)}`;
      this.file = null;
      return;
    }

    this.file = file;
  }

  clearFile() {
    this.file = null;
    this.analysis = null;
    this.error = "";
    this.processingTime = 0;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  formatTime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds.toFixed(2)} segundos`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);
    return `${minutes} min ${remainingSeconds} seg`;
  }

  uploadFile() {
    if (!this.file) { 
      this.error = "Por favor selecciona un archivo";
      return; 
    }
    
    this.loading = true;
    this.analysis = null;
    this.error = "";
    this.startTime = Date.now();
    this.processingTime = 0;
    this.cdr.detectChanges();

    this.apiService.uploadDocument(this.file, this.tipoFormato).subscribe({
      next: (response) => {
        const endTime = Date.now();
        this.processingTime = (endTime - this.startTime) / 1000; // Convertir a segundos
        
        if (response) {
          this.analysis = {
            ...response as DocumentAnalysis,
            tiempo_procesamiento: this.processingTime
          };
        } else {
          this.error = "La respuesta del servidor no contiene análisis";
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        const endTime = Date.now();
        this.processingTime = (endTime - this.startTime) / 1000;
        
        let errorMsg = "Error al analizar el documento";
        
        if (err.error && err.error.detail) {
          errorMsg += `: ${err.error.detail}`;
        } else if (err.message) {
          errorMsg += `: ${err.message}`;
        }
        
        this.error = errorMsg;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}