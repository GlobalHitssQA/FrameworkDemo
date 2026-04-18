*** Settings ***
Documentation    Caso de prueba ID 16: Verificación de consulta de pagos desde SICATEL
...              Proceso: Consulta
...              Aplicación: SICATEL
...              Funcionalidad: Consulta de información de préstamo
...              Escenario: Verificar que desde SICATEL se pueda consultar correctamente la información
...              del préstamo de Amigo Paguitos incluyendo datos del cliente, desglose de cuotas,
...              pagos realizados y fechas de vencimiento
...
...              Precondiciones:
...              - Usuario autenticado en SICATEL con permisos de consulta
...              - Préstamo activo en BES
...              - Servicio PACPagosService disponible
...              - Integración SICATEL-BES configurada
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con préstamo de Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}      5512345678
${NOMBRE_ESPERADO}                Juan Carlos
${APELLIDO_ESPERADO}              Pérez García
${CURP_ESPERADA}                  PEGJ850101HDFRRS01
${RFC_ESPERADO}                   PEGJ850101ABC
${TOTAL_CICLOS_ESPERADOS}         12
${MONTO_TOTAL_ESPERADO}           12000.00

*** Test Cases ***
Verificación De Consulta De Pagos Desde SICATEL
    [Documentation]    Este caso de prueba valida que desde SICATEL se pueda consultar correctamente
    ...                la información del préstamo de Amigo Paguitos incluyendo datos completos del
    ...                cliente, desglose de cuotas, pagos realizados y fechas de vencimiento.
    ...
    ...                Flujo de prueba:
    ...                1. Acceder a SICATEL con usuario autorizado e ingresar número telefónico
    ...                2. Ejecutar consulta desde SICATEL hacia BES usando PACPagosService
    ...                3. Verificar que BES devuelve información completa del préstamo
    ...                4. Visualizar información en pantalla 360 de SICATEL
    ...                5. Verificar consulta de historial de pagos y parcialidades pendientes
    ...
    ...                Verificaciones:
    ...                - SICATEL valida credenciales y acepta número telefónico como parámetro
    ...                - SICATEL invoca exitosamente servicio SOAP PACPagosService.Consulta
    ...                - SICATEL recibe información completa: datos cliente, desglose cuotas, fechas, estados, saldos
    ...                - SICATEL muestra información en pantalla 360 de manera clara y estructurada
    ...                - Historial de pagos y parcialidades pendientes se despliegan con fechas y montos correctos
    [Tags]    PruebaGeneradaIA    Funcional    Consulta    SICATEL    BES    Medium

    # GIVEN: Usuario autenticado en SICATEL con permisos de consulta
    Dado que usuario está autenticado en SICATEL con permisos de consulta

    # AND: Existe un préstamo activo de Amigo Paguitos en BES
    Y existe un préstamo activo de Amigo Paguitos en BES para consulta
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # WHEN: Usuario ingresa el número telefónico del cliente en SICATEL
    Cuando usuario ingresa el número telefónico del cliente en SICATEL
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: SICATEL valida las credenciales y acepta el número telefónico como parámetro de búsqueda
    Entonces SICATEL valida las credenciales y acepta el número telefónico como parámetro
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # WHEN: SICATEL ejecuta la consulta hacia BES mediante PACPagosService
    Cuando SICATEL ejecuta la consulta hacia BES mediante PACPagosService
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: SICATEL invoca exitosamente el servicio SOAP PACPagosService Consulta
    Entonces SICATEL invoca exitosamente el servicio SOAP PACPagosService Consulta

    # AND: BES devuelve la información completa del préstamo a SICATEL
    Y BES devuelve la información completa del préstamo a SICATEL con todos los campos

    # WHEN: Se verifica que SICATEL recibe datos del cliente
    Cuando se verifica que SICATEL recibe datos del cliente desde BES

    # THEN: SICATEL recibe información del cliente: firstName lastName CURP RFC
    Entonces SICATEL recibe información del cliente firstName lastName CURP RFC
    ...    ${NOMBRE_ESPERADO}    ${APELLIDO_ESPERADO}    ${CURP_ESPERADA}    ${RFC_ESPERADO}

    # WHEN: Se verifica que SICATEL recibe desglose de cuotas
    Cuando se verifica que SICATEL recibe desglose de cuotas desde BES

    # THEN: SICATEL recibe desglose de cuotas: totalCycle totalAmount cycleSequence
    Entonces SICATEL recibe desglose de cuotas totalCycle totalAmount cycleSequence
    ...    ${TOTAL_CICLOS_ESPERADOS}    ${MONTO_TOTAL_ESPERADO}

    # WHEN: Se verifica que SICATEL recibe fechas de vencimiento
    Cuando se verifica que SICATEL recibe fechas de vencimiento desde BES

    # THEN: SICATEL recibe fechas de vencimiento cycleDueDate de cada parcialidad
    Entonces SICATEL recibe fechas de vencimiento cycleDueDate de cada parcialidad

    # WHEN: Se verifica que SICATEL recibe estado del préstamo y saldos
    Cuando se verifica que SICATEL recibe estado del préstamo y saldos desde BES

    # THEN: SICATEL recibe status installmentStatus ARBalance unpaidAmount
    Entonces SICATEL recibe status installmentStatus ARBalance unpaidAmount

    # WHEN: Se visualiza la información del crédito en pantalla 360 de SICATEL
    Cuando se visualiza la información del crédito en pantalla 360 de SICATEL

    # THEN: SICATEL muestra correctamente toda la información del préstamo en pantalla 360
    Entonces SICATEL muestra correctamente toda la información del préstamo en pantalla 360

    # WHEN: Se consulta el historial de pagos y parcialidades pendientes desde SICATEL
    Cuando se consulta el historial de pagos y parcialidades pendientes desde SICATEL

    # THEN: SICATEL muestra el desglose de pagos realizados y parcialidades pendientes con fechas y montos
    Entonces SICATEL muestra desglose de pagos realizados y parcialidades pendientes con fechas y montos
