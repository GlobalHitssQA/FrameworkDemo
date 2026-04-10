*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678
${PAQUETE_VIGENCIA_MENOR}  PAQ_500MB_15D
${PAQUETE_VIGENCIA_MAYOR}  PAQ_2GB_60D
${VIGENCIA_ESPERADA}       60 días

*** Test Cases ***
Verificar Que Se Mantiene La Vigencia Del Paquete Más Grande Al Sumar Datos
    [Documentation]    Verifica que al activar múltiples Paquetes Internet Amigo con diferentes duraciones,
    ...                la vigencia resultante corresponde al paquete con mayor duración.
    ...                Caso ID: 2
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    [Tags]    PruebaGeneradaIA    Funcional    PaquetesInternetAmigo    Vigencia
    Given el usuario accede al módulo de Paquetes Internet Amigo con una línea prepago
    When activa un paquete con vigencia menor seguido de un paquete con vigencia mayor
    Then la vigencia de la bolsa de datos debe corresponder al paquete con mayor duración en todas las plataformas

*** Keywords ***
El Usuario Accede Al Módulo De Paquetes Internet Amigo Con Una Línea Prepago
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Un Paquete Con Vigencia Menor Seguido De Un Paquete Con Vigencia Mayor
    Activar Primer Paquete Con Vigencia Menor    ${PAQUETE_VIGENCIA_MENOR}
    Sleep    2s    # Esperar registro del sistema
    Activar Segundo Paquete Con Vigencia Mayor    ${PAQUETE_VIGENCIA_MAYOR}

La Vigencia De La Bolsa De Datos Debe Corresponder Al Paquete Con Mayor Duración En Todas Las Plataformas
    Consultar Vigencia En Plataformas
    Verificar Vigencia Corresponde Al Paquete Mayor En Todas Las Plataformas    ${VIGENCIA_ESPERADA}
