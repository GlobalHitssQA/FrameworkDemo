*** Settings ***
Documentation    Caso de prueba: Verificación de integración BES con CPS para pagos de enganche
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Integración BES-CPS
...              Escenario: Verificar que BES se integra correctamente con CPS para conocer los
...              pagos de enganche realizados por los distintos puntos de cobro
...
...              Precondiciones:
...              - Préstamo creado en BES
...              - Integración BES-CPS configurada
...              - Puntos de cobro (SICATEL, kioscos) operativos
...              - Usuario con préstamo activo
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Pago de enganche
${NUMERO_TELEFONICO}             5512345678
${MONTO_PAGO_ENGANCHE}           500.00

*** Test Cases ***
Verificación De Integración BES Con CPS Para Pagos De Enganche
    [Documentation]    Este caso de prueba verifica que BES se integra correctamente con CPS
    ...                para conocer los pagos de enganche realizados por los distintos puntos de
    ...                cobro. Valida que el pago de enganche se registre exitosamente en CPS/EPAC
    ...                cuando se realiza desde SICATEL, que BES consulte exitosamente a CPS y reciba
    ...                la información del pago de enganche realizado con el monto, fecha y punto de
    ...                cobro, que BES registre el pago de enganche y actualice el saldo del préstamo
    ...                mostrando el monto pagado y el saldo pendiente, que el pago de enganche se
    ...                registre exitosamente en CPS/EPAC cuando se realiza desde kiosco, y que BES
    ...                consulte a CPS, reciba la información del pago desde kiosco y actualice
    ...                correctamente el estado del préstamo.
    ...
    ...                Pasos:
    ...                1. Realizar un pago de enganche desde SICATEL
    ...                2. Ejecutar la consulta desde BES hacia CPS para obtener información del pago
    ...                3. Verificar que BES actualice el estado del préstamo con la información del pago recibido
    ...                4. Realizar un pago de enganche desde kiosco y verificar la integración
    [Tags]    PruebaGeneradaIA

    # Precondición: Préstamo creado en BES, Integración BES-CPS configurada

    # Step 1: Realizar un pago de enganche desde SICATEL para un préstamo de Amigo Paguitos
    Cuando realizo un pago de enganche desde SICATEL para un préstamo de Amigo Paguitos    ${NUMERO_TELEFONICO}    ${MONTO_PAGO_ENGANCHE}

    Entonces el pago de enganche se registra exitosamente en CPS EPAC

    # Step 2: Ejecutar la consulta desde BES hacia CPS para obtener la información del pago de enganche realizado
    Cuando BES consulta a CPS para obtener la información del pago de enganche realizado

    Entonces BES consulta exitosamente a CPS y recibe la información del pago de enganche

    # Step 3: Verificar que BES actualice el estado del préstamo con la información del pago de enganche recibido
    Entonces BES registra el pago de enganche y actualiza el saldo del préstamo

    # Step 4: Realizar un pago de enganche desde kiosco y verificar la integración
    Cuando realizo un pago de enganche desde kiosco    ${NUMERO_TELEFONICO}    ${MONTO_PAGO_ENGANCHE}

    Entonces BES recibe la información del pago desde kiosco y actualiza correctamente el préstamo

    [Teardown]    Entonces cerrar la sesión del navegador
