*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}      5512345678
${PAQUETE_ESTANDAR}          PAQ_1GB_ESTANDAR
${PAQUETE_PREMIUM_RRSS}      PAQ_2GB_RRSS
${BENEFICIO_ESPERADO}        Redes Sociales Ilimitadas

*** Test Cases ***
Comprobar Que Se Conservan Los Beneficios Del Paquete Con Mayores Ventajas Al Sumar
    [Documentation]    Verifica que se mantienen los beneficios de mayor valor en usuarios prepago
    ...                cuando se activan paquetes Internet Amigo con diferentes beneficios.
    ...                El sistema debe aplicar los beneficios del paquete con mayores ventajas
    ...                (ejemplo: redes sociales ilimitadas) a la bolsa de datos sumados.
    ...                Caso ID: 3
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    ...                Técnica ISTQB: Tabla de decisión
    [Tags]    PruebaGeneradaIA    Funcional    PaquetesInternetAmigo    Beneficios
    Given el usuario prepago tiene acceso al módulo de Paquetes Internet Amigo
    When activa un paquete con beneficios estándar seguido de un paquete con mayores beneficios
    Then los beneficios del paquete con mayores ventajas deben estar activos en la línea

*** Keywords ***
El Usuario Prepago Tiene Acceso Al Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Un Paquete Con Beneficios Estándar Seguido De Un Paquete Con Mayores Beneficios
    Activar Paquete Estándar    ${PAQUETE_ESTANDAR}
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Premium Con Beneficios Mayores    ${PAQUETE_PREMIUM_RRSS}

Los Beneficios Del Paquete Con Mayores Ventajas Deben Estar Activos En La Línea
    Consultar Beneficios De La Línea
    Verificar Redes Sociales Ilimitadas Disponibles
    Verificar Que Los Beneficios Del Paquete Mayor Se Conservan    ${BENEFICIO_ESPERADO}
