*** Settings ***
Documentation    Caso de prueba: Comprobar manejo de código de error ESB4 falla de conexión
...              Proceso: Administración de Crédito
...              Aplicación: BES - Amigo Paguitos
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar el manejo de errores cuando existe una falla de conexión con
...              los proveedores durante el flujo de integración
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
# Datos de prueba - Número telefónico válido para simular error ESB4
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Comprobar Manejo De Código De Error ESB4 Falla De Conexión
    [Documentation]    Este caso de prueba verifica que el sistema maneja correctamente el código
    ...                de error ESB4 cuando existe una falla de conexión con los proveedores durante
    ...                el flujo de integración, y que retorna un mensaje apropiado permitiendo
    ...                reintentar la operación.
    ...
    ...                Pasos:
    ...                1. Preparar una solicitud válida de consulta de información de cliente
    ...                2. Iniciar el envío de la solicitud al servicio PACPagosService.ConsultarPaguitos
    ...                3. Simular una caída de red o desconexión durante la invocación a servicios de BES
    ...                4. Detectar la falla de conexión en Capa de Integración
    ...                5. Verificar que se retorna el código de error ESB4
    ...                6. Confirmar que el sistema sugiere reintentar según política
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Casos_Error    ESB4

    # STEP 1: Preparar una solicitud válida de consulta de información de cliente
    Cuando se prepara una solicitud válida de consulta con número telefónico correcto
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2: Iniciar el envío de la solicitud al servicio PACPagosService.ConsultarPaguitos
    Y se inicia el envío de la solicitud al servicio PACPagosService Consulta

    # STEP 3: Simular una caída de red o desconexión durante la invocación a servicios de BES
    Y se simula una caída de red durante la invocación a servicios de BES

    # STEP 4: Detectar la falla de conexión en Capa de Integración
    Entonces el sistema identifica que no puede establecer o mantener la conexión

    # STEP 5: Verificar que se retorna el código de error ESB4
    Y retorna el código de error ESB4 con mensaje Falla de conexión

    # STEP 6: Confirmar que el sistema sugiere reintentar según política
    Y confirma que el sistema sugiere reintentar según política
