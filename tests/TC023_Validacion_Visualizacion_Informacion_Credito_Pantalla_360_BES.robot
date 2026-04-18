*** Settings ***
Documentation    Caso de prueba ID 23: Validación de visualización de información de crédito en pantalla 360 BES
...              Proceso: Postventa
...              Aplicación: BES
...              Funcionalidad: Consulta de información de crédito
...              Escenario: Verificar la visualización completa de información del crédito en la
...              pantalla 360 de BES cuando se consulta un cliente con financiamiento activo
...
...              Precondiciones:
...              - Usuario autenticado con permisos de consulta
...              - Cliente con crédito activo en Amigo Paguitos migrado a BES
...              - Pantalla 360 BES configurada
...              - Servicios de consulta disponibles
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Medium

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con crédito activo
${NUMERO_TELEFONICO_360}        5598765432
${CUSTOMER_ID_ESPERADO}         CUS123456789
${IMEI_ESPERADO}                357890123456789

*** Test Cases ***
Validación De Visualización De Información De Crédito En Pantalla 360 BES
    [Documentation]    Este caso de prueba verifica la visualización completa de información del
    ...                crédito en la pantalla 360 de BES cuando se consulta un cliente con
    ...                financiamiento activo.
    ...
    ...                Pasos:
    ...                1. Ingresar a pantalla 360 de BES con número telefónico de cliente con crédito activo
    ...                2. Consultar la sección de información del crédito en la pantalla 360
    ...                3. Verificar desglose de cuotas con montos y fechas de vencimiento
    ...                4. Verificar información del equipo financiado (IMEI, modelo)
    ...                5. Consultar el historial de pagos realizados en la pantalla 360
    ...
    ...                Verificaciones:
    ...                - Sistema carga la pantalla 360 y muestra datos básicos del cliente
    ...                - Se visualizan datos del préstamo: monto, plazo, parcialidades, estatus
    ...                - Se despliega tabla con cuotas: número, monto, fecha, estatus de pago
    ...                - Se muestra correctamente IMEI y modelo del equipo asociado al crédito
    ...                - Se visualiza desglose de pagos con fechas, montos y métodos de pago
    [Tags]    PruebaGeneradaIA    Funcional    Postventa    Pantalla360    Medium

    # GIVEN: Usuario autenticado con permisos de consulta
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Ingresar a la pantalla 360 de BES con un número telefónico de cliente con crédito activo
    Cuando ingresa el número telefónico de un cliente con crédito Amigo Paguitos activo en la pantalla 360
    ...    ${NUMERO_TELEFONICO_360}

    # THEN: El sistema carga la pantalla 360 y muestra los datos básicos del cliente
    Entonces el sistema ejecuta la consulta hacia las APIs de BES para recuperar información del crédito
    Y se muestran los datos básicos del cliente en pantalla 360

    # WHEN: Consultar la sección de información del crédito en la pantalla 360
    Cuando consulta la sección de información del crédito en pantalla 360

    # THEN: Se visualizan datos del préstamo: monto total, plazo, número parcialidades, estatus
    Entonces se visualizan los datos del préstamo en pantalla 360
    Y la pantalla muestra totalCycle y totalAmount correspondientes al financiamiento
    Y se visualizan los campos type installmentStatus y subsidyStatus del crédito

    # WHEN: Verificar que se muestre el desglose de cuotas con montos y fechas de vencimiento
    Cuando verifica el desglose de cuotas en pantalla 360

    # THEN: Se despliega tabla con cuotas: número de cuota, monto, fecha de vencimiento, estatus
    Entonces se despliega tabla con todas las cuotas mostrando detalles completos

    # WHEN: Verificar que se visualice información del equipo financiado
    Cuando verifica la información del equipo financiado

    # THEN: Se muestra correctamente el IMEI y modelo del equipo asociado al crédito
    Entonces se muestra correctamente el IMEI del equipo asociado al crédito
    ...    ${IMEI_ESPERADO}

    # WHEN: Consultar el historial de pagos realizados en la pantalla 360
    Cuando consulta el historial de pagos en la pantalla 360

    # THEN: Se visualiza el desglose de todos los pagos realizados con fechas, montos y métodos
    Entonces se visualiza el desglose completo de pagos realizados en pantalla 360

    [Teardown]    Y cierra la sesión de la pantalla 360
