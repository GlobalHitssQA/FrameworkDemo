*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar soporte de múltiples préstamos por cliente según configuración de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    BES    AmigoPaguitos    Funcional    Configuración
    [Documentation]    Verificar que BES soporte múltiples préstamos por cliente de acuerdo a la configuración definida en Amigo Paguitos.
    ...                El sistema debe permitir configurar el número máximo de préstamos por cliente en Amigo Paguitos,
    ...                registrar el primer préstamo del cliente en BES, crear un segundo préstamo para el mismo cliente
    ...                validando que no excede el límite configurado, consultar en la pantalla 360 de BES todos los
    ...                préstamos activos del cliente con información completa (datos del préstamo, calendario de pagos,
    ...                estatus, equipos asociados), y rechazar correctamente cualquier intento de crear préstamos
    ...                adicionales que excedan el límite máximo configurado.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: BES integrado con Amigo Paguitos; Configuración de límite de préstamos por cliente definida;
    ...                Cliente registrado en el sistema; Usuario autenticado con permisos de venta; APIs de creación de préstamos operativas
    Given se ha configurado el límite de préstamos por cliente en Amigo Paguitos
    And el sistema ha registrado exitosamente la configuración del límite de préstamos
    When se crea el primer préstamo para el cliente a través de Amigo Paguitos
    Then BES recibe y almacena correctamente el primer préstamo del cliente
    When se inicia el proceso de creación del segundo préstamo para el mismo cliente
    And el sistema valida el límite configurado antes de aprobar el segundo préstamo
    And se completa exitosamente la formalización del segundo préstamo
    Then BES registra el segundo préstamo sin exceder el límite configurado
    When se consulta la información del cliente en la pantalla 360 de BES
    Then el sistema despliega todos los préstamos activos del cliente
    And cada préstamo muestra información individual completa incluyendo datos calendario estatus y equipos
    When se intenta crear un tercer préstamo que excedería el límite configurado
    Then el sistema rechaza la operación con mensaje de límite alcanzado

*** Keywords ***
Se ha configurado el límite de préstamos por cliente en Amigo Paguitos
    Se configura en Amigo Paguitos el número máximo de préstamos permitidos por cliente    2

El sistema ha registrado exitosamente la configuración del límite de préstamos
    El sistema registra la configuración del límite de préstamos simultáneos por cliente    2

Se crea el primer préstamo para el cliente a través de Amigo Paguitos
    Se crea un primer préstamo para un cliente a través del flujo de venta de Amigo Paguitos    Juan Pérez    Calle Principal 123    5551234567    ABC123456    15000    12    12    15.5    2026-04-15

BES recibe y almacena correctamente el primer préstamo del cliente
    BES recibe y registra el primer préstamo del cliente correctamente    ABC123456

Se inicia el proceso de creación del segundo préstamo para el mismo cliente
    Se inicia un segundo proceso de venta para el mismo cliente con el primer préstamo activo    ABC123456    20000    12    12    15.5    2026-04-15

El sistema valida el límite configurado antes de aprobar el segundo préstamo
    El sistema valida que el cliente tiene un préstamo activo y verifica si puede tener préstamos adicionales según la configuración

Se completa exitosamente la formalización del segundo préstamo
    Se completa la evaluación y formalización del segundo préstamo para el mismo cliente

BES registra el segundo préstamo sin exceder el límite configurado
    BES acepta y registra el segundo préstamo si no excede el límite configurado en Amigo Paguitos    ABC123456

Se consulta la información del cliente en la pantalla 360 de BES
    Se consulta en la pantalla 360 de BES la información del cliente    ABC123456

El sistema despliega todos los préstamos activos del cliente
    El sistema muestra todos los préstamos activos del cliente con su información individual    2

Cada préstamo muestra información individual completa incluyendo datos calendario estatus y equipos
    Se verifica que cada préstamo muestra datos del préstamo calendario de pagos estatus y equipos asociados    2

Se intenta crear un tercer préstamo que excedería el límite configurado
    Se intenta crear un préstamo adicional que exceda el límite configurado    ABC123456    25000    12    12    15.5    2026-04-15

El sistema rechaza la operación con mensaje de límite alcanzado
    El sistema rechaza la operación y muestra un mensaje indicando que se ha alcanzado el límite máximo de préstamos por cliente
