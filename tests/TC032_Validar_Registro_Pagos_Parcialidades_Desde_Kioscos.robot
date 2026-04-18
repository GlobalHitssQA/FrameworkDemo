*** Settings ***
Documentation    Caso de prueba: Validar registro de pagos de parcialidades desde Kioscos
...              Proceso: Cobranza
...              Aplicación: Kioscos
...              Funcionalidad: Registro de pagos de parcialidades
...              Escenario: Verificar el registro de pagos de parcialidades realizados desde
...              Kioscos de autoservicio cuando un cliente paga su crédito Amigo Paguitos
...
...              Precondiciones:
...              - Kiosco en operación con conexión a BES
...              - Cliente con crédito activo de Amigo Paguitos
...              - Integración entre Kioscos y CPS configurada
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Medium

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}     5512345678

# Datos de prueba - Método de pago
${TIPO_TARJETA}                  credito
${NUMERO_TARJETA}                4152313541234567

*** Test Cases ***
Validar Registro De Pagos De Parcialidades Desde Kioscos
    [Documentation]    Este caso de prueba verifica que desde el Kiosco de autoservicio
    ...                se puede registrar exitosamente un pago de parcialidad de un
    ...                crédito Amigo Paguitos y que el sistema actualiza correctamente
    ...                el saldo en BES.
    ...
    ...                Flujo del proceso:
    ...                1. Cliente accede al kiosco y selecciona opción de pago Amigo Paguitos
    ...                2. Kiosco muestra pantalla de captura de número telefónico
    ...                3. Cliente ingresa su número telefónico asociado al crédito
    ...                4. Sistema recupera información del crédito y muestra saldo y próxima parcialidad
    ...                5. Cliente selecciona método de pago (tarjeta crédito/débito)
    ...                6. Kiosco activa lector de tarjetas y solicita insertar tarjeta
    ...                7. Cliente realiza pago mediante tarjeta
    ...                8. Sistema procesa pago y genera comprobante de transacción
    ...                9. BES registra el pago, acredita monto y actualiza saldo del crédito
    ...
    ...                Verificaciones:
    ...                - Kiosco muestra pantalla de captura de número telefónico correctamente
    ...                - Sistema recupera información del crédito con saldo y parcialidad
    ...                - Kiosco activa lector de tarjetas al seleccionar método de pago
    ...                - Sistema procesa pago y genera comprobante
    ...                - BES registra pago y actualiza estado del crédito
    [Tags]    PruebaGeneradaIA    Funcional    Kioscos    Cobranza    RegistroPagos

    # GIVEN: Cliente accede al kiosco y selecciona opción de pago
    Dado que el cliente accede al kiosco de autoservicio

    # WHEN: Selecciona la opción de pago de crédito Amigo Paguitos
    Cuando selecciona la opción de pago de crédito Amigo Paguitos

    # THEN: Kiosco muestra pantalla de captura de número telefónico
    Entonces el kiosco muestra la pantalla de captura de número telefónico

    # WHEN: Ingresa el número telefónico asociado al crédito
    Cuando ingresa el número telefónico asociado al crédito de Amigo Paguitos
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: Sistema recupera información y muestra saldo y próxima parcialidad
    Entonces el sistema recupera la información del crédito y muestra el saldo pendiente y próxima parcialidad

    # WHEN: Selecciona el método de pago
    Cuando selecciona el método de pago tarjeta de crédito o débito
    ...    ${TIPO_TARJETA}

    # THEN: Kiosco activa el lector de tarjetas
    Entonces el kiosco activa el lector de tarjetas y solicita insertar la tarjeta

    # WHEN: Realiza el pago mediante tarjeta
    Cuando realiza el pago de la parcialidad mediante tarjeta

    # THEN: Sistema procesa el pago y genera comprobante
    Entonces el sistema procesa el pago y genera el comprobante de transacción

    # THEN: BES registra el pago y actualiza el estado del crédito
    Y el pago se registra en BES y actualiza el estado del crédito

    [Teardown]    Y cierra la sesión en el kiosco
