*** Settings ***
Documentation    Caso de prueba ID 51: Verificar venta de servicios de oferta suplementaria prepagado de contado
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Venta de servicios suplementarios prepagado
...              Escenario: Verificar la venta de servicios de oferta suplementaria para clientes prepagado
...              con modalidad de pago de contado en BES cuando se realiza una transacción completa
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Cliente prepagado activo en el sistema
...              - Servicios de oferta suplementaria disponibles para prepagado
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente prepagado
${NUMERO_TELEFONICO_PREPAGADO}    5512340001
${SERVICIO_SUPLEMENTARIO}         Paquete de Datos 5GB

*** Test Cases ***
Verificar Venta De Servicios De Oferta Suplementaria Prepagado De Contado
    [Documentation]    Este caso de prueba verifica la venta de servicios de oferta suplementaria
    ...                para clientes prepagado con modalidad de pago de contado en BES cuando se
    ...                realiza una transacción completa.
    ...
    ...                Pasos:
    ...                1. Acceder al sistema BES con credenciales válidas
    ...                2. Seleccionar la opción de venta de servicios de oferta suplementaria prepagado
    ...                3. Ingresar el número telefónico del cliente prepagado
    ...                4. Seleccionar el servicio de oferta suplementaria a vender
    ...                5. Seleccionar la modalidad de pago de contado
    ...                6. Confirmar la transacción de venta
    ...
    ...                Verificaciones:
    ...                - Sistema muestra la pantalla principal de BES tras autenticación
    ...                - Sistema despliega el formulario de venta de servicios suplementarios
    ...                - Sistema valida y recupera la información del cliente prepagado
    ...                - Sistema muestra el detalle del servicio seleccionado con su precio
    ...                - Sistema aplica el esquema de pago de contado sin parcialidades
    ...                - Sistema registra la venta del servicio suplementario y muestra mensaje de éxito
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    ServiciosSuplementarios    Medium

    # GIVEN: Usuario ha accedido al sistema BES con credenciales válidas
    Dado que el usuario ha accedido al sistema BES con credenciales válidas

    # THEN: El sistema muestra la pantalla principal de BES
    Entonces el sistema muestra la pantalla principal de BES

    # WHEN: Selecciona la opción de venta de servicios de oferta suplementaria prepagado
    Cuando selecciona la opción de venta de servicios de oferta suplementaria prepagado

    # THEN: El sistema despliega el formulario de venta de servicios suplementarios
    Entonces el sistema despliega el formulario de venta de servicios suplementarios

    # WHEN: Ingresa el número telefónico del cliente prepagado
    Cuando ingresa el número telefónico del cliente prepagado
    ...    ${NUMERO_TELEFONICO_PREPAGADO}

    # THEN: El sistema valida y recupera la información del cliente
    Entonces el sistema valida y recupera la información del cliente

    # WHEN: Selecciona el servicio de oferta suplementaria a vender
    Cuando selecciona el servicio de oferta suplementaria a vender
    ...    ${SERVICIO_SUPLEMENTARIO}

    # THEN: El sistema muestra el detalle del servicio seleccionado con su precio
    Entonces el sistema muestra el detalle del servicio seleccionado con su precio

    # WHEN: Selecciona la modalidad de pago de contado
    Cuando selecciona la modalidad de pago de contado

    # THEN: El sistema aplica el esquema de pago de contado sin parcialidades
    Entonces el sistema aplica el esquema de pago de contado sin parcialidades

    # WHEN: Confirma la transacción de venta
    Cuando confirma la transacción de venta

    # THEN: El sistema registra la venta del servicio suplementario de contado y muestra mensaje de éxito
    Entonces el sistema registra la venta del servicio suplementario de contado y muestra mensaje de éxito

    [Teardown]    Entonces cerrar la sesión del navegador
