*** Settings ***
Documentation    Caso de prueba ID 37: Comprobar visualización de desglose de pagos en pantalla 360
...              Proceso: Consulta
...              Aplicación: BES
...              Funcionalidad: Pantalla 360 - Desglose de pagos
...              Escenario: Verificar la correcta visualización del historial y desglose de pagos
...              realizados al crédito Amigo Paguitos en la pantalla 360
...
...              Precondiciones:
...              - Cliente con historial de pagos en su crédito Amigo Paguitos
...              - Usuario autenticado con permisos de consulta
...              - Servicio ArService.QueryInvoice disponible
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con historial de pagos
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Comprobar Visualización De Desglose De Pagos En Pantalla 360
    [Documentation]    Este caso de prueba verifica la correcta visualización del historial
    ...                y desglose de pagos realizados al crédito Amigo Paguitos en la pantalla 360,
    ...                incluyendo desglose de rubros, montos, descuentos, impuestos, disputas y estatus.
    ...
    ...                Pasos:
    ...                1. Acceder a la pantalla 360 y consultar un cliente con pagos registrados en su crédito Amigo Paguitos
    ...                2. Verificar que se muestre el desglose de rubros del invoice (serviceCategory, chargeCodeGroup, chargeCode)
    ...                3. Verificar que se muestren los montos: cargo (chargeAmount), descuento (discountAmt) y saldo abierto (openAmount)
    ...                4. Verificar que se muestren los montos de impuestos: taxAmount, openTaxAmount, iVATaxAmount, openIVATaxAmount
    ...                5. Verificar que se muestre el monto en disputa (disputeAmount) y estatus de cada pago
    ...
    ...                Verificaciones:
    ...                - Sistema recupera historial de pagos mediante servicio ArService
    ...                - Pantalla despliega categorización detallada de cada concepto cobrado
    ...                - Se visualizan correctamente montos asociados a cada transacción de pago
    ...                - Pantalla muestra desglose completo de impuestos aplicados y pendientes
    ...                - Se despliegan importes disputados y estado actual de cada transacción
    [Tags]    PruebaGeneradaIA    Funcional    BES    Consulta    Pantalla360    Medium

    # GIVEN: Usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Accede a la pantalla 360 y consulta un cliente con pagos registrados en su crédito Amigo Paguitos
    Cuando accede a la pantalla 360 y consulta un cliente con pagos registrados en su crédito Amigo Paguitos
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema recupera el historial de pagos mediante el servicio ArService
    Entonces el sistema recupera el historial de pagos mediante el servicio ArService

    # WHEN: Verifica que se muestre el desglose de rubros del invoice (serviceCategory, chargeCodeGroup, chargeCode)
    Cuando verifica que se muestre el desglose de rubros del invoice serviceCategory chargeCodeGroup chargeCode

    # THEN: La pantalla despliega la categorización detallada de cada concepto cobrado
    Entonces la pantalla despliega la categorización detallada de cada concepto cobrado

    # WHEN: Verifica que se muestren los montos: cargo (chargeAmount), descuento (discountAmt) y saldo abierto (openAmount)
    Cuando verifica que se muestren los montos cargo chargeAmount descuento discountAmt y saldo abierto openAmount

    # THEN: Se visualizan correctamente todos los montos asociados a cada transacción de pago
    Entonces se visualizan correctamente todos los montos asociados a cada transacción de pago

    # WHEN: Verifica que se muestren los montos de impuestos: taxAmount, openTaxAmount, iVATaxAmount, openIVATaxAmount
    Cuando verifica que se muestren los montos de impuestos taxAmount openTaxAmount iVATaxAmount openIVATaxAmount

    # THEN: La pantalla muestra el desglose completo de impuestos aplicados y pendientes
    Entonces la pantalla muestra el desglose completo de impuestos aplicados y pendientes

    # WHEN: Verifica que se muestre el monto en disputa (disputeAmount) y estatus de cada pago
    Cuando verifica que se muestre el monto en disputa disputeAmount y estatus de cada pago

    # THEN: Se despliegan los importes disputados y el estado actual de cada transacción registrada
    Entonces se despliegan los importes disputados y el estado actual de cada transacción registrada

    [Teardown]    Y cierra la sesión de la pantalla 360
