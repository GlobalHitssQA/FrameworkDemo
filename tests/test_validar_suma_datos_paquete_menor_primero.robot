*** Settings ***
Documentation     Test Case ID: 27
...               Título: Validar suma de datos cuando se activa primero el paquete menor
...               Proceso: Venta
...               Aplicación: UPC
...               Funcionalidad: Suma de Paquetes Internet Amigo
...
...               Escenario: Verificar el comportamiento de suma de datos y actualización de vigencia
...               cuando se activa primero un paquete Internet Amigo menor y posteriormente uno mayor
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
${PAQUETE_MENOR}              PAQ_500MB_15D
${PAQUETE_MAYOR}              PAQ_2GB_60D
${VIGENCIA_ESPERADA}          60 días

*** Test Cases ***
Validar Suma De Datos Cuando Se Activa Primero El Paquete Menor
    [Documentation]    Verifica que al activar primero un paquete menor y luego uno mayor,
    ...                el sistema sume los MBs, actualice la vigencia al paquete mayor
    ...                y conserve los beneficios del paquete mayor en todas las plataformas
    [Tags]    PruebaGeneradaIA    SumaPaquetes    InternetAmigo    VigenciaMayor

    Given el usuario Amigo está autenticado en UPC sin paquetes activos
    When activa un paquete Internet Amigo de menor denominación
    And posteriormente activa un paquete Internet Amigo de mayor denominación
    Then el sistema muestra una única bolsa con la suma de MBs de ambos paquetes
    And el sistema actualiza la vigencia al paquete mayor recientemente activado
    And el sistema conserva los beneficios del paquete de mayor denominación
    And las plataformas de consulta muestran la vigencia y beneficios actualizados

*** Keywords ***
El Usuario Amigo Está Autenticado En UPC Sin Paquetes Activos
    Iniciar Sesión En UPC
    El Usuario Está En El Módulo De Internet Amigo    ${NUMERO_LINEA_TEST}
    El Usuario No Tiene Paquetes Activos

Activa Un Paquete Internet Amigo De Menor Denominación
    El Sistema Activa El Paquete Menor    ${PAQUETE_MENOR}

Posteriormente Activa Un Paquete Internet Amigo De Mayor Denominación
    El Sistema Procesa La Activación Del Paquete Mayor    ${PAQUETE_MAYOR}

El Sistema Muestra Una Única Bolsa Con La Suma De MBs De Ambos Paquetes
    El Sistema Muestra Una Única Bolsa Con La Suma De MBs

El Sistema Actualiza La Vigencia Al Paquete Mayor Recientemente Activado
    El Sistema Muestra La Vigencia Del Paquete Mayor

El Sistema Conserva Los Beneficios Del Paquete De Mayor Denominación
    El Sistema Conserva Los Beneficios Del Paquete Mayor

Las Plataformas De Consulta Muestran La Vigencia Y Beneficios Actualizados
    Las Plataformas Muestran La Vigencia Y Beneficios Del Paquete Mayor
