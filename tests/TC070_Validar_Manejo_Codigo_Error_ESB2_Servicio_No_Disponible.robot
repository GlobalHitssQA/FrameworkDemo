*** Settings ***
Documentation    Caso de prueba: Validar manejo de código de error ESB2 servicio no disponible
...              Proceso: Administración de Crédito
...              Aplicación: BES - Amigo Paguitos
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar el comportamiento del sistema cuando el servicio BES no está
...              disponible por fallas de infraestructura o comunicaciones
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Capa de Integración configurada
...              - Capacidad para simular caída de servicios BES
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para simular error ESB2
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Manejo De Código De Error ESB2 Servicio No Disponible
    [Documentation]    Este caso de prueba verifica que el sistema maneja correctamente el código
    ...                de error ESB2 cuando el servicio BES no está disponible por fallas de
    ...                infraestructura o comunicaciones, y que retorna un mensaje apropiado
    ...                permitiendo reintentar la operación.
    ...
    ...                Pasos:
    ...                1. Preparar una solicitud válida de consulta con número telefónico correcto
    ...                2. Simular la indisponibilidad del servicio BES (detener el servicio o bloquear la comunicación)
    ...                3. Enviar la solicitud al servicio PACPagosService.ConsultarPaguitos
    ...                4. Intentar establecer conexión con los servicios de BES (CustomerManagementService)
    ...                5. Verificar que se retorna el código de error ESB2
    ...                6. Confirmar que el sistema permite reintento según política configurada
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Casos_Error    ESB2

    # STEP 1: Se prepara una solicitud válida de consulta con número telefónico correcto
    Cuando se prepara una solicitud válida de consulta con número telefónico correcto
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2: Se simula la indisponibilidad del servicio BES (detener el servicio o bloquear la comunicación)
    Y se simula la indisponibilidad del servicio BES

    # STEP 3 y 4: Capa de Integración recibe la solicitud válida e intenta establecer conexión con BES
    Entonces Capa de Integración detecta que BES no está accesible

    # STEP 5: El sistema devuelve código ESB2 con mensaje 'Servicio NO disponible'
    Y retorna el código de error ESB2 con mensaje Servicio NO disponible

    # STEP 6: El flag de reintento está habilitado (S)
    Y confirma que el sistema permite reintento según política configurada
