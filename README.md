# Visual Notes IA

Una aplicación web moderna para crear y editar notas con capacidades de autocompletado inteligente basado en IA.

## 🚀 Características

- **Editor de texto inteligente** con autocompletado basado en IA
- **Autocompletado automático** que se activa mientras escribes
- **Sistema de documentos protegidos** con rutas seguras
- **Interfaz moderna y responsiva** construida con Next.js 15 y Tailwind CSS
- **Integración con AI SDK** para funcionalidades de completado de texto
- **Soporte para TypeScript** para un desarrollo más robusto

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS 4
- **IA**: AI SDK de Vercel
- **Herramientas de desarrollo**: ESLint, Turbopack
- **Gestor de paquetes**: pnpm

## 📋 Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd visual-notes-ia
   ```

2. **Instala las dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configura las variables de entorno**
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_API_URL=http://localhost:3000
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

5. **Abre tu navegador**
   Navega a [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

```
visual-notes-ia/
├── app/
│   ├── (protected)/          # Rutas protegidas
│   │   ├── docs/             # Documentos
│   │   │   └── [docs_id]/    # Editor de texto dinámico
│   │   │       └── text-editor/
│   │   │           ├── index.tsx
│   │   │           └── parse-completion.ts
│   │   └── home/             # Página principal
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página de inicio
├── public/                   # Archivos estáticos
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```

## 💡 Uso

### Editor de Texto

El editor de texto principal incluye:

- **Autocompletado automático**: Se activa automáticamente mientras escribes
- **Completado manual**: Presiona `Tab` para insertar la sugerencia de IA
- **Control de cursor**: Posicionamiento inteligente del cursor
- **Gestión de estado**: Control de entrada manual vs. autocompletado

### Funcionalidades Principales

1. **Escritura automática**: El sistema detecta cuando has terminado de escribir y sugiere completados
2. **Control de autocompletado**: Puedes habilitar/deshabilitar el autocompletado automático
3. **Integración con IA**: Utiliza el AI SDK para generar sugerencias contextuales
4. **Persistencia**: Los documentos se guardan y pueden ser editados posteriormente

## 🔧 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo con Turbopack
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter de ESLint

## 🌐 API Endpoints

- `POST /v1/completion/notes/{documentId}/autocomplete` - Endpoint para autocompletado de notas

## 🎨 Personalización

### Estilos
Los estilos se manejan con Tailwind CSS 4. Puedes personalizar:
- Colores del tema
- Tipografía
- Espaciado y layout
- Componentes personalizados

### Configuración de IA
Modifica la configuración del AI SDK en:
- `app/(protected)/docs/[docs_id]/text-editor/index.tsx`

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros proveedores
La aplicación es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo
- Revisa la documentación de Next.js y AI SDK

## 🔮 Roadmap

- [ ] Soporte para múltiples idiomas
- [ ] Exportación a diferentes formatos (PDF, Markdown)
- [ ] Colaboración en tiempo real
- [ ] Integración con más modelos de IA
- [ ] Aplicación móvil nativa
- [ ] Sistema de plantillas de notas

---

**Desarrollado con ❤️ usando Next.js 15 y AI SDK**