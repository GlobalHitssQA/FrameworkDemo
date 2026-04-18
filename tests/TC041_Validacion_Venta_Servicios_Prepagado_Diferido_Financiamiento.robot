*** Settings ***
Documentation    Caso de prueba ID 41: Validación de venta de servicios prepagado diferido dentro del financiamiento
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Administración de crédito Amigo Paguitos
...              Escenario: Verificar la venta de servicios de oferta suplementaria prepagado de contado
...              o diferido dentro del financiamiento en el sistema BES cuando se realiza una venta
...              a través de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en Amigo Paguitos
...              - Catálogo de servicios prepagado disponible
...              - Integración BES-Amigo Paguitos operativa
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Venta de equipo con servicios
${IMEI_EQUIPO}                      234567890123456
${MARCA_EQUIPO}                     Motorola
${MODELO_EQUIPO}                    Moto G73 5G
${SERVICIO_SUPLEMENTARIO_1}         Paquete de Datos 10GB
${SERVICIO_SUPLEMENTARIO_2}         Música Ilimitada
${MODALIDAD_PAGO_CONTADO}           Contado
${MODALIDAD_PAGO_DIFERIDO}          Diferido

# Datos del cliente
${NOMBRE_CLIENTE}                   Roberto Carlos Gómez Sánchez
${CURP_CLIENTE}                     GOSR880412HDFLMB07
${RFC_CLIENTE}                      GOSR880412XYZ

*** Test Cases ***
Validar Venta De Servicios Prepagado Diferido Dentro Del Financiamiento
    [Documentation]    Este caso de prueba verifica la venta de servicios de oferta suplementaria
    ...                prepagado con modalidades de pago de contado o diferido dentro del
    ...                financiamiento en el sistema BES cuando se realiza una venta a través de
    ...                Amigo Paguitos.
    ...
    ...                Pasos:
    ...                1. Iniciar proceso de venta de equipo desde Amigo Paguitos
    ...                2. Agregar servicios de oferta suplementaria prepagado a la venta
    ...                3. Seleccionar modalidad de pago (contado o diferido)
    ...                4. Completar venta y transferir información hacia BES
    ...                5. Verificar registro correcto en BES con modalidad de pago
    ...
    ...                Verificaciones:
    ...                - Sistema permite agregar servicios prepagado a la venta
    ...                - Sistema registra correctamente la forma de pago seleccionada
    ...                - BES recibe y almacena información del usuario, crédito y servicios
    ...                - BES muestra servicios con modalidad de contado o diferido correcta
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    AmigoPaguitos    Low

    # GIVEN: Usuario autenticado en Amigo Paguitos
    Dado que el usuario ha iniciado sesión en la plataforma de Amigo Paguitos

    # WHEN: Inicia el proceso de venta de un equipo con servicios suplementarios
    Cuando inicia el proceso de venta de equipo con servicios suplementarios prepagado
    ...    ${IMEI_EQUIPO}
    ...    ${MARCA_EQUIPO}
    ...    ${MODELO_EQUIPO}

    # THEN: Sistema permite agregar servicios prepagado a la venta
    Entonces el sistema muestra catálogo de servicios prepagado disponibles

    # WHEN: Agrega servicios suplementarios a la venta
    Cuando agrega servicios suplementarios a la venta del equipo
    ...    ${SERVICIO_SUPLEMENTARIO_1}
    ...    ${SERVICIO_SUPLEMENTARIO_2}

    # WHEN: Selecciona modalidad de pago de contado para primer servicio
    Y selecciona modalidad de pago para el servicio
    ...    ${SERVICIO_SUPLEMENTARIO_1}
    ...    ${MODALIDAD_PAGO_CONTADO}

    # WHEN: Selecciona modalidad de pago diferido para segundo servicio
    Y selecciona modalidad de pago para el servicio
    ...    ${SERVICIO_SUPLEMENTARIO_2}
    ...    ${MODALIDAD_PAGO_DIFERIDO}

    # THEN: Sistema registra correctamente la forma de pago seleccionada para los servicios
    Entonces el sistema registra la forma de pago de cada servicio correctamente

    # WHEN: Completa la venta y transfiere información hacia BES
    Cuando completa la venta en Amigo Paguitos y transfiere datos a BES
    ...    ${NOMBRE_CLIENTE}
    ...    ${CURP_CLIENTE}
    ...    ${RFC_CLIENTE}

    # THEN: BES recibe y almacena correctamente la información del usuario, crédito y servicios prepagado
    Entonces BES recibe y almacena información de venta con servicios prepagado

    # WHEN: Accede a BES para verificar el registro de servicios
    Cuando accede a BES para verificar los servicios registrados

    # THEN: BES muestra los servicios prepagado con la modalidad de pago correcta
    Entonces BES muestra servicios prepagado con modalidad de pago correcta
    ...    ${SERVICIO_SUPLEMENTARIO_1}
    ...    ${MODALIDAD_PAGO_CONTADO}
    ...    ${SERVICIO_SUPLEMENTARIO_2}
    ...    ${MODALIDAD_PAGO_DIFERIDO}

    [Teardown]    Entonces cerrar la sesión del navegador
