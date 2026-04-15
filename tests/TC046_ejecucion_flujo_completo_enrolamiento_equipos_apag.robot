*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Enrolamiento de Equipos en AP.AG y transferencia de información hacia BES incluyendo integración con herramientas de bloqueo
    [Tags]    PruebaGeneradaIA    Enrolamiento    BES    Integral    Bloqueo
    [Documentation]    Verificar la ejecución completa del flujo de Enrolamiento de Equipos en Amigo Paguitos Autogestión (AP.AG)
    ...                y la transferencia de información hacia BES incluyendo la integración con herramientas de bloqueo.
    ...                El sistema debe permitir el registro del IMEI, marca, modelo y características técnicas del equipo,
    ...                validar que el IMEI sea válido y corresponda al equipo seleccionado, confirmar el registro del equipo
    ...                asociándolo al préstamo del cliente, completar el enrolamiento y preparar la información para su registro
    ...                en sistemas de bloqueo. Finalmente, se debe verificar que BES almacena la información del equipo asociada
    ...                al préstamo y que el equipo queda registrado en los sistemas de bloqueo SITIC-Trustonic y EIR para su
    ...                posterior administración en caso de incumplimiento de pagos.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Oferta aceptada en AP.AG; Equipo disponible en inventario; Conectividad entre AP.AG, BES y sistemas de bloqueo activa; APIs de SITIC-Trustonic configuradas
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha aceptado la oferta en Amigo Paguitos Autogestión y accede a la etapa de Enrolamiento de Equipos
    When el sistema muestra la pantalla para registrar la información del equipo a financiar
    And se ingresan los datos del equipo incluyendo IMEI marca modelo y características técnicas
    And el sistema valida que el IMEI sea válido y corresponda al equipo seleccionado
    And se registra el equipo en el sistema asociándolo al financiamiento
    And el sistema confirma el registro del equipo y lo asocia al préstamo del cliente
    And se completa el proceso de enrolamiento del equipo
    Then el sistema finaliza el enrolamiento y prepara la información para su registro en sistemas de bloqueo
    And se verifica que la información del equipo se transfiera correctamente a BES
    And BES almacena la información del equipo asociada al préstamo del cliente
    And se confirma la integración del equipo con las herramientas de bloqueo SITIC-Trustonic y EIR
    And el equipo queda registrado en los sistemas de bloqueo para su posterior administración en caso de incumplimiento de pagos

*** Keywords ***
El usuario ha aceptado la oferta en Amigo Paguitos Autogestión y accede a la etapa de Enrolamiento de Equipos
    El usuario ha aceptado la oferta en AP.AG y accede a etapa de enrolamiento    Juan Pérez    ABC123456

El sistema muestra la pantalla para registrar la información del equipo a financiar
    El sistema muestra la pantalla para registrar la información del equipo a financiar

Se ingresan los datos del equipo incluyendo IMEI marca modelo y características técnicas
    Se ingresan los datos del equipo IMEI marca modelo y características técnicas    123456789012345    Apple    iPhone 15 Pro    256GB, 5G, Dual SIM

El sistema valida que el IMEI sea válido y corresponda al equipo seleccionado
    El sistema valida que el IMEI sea válido y corresponda al equipo seleccionado    123456789012345    Apple    iPhone 15 Pro

Se registra el equipo en el sistema asociándolo al financiamiento
    Se registra el equipo asociándolo al financiamiento del cliente

El sistema confirma el registro del equipo y lo asocia al préstamo del cliente
    El sistema confirma el registro del equipo y lo asocia al préstamo del cliente

Se completa el proceso de enrolamiento del equipo
    Se completa el proceso de enrolamiento del equipo

El sistema finaliza el enrolamiento y prepara la información para su registro en sistemas de bloqueo
    El sistema finaliza el enrolamiento y prepara la información para registro en sistemas de bloqueo

Se verifica que la información del equipo se transfiera correctamente a BES
    Se transfiere la información del equipo a BES

BES almacena la información del equipo asociada al préstamo del cliente
    BES almacena la información del equipo asociada al préstamo del cliente    123456789012345    Apple    iPhone 15 Pro    256GB, 5G, Dual SIM    ABC123456

Se confirma la integración del equipo con las herramientas de bloqueo SITIC-Trustonic y EIR
    Se confirma la integración del equipo con las herramientas de bloqueo SITIC-Trustonic y EIR    123456789012345    Apple    iPhone 15 Pro    256GB, 5G, Dual SIM    ABC123456

El equipo queda registrado en los sistemas de bloqueo para su posterior administración en caso de incumplimiento de pagos
    El equipo queda registrado en los sistemas de bloqueo para su administración en caso de incumplimiento
