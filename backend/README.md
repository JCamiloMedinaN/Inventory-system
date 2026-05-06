# 📦 EcoTech Backend - Asset Management System

Este es el núcleo de servicios para el sistema **EcoTech**, encargado de la gestión, trazabilidad y administración de activos. La aplicación está construida bajo los principios de **Clean Architecture** (Arquitectura Hexagonal) para garantizar que la lógica de negocio sea independiente de los detalles de implementación tecnológica.

## 🛠️ Stack Tecnológico

*   **Runtime:** Node.js (v20+) con TypeScript.
*   **Framework:** Express 5.
*   **ORM:** Prisma con PostgreSQL.
*   **Desarrollo:** `tsx` para ejecución rápida y modo watch nativo.
*   **Calidad de Código:** ESLint y Prettier.

## 🏗️ Arquitectura del Proyecto

El código se organiza en módulos dentro de `src/modules`, siguiendo la estructura de **Puertos y Adaptadores**:

*   **`domain/`**: Entidades de negocio, interfaces y reglas de negocio puras (sin dependencias externas).
*   **`application/`**: Casos de uso (servicios) que orquestan la lógica del dominio.
*   **`infrastructure/`**: Implementaciones técnicas como repositorios de Prisma, controladores de Express e integraciones externas.
*   **`shared/`**: Lógica e infraestructura compartida entre múltiples módulos (ej. Prisma Service, Middlewares globales).

## 🚀 Configuración y Desarrollo

### 1. Requisitos Previos
*   Node.js instalado (v20 o superior recomendado).
*   Instancia de PostgreSQL activa.

### 2. Instalación
```bash
npm install
```

### 3. Variables de Entorno
Crea un archivo `.env` en la raíz de la carpeta `backend/`
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### 4. Ejecución en Desarrollo
El servidor utiliza tsx watch para reflejar cambios en tiempo real sin advertencias de cargadores experimentales:
```bash
npm run dev
```

### 5. Comandos de Producción
```bash
# Compilar TypeScript a JavaScript puro
npm run build

# Iniciar el servidor desde la carpeta de distribución (dist)
npm start
```

## 📋 Calidad de Código
Para mantener el estándar de codificación y limpieza del proyecto:
*   **Linting:** `npm run lint`
*   **Formateo:** `npm run format`

## 🗄️ Base de Datos (Prisma)
El esquema central de datos se encuentra en `prisma/schema.prisma`.
*   Generar el cliente de Prisma: `npx prisma generate`
*   Crear y aplicar migraciones: `npx prisma migrate dev`

---

> **Nota de Gobernanza:** Antes de realizar un commit, asegúrate de que el código pase el linter y que el archivo `.env` no esté incluido en el índice de Git para proteger las credenciales.