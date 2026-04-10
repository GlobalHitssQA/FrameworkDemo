*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA

*** Variables ***
${NUMERO_LINEA_VPNCC_CORPORATIVO}    5598765432

*** Test Cases ***
Comprobar Funcionamiento En VPN Cost Control CORPORATIVO
    [Documentation]    ID: 17
    ...                Título: Comprobar funcionamiento en VPN Cost Control CORPORATIVO
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que las reglas de suma de datos y vigencias funcionan en usuarios VPN Cost Control CORPORATIVO
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario VPN Cost Control CORPORATIVO activo; Sistema UPC disponible;
    ...                Paquetes Internet Amigo disponibles; Plataformas de consulta operativas
    [Tags]    PruebaGeneradaIA    Provision    PaquetesInternetAmigo    UPC    Funcional    VPNCC_CORPORATIVO
    Given el usuario está autenticado en UPC
    And el sistema identifica un usuario VPN Cost Control CORPORATIVO activo
    When se activa un Paquete Internet Amigo de 50 pesos en la línea VPNCC CORPORATIVO
    And se activa un segundo Paquete Internet Amigo de 100 pesos
    Then el sistema suma automáticamente los datos de ambos paquetes
    And la vigencia mostrada corresponde al paquete de 100 pesos
    And los beneficios activos son los del paquete con mayores beneficios
    And las plataformas muestran una sola bolsa unificada para navegación y RRSS
    [Teardown]    Cerrar Navegador

*** Keywords ***
El usuario está autenticado en UPC
    Iniciar Sesión En UPC

El sistema identifica un usuario VPN Cost Control CORPORATIVO activo
    Identificar Usuario VPN Cost Control CORPORATIVO    ${NUMERO_LINEA_VPNCC_CORPORATIVO}

Se activa un Paquete Internet Amigo de 50 pesos en la línea VPNCC CORPORATIVO
    Activar Paquete Internet Amigo 50 Pesos En Usuario VPNCC CORPORATIVO

Se activa un segundo Paquete Internet Amigo de 100 pesos
    Activar Paquete Internet Amigo 100 Pesos En Usuario VPNCC CORPORATIVO

El sistema suma automáticamente los datos de ambos paquetes
    Verificar Suma De Datos De Paquetes 50 Y 100 Pesos    3GB

La vigencia mostrada corresponde al paquete de 100 pesos
    Verificar Vigencia Corresponde Al Paquete De 100 Pesos En Todas Las Plataformas    60 días

Los beneficios activos son los del paquete con mayores beneficios
    Verificar Beneficios Del Paquete De 100 Pesos Activos

Las plataformas muestran una sola bolsa unificada para navegación y RRSS
    Verificar Bolsa Única En Plataformas De Consulta Para VPNCC CORPORATIVO
