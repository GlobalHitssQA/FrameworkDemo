*** Settings ***
Documentation    Caso de prueba: Validar consulta de información del cliente desde SICATEL
...              Proceso: Consulta
...              Aplicación: SICATEL
...              Funcionalidad: Consulta de información de crédito
...              Escenario: Verificar la consulta de información del cliente Amigo Paguitos
...              desde SICATEL hacia BES utilizando el número telefónico como parámetro
...              de entrada
...
...              Precondiciones:
...              - Cliente con crédito activo en Amigo Paguitos
...              - SICATEL autenticado con permisos de consulta
...              - Servicio PACPagosService operativo
...              - Conectividad entre SICATEL, Capa de Integración y BES disponible
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}     5512345678

*** Test Cases ***
Validar Consulta De Información Del Cliente Desde SICATEL
    [Documentation]    Este caso de prueba verifica que SICATEL puede consultar
    ...                exitosamente la información completa del cliente Amigo Paguitos
    ...                desde BES utilizando el número telefónico como parámetro de entrada.
    ...
    ...                Flujo de integración:
    ...                1. SICATEL invoca el servicio PACPagosService.Consulta proporcionando
    ...                   el número telefónico del cliente como parámetro
    ...                2. La solicitud llega correctamente a Capa de Integración desde SICATEL
    ...                3. Capa de Integración orquesta las consultas hacia las múltiples APIs
    ...                   de BES: CustomerManagement Service, Telcel custom service, BCService,
    ...                   ArService y TelcelInterfaceService
    ...                4. BES procesa cada consulta y devuelve la información correspondiente:
    ...                   datos del suscriptor, cuenta, IMEI, información de parcialidades,
    ...                   saldos y datos personales del cliente
    ...                5. SICATEL recibe la información consolidada del cliente incluyendo
    ...                   desglose de cuotas, desglose de pagos, fechas de vencimiento y
    ...                   estatus del préstamo
    ...                6. SICATEL muestra correctamente toda la información del crédito
    ...                   permitiendo la visualización desde la pantalla 360
    ...
    ...                Verificaciones:
    ...                - Solicitud llega a Capa de Integración desde SICATEL
    ...                - Capa de Integración orquesta consultas hacia múltiples APIs de BES
    ...                - BES devuelve respuestas exitosas para todas las consultas
    ...                - SICATEL recibe información consolidada completa
    ...                - Información incluye desglose de cuotas, pagos, fechas y estatus
    ...                - Información es visualizable desde pantalla 360 de SICATEL
    [Tags]    PruebaGeneradaIA    Funcional    SICATEL    Consulta    Integracion    BES

    # GIVEN: SICATEL está autenticado con permisos de consulta
    Dado que SICATEL está autenticado con permisos de consulta

    # WHEN: Desde SICATEL, invocar el servicio PACPagosService.Consulta proporcionando el número telefónico del cliente
    Cuando SICATEL invoca el servicio PACPagosService Consulta con el número telefónico del cliente
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: La solicitud llega correctamente a Capa de Integración desde SICATEL
    Entonces la solicitud llega correctamente a Capa de Integración desde SICATEL

    # AND: Verificar que Capa de Integración orquesta las consultas hacia las múltiples APIs de BES
    Y Capa de Integración orquesta las consultas hacia las múltiples APIs de BES

    # AND: Confirmar que BES procesa cada consulta y devuelve la información correspondiente
    Entonces BES procesa cada consulta y devuelve la información correspondiente

    # AND: Verificar que SICATEL recibe la información consolidada del cliente
    Y SICATEL recibe la información consolidada del cliente

    # AND: Verificar que SICATEL muestra correctamente toda la información del crédito permitiendo la visualización desde la pantalla 360
    Entonces SICATEL muestra correctamente toda la información del crédito permitiendo la visualización desde la pantalla 360
