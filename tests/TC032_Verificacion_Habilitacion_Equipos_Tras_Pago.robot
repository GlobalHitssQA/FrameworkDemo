*** Settings ***
Documentation    Caso de prueba ID 32: Verificación de habilitación de equipos tras pago
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Gestión de Pagos y Habilitación de Equipos
...              Escenario: Verificar habilitación de equipos en BES cuando el cliente Amigo Paguitos
...              realiza pago de parcialidades vencidas
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Cliente con equipo inhabilitado por falta de pago
...              - Integración con CPS disponible
...              - Integración con SITIC-Trustonic disponible
...
...              Técnica ISTQB: Transición de estados
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con equipo inhabilitado
${NUMERO_TELEFONICO_CLIENTE}    5512345678
${IMEI_EQUIPO}                  123456789012345
${MONTO_PAGO}                   500.00
${METODO_PAGO}                  Efectivo
${REFERENCIA_PAGO}              REF-2024-001

*** Test Cases ***
Verificación De Habilitación De Equipos Tras Pago
    [Documentation]    Este caso de prueba verifica la habilitación de equipos en BES cuando
    ...                el cliente Amigo Paguitos realiza pago de parcialidades vencidas. Se valida
    ...                que al acreditar el pago mediante integración con CPS desde punto de cobro,
    ...                el sistema actualice el estado del financiamiento y ejecute el proceso de
    ...                habilitación del equipo a través de las APIs de SITIC-Trustonic, dejando el
    ...                equipo completamente desbloqueado.
    ...
    ...                Pasos:
    ...                1. Consultar información del cliente con equipo inhabilitado por falta de pago
    ...                2. Acreditar pago de parcialidad mediante integración con CPS desde punto de cobro
    ...                3. Verificar actualización del estado del financiamiento tras acreditación de pago
    ...                4. Ejecutar proceso de habilitación del equipo a través de las APIs de SITIC-Trustonic
    ...                5. Consultar el estado final del equipo y del financiamiento
    ...
    ...                Verificaciones:
    ...                - El sistema muestra equipo inhabilitado y parcialidades vencidas pendientes de pago
    ...                - El sistema registra el pago y actualiza unpaidAmount y status de la parcialidad
    ...                - El sistema actualiza installmentStatus y elimina collectionProcessFlag si aplica
    ...                - El sistema envía notificación de habilitación y el equipo queda desbloqueado
    ...                - El sistema muestra el equipo habilitado y el financiamiento con status actualizado
    [Tags]    PruebaGeneradaIA    Funcional    BES    AdministracionCredito    Habilitacion    Medium

    # GIVEN: Usuario ha iniciado sesión en BES con credenciales válidas
    Dado que el usuario ha iniciado sesión en BES con credenciales válidas

    # WHEN: Consulta información del cliente con equipo inhabilitado por falta de pago
    Cuando consulta información del cliente con equipo inhabilitado por falta de pago
    ...    ${IMEI_EQUIPO}

    # THEN: El sistema muestra equipo inhabilitado y parcialidades vencidas pendientes de pago
    Entonces el sistema muestra equipo inhabilitado y parcialidades vencidas pendientes

    # WHEN: Acredita pago de parcialidad mediante integración con CPS desde punto de cobro
    Cuando acredita pago de parcialidad mediante integración con CPS
    ...    ${MONTO_PAGO}    ${METODO_PAGO}    ${REFERENCIA_PAGO}

    # THEN: El sistema registra el pago y actualiza unpaidAmount y status de la parcialidad
    Entonces el sistema registra el pago y actualiza unpaidAmount y status de parcialidad

    # WHEN: Verifica actualización del estado del financiamiento tras acreditación de pago
    Cuando verifica actualización del estado del financiamiento tras pago

    # THEN: El sistema actualiza installmentStatus y elimina collectionProcessFlag si aplica
    Entonces el sistema actualiza installmentStatus y elimina collectionProcessFlag

    # WHEN: Ejecuta proceso de habilitación del equipo a través de las APIs de SITIC-Trustonic
    Cuando ejecuta proceso de habilitación del equipo mediante SITIC Trustonic
    ...    ${IMEI_EQUIPO}

    # THEN: El sistema envía notificación de habilitación y el equipo queda desbloqueado
    Entonces el sistema envía notificación de habilitación y el equipo queda desbloqueado
    ...    ${IMEI_EQUIPO}

    # WHEN: Consulta el estado final del equipo y del financiamiento
    Cuando consulta el estado final del equipo y del financiamiento
    ...    ${IMEI_EQUIPO}

    # THEN: El sistema muestra el equipo habilitado y el financiamiento con status actualizado
    Entonces el sistema muestra equipo habilitado y financiamiento con status actualizado

    [Teardown]    Y cierra la sesión del sistema BES
