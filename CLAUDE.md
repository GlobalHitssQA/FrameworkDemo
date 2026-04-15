# GUÍA DE AUTOMATIZACIÓN - PROYECTO TELCEL
## Arquitectura Robot Framework + SeleniumLibrary + Page Object Model

### Estructura del Proyecto
```
telcel-master/
├── tests/              # Test Cases (.robot) - 1 por archivo
├── resources/          # Keywords transversales (.resource)
├── pages/              # Page Resources con locators y keywords específicos (.resource)
└── libraries/          # Librerías Python custom si son necesarias
```

### Reglas de Oro

#### 1. Page Resources son "Append-Only"
- **NUNCA** elimines ni modifiques locators existentes
- Si necesitas un locator diferente, crea una variable NUEVA
- Los Page Resources crecen, no se sobrescriben

#### 2. Prioridad de Locators
1. `id` (más confiable)
2. `name`
3. CSS semántico
4. XPath (último recurso)

#### 3. Separación de Responsabilidades
- **Test Cases**: Solo Given/When/Then con keywords de alto nivel
- **Keywords.resource**: Lógica de negocio, flujos completos
- **Page Resources**: Interacción directa con elementos UI

#### 4. Tags Obligatorios
- Todo Test Case debe tener: `[Tags]    PruebaGeneradaIA`
- Solo 1 Test Case por archivo .robot

#### 5. Idioma y Nomenclatura
- Keywords y Test Cases en español
- Seguir estilo Telcel existente
- Nombres descriptivos y claros

### Ejemplo de Test Case
```robot
*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA

*** Test Cases ***
Verificar almacenamiento de datos de usuario en BES
    [Tags]    PruebaGeneradaIA
    Given el usuario ha formalizado una venta en Amigo Paguitos
    When se envían los datos del usuario a BES
    Then los datos quedan almacenados correctamente en BES
```

### Ejemplo de Keywords Resource
```robot
*** Settings ***
Library    SeleniumLibrary
Resource   ../pages/BES.resource
Resource   ../pages/AmigoPaguitos.resource

*** Keywords ***
El usuario ha formalizado una venta en Amigo Paguitos
    Abrir navegador en Amigo Paguitos
    Iniciar sesión en Amigo Paguitos
    Formalizar venta con datos de usuario

Se envían los datos del usuario a BES
    Enviar información de usuario a BES
    Esperar confirmación de recepción

Los datos quedan almacenados correctamente en BES
    Verificar almacenamiento en BES
    Consultar datos de usuario mediante API
```

### Ejemplo de Page Resource
```robot
*** Variables ***
${BES_URL}                    https://bes.telcel.com
${BES_INPUT_USUARIO}          id:usuario_input
${BES_BOTON_CONSULTAR}        css:.btn-consultar
${BES_TABLA_RESULTADOS}       xpath://table[@id='resultados']

*** Keywords ***
Abrir BES
    Open Browser    ${BES_URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    ${BES_INPUT_USUARIO}

Consultar usuario en BES
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_USUARIO}    ${identificacion}
    Click Button    ${BES_BOTON_CONSULTAR}
    Wait Until Element Is Visible    ${BES_TABLA_RESULTADOS}
```

### Configuración de Login (Ejemplo)
```robot
*** Variables ***
${URL_LOGIN}          https://sistema.telcel.com/login
${INPUT_USUARIO}      id:username
${INPUT_PASSWORD}     id:password
${BOTON_LOGIN}        id:loginButton
${USUARIO_PRUEBA}     usuario_test
${PASSWORD_PRUEBA}    password_test

*** Keywords ***
Iniciar sesión en sistema
    Open Browser    ${URL_LOGIN}    chrome
    Input Text    ${INPUT_USUARIO}    ${USUARIO_PRUEBA}
    Input Text    ${INPUT_PASSWORD}    ${PASSWORD_PRUEBA}
    Click Button    ${BOTON_LOGIN}
    Wait Until Page Contains    Bienvenido
```

### Notas Importantes
- Reutilizar keywords existentes antes de crear nuevos
- Validar que el navegador está disponible (Chrome/Chromium)
- Usar waits explícitos para estabilidad
- Documentar precondiciones en comentarios
