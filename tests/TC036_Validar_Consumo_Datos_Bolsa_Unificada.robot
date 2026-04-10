*** Settings ***
Documentation     Test Case ID: 36
...               Título: Validar consumo de datos desde la bolsa unificada
...               Proceso: Postventa
...               Aplicación: UPC
...               Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
...
...               Escenario: Verificar que el consumo de datos se realiza correctamente desde la bolsa unificada
...               cuando hay múltiples Paquetes Internet Amigo activos
...
...               Tipo de Prueba: Funcional
...               Complejidad: Medium
...               Técnica ISTQB: Casos de uso

Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_TEST}          5512345678
${PAQUETE_50_PESOS}           PAQ_AMIGO_50
${PAQUETE_100_PESOS}          PAQ_AMIGO_100
${MB_ESPERADOS_INICIAL}       1500
${MB_ESPERADOS_PASO_2}        1300
${MB_ESPERADOS_PASO_4}        800
${CONSUMO_PASO_2}             200
${CONSUMO_PASO_4}             500

*** Test Cases ***
Validar Consumo De Datos Desde La Bolsa Unificada
    [Documentation]    Verifica que el consumo de datos se realiza correctamente desde la bolsa unificada
    ...                cuando hay múltiples Paquetes Internet Amigo activos, sin crear múltiples débitos
    ...                en bolsas independientes
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    ConsumoDatos    BolsaUnificada

    Given el usuario prepago accede al módulo de Paquetes Internet Amigo
    When activa dos Paquetes Internet Amigo de 50 pesos y 100 pesos para tener bolsa unificada de 1500 MB
    Then el sistema crea una bolsa unificada con 1500 MB totales
    When realiza consumo de datos de navegación libre por 200 MB
    Then el sistema descuenta 200 MB de la bolsa unificada quedando 1300 MB disponibles
    When consulta el saldo restante en plataformas de consulta
    Then se muestra 1300 MB disponibles en la bolsa unificada
    When realiza consumo adicional de 500 MB de datos
    Then el sistema descuenta 500 MB de la bolsa unificada quedando 800 MB disponibles
    And verifica que el consumo no se realiza de bolsas independientes sino de una sola bolsa unificada

*** Keywords ***
El Usuario Prepago Accede Al Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_TEST}
    Log    Usuario prepago accede al módulo de Paquetes Internet Amigo con línea ${NUMERO_LINEA_TEST}

Activa Dos Paquetes Internet Amigo De 50 Pesos Y 100 Pesos Para Tener Bolsa Unificada De 1500 MB
    Activar Paquete Amigo 50 En Línea Prepago
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Amigo 100 En La Misma Línea
    Sleep    2s    # Esperar consolidación de bolsa
    Log    Se activaron Paquete de $50 (500 MB) y Paquete de $100 (1000 MB) para totalizar 1500 MB

El Sistema Crea Una Bolsa Unificada Con 1500 MB Totales
    Consultar Cantidad Total De Datos Disponibles
    Verificar Suma De Datos De Ambos Paquetes    ${MB_ESPERADOS_INICIAL}
    Verificar Sistema Muestra Bolsa Única Con Datos Sumados
    Log    El sistema creó correctamente una bolsa unificada con ${MB_ESPERADOS_INICIAL} MB totales

Realiza Consumo De Datos De Navegación Libre Por 200 MB
    Realizar Consumo De Datos De La Bolsa Unificada    ${CONSUMO_PASO_2}
    Log    Se realizó consumo de ${CONSUMO_PASO_2} MB de datos de navegación libre

El Sistema Descuenta 200 MB De La Bolsa Unificada Quedando 1300 MB Disponibles
    Verificar Datos Restantes En Bolsa Unificada    ${MB_ESPERADOS_PASO_2}
    Log    El sistema descontó ${CONSUMO_PASO_2} MB correctamente, quedan ${MB_ESPERADOS_PASO_2} MB disponibles

Consulta El Saldo Restante En Plataformas De Consulta
    Consultar Cantidad Total De Datos Disponibles
    Log    Consultando saldo restante en plataformas de consulta

Se Muestra 1300 MB Disponibles En La Bolsa Unificada
    Verificar Datos Restantes Consistentes En Todas Las Plataformas    ${MB_ESPERADOS_PASO_2}
    Log    Las plataformas muestran ${MB_ESPERADOS_PASO_2} MB disponibles en la bolsa unificada

Realiza Consumo Adicional De 500 MB De Datos
    Realizar Consumo De Datos De La Bolsa Unificada    ${CONSUMO_PASO_4}
    Log    Se realizó consumo adicional de ${CONSUMO_PASO_4} MB de datos

El Sistema Descuenta 500 MB De La Bolsa Unificada Quedando 800 MB Disponibles
    Verificar Datos Restantes En Bolsa Unificada    ${MB_ESPERADOS_PASO_4}
    Log    El sistema descontó ${CONSUMO_PASO_4} MB correctamente, quedan ${MB_ESPERADOS_PASO_4} MB disponibles

Verifica Que El Consumo No Se Realiza De Bolsas Independientes Sino De Una Sola Bolsa Unificada
    Verificar Consumo Desde Bolsa Única Sin Débitos Múltiples
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Log    Se confirma que todo el consumo se descuenta de una sola bolsa unificada sin crear múltiples débitos
