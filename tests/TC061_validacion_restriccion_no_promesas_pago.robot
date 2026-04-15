*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que el sistema BES no permita promesas de pago en financiamientos de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    BES    AmigoPaguitos    PromesasDePago    RestricciónPromesas    Funcional
    [Documentation]    Verificar que el sistema BES no permita promesas de pago en financiamientos de Amigo Paguitos.
    ...                El sistema debe restringir la funcionalidad de promesas de pago para este tipo de financiamiento,
    ...                mostrando mensaje indicando que no se permiten promesas de pago para Amigo Paguitos y manteniendo
    ...                la restricción independientemente del estado del préstamo (activo, vigente, vencido, etc.).
    ...                Técnica ISTQB: Casos de error
    ...                Complejidad: Baja
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES; Préstamo de Amigo Paguitos existente en el sistema;
    ...                Configuración de reglas de negocio activa
    ...                Proceso: Gestión de Crédito
    ...                Aplicación: BES
    ...                Funcionalidad: Administración de Financiamientos Amigo Paguitos
    Given el usuario ha accedido al módulo de administración de préstamos en BES con un préstamo activo de Amigo Paguitos
    Then el sistema muestra la información del préstamo de Amigo Paguitos
    When se intenta registrar una promesa de pago para el préstamo de Amigo Paguitos
    Then el sistema muestra mensaje indicando que no se permiten promesas de pago para este tipo de financiamiento
    When se verifica que la restricción aplica para todos los estados del préstamo    Activo    Vigente    Vencido
    Then el sistema mantiene la restricción independientemente del estado del préstamo
