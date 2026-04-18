*** Settings ***
Documentation    Caso de prueba: Validar administración de notificaciones de pago desde BES
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Notificaciones de pago
...              Escenario: Verificar la administración de notificaciones de pago en BES cuando se
...              requiere enviar alertas a clientes de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Crédito de Amigo Paguitos activo en el sistema
...              - Calendario de cobranza configurado
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Crédito
${CREDITO_ID}                  CRE789456123
${CUSTOMER_ID}                 CUS987654321

# Datos de prueba - Calendario
${NUMERO_PARCIALIDADES}        12
${DIAS_ANTES_VENCIMIENTO}      5

# Datos de prueba - Canal de notificaciones
${CANAL_NOTIFICACION}          SMS

# Estados esperados
${ESTADO_PROCESO_ESPERADO}     Completado
${ESTADO_ENVIO_ESPERADO}       Enviado

*** Test Cases ***
Validar Administración De Notificaciones De Pago Desde BES
    [Documentation]    Este caso de prueba verifica la administración de notificaciones de pago
    ...                en BES cuando se requiere enviar alertas a clientes de Amigo Paguitos.
    ...
    ...                Pasos:
    ...                1. Configurar en BES el calendario de cobranza para un crédito de Amigo Paguitos
    ...                   con fechas de vencimiento de parcialidades
    ...                2. Ejecutar el proceso automático de BES para generar notificaciones de pago
    ...                   según las fechas de vencimiento
    ...                3. Verificar que BES envía las notificaciones a través del canal configurado
    ...                   al cliente y registra el envío exitoso actualizando el estado en BES
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de notificaciones de pago

    Dado que existe un crédito de Amigo Paguitos activo en BES con calendario de cobranza
    ...    ${CREDITO_ID}

    Cuando configura el calendario de cobranza con fechas de vencimiento de parcialidades
    ...    ${CREDITO_ID}

    Entonces BES almacena correctamente el calendario de cobranza con las fechas programadas

    Cuando ejecuta el proceso automático de BES para generar notificaciones según fechas de vencimiento

    Entonces BES genera las notificaciones de pago correspondientes a las parcialidades próximas a vencer

    Y verifica que el sistema registra el envío exitoso de las notificaciones

    Y verifica que el estado se actualiza en BES

    [Teardown]    Entonces cerrar la sesión del navegador
