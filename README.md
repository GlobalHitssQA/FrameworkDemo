# Proyecto de Automatización - Telcel UPC
## Robot Framework + SeleniumLibrary + Page Object Model

### Caso de Prueba Automatizado

**ID:** 2
**Título:** Verificar que se mantiene la vigencia del paquete más grande al sumar datos
**Proceso:** Venta
**Aplicación:** UPC
**Funcionalidad:** Paquetes Internet Amigo

### Estructura del Proyecto

```
telcel-master_chat_1775836906362_nqo6x2mu3b/
├── CLAUDE.md                          # Guía de convenciones y arquitectura
├── README.md                          # Este archivo
├── pages/                             # Page Resources (locators + keywords de página)
│   ├── PaginaLogin.resource          # Login de UPC
│   └── PaginaPaquetesInternetAmigo.resource  # Módulo de Paquetes Internet Amigo
├── resources/                         # Keywords reutilizables de alto nivel
│   └── keywords.resource             # Keywords de negocio
├── tests/                            # Test Cases
│   ├── ejemplo_login.robot           # Ejemplo de login
│   └── test_verificar_vigencia_paquete_mayor_al_sumar_datos.robot  # Caso ID 2
└── results/                          # Reportes de ejecución
```

### Requisitos Previos

```bash
# Instalar Robot Framework
pip install robotframework

# Instalar SeleniumLibrary
pip install robotframework-seleniumlibrary

# Instalar WebDriver (Chrome)
pip install webdriver-manager
```

### Ejecución del Test

#### Ejecutar el caso específico (ID: 2)
```bash
cd /tmp/telcel-master_chat_1775836906362_nqo6x2mu3b
robot --outputdir results tests/test_verificar_vigencia_paquete_mayor_al_sumar_datos.robot
```

#### Ejecutar todos los tests
```bash
robot --outputdir results tests/
```

#### Ejecutar solo tests con tag PruebaGeneradaIA
```bash
robot --outputdir results --include PruebaGeneradaIA tests/
```

#### Ejecutar en modo headless
```bash
robot --outputdir results --variable BROWSER:headlesschrome tests/
```

### Descripción del Test Case

El test automatiza el siguiente escenario:

1. **Precondiciones:**
   - Usuario autenticado en UPC
   - Línea prepago activa
   - Acceso a plataformas de consulta (360, MiTelcel, Claro Pay)

2. **Pasos:**
   - Activar un Paquete Internet Amigo con vigencia menor (15 días - 500MB)
   - Activar un Paquete Internet Amigo con vigencia mayor (60 días - 2GB) antes de que venza el primero
   - Consultar la vigencia de la bolsa de datos en las 3 plataformas

3. **Resultado Esperado:**
   - El sistema muestra la vigencia del paquete con mayor duración (60 días) como vigencia de la bolsa de datos sumados en las 3 plataformas

### Configuración

Para personalizar el test, editar las variables en el archivo de test:

```robot
*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678          # Número de línea a probar
${PAQUETE_VIGENCIA_MENOR}  PAQ_500MB_15D       # Paquete de 15 días
${PAQUETE_VIGENCIA_MAYOR}  PAQ_2GB_60D         # Paquete de 60 días
${VIGENCIA_ESPERADA}       60 días             # Vigencia que debe mostrar el sistema
```

### Reportes

Después de la ejecución, los reportes se generan en la carpeta `results/`:

- **report.html**: Reporte visual detallado
- **log.html**: Log de ejecución paso a paso
- **output.xml**: Resultado en formato XML

### Arquitectura Page Object Model

#### Page Resources (pages/)
Contienen:
- **Variables:** Locators de elementos UI
- **Keywords:** Acciones específicas de la página

**Regla de Oro:** Los Page Resources son **Append-Only**. NUNCA eliminar ni modificar locators existentes.

#### Keywords Resources (resources/)
Contienen:
- Keywords de negocio de alto nivel
- Orquestación de acciones de múltiples páginas
- NO contienen locators directos

#### Test Cases (tests/)
Contienen:
- Casos de prueba en formato Given/When/Then
- NO contienen selectores ni lógica de UI
- 1 Test Case por archivo
- Tag obligatorio: `PruebaGeneradaIA`

### Mantenimiento

Para agregar nuevos tests:

1. Verificar si los Page Resources existentes tienen los locators necesarios
2. Si no existen, agregar NUEVOS locators (no modificar existentes)
3. Crear keywords reutilizables en keywords.resource
4. Crear el test case siguiendo el formato establecido

### Soporte

Para más información sobre la arquitectura y convenciones, consultar `CLAUDE.md`
