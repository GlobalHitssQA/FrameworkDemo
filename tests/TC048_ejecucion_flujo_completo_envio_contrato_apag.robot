*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Envío de Contrato en AP.AG y la formalización de la venta con transferencia completa de información hacia BES
    [Tags]    PruebaGeneradaIA    EnvioContrato    AmigoPaguitos    BES    Integral
    [Documentation]    Verificar la ejecución completa del flujo de Envío de Contrato en Amigo Paguitos Autogestión (AP.AG)
    ...                y la formalización de la venta con transferencia completa de información hacia BES. El usuario debe haber
    ...                confirmado previamente el Pago de Enganche. El sistema debe generar automáticamente el contrato de
    ...                financiamiento con toda la información del préstamo, cliente y equipo financiado. El contrato debe
    ...                mostrar de manera completa y legible todos los términos del financiamiento: monto, plazo, tasa de
    ...                interés y calendario de pagos. El usuario debe poder revisar el contrato, confirmar la aceptación
    ...                mediante firma digital y enviar el contrato al cliente mediante el canal especificado (correo
    ...                electrónico, SMS u otro). El sistema debe generar una confirmación de envío exitoso. Al finalizar
    ...                la formalización de la venta, toda la información del cliente, crédito, equipo financiado y
    ...                calendario de pagos debe transferirse completamente hacia BES mediante interfaces (APIs). BES debe
    ...                recibir toda la información necesaria para la administración del financiamiento y quedar como
    ...                sistema responsable de la vida del préstamo. BES debe habilitar las funcionalidades de gestión de
    ...                pagos, inhabilitación y habilitación de equipos según el calendario de cobranza establecido.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Pago de enganche confirmado; APIs de BES para creación de préstamo configuradas; Canales de envío de contrato disponibles; Integración completa entre AP.AG y BES activa
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha confirmado el pago de enganche y accede a etapa de Envío de Contrato en AP.AG
    When el sistema genera el contrato de financiamiento con toda la información del préstamo, cliente y equipo
    Then el sistema muestra el contrato completo y legible con toda la información correcta
    When se confirma la aceptación y firma del contrato
    Then el sistema registra la firma del contrato y finaliza el proceso de formalización
    When se envía el contrato al cliente mediante el canal especificado
    Then el sistema envía el contrato exitosamente y genera confirmación de envío
    When se formaliza la venta en AP.AG
    Then BES recibe completamente la información del cliente, crédito, equipo, calendario de pagos y toda la data necesaria
    And BES asume el control del préstamo y habilita las funcionalidades de gestión según calendario de cobranza

*** Keywords ***
El usuario ha confirmado el pago de enganche y accede a etapa de Envío de Contrato en AP.AG
    El usuario ha confirmado el pago de enganche y accede a etapa de Envío de Contrato en AP.AG    Juan Pérez    ABC123456    123456789012345    Apple    iPhone 15 Pro    256GB, 5G, Dual SIM

El sistema genera el contrato de financiamiento con toda la información del préstamo, cliente y equipo
    El sistema genera el contrato de financiamiento con toda la información del préstamo, cliente y equipo    50000    12    15.5    Juan Pérez    ABC123456    iPhone 15 Pro

El sistema muestra el contrato completo y legible con toda la información correcta
    El sistema muestra el contrato completo y legible con toda la información correcta    50000    12    15.5    Juan Pérez    ABC123456    iPhone 15 Pro

Se confirma la aceptación y firma del contrato
    Confirmar aceptación del contrato
    Firmar el contrato

El sistema registra la firma del contrato y finaliza el proceso de formalización
    El sistema registra la firma del contrato y finaliza el proceso de formalización

Se envía el contrato al cliente mediante el canal especificado
    Enviar contrato al cliente mediante canal especificado    email    ABC123456@telcel.com

El sistema envía el contrato exitosamente y genera confirmación de envío
    El sistema envía el contrato exitosamente y genera confirmación de envío    email    ABC123456@telcel.com

Se formaliza la venta en AP.AG
    Log    Venta formalizada en AP.AG con envío de contrato completo
    Sleep    2s

BES recibe completamente la información del cliente, crédito, equipo, calendario de pagos y toda la data necesaria
    BES recibe completamente la información del cliente, crédito, equipo, calendario de pagos y toda la data necesaria para administrar el financiamiento    ABC123456    Juan Pérez    Calle Principal 123    5551234567    50000    12    12    15.5    2026-04-15    123456789012345    Apple    iPhone 15 Pro

BES asume el control del préstamo y habilita las funcionalidades de gestión según calendario de cobranza
    BES asume el control del préstamo y habilita las funcionalidades de gestión de pagos, inhabilitación y habilitación de equipos según calendario de cobranza    ABC123456
