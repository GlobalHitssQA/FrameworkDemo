*** Settings ***
Documentation    Caso de prueba: Comprobar registro de pagos de parcialidades desde SICATEL
...              Proceso: Cobranza
...              Aplicación: SICATEL
...              Funcionalidad: Registro de pagos de parcialidades
...              Escenario: Verificar el registro de pagos de parcialidades realizados desde
...              el sistema SICATEL cuando un cliente realiza un pago de su crédito Amigo Paguitos
...
...              Precondiciones:
...              - Usuario con permisos de cobranza autenticado en SICATEL
...              - Cliente con crédito activo de Amigo Paguitos registrado en BES
...              - Conexión disponible entre SICATEL y BES
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Medium

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}     5512345678

# Datos de pago de parcialidad
${MONTO_PAGO_PARCIALIDAD}        500.00

*** Test Cases ***
Comprobar Registro De Pagos De Parcialidades Desde SICATEL
    [Documentation]    Este caso de prueba verifica que desde el sistema SICATEL
    ...                se puede registrar exitosamente un pago de parcialidad de un
    ...                crédito Amigo Paguitos y que el sistema actualiza correctamente
    ...                el saldo pendiente del crédito.
    ...
    ...                Flujo del proceso:
    ...                1. Usuario de SICATEL accede al sistema con credenciales válidas
    ...                2. Ingresa el número telefónico del cliente con crédito activo
    ...                3. Sistema recupera y muestra información del cliente y crédito
    ...                4. Selecciona la opción de registro de pago de parcialidad
    ...                5. Sistema muestra formulario de captura con datos del préstamo
    ...                6. Ingresa el monto del pago correspondiente a la parcialidad
    ...                7. Sistema valida el monto ingresado contra el monto de la cuota
    ...                8. Confirma el registro del pago de la parcialidad
    ...                9. Sistema registra el pago y actualiza el saldo pendiente
    ...
    ...                Verificaciones:
    ...                - Login exitoso en SICATEL con credenciales válidas
    ...                - Recuperación correcta de información del cliente y crédito
    ...                - Visualización del formulario de captura de pago
    ...                - Validación del monto ingresado contra monto de cuota
    ...                - Registro exitoso del pago de parcialidad
    ...                - Actualización del saldo pendiente del crédito
    [Tags]    PruebaGeneradaIA    Funcional    SICATEL    Cobranza    RegistroPagos

    # GIVEN: Usuario accede a SICATEL con credenciales válidas
    Dado que el usuario ha iniciado sesión en SICATEL con credenciales válidas

    # WHEN: Ingresa el número telefónico del cliente con crédito activo
    Cuando ingresa el número telefónico del cliente con crédito activo de Amigo Paguitos
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: Sistema recupera y muestra información del cliente y su crédito
    Entonces el sistema recupera y muestra la información del cliente y su crédito asociado

    # WHEN: Selecciona opción de registro de pago de parcialidad
    Cuando selecciona la opción de registro de pago de parcialidad

    # THEN: Sistema muestra formulario de captura de pago
    Entonces el sistema muestra el formulario de captura de pago con los datos del préstamo

    # WHEN: Ingresa el monto del pago correspondiente a la parcialidad
    Cuando ingresa el monto del pago correspondiente a la parcialidad
    ...    ${MONTO_PAGO_PARCIALIDAD}

    # THEN: Sistema valida el monto ingresado contra el monto de la cuota
    Entonces el sistema valida el monto ingresado contra el monto de la cuota

    # WHEN: Confirma el registro del pago de la parcialidad
    Cuando confirma el registro del pago de la parcialidad

    # THEN: Sistema registra el pago exitosamente y actualiza el saldo pendiente
    Entonces el sistema registra el pago exitosamente y actualiza el saldo pendiente del crédito

    [Teardown]    Y cierra la sesión en SICATEL
