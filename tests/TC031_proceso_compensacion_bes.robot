*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar el proceso de compensación en BES cuando se gestionan préstamos de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    AdministracionCredito    BES    Compensacion    Funcional
    [Documentation]    Verificar el proceso de compensación en BES cuando se gestionan préstamos de Amigo Paguitos
    ...                en la Administración de Crédito. Se valida el acceso al módulo de compensación, la selección de préstamos
    ...                con movimientos pendientes, la ejecución del proceso, la actualización de saldos y la generación del reporte
    ...                de conciliación hacia BIBES según el layout definido.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES con permisos de compensación;
    ...                Préstamos de Amigo Paguitos activos en el sistema;
    ...                Movimientos pendientes de compensación registrados;
    ...                Conexión con BIBES disponible
    Given el usuario accede al módulo de compensación en BES con permisos autorizados
    When se selecciona un préstamo de Amigo Paguitos con movimientos pendientes de compensar
    And se ejecuta el proceso de compensación para el préstamo seleccionado
    Then el sistema procesa la compensación y actualiza los saldos correspondientes
    And los movimientos compensados se reflejan correctamente en el historial del préstamo
    And el sistema genera el reporte de conciliación de parcialidades hacia BIBES con el formato definido

*** Keywords ***
El usuario accede al módulo de compensación en BES con permisos autorizados
    Iniciar sesión en el sistema
    Acceder al módulo de compensación en BES
    Verificar que se muestra la pantalla de gestión de compensación

Se selecciona un préstamo de Amigo Paguitos con movimientos pendientes de compensar
    Buscar préstamo con movimientos pendientes de compensación    PREST123456
    Verificar que el préstamo tiene movimientos pendientes de compensación
    Seleccionar préstamo para compensación    PREST123456

Se ejecuta el proceso de compensación para el préstamo seleccionado
    Ejecutar proceso de compensación del préstamo
    Verificar que el proceso de compensación se ejecuta correctamente

El sistema procesa la compensación y actualiza los saldos correspondientes
    Verificar actualización de saldos después de compensación    PREST123456
    Verificar que los saldos fueron actualizados correctamente

Los movimientos compensados se reflejan correctamente en el historial del préstamo
    Consultar historial de movimientos del préstamo compensado    PREST123456
    Verificar movimientos compensados en historial con fecha monto y estatus    PREST123456    2026-04-15    Compensado

El sistema genera el reporte de conciliación de parcialidades hacia BIBES con el formato definido
    Verificar generación de reporte de conciliación hacia BIBES para compensación    PREST123456
    Verificar formato del reporte de conciliación según layout definido para compensación
    Verificar transmisión del reporte de compensación hacia BIBES
