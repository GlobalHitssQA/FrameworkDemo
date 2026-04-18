*** Settings ***
Documentation    Caso de prueba: Verificar flujo de inhabilitación para plan tipo Amigo Paguitos
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Inhabilitación y Habilitación de Equipos
...              Escenario: Verificar el flujo completo de inhabilitación de equipo vendido bajo el
...              esquema Amigo Paguitos cuando el cliente incumple con las parcialidades
...
...              Precondiciones:
...              - Cliente de Amigo Paguitos con financiamiento activo
...              - Parcialidades vencidas según calendario de cobranza
...              - Integración con SITIC-Trustonic operativa
...              - No hay promesas de pago activas
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente Amigo Paguitos
${CUSTOMER_ID_AMIGO_PAGUITOS}    CUST_AP_123456789
${IMEI_EQUIPO_AMIGO_PAGUITOS}    358012345678902

*** Test Cases ***
Verificar Flujo De Inhabilitación Para Plan Tipo Amigo Paguitos
    [Documentation]    Este caso de prueba verifica el flujo completo de inhabilitación de equipo
    ...                para un cliente de Amigo Paguitos que tiene parcialidades vencidas y se requiere
    ...                inhabilitar el equipo mediante integración con SITIC-Trustonic.
    ...
    ...                Pasos:
    ...                1. Identificar un cliente de Amigo Paguitos con parcialidades vencidas
    ...                2. Validar que BES administra el calendario de cobranza específico de Amigo Paguitos
    ...                3. Verificar que no hay promesas de pago activas para el cliente
    ...                4. Ejecutar el envío de notificación de pago al cliente
    ...                5. Invocar la API de SITIC-Trustonic para inhabilitar el equipo
    ...                6. Verificar que el equipo queda inhabilitado en el sistema BES
    ...                7. Confirmar que el registro de inhabilitación incluye fecha, hora y motivo
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de inhabilitación de equipos

    Dado que existe un cliente de Amigo Paguitos con parcialidades vencidas    ${CUSTOMER_ID_AMIGO_PAGUITOS}

    Entonces BES identifica al cliente y las parcialidades pendientes de pago

    Cuando valida que BES administra el calendario de cobranza de Amigo Paguitos

    Entonces el calendario refleja ciclos configurables de Amigo Paguitos

    Cuando verifica que no hay promesas de pago activas para el cliente

    Entonces el sistema confirma que no existen promesas de pago registradas

    Cuando ejecuta el envío de notificación de pago al cliente

    Entonces BES envía notificación informando del incumplimiento de parcialidades

    Cuando invoca la API de SITIC-Trustonic para inhabilitar el equipo    ${IMEI_EQUIPO_AMIGO_PAGUITOS}

    Entonces se ejecuta la inhabilitación del dispositivo a través de Trustonic    ${IMEI_EQUIPO_AMIGO_PAGUITOS}

    Cuando verifica que el equipo queda inhabilitado en BES

    Entonces el estado del equipo cambia a inhabilitado

    Y confirma que el registro incluye fecha hora y motivo de inhabilitación

    [Teardown]    Entonces cerrar la sesión del navegador
