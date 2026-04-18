*** Settings ***
Documentation    Caso de prueba: Validar administración de notificaciones de pago desde BES
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Notificaciones de pago
...              Escenario: Verificar la administración de notificaciones de pago en BES
...              cuando se requiere enviar alertas a clientes de Amigo Paguitos
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
${CREDITO_ID}                      CRD-AP-20260417-001

# Fechas de vencimiento de parcialidades
${FECHA_VENCIMIENTO_PARCIALIDAD_1}    2026-05-17
${FECHA_VENCIMIENTO_PARCIALIDAD_2}    2026-06-17
${FECHA_VENCIMIENTO_PARCIALIDAD_3}    2026-07-17

*** Test Cases ***
Validar Administración De Notificaciones De Pago Desde BES
    [Documentation]    Este caso de prueba verifica que BES administra correctamente
    ...                las notificaciones de pago para créditos de Amigo Paguitos,
    ...                configurando el calendario de cobranza, generando notificaciones
    ...                automáticas según las fechas de vencimiento y registrando el envío
    ...                exitoso a través del canal configurado.
    ...
    ...                Flujo del proceso:
    ...                1. Configurar en BES el calendario de cobranza con fechas de vencimiento
    ...                2. Verificar que el calendario se almacena correctamente
    ...                3. Ejecutar el proceso automático de generación de notificaciones
    ...                4. Verificar que se generan notificaciones para parcialidades próximas
    ...                5. Verificar que las notificaciones se envían y el estado se actualiza
    ...
    ...                Verificaciones:
    ...                - Calendario de cobranza almacenado correctamente con fechas programadas
    ...                - Proceso automático genera notificaciones según fechas de vencimiento
    ...                - Notificaciones generadas corresponden a parcialidades próximas a vencer
    ...                - Sistema registra envío exitoso y actualiza estado en BES
    [Tags]    PruebaGeneradaIA    Funcional    BES    AdministracionCredito    NotificacionesPago

    # GIVEN: Usuario autenticado en BES
    Dado que el usuario ha iniciado sesión en BES

    # GIVEN: Navega al módulo de cobranza y pagos
    Y navega al módulo de cobranza y pagos

    # WHEN: Configura el calendario de cobranza con fechas de vencimiento
    Cuando configura en BES el calendario de cobranza para un crédito de Amigo Paguitos con fechas de vencimiento
    ...    ${CREDITO_ID}
    ...    ${FECHA_VENCIMIENTO_PARCIALIDAD_1}
    ...    ${FECHA_VENCIMIENTO_PARCIALIDAD_2}
    ...    ${FECHA_VENCIMIENTO_PARCIALIDAD_3}

    # THEN: BES almacena correctamente el calendario con las fechas programadas
    Entonces BES almacena correctamente el calendario de cobranza con las fechas programadas

    # WHEN: Ejecuta el proceso automático de generación de notificaciones
    Cuando ejecuta el proceso automático de BES para generar notificaciones de pago según las fechas de vencimiento

    # THEN: BES genera las notificaciones correspondientes a parcialidades próximas a vencer
    Entonces BES genera las notificaciones de pago correspondientes a las parcialidades próximas a vencer

    # THEN: Sistema registra el envío exitoso y actualiza el estado en BES
    Entonces el sistema registra el envío exitoso de las notificaciones de pago y actualiza el estado en BES

    [Teardown]    Entonces cerrar la sesión del navegador
