*** Settings ***
Documentation    Caso de prueba: Validar proceso de cancelaciones de financiamiento
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Cancelación de financiamientos
...              Escenario: Verificar el proceso de cancelación de financiamientos en BES cuando se
...              requiere anular un crédito de Amigo Paguitos por diversas causas
...
...              Precondiciones:
...              - Usuario con permisos de cancelación autenticado en BES
...              - Crédito de Amigo Paguitos existente en el sistema
...              - Motivo de cancelación válido
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Crédito
${CREDITO_ID}                  CRE123456789
${CUSTOMER_ID}                 CUS456789123
${INSTALLMENT_PLAN_ID}         IPL789123456

# Datos de prueba - Cancelación
${MOTIVO_CANCELACION}          Solicitud del cliente
${OBSERVACIONES}               Cliente solicita cancelación anticipada del crédito por liquidación total

# Datos esperados - Verificación
${ESTADO_ESPERADO}             Cancelado
${IMEI_EQUIPO}                 123456789012345

*** Test Cases ***
Validar Proceso De Cancelaciones De Financiamiento
    [Documentation]    Este caso de prueba verifica el proceso de cancelación de financiamientos
    ...                en BES cuando se requiere anular un crédito de Amigo Paguitos por diversas causas.
    ...
    ...                Pasos:
    ...                1. Iniciar el proceso de cancelación de un crédito de Amigo Paguitos en BES
    ...                   especificando el motivo de cancelación
    ...                2. Verificar que BES valida los permisos del usuario para realizar la operación
    ...                3. Ejecutar el proceso de cancelación que debe revertir los movimientos del crédito
    ...                   y actualizar el estado a cancelado
    ...                4. Verificar que BES procesa la liberación del equipo si estaba sujeto a restricciones
    ...                   mediante Trustonic
    ...                5. Validar que BES actualiza los saldos y genera los reversos contables necesarios
    ...                6. Confirmar que el crédito cancelado no permite realizar operaciones adicionales
    ...                   de pago o modificación
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de cancelaciones

    Cuando busca el crédito para iniciar proceso de cancelación
    ...    ${CREDITO_ID}

    Y registra solicitud de cancelación con motivo válido
    ...    ${MOTIVO_CANCELACION}    ${OBSERVACIONES}

    Entonces el sistema valida permisos del usuario para cancelación

    Cuando confirma la cancelación del crédito

    Entonces el crédito se cancela y actualiza el estado a cancelado
    ...    ${MOTIVO_CANCELACION}

    Y el sistema procesa la liberación del equipo a través de SITIC-Trustonic

    Y el sistema actualiza los saldos y genera los reversos contables

    Entonces verifica que operaciones están bloqueadas en el crédito cancelado

    [Teardown]    Entonces cerrar la sesión del navegador
