# Proyecto de Automatización Robot Framework - Telcel

## Arquitectura: Page Object Model (POM)

Este proyecto implementa automatización de pruebas para Telcel usando Robot Framework con SeleniumLibrary siguiendo el patrón Page Object Model.

## Estructura del Proyecto

```
telcel-master/
├── tests/                  # Test Cases (.robot)
├── resources/             # Keywords reutilizables (.resource)
├── pages/                 # Page Resources con locators (.resource)
└── results/              # Reportes de ejecución
```

## Convenciones y Reglas

### 1. Page Resources (pages/)
- **Append-Only**: NUNCA eliminar ni modificar locators existentes
- Si necesitas un locator distinto, crea una variable NUEVA
- Prioridad de locators:
  1. `id` (más confiable)
  2. `name`
  3. CSS semántico
  4. XPath (último recurso)

**Estructura de Page Resource:**
```robot
*** Variables ***
${LOCATOR_ELEMENTO}    id:elemento_id
${LOCATOR_BOTON}       css:.btn-primary

*** Keywords ***
Acción Sobre Elemento
    [Arguments]    ${dato}
    Wait Until Element Is Visible    ${LOCATOR_ELEMENTO}
    Input Text    ${LOCATOR_ELEMENTO}    ${dato}
```

### 2. Keywords Resources (resources/)
- Keywords en español siguiendo nomenclatura Telcel
- NO contienen locators directos
- Solo llaman keywords de Page Resources o SeleniumLibrary
- Reutilización máxima

**Estructura de Keywords Resource:**
```robot
*** Settings ***
Library    SeleniumLibrary
Resource   ../pages/PaginaLogin.resource

*** Keywords ***
Iniciar Sesión En La Aplicación
    [Arguments]    ${usuario}    ${password}
    Ingresar Usuario    ${usuario}
    Ingresar Contraseña    ${password}
    Hacer Clic En Botón Login
```

### 3. Test Cases (tests/)
- 1 Test Case por archivo .robot
- Formato Given/When/Then
- Tag obligatorio: `PruebaGeneradaIA`
- NUNCA contienen selectores ni lógica de UI
- Nombres en español descriptivos

**Estructura de Test Case:**
```robot
*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA

*** Test Cases ***
Verificar Inicio de Sesión Exitoso
    [Tags]    PruebaGeneradaIA
    Given el usuario está en la página de login
    When ingresa credenciales válidas
    Then debe ver el dashboard principal
```

## Configuración de Login

**URL Base**: https://upc.telcel.com (ajustar según ambiente)
**Credenciales de prueba**: Configurar en variables de ambiente o archivo de configuración

## Módulos de la Aplicación

### UPC (Plataforma de Ventas)
- Login
- Paquetes Internet Amigo
- Consultas de saldos
- Plataformas: 360, MiTelcel, Claro Pay

## Ejecución de Pruebas

```bash
# Ejecutar todas las pruebas
robot tests/

# Ejecutar prueba específica
robot tests/test_nombre.robot

# Con tags
robot --include PruebaGeneradaIA tests/
```

## Mejores Prácticas

1. **Siempre leer antes de escribir**: Lee los Page Resources existentes antes de crear nuevos locators
2. **Reutilización**: Usa keywords existentes siempre que sea posible
3. **Nombres descriptivos**: En español, claros y concisos
4. **Esperas explícitas**: Usa `Wait Until Element Is Visible` antes de interactuar
5. **Manejo de errores**: Captura screenshots en caso de fallo
6. **No duplicar**: Revisa si el keyword o locator ya existe antes de crear uno nuevo
