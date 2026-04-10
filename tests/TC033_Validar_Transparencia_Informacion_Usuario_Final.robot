*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Preparar Línea Con Dos Paquetes De Diferentes Montos
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_USUARIO}    5512345678
${USUARIO_PRUEBA}          testuser
${PASSWORD_PRUEBA}         testpass123

*** Test Cases ***
Validar Transparencia De Información Mostrada Al Usuario Final
    [Documentation]    ID: 33
    ...                Título: Validar transparencia de información mostrada al usuario final
    ...                Proceso: Consulta
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que la información de paquetes se muestra de forma transparente
    ...                y clara al usuario en todas las plataformas de consulta
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Usuario prepago autenticado; Acceso a plataformas 360, MiTelcel y Claro Pay;
    ...                Múltiples Paquetes Internet Amigo activos
    [Tags]    PruebaGeneradaIA    Consulta    Plataforma360    MiTelcel    ClaroPay    PaquetesInternetAmigo    Funcional
    Given se consulta el saldo y vigencia en plataforma 360
    Then se muestra una sola bolsa de datos unificada con la vigencia del paquete mayor y beneficios correspondientes en plataforma 360
    When se consulta el saldo y vigencia en aplicación MiTelcel
    Then se muestra la misma información unificada de forma clara en MiTelcel
    When se consulta el saldo y vigencia en Claro Pay
    Then se muestra consistentemente la misma información unificada en Claro Pay
    And se verifica que no se muestran bolsas separadas ni información confusa
    And la información es consistente transparente y muestra solo una bolsa unificada en todas las plataformas

*** Keywords ***
Preparar Línea Con Dos Paquetes De Diferentes Montos
    Iniciar Sesión En UPC    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_USUARIO}
    Activar Dos Paquetes Internet Amigo De Diferentes Montos    PAQ_AMIGO_50    PAQ_AMIGO_100
    Log    El sistema registra ambos paquetes y unifica los datos según las nuevas reglas

Se Consulta El Saldo Y Vigencia En Plataforma 360
    Consultar Información En Plataforma 360

Se Muestra Una Sola Bolsa De Datos Unificada Con La Vigencia Del Paquete Mayor Y Beneficios Correspondientes En Plataforma 360
    Verificar Información Transparente Y Clara En Plataforma 360
    Log    Plataforma 360 muestra una sola bolsa de datos unificada con la vigencia del paquete mayor y beneficios correspondientes

Se Consulta El Saldo Y Vigencia En Aplicación MiTelcel
    Consultar Información En Aplicación MiTelcel

Se Muestra La Misma Información Unificada De Forma Clara En MiTelcel
    Verificar Información Transparente Y Clara En MiTelcel
    Log    MiTelcel muestra la misma información unificada: total de MB, vigencia del paquete mayor y beneficios

Se Consulta El Saldo Y Vigencia En Claro Pay
    Consultar Información En Claro Pay

Se Muestra Consistentemente La Misma Información Unificada En Claro Pay
    Verificar Información Transparente Y Clara En Claro Pay
    Log    Claro Pay muestra consistentemente la misma información unificada en todas las plataformas

Se Verifica Que No Se Muestran Bolsas Separadas Ni Información Confusa
    Verificar No Se Muestran Bolsas Separadas Ni Información Confusa

La Información Es Consistente Transparente Y Muestra Solo Una Bolsa Unificada En Todas Las Plataformas
    Verificar Consistencia De Información Entre Plataformas
    Log    La información es consistente, transparente y muestra solo una bolsa unificada en todas las plataformas
