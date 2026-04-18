*** Settings ***
Documentation    Caso de prueba ID 24: Verificación de consulta de datos del cliente desde canales internos
...              Proceso: Posventa
...              Aplicación: BES
...              Funcionalidad: Consulta de datos desde canales internos
...              Escenario: Verificar que los canales internos (CAC, CVT, CAT, Distribuidores) puedan
...              consultar la información del crédito del cliente desde la pantalla 360 de BES
...
...              Precondiciones:
...              - Usuarios autenticados en diferentes canales (CAC, CVT, CAT, Distribuidores)
...              - Cliente con crédito activo en BES
...              - Permisos de consulta configurados por canal
...              - Conexión a servicios BES disponible
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Low

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con financiamiento activo
${NUMERO_TELEFONICO_CAC}        5545678901
${NUMERO_TELEFONICO_CVT}        5556789012
${NUMERO_TELEFONICO_CAT}        5567890123
${NUMERO_TELEFONICO_DIST}       5578901234

# Datos de prueba - Canales
${CANAL_CAC}                    CAC
${CANAL_CVT}                    CVT
${CANAL_CAT}                    CAT
${CANAL_DISTRIBUIDOR}           Distribuidor

# Datos de prueba - Vendedor para consulta en canal Distribuidor
${VENDEDOR_ID}                  VEND123456

*** Test Cases ***
Verificación De Consulta De Datos Del Cliente Desde Canales Internos
    [Documentation]    Este caso de prueba verifica que los canales internos (CAC, CVT, CAT,
    ...                Distribuidores) puedan consultar la información del crédito del cliente
    ...                desde la pantalla 360 de BES.
    ...
    ...                Pasos:
    ...                1. Desde un CAC, acceder a pantalla 360 de BES ingresando número telefónico
    ...                2. Desde CVT, consultar los datos del cliente con financiamiento activo
    ...                3. Desde CAT, consultar el estatus del préstamo del cliente vía telefónica
    ...                4. Desde un Distribuidor, consultar ventas por vendedor con info de créditos
    ...
    ...                Verificaciones:
    ...                - Sistema BES responde con información completa del cliente y su crédito
    ...                - Se visualiza información del crédito: datos, desglose cuotas, pagos, fechas
    ...                - Sistema muestra estatus actual del préstamo y saldo pendiente
    ...                - Se despliega reporte de ventas con detalle de financiamientos por vendedor
    [Tags]    PruebaGeneradaIA    Funcional    Posventa    CanalesInternos    Low

    # GIVEN: Usuario autenticado en canal CAC
    Dado que el usuario ha accedido a la pantalla 360 de BES desde canal CAC

    # WHEN: Desde un CAC, acceder a la pantalla 360 de BES ingresando el número telefónico
    Cuando desde canal CAC ingresa el número telefónico del cliente en pantalla 360
    ...    ${NUMERO_TELEFONICO_CAC}

    # THEN: El sistema BES responde con la información completa del cliente y su crédito
    Entonces el sistema BES responde con información completa del cliente y su crédito desde CAC

    # GIVEN: Usuario autenticado en canal CVT
    Y el usuario cierra sesión y accede a la pantalla 360 desde canal CVT

    # WHEN: Desde CVT, consultar los datos del cliente con financiamiento activo
    Cuando desde canal CVT consulta los datos del cliente con financiamiento activo
    ...    ${NUMERO_TELEFONICO_CVT}

    # THEN: Se visualiza información: datos cliente, desglose cuotas, pagos, fechas vencimiento
    Entonces se visualiza información completa del crédito en CVT

    # GIVEN: Usuario autenticado en canal CAT
    Y el usuario cierra sesión y accede a la pantalla 360 desde canal CAT

    # WHEN: Desde CAT, consultar el estatus del préstamo del cliente vía telefónica
    Cuando desde canal CAT consulta el estatus del préstamo del cliente
    ...    ${NUMERO_TELEFONICO_CAT}

    # THEN: El sistema muestra el estatus actual del préstamo y saldo pendiente
    Entonces el sistema muestra estatus actual del préstamo y saldo pendiente en CAT

    # GIVEN: Usuario autenticado en canal Distribuidor
    Y el usuario cierra sesión y accede a la pantalla 360 desde canal Distribuidor

    # WHEN: Desde un Distribuidor, consultar ventas por vendedor con información de créditos
    Cuando desde canal Distribuidor consulta ventas por vendedor con información de créditos
    ...    ${VENDEDOR_ID}

    # THEN: Se despliega reporte de ventas con detalle de financiamientos otorgados por vendedor
    Entonces se despliega reporte de ventas con detalle de financiamientos por vendedor

    [Teardown]    Y cierra la sesión de la pantalla 360
