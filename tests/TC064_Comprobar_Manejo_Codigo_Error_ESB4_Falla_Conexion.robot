*** Settings ***
Documentation    Caso de prueba: Comprobar manejo de código de error ESB4 falla de conexión
...              Proceso: Administración de Crédito
...              Aplicación: BES - Amigo Paguitos
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar el manejo de errores cuando existe una falla de conexión
...              con los proveedores durante el flujo de integración
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Capa de Integración operativa
...              - Capacidad para simular fallas de red
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para simular falla de conexión
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Comprobar Manejo De Código De Error ESB4 Falla De Conexión
    [Documentation]    Este caso de prueba verifica el manejo de errores cuando ocurre
    ...                una falla de conexión durante la invocación a servicios de BES.
    ...
    ...                Flujo de validación:
    ...                1. Preparar solicitud válida de consulta
    ...                2. Iniciar envío de solicitud al servicio
    ...                3. Simular caída de red durante invocación a BES
    ...                4. Detectar falla de conexión en Capa de Integración
    ...                5. Verificar que retorna código de error ESB4
    ...                6. Confirmar que el sistema sugiere reintentar según política
    [Tags]    PruebaGeneradaIA    CasosDeError    CapaIntegracion    FallaConexion

    # STEP 1: Preparar solicitud válida de consulta de información de cliente
    Cuando se inicia el envío de solicitud al servicio PACPagosService Consulta
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2 y 3: Iniciar envío y simular caída de red durante invocación a BES
    Y se simula una caída de red durante la invocación a BES

    # STEP 4: Detectar falla de conexión en Capa de Integración
    Entonces Capa de Integración detecta la falla de conexión

    # STEP 5: Verificar que se retorna el código de error ESB4
    Y retorna el código de error ESB4 con mensaje Falla de conexión

    # STEP 6: Confirmar que el sistema sugiere reintentar según política
    Y confirma que el mensaje de error indica que se puede reintentar la operación
