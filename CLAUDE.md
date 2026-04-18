# Proyecto de Automatización Telcel - Robot Framework

## Arquitectura del Proyecto

Este proyecto implementa el patrón **Page Object Model (POM)** con Robot Framework y SeleniumLibrary para automatización de pruebas de la aplicación BES/CRM de Telcel.

## Estructura de Directorios

```
telcel-master/
├── CLAUDE.md                 # Esta documentación
├── tests/                    # Test Cases (archivos .robot)
├── pages/                    # Page Resources (locators y keywords de página)
├── resources/                # Keywords genéricos y configuración
└── reports/                  # Reportes de ejecución
```

## Reglas de Oro (No Negociables)

### 1. Page Resources son "Append-Only"
- **NUNCA** elimines ni modifiques locators existentes
- Si necesitas un locator diferente, crea una **variable NUEVA**
- Mantén el historial completo de locators para compatibilidad

### 2. Prioridad de Locators
1. **id** (primera opción, más confiable)
2. **name** (segunda opción)
3. **CSS semántico** (tercera opción)
4. **XPath** (último recurso, solo si no hay alternativa)

Ejemplo:
```robot
${BTN_LOGIN}              id:btnLogin                    # Preferido
${INPUT_USERNAME}         name:username                  # Aceptable
${SECTION_OFERTAS}        css:.ofertas-primarias         # Aceptable
${LINK_AMIGO_PAGUITOS}    xpath://a[contains(text(),'Amigo Paguitos')]  # Último recurso
```

### 3. Separación de Responsabilidades
- **Test Cases (.robot)**: Lógica de negocio, flujo de prueba. NO contienen locators ni detalles técnicos.
- **Keywords Resource**: Keywords reutilizables de alto nivel. NO contienen locators directos.
- **Page Resources**: Locators (variables) y keywords específicos de página. Única fuente de locators.

### 4. Tags Obligatorios
- Todo Test Case debe incluir el tag: `PruebaGeneradaIA`
- Solo **1 Test Case por archivo .robot**

### 5. Idioma
- Keywords, steps y nombres de Test Cases: **español**
- Seguir el estilo de escritura de Telcel

## Estructura de un Test Case

```robot
*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA

*** Test Cases ***
Validación de oferta primaria exclusiva Amigo Paguitos con tarifa cero
    [Tags]    PruebaGeneradaIA
    Dado que el usuario ha iniciado sesión en BES
    Cuando accede al módulo de configuración de ofertas primarias
    Y busca la oferta primaria exclusiva para Amigo Paguitos
    Entonces la tarifa de renta debe ser cero
    Y no deben existir unidades libres configuradas
    Y no deben existir ofertas suplementarias adicionales
```

## Estructura de Keywords Resource

```robot
*** Settings ***
Library    SeleniumLibrary
Resource   ../pages/LoginPage.resource
Resource   ../pages/OfertasPage.resource

*** Keywords ***
Dado que el usuario ha iniciado sesión en BES
    Abrir navegador en página de login
    Ingresar credenciales de prueba
    Hacer click en botón de login
    Verificar login exitoso

Cuando accede al módulo de configuración de ofertas primarias
    Navegar a módulo de ofertas
    Seleccionar ofertas primarias
```

## Estructura de Page Resource

```robot
*** Variables ***
# Login Page Locators
${URL_LOGIN}              https://bes.telcel.com/login
${INPUT_USERNAME}         id:username
${INPUT_PASSWORD}         id:password
${BTN_LOGIN}              id:btnLogin
${LBL_DASHBOARD}          id:dashboard

*** Keywords ***
Abrir navegador en página de login
    Open Browser    ${URL_LOGIN}    chrome
    Maximize Browser Window
    Wait Until Element Is Visible    ${INPUT_USERNAME}    timeout=10s

Ingresar credenciales de prueba
    Input Text    ${INPUT_USERNAME}    user_test
    Input Text    ${INPUT_PASSWORD}    pass_test

Hacer click en botón de login
    Click Button    ${BTN_LOGIN}

Verificar login exitoso
    Wait Until Element Is Visible    ${LBL_DASHBOARD}    timeout=15s
    Location Should Contain    dashboard
```

## Convenciones de Nomenclatura

### Variables de Locators
- Usar MAYÚSCULAS con guión bajo
- Prefijo según tipo de elemento:
  - `BTN_` : Botones
  - `INPUT_` : Campos de entrada
  - `LBL_` : Etiquetas/Labels
  - `LINK_` : Enlaces
  - `DDL_` : Dropdowns
  - `TBL_` : Tablas
  - `CHK_` : Checkboxes
  - `RDO_` : Radio buttons

Ejemplos:
```robot
${BTN_GUARDAR}           id:btnGuardar
${INPUT_BUSQUEDA}        name:search
${DDL_CICLO}             id:selectCiclo
${TBL_RESULTADOS}        css:#tableResults
```

### Keywords
- Escribir en español con formato de frase
- Usar mayúscula inicial en cada palabra importante
- Verbos en infinitivo

Ejemplos:
```robot
Abrir navegador en página de login
Ingresar credenciales de prueba
Verificar que la tarifa de renta sea cero
Seleccionar oferta suplementaria Telcel Up
```

## Patrón Given/When/Then

Seguir el patrón BDD en español:
- **Dado que** / **Given**: Precondiciones
- **Cuando** / **When**: Acciones
- **Entonces** / **Then**: Verificaciones
- **Y**: Continuación de cualquier tipo

## Manejo de Esperas

Siempre usar esperas explícitas:
```robot
Wait Until Element Is Visible    ${LOCATOR}    timeout=10s
Wait Until Element Is Enabled    ${LOCATOR}    timeout=5s
Wait Until Page Contains Element    ${LOCATOR}    timeout=15s
```

## Variables de Entorno y Configuración

Centralizar configuración en `resources/config.resource`:
```robot
*** Variables ***
${BROWSER}           chrome
${TIMEOUT}           10s
${URL_BASE}          https://bes.telcel.com
${USUARIO_TEST}      user_test
${PASSWORD_TEST}     pass_test
```

## Ejecución de Pruebas

### Ejecutar un test específico
```bash
robot -d reports tests/TC_032_Validacion_Oferta_Amigo_Paguitos.robot
```

### Ejecutar tests con tag específico
```bash
robot -d reports -i PruebaGeneradaIA tests/
```

### Ejecutar todos los tests
```bash
robot -d reports tests/
```

## Mejores Prácticas

1. **No usar selectores frágiles**: Evitar XPath complejos que dependan de estructura DOM
2. **Reutilizar keywords**: No duplicar lógica, usar keywords existentes
3. **Mantener Page Resources organizados**: Agrupar locators por sección de página
4. **Documentar keywords complejos**: Agregar comentarios cuando sea necesario
5. **Verificaciones explícitas**: Siempre verificar que los elementos estén visibles/habilitados antes de interactuar
6. **Mensajes de error claros**: Usar mensajes descriptivos en assertions

## Casos de Uso de Amigo Paguitos

El proyecto actual se enfoca en automatizar casos de prueba relacionados con **Amigo Paguitos**, incluyendo:
- Validación de ofertas primarias exclusivas
- Alta de ofertas suplementarias (Telcel Up)
- Restricciones de trámites postactivación
- Cambios de ciclo de facturación
- Administración de crédito

Cada caso debe seguir las reglas y patrones establecidos en esta documentación.
