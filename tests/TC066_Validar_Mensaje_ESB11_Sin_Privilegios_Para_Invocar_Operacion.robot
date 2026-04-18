*** Settings ***
Documentation    Caso de prueba: Validar mensaje ESB11 sin privilegios para invocar operación
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Control de acceso y permisos
...              Escenario: Verificar que el ESB valida correctamente los privilegios del consumidor
...              y devuelve error ESB11 cuando no tiene permisos para invocar la operación
...
...              Precondiciones:
...              - Usuario consumidor registrado sin privilegios para la operación
...              - Servicio BES disponible
...              - Control de acceso habilitado en ESB
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para consulta
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Mensaje ESB11 Sin Privilegios Para Invocar Operación
    [Documentation]    Este caso de prueba verifica que el ESB valida correctamente los privilegios
    ...                del consumidor antes de procesar la petición y devuelve el código de error
    ...                ESB11 cuando el consumidor no cuenta con privilegios para invocar la operación
    ...                ConsultarPaguitos del servicio AmigoPaguitosPagosService.
    ...
    ...                Flujo de validación:
    ...                1. Configurar un usuario consumidor sin los privilegios necesarios
    ...                2. Enviar una petición desde el consumidor sin privilegios
    ...                3. Ejecutar la validación de permisos en el ESB
    ...                4. Verificar que el ESB devuelve el código de error ESB11
    ...                5. Validar que no se aplica reintento automático
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    ControlDeAcceso

    # STEP 1: Configurar un usuario consumidor sin los privilegios necesarios para invocar la operación
    Dado que se configura un consumidor sin privilegios para la operación ConsultarPaguitos
    ...    consumidor_sin_privilegios

    # STEP 2: Enviar una petición desde el consumidor sin privilegios al servicio AmigoPaguitosPagosService
    Cuando el consumidor sin privilegios intenta invocar la operación ConsultarPaguitos
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 3: Ejecutar la validación de permisos en el ESB antes de procesar la petición
    Entonces el ESB ejecuta la validación de privilegios antes de procesar la petición

    # STEP 4: Verificar que el ESB devuelve el código de error ESB11 indicando falta de privilegios
    Y el ESB devuelve el código de error ESB11 indicando falta de privilegios para invocar esta operación

    # STEP 5: Validar que no se aplica reintento automático para este tipo de error de autorización
    Y valida que no se aplica reintento automático para este tipo de error de autorización
