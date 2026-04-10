*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678
${PRIMER_PAQUETE}          PAQ_1GB_30D
${SEGUNDO_PAQUETE}         PAQ_2GB_60D

*** Test Cases ***
Validar Visualización De Una Sola Bolsa De Datos De Navegación Libre
    [Documentation]    Verifica que se muestra una única bolsa consolidada de datos de navegación libre
    ...                en las plataformas 360, MiTelcel y Claro Pay cuando existen múltiples
    ...                Paquetes Internet Amigo activos.
    ...                Caso ID: 4
    ...                Proceso: Consulta
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    [Tags]    PruebaGeneradaIA    Funcional    PaquetesInternetAmigo    BolsaConsolidada
    Given el usuario accede al módulo de Paquetes Internet Amigo con una línea prepago o mixta
    When activa dos o más Paquetes Internet Amigo
    Then se debe mostrar una sola bolsa consolidada de datos de navegación libre en todas las plataformas de consulta

*** Keywords ***
El Usuario Accede Al Módulo De Paquetes Internet Amigo Con Una Línea Prepago O Mixta
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Dos O Más Paquetes Internet Amigo
    Activar Múltiples Paquetes Internet Amigo    ${PRIMER_PAQUETE}    ${SEGUNDO_PAQUETE}

Se Debe Mostrar Una Sola Bolsa Consolidada De Datos De Navegación Libre En Todas Las Plataformas De Consulta
    Consultar Datos Disponibles En Plataformas
    Verificar Visualización De Una Sola Bolsa Consolidada
