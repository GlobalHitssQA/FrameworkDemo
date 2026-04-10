*** Settings ***
Documentation     Test Case ID: 29
...               Título: Comprobar vigencia resultante al sumar paquetes con diferentes duraciones
...               Proceso: Venta
...               Aplicación: UPC
...               Funcionalidad: Suma de Paquetes Internet Amigo
...
...               Escenario: Verificar que al activar paquetes Internet Amigo con diferentes vigencias,
...               el sistema mantenga la vigencia del paquete de mayor duración
...
...               Tipo de Prueba: Funcional
...               Complejidad: Medium
...               Técnica ISTQB: Tabla de decisión

Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Finalizar Sesión

*** Variables ***
# Datos del test
${NUMERO_LINEA_TEST}          5512345678
${PAQUETE_VIGENCIA_MENOR}     PAQ_500MB_15D
${PAQUETE_VIGENCIA_MAYOR}     PAQ_2GB_60D

*** Test Cases ***
Comprobar Vigencia Resultante Al Sumar Paquetes Con Diferentes Duraciones
    [Documentation]    Verifica que al activar paquetes Internet Amigo con diferentes vigencias,
    ...                el sistema mantenga la vigencia del paquete de mayor duración
    [Tags]    PruebaGeneradaIA    SumaPaquetes    InternetAmigo    VigenciaMayor

    Given el usuario Amigo autenticado sin paquetes activos
    When activa un paquete Internet Amigo con vigencia menor y registra fecha de vencimiento
    And activa posteriormente un paquete Internet Amigo con vigencia mayor
    Then el sistema muestra la vigencia del paquete con mayor duración
    And el sistema muestra una única bolsa con la suma de MBs de ambos paquetes
    And el sistema mantiene los beneficios del paquete con mayores prestaciones
    And las plataformas muestran la vigencia del paquete de mayor duración

*** Keywords ***
El Usuario Amigo Autenticado Sin Paquetes Activos
    Iniciar Sesión En UPC
    El Usuario Está En El Módulo De Internet Amigo    ${NUMERO_LINEA_TEST}
    El Usuario No Tiene Paquetes Activos

Activa Un Paquete Internet Amigo Con Vigencia Menor Y Registra Fecha De Vencimiento
    El Sistema Activa El Paquete Menor    ${PAQUETE_VIGENCIA_MENOR}

Activa Posteriormente Un Paquete Internet Amigo Con Vigencia Mayor
    El Sistema Procesa La Activación Del Paquete Mayor    ${PAQUETE_VIGENCIA_MAYOR}

El Sistema Muestra La Vigencia Del Paquete Con Mayor Duración
    El Sistema Muestra La Vigencia Del Paquete Mayor

El Sistema Muestra Una Única Bolsa Con La Suma De MBs De Ambos Paquetes
    El Sistema Muestra Una Única Bolsa Con La Suma De MBs

El Sistema Mantiene Los Beneficios Del Paquete Con Mayores Prestaciones
    El Sistema Conserva Los Beneficios Del Paquete Mayor

Las Plataformas Muestran La Vigencia Del Paquete De Mayor Duración
    Las Plataformas Muestran La Vigencia Y Beneficios Del Paquete Mayor
