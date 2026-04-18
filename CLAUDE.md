# Proyecto de Automatización Robot Framework - Telcel

## Estructura del Proyecto

```
telcel-master/
├── pages/              # Page Object Model - Locators y keywords de página
├── resources/          # Keywords reutilizables y configuraciones
└── tests/              # Test Cases en formato Robot Framework
```

## Convenciones de Nomenclatura

### Locators
- **Prioridad**: id → name → CSS semántico → XPath
- **Formato**: `${LOCATOR_ELEMENTO_DESCRIPTIVO}`
- **Ejemplo**: `${LOCATOR_BTN_GUARDAR}`, `${LOCATOR_INPUT_TELEFONO}`

### Keywords
- **Idioma**: Español
- **Formato**: Verbos de acción + Objeto
- **Ejemplo**: `Ingresar Datos Del Usuario`, `Verificar Información Del Crédito`

### Test Cases
- **1 Test Case por archivo .robot**
- **Tag obligatorio**: `PruebaGeneradaIA`
- **Formato Given/When/Then**: Usar keywords que sigan este patrón

## Reglas de Oro

1. **Page Resources son Append-Only**: NUNCA eliminar locators existentes
2. **Sin locators en Test Cases**: Todo selector va en Page Resource
3. **Reutilización**: Antes de crear, buscar si ya existe
4. **Keywords sin UI**: Los keywords en `resources/` solo llaman a keywords de Page Resources

## Configuración de Ambiente

### BES (Backend System)
- **URL**: https://bes-telcel-dev.com
- **Credenciales de prueba**:
  - Usuario: `test_admin`
  - Password: `Test123!`

### Amigo Paguitos
- **URL**: https://amigopaguitos-telcel-dev.com
- **API Endpoint**: `/api/v1/prestamos`

## Módulos Implementados

### Login
- Page Resource: `pages/Login.resource`
- Keywords: Login automático con credenciales

### BES - Consulta de Préstamos
- Page Resource: `pages/BES_Prestamos.resource`
- Keywords: Consulta, creación y verificación de préstamos
