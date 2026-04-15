*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Pago de Enganche en AP.AG con integración a CPS y puntos de cobro disponibles
    [Tags]    PruebaGeneradaIA    PagoEnganche    AmigoPaguitos    CPS    Integral
    [Documentation]    Verificar la ejecución completa del flujo de Pago de Enganche en Amigo Paguitos Autogestión (AP.AG)
    ...                con integración a CPS y puntos de cobro disponibles. El sistema debe mostrar el monto del enganche requerido
    ...                y las opciones de pago disponibles. El usuario debe poder seleccionar el método de pago (Kiosco con TDC, OXXO,
    ...                SICATEL u otro punto de cobro disponible), realizar el pago a través del punto de cobro seleccionado y obtener
    ...                confirmación de la transacción. CPS debe registrar correctamente el pago del enganche y BES debe integrarse con
    ...                CPS para conocer el pago del enganche realizado y asociarlo al préstamo correspondiente. Finalmente, AP.AG debe
    ...                habilitar la siguiente etapa del flujo tras recibir confirmación del pago desde BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Enrolamiento de equipo completado; Puntos de cobro SICATEL y Kioscos disponibles; Integración entre BES y CPS activa; Métodos de pago configurados
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha completado el enrolamiento de equipos y accede a la etapa de Pago de Enganche en AP.AG
    When el sistema muestra el monto del enganche requerido y las opciones de pago disponibles
    And se selecciona el método de pago del enganche mediante punto de cobro disponible
    And se realiza el pago del enganche a través del punto de cobro seleccionado
    Then el punto de cobro procesa el pago y genera la confirmación de la transacción
    And CPS registra correctamente el pago del enganche asociado al financiamiento
    And BES se integra con CPS para conocer el pago del enganche realizado
    And BES asocia el pago del enganche al préstamo correspondiente
    And AP.AG habilita la siguiente etapa del flujo tras recibir confirmación del pago desde BES

*** Keywords ***
El usuario ha completado el enrolamiento de equipos y accede a la etapa de Pago de Enganche en AP.AG
    El usuario ha completado el enrolamiento de equipos y accede a etapa de pago de enganche    Juan Pérez    ABC123456    123456789012345    Apple    iPhone 15 Pro    256GB, 5G, Dual SIM

El sistema muestra el monto del enganche requerido y las opciones de pago disponibles
    El sistema muestra el monto del enganche requerido y opciones de pago disponibles    5000

Se selecciona el método de pago del enganche mediante punto de cobro disponible
    Se selecciona el método de pago del enganche mediante punto de cobro    Kiosco con TDC

Se realiza el pago del enganche a través del punto de cobro seleccionado
    Se realiza el pago del enganche a través del punto de cobro Kioscos    PREST123456    5000    ABC123456    4111111111111111    123    12/28

El punto de cobro procesa el pago y genera la confirmación de la transacción
    El punto de cobro procesa el pago y genera confirmación de la transacción

CPS registra correctamente el pago del enganche asociado al financiamiento
    CPS registra correctamente el pago del enganche asociado al préstamo    5000    PREST123456    ABC123456

BES se integra con CPS para conocer el pago del enganche realizado
    BES se integra con CPS para conocer el pago del enganche realizado    PREST123456

BES asocia el pago del enganche al préstamo correspondiente
    BES asocia el pago del enganche al préstamo correspondiente    PREST123456    5000

AP.AG habilita la siguiente etapa del flujo tras recibir confirmación del pago desde BES
    AP.AG habilita la siguiente etapa del flujo tras confirmación del pago desde BES
