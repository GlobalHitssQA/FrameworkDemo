*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que el sistema permita configurar plazo de 9 meses cuando el usuario ha sido validado y autorizado por Amigo Paguitos para este plazo
    [Tags]    PruebaGeneradaIA    BES    Préstamos    ConfiguraciónPlazos    IOSPR-868
    [Documentation]    Verificar que el sistema permita configurar plazo de 9 meses cuando el usuario ha sido validado
    ...                y autorizado por Amigo Paguitos para este plazo. El caso valida que el cliente tenga autorizado dicho plazo
    ...                según la evaluación crediticia de Amigo Paguitos, que el sistema acepte la configuración del plazo,
    ...                que se calculen correctamente el número de parcialidades según la periodicidad de pago seleccionada,
    ...                y que se genere el calendario de cobranza con las parcialidades distribuidas en 9 meses con fechas de
    ...                vencimiento correctamente calculadas.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario con permisos de creación de préstamos autenticado; Cliente validado en Amigo Paguitos
    ...                con plazo de 9 meses autorizado; Reglas de cálculo de parcialidades configuradas en BES
    ...                Historia de Usuario: IOSPR-868
    Given el usuario autenticado accede al módulo de creación de préstamos en BES
    When se selecciona un cliente previamente validado por Amigo Paguitos con plazo de 9 meses autorizado
    Then el sistema recupera la información del cliente y muestra los plazos autorizados según evaluación crediticia
    When se selecciona la opción de plazo a 9 meses en la configuración del préstamo
    Then el sistema valida y acepta el plazo de 9 meses como opción válida para el cliente
    When se completa la información del monto del equipo, periodicidad de pago y otros datos requeridos
    Then el sistema calcula el número de parcialidades y monto de cada pago según plazo de 9 meses
    When se finaliza la creación del préstamo y se genera el calendario de cobranza
    Then el sistema crea el préstamo con plazo de 9 meses y genera calendario con fechas de vencimiento distribuidas en 9 meses
    And se consulta el detalle del préstamo creado y se verifica que el plazo registrado sea de 9 meses y calendario de pagos correcto

*** Keywords ***
El usuario autenticado accede al módulo de creación de préstamos en BES
    El usuario autenticado accede al módulo de creación de préstamos en BES

Se selecciona un cliente previamente validado por Amigo Paguitos con plazo de 9 meses autorizado
    Seleccionar cliente validado por Amigo Paguitos con plazo de 9 meses autorizado    CLI901234

El sistema recupera la información del cliente y muestra los plazos autorizados según evaluación crediticia
    El sistema recupera información del cliente y perfil crediticio con plazo 9 meses aprobado

Se selecciona la opción de plazo a 9 meses en la configuración del préstamo
    Seleccionar plazo de 9 meses en formulario de configuración del préstamo

El sistema valida y acepta el plazo de 9 meses como opción válida para el cliente
    El sistema valida autorización de plazo 9 meses según evaluación de Amigo Paguitos

Se completa la información del monto del equipo, periodicidad de pago y otros datos requeridos
    [Arguments]    ${monto}=45000    ${periodicidad}=mensual
    Configurar periodicidad de pago y monto para préstamo con plazo 9 meses    ${monto}    ${periodicidad}

El sistema calcula el número de parcialidades y monto de cada pago según plazo de 9 meses
    [Arguments]    ${periodicidad}=mensual
    El sistema calcula automáticamente número de parcialidades para plazo 9 meses según periodicidad    ${periodicidad}

Se finaliza la creación del préstamo y se genera el calendario de cobranza
    [Arguments]    ${monto}=45000    ${periodicidad}=mensual
    Completar información del préstamo y guardar configuración con plazo 9 meses    ${monto}    ${periodicidad}

El sistema crea el préstamo con plazo de 9 meses y genera calendario con fechas de vencimiento distribuidas en 9 meses
    El sistema acepta plazo 9 meses y crea préstamo con calendario de pagos

Se consulta el detalle del préstamo creado y se verifica que el plazo registrado sea de 9 meses y calendario de pagos correcto
    [Arguments]    ${periodicidad}=mensual
    Verificar calendario de cobranza con parcialidades distribuidas en plazo 9 meses según periodicidad seleccionada    ${periodicidad}
    Verificar detalle del préstamo creado con plazo de 9 meses
