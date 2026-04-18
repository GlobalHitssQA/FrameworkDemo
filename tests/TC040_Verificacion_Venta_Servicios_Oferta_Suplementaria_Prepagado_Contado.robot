*** Settings ***
Documentation    Caso de prueba ID 40: Verificación de venta de servicios de oferta suplementaria prepagado de contado
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Venta de Servicios Prepagado de Contado
...              Escenario: Verificar venta de servicios de oferta suplementaria prepagado de contado
...              en esquema Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Cliente con financiamiento activo en Amigo Paguitos
...              - Línea celular activada sobre el equipo vendido
...              - Servicios suplementarios prepagado disponibles
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con financiamiento Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}    5512345678
${IMEI_EQUIPO_VENDIDO}          123456789012345
${SERVICIO_SUPLEMENTARIO}       Paquete de Datos Extra 3GB

# Datos del financiamiento original
${TOTAL_AMOUNT_ORIGINAL}        5000.00
${TOTAL_CYCLE_ORIGINAL}         12

*** Test Cases ***
Verificar Venta De Servicios De Oferta Suplementaria Prepagado De Contado
    [Documentation]    Este caso de prueba verifica la venta de servicios de oferta suplementaria
    ...                prepagado de contado en esquema Amigo Paguitos, validando que el servicio
    ...                adicional no afecte el financiamiento original del equipo.
    ...
    ...                Pasos:
    ...                1. Consultar información del cliente y equipo vendido mediante PACPagosService
    ...                2. Registrar venta de servicio suplementario prepagado de contado
    ...                3. Verificar que el servicio no afecta totalAmount ni totalCycle
    ...                4. Activar servicio suplementario en el número telefónico
    ...                5. Consultar información actualizada del cliente
    ...
    ...                Verificaciones:
    ...                - Sistema devuelve serviceNumber, IMEI, primaryOfferingId y financiamiento
    ...                - Sistema registra venta sin incluirlo en el financiamiento
    ...                - Valores originales del financiamiento no se alteran
    ...                - Sistema activa servicio respetando promociones vigentes
    ...                - Sistema muestra servicio activo y financiamiento sin cambios
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    ServiciosSuplementarios    Medium

    # GIVEN: Usuario ha consultado información del cliente con financiamiento activo
    Dado que el usuario ha consultado información del cliente mediante PACPagosService
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: Sistema devuelve serviceNumber, IMEI, primaryOfferingId e información del financiamiento
    Entonces el sistema devuelve información completa del cliente y equipo vendido
    ...    ${NUMERO_TELEFONICO_CLIENTE}
    ...    ${IMEI_EQUIPO_VENDIDO}
    ...    ${TOTAL_AMOUNT_ORIGINAL}
    ...    ${TOTAL_CYCLE_ORIGINAL}

    # WHEN: Registra venta de servicio suplementario prepagado de contado
    Cuando registra venta de servicio suplementario prepagado de contado
    ...    ${NUMERO_TELEFONICO_CLIENTE}
    ...    ${SERVICIO_SUPLEMENTARIO}

    # THEN: Sistema registra la venta del servicio adicional sin incluirlo en el financiamiento
    Entonces el sistema registra la venta del servicio sin incluirlo en el financiamiento

    # THEN: Servicio suplementario no afecta totalAmount ni totalCycle del financiamiento
    Y el servicio suplementario no afecta valores del financiamiento original
    ...    ${TOTAL_AMOUNT_ORIGINAL}
    ...    ${TOTAL_CYCLE_ORIGINAL}

    # WHEN: Activa servicio suplementario prepagado en el número telefónico
    Cuando activa el servicio suplementario en el número telefónico del cliente
    ...    ${NUMERO_TELEFONICO_CLIENTE}
    ...    ${SERVICIO_SUPLEMENTARIO}

    # THEN: Sistema activa servicio respetando promociones vigentes AK ASL y AK con Todo
    Entonces el sistema activa el servicio respetando promociones vigentes

    # WHEN: Consulta información actualizada del cliente con servicio activo
    Cuando consulta información actualizada del cliente

    # THEN: Sistema muestra servicio suplementario activo y financiamiento original sin cambios
    Entonces el sistema muestra servicio activo y financiamiento sin alteraciones
    ...    ${SERVICIO_SUPLEMENTARIO}
    ...    ${TOTAL_AMOUNT_ORIGINAL}
    ...    ${TOTAL_CYCLE_ORIGINAL}

    [Teardown]    Entonces cerrar la sesión del navegador
