# Configuración de CoreUI en IA Word Agent

## Características implementadas

### Layout principal con CoreUI
- Sidebar navegable con menú lateral
- Header con toggle para el sidebar
- Diseño responsive y moderno
- Iconos de CoreUI integrados

### Componente de Upload rediseñado
- Zona de drag & drop mejorada con efectos visuales
- Tarjetas (Cards) de CoreUI
- Alertas y spinners para feedback visual
- Botones estilizados con iconos
- Información del archivo seleccionado (nombre y tamaño)

### Componentes CoreUI utilizados
- `c-sidebar` - Menú lateral
- `c-header` - Barra superior
- `c-card` - Tarjetas para contenido
- `c-alert` - Alertas informativas
- `c-spinner` - Indicador de carga
- `c-button` - Botones estilizados
- Iconos de @coreui/icons

## Cómo ejecutar

1. Instalar dependencias (si no están instaladas):
```bash
cd ia-word-agent-front
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm start
```

3. Abrir el navegador en: http://localhost:4200

## Estructura del proyecto

```
src/app/
├── app.ts              # Componente principal con layout CoreUI
├── app.html            # Template con sidebar y header
├── app.config.ts       # Configuración de la aplicación
├── app.routes.ts       # Rutas de la aplicación
├── icons/
│   └── icon-subset.ts  # Iconos de CoreUI utilizados
└── upload/
    ├── upload.ts       # Componente de carga de archivos
    ├── upload.html     # Template con componentes CoreUI
    └── upload.css      # Estilos personalizados
```

## Personalización

### Cambiar colores
Edita `src/styles.css` para personalizar los colores de CoreUI.

### Agregar más páginas
1. Crea un nuevo componente
2. Agrégalo a `app.routes.ts`
3. Añade el enlace en `navItems` en `app.ts`

### Modificar el sidebar
Edita el array `navItems` en `app.ts` para agregar o quitar elementos del menú.
