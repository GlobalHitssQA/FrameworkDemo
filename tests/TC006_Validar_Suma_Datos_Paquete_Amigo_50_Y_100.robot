*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678
${DATOS_ESPERADOS_SUMA}    150MB

*** Test Cases ***
Validar Suma De Datos Entre Paquete Internet Amigo 50 Y Paquete Internet Amigo 100
    [Documentation]    ID: 6
    ...                Título: Validar suma de datos entre Paquete Internet Amigo 50 y Paquete Internet Amigo 100
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    ...                Escenario: Verificar la suma de datos en usuarios prepago cuando se activan consecutivamente
    ...                el Paquete Internet Amigo 50 y el Paquete Internet Amigo 100
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario prepago autenticado; Línea activa sin paquetes Internet Amigo vigentes;
    ...                Saldo suficiente para activar ambos paquetes
    [Tags]    PruebaGeneradaIA    Venta    PaquetesInternetAmigo    UPC    Funcional
    Given el usuario prepago está en el módulo de Paquetes Internet Amigo
    When activa el Paquete Internet Amigo 50 sin paquetes activos previos
    And activa el Paquete Internet Amigo 100 antes de que venza el paquete 50
    Then el sistema muestra una sola bolsa con la suma de datos de ambos paquetes

*** Keywords ***
El Usuario Prepago Está En El Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa El Paquete Internet Amigo 50 Sin Paquetes Activos Previos
    Activar Paquete Amigo 50 En Línea Prepago

Activa El Paquete Internet Amigo 100 Antes De Que Venza El Paquete 50
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Amigo 100 En La Misma Línea

El Sistema Muestra Una Sola Bolsa Con La Suma De Datos De Ambos Paquetes
    Consultar Cantidad Total De Datos Disponibles
    Verificar Sistema Muestra Bolsa Única Con Datos Sumados
    Verificar Suma De Datos De Ambos Paquetes    ${DATOS_ESPERADOS_SUMA}
