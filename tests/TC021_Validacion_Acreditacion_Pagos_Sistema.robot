*** Settings ***
Documentation    Caso de prueba ID 21: Validación de acreditación de pagos en el sistema
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Acreditación de pagos de parcialidades
...              Escenario: Verificar la acreditación de pagos de parcialidades desde puntos de cobro
...              en el sistema BES cuando se realizan pagos a través de SICATEL y kioscos
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Préstamo activo con parcialidades pendientes
...              - Integración BES-CPS configurada
...              - Punto de cobro SICATEL disponible
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Low

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con préstamo activo
${NUMERO_TELEFONICO_CLIENTE}    5512348765
${CUSTOMER_ID_PAGO}             CUS456789012
${IMEI_EQUIPO}                  351234567890123

# Datos de prueba - Pago desde SICATEL
${MONTO_PARCIALIDAD}            450.00
${METODO_PAGO}                  SICATEL
${REFERENCIA_SICATEL}           SICATEL-202604180945-456789

*** Test Cases ***
Validación De Acreditación De Pagos En El Sistema
    [Documentation]    Este caso de prueba verifica la acreditación de pagos de parcialidades
    ...                desde puntos de cobro en el sistema BES cuando se realizan pagos a través
    ...                de SICATEL y kioscos.
    ...
    ...                Pasos:
    ...                1. Realizar un pago de parcialidad desde SICATEL con número telefónico válido
    ...                2. Integrar BES con CPS para consultar el pago registrado de la parcialidad
    ...                3. Verificar en BES que el pago se acredite al préstamo correspondiente
    ...                4. Consultar el historial de pagos del cliente en la pantalla 360 de BES
    ...
    ...                Verificaciones:
    ...                - SICATEL acepta el pago y genera confirmación de transacción
    ...                - BES recibe la información del pago desde CPS correctamente
    ...                - Sistema BES actualiza el saldo del préstamo y marca parcialidad como pagada
    ...                - Se visualiza el pago acreditado con fecha, monto y método de pago correcto
    [Tags]    PruebaGeneradaIA    Funcional    Cobranza    AcreditacionPagos    Low

    # GIVEN: Usuario ha iniciado sesión en BES
    Dado que el usuario ha iniciado sesión en BES

    # AND: Navegar al módulo de cobranza y pagos
    Y navega al módulo de cobranza y pagos

    # WHEN: Realizar un pago de parcialidad desde SICATEL con número telefónico válido
    Cuando registra pago de parcialidad desde punto de cobro SICATEL
    ...    ${CUSTOMER_ID_PAGO}
    ...    ${MONTO_PARCIALIDAD}
    ...    ${METODO_PAGO}
    ...    ${REFERENCIA_SICATEL}

    # THEN: El sistema SICATEL acepta el pago y genera confirmación de transacción
    Entonces SICATEL procesa el pago y envía notificación de acreditación a BES

    # THEN: BES recibe la información del pago desde CPS correctamente
    Y BES recibe notificación de pago desde integración con CPS-EPAC

    # THEN: BES registra la transacción de pago con el monto, fecha y referencia del punto de cobro
    Y BES registra la transacción de pago con monto fecha y referencia
    ...    ${MONTO_PARCIALIDAD}
    ...    ${METODO_PAGO}

    # THEN: El sistema BES actualiza el saldo del préstamo y marca la parcialidad como pagada
    Y BES acredita el pago a la parcialidad correspondiente del crédito

    # AND: Verificar que saldo y estado fueron actualizados
    Y verifica que el saldo del préstamo fue actualizado tras el pago

    # WHEN: Navegar a pantalla 360 para consultar historial
    Y navega a la pantalla 360 de BES para consultar historial

    # AND: Ingresar número telefónico del cliente
    Y busca el cliente por número telefónico en pantalla 360
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: Se visualiza el pago acreditado con fecha, monto y método de pago correcto
    Entonces consulta el historial de pagos del crédito para verificar el registro completo
    ...    ${METODO_PAGO}
    ...    ${REFERENCIA_SICATEL}

    [Teardown]    Entonces cerrar la sesión del navegador
