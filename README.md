# Framework de Automatización - Telcel BES

Proyecto de automatización de pruebas con Robot Framework + SeleniumLibrary + Page Object Model para el sistema BES (Backend System) de Telcel.

## 📁 Estructura del Proyecto

```
telcel-master/
├── pages/                          # Page Object Model - Locators y keywords de página
│   ├── Login.resource              # Página de login
│   ├── BES_Prestamos.resource      # Módulo de préstamos de BES
│   └── AmigoPaguitos_API.resource  # Integración API con Amigo Paguitos
├── resources/                      # Keywords reutilizables
│   └── keywords.resource           # Keywords de alto nivel (Given/When/Then)
├── tests/                          # Test Cases
│   └── TC002_Verificar_Almacenamiento_Informacion_Usuario_Credito_BES.robot
├── CLAUDE.md                       # Guía para Claude Code
└── README.md                       # Este archivo
```

## 🎯 Casos de Prueba Implementados

### TC002: Verificar Almacenamiento de Información del Usuario y Crédito en BES
- **Proceso**: Venta
- **Aplicación**: BES
- **Funcionalidad**: Almacenamiento de información de crédito
- **Tipo**: Funcional
- **Complejidad**: Baja
- **Técnica ISTQB**: Particiones de equivalencia

**Escenario**: Verifica que BES almacena correctamente la información del usuario, crédito y equipo provista por Amigo Paguitos cuando se crea un nuevo préstamo.

## 🚀 Instalación

### Prerrequisitos
- Python 3.8+
- pip
- Chrome/Chromium browser

### Instalar dependencias

```bash
pip install robotframework
pip install robotframework-seleniumlibrary
pip install robotframework-requests
pip install webdriver-manager
```

## ▶️ Ejecución de Pruebas

### Ejecutar todos los tests
```bash
cd /tmp/telcel-master_chat_1776448765456_s8bzr6hren
robot tests/
```

### Ejecutar un test específico
```bash
robot tests/TC002_Verificar_Almacenamiento_Informacion_Usuario_Credito_BES.robot
```

### Ejecutar tests por tags
```bash
robot --include PruebaGeneradaIA tests/
robot --include Funcional tests/
robot --include BES tests/
```

### Ejecución con navegador visible (no headless)
```bash
robot -v BROWSER:Chrome tests/
```

### Generar reportes detallados
```bash
robot --outputdir results --name "BES Tests" --loglevel DEBUG tests/
```

## 📋 Convenciones del Proyecto

### Nomenclatura de Locators
- **Prioridad**: `id` → `name` → `CSS semántico` → `XPath`
- **Formato**: `${LOCATOR_ELEMENTO_DESCRIPTIVO}`
- **Ejemplos**:
  - `${LOCATOR_BTN_GUARDAR}`
  - `${LOCATOR_INPUT_TELEFONO}`
  - `${LOCATOR_TXT_NOMBRE}`

### Nomenclatura de Keywords
- **Idioma**: Español
- **Formato**: `Verbo + Objeto + Contexto`
- **Ejemplos**:
  - `Ingresar Datos Del Usuario`
  - `Verificar Información Del Crédito`
  - `Hacer Click En Botón Buscar`

### Estructura de Test Cases
- **1 Test Case por archivo .robot**
- **Tag obligatorio**: `PruebaGeneradaIA`
- **Patrón Given/When/Then**
- **Sin locators en el test**: Todo selector va en Page Resource

## 🔧 Reglas de Desarrollo

### Page Resources (Append-Only)
❌ **NUNCA** eliminar o modificar locators existentes
✅ **SIEMPRE** agregar nuevas variables al final del archivo

### Separación de Responsabilidades
- **Test Cases (.robot)**: Solo keywords de alto nivel, sin selectores
- **Keywords Resource**: Lógica de negocio, sin selectores
- **Page Resources**: Locators y keywords de interacción con elementos

### Antes de Crear, Reutilizar
1. Revisar si el locator ya existe en el Page Resource
2. Revisar si el keyword ya existe en resources/
3. Solo crear si no existe una solución reutilizable

## 🌐 Ambientes

### BES (Backend System)
- **URL**: https://bes-telcel-dev.com
- **Usuario**: test_admin
- **Password**: Test123!

### Amigo Paguitos
- **URL**: https://amigopaguitos-telcel-dev.com
- **API Endpoint**: /api/v1/prestamos

## 📊 Reportes

Después de cada ejecución, Robot Framework genera automáticamente:
- `log.html` - Log detallado de la ejecución
- `report.html` - Reporte ejecutivo con métricas
- `output.xml` - Salida en formato XML para CI/CD

## 🤖 Integración con Claude Code

Este proyecto está optimizado para trabajar con Claude Code. Ver `CLAUDE.md` para instrucciones detalladas sobre cómo Claude debe interactuar con el framework.

## 📝 Contribuir

Al agregar nuevos casos de prueba:
1. Leer completamente `CLAUDE.md`
2. Revisar Page Resources existentes
3. Seguir el patrón de archivos existentes
4. Nunca modificar locators existentes (Append-Only)
5. Agregar tag `PruebaGeneradaIA` a todos los tests nuevos

## 📞 Soporte

Para issues o dudas sobre el framework, consultar la documentación en `CLAUDE.md` o revisar los casos de prueba existentes como referencia.
