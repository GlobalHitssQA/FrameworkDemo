*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA

*** Variables ***
${NUMERO_LINEA_VPNCC_PYME}    5512345678

*** Test Cases ***
Verificar Funcionamiento En VPN Cost Control PYME
    [Documentation]    ID: 16
    ...                Título: Verificar funcionamiento en VPN Cost Control PYME
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que las reglas de suma de datos y vigencias se aplican en usuarios VPN Cost Control PYME
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario VPN Cost Control PYME activo; Sistema UPC operativo;
    ...                Paquetes Internet Amigo configurados; Plataformas de consulta disponibles
    [Tags]    PruebaGeneradaIA    Provision    PaquetesInternetAmigo    UPC    Funcional    VPNCC_PYME
    Given el usuario está autenticado en UPC
    And se identifica un usuario VPN Cost Control PYME activo
    When se activa un Paquete Internet Amigo de 20 pesos en la línea VPNCC PYME
    And se activa un segundo Paquete Internet Amigo de 30 pesos
    Then el sistema suma los datos de ambos paquetes en una bolsa unificada
    And la vigencia corresponde al paquete de 30 pesos
    And se mantienen los beneficios del paquete con mayores beneficios
    And las plataformas muestran una sola bolsa de datos para navegación libre y RRSS
    [Teardown]    Cerrar Navegador

*** Keywords ***
El usuario está autenticado en UPC
    Iniciar Sesión En UPC

Se identifica un usuario VPN Cost Control PYME activo
    Identificar Usuario VPN Cost Control PYME    ${NUMERO_LINEA_VPNCC_PYME}

Se activa un Paquete Internet Amigo de 20 pesos en la línea VPNCC PYME
    Activar Paquete Internet Amigo 20 Pesos En Usuario VPNCC PYME

Se activa un segundo Paquete Internet Amigo de 30 pesos
    Activar Paquete Internet Amigo 30 Pesos En Usuario VPNCC PYME

El sistema suma los datos de ambos paquetes en una bolsa unificada
    Verificar Suma De Datos De Paquetes 20 Y 30 Pesos    2GB

La vigencia corresponde al paquete de 30 pesos
    Verificar Vigencia Corresponde Al Paquete De 30 Pesos    30 días

Se mantienen los beneficios del paquete con mayores beneficios
    Verificar Beneficios Del Paquete De 30 Pesos Activos

Las plataformas muestran una sola bolsa de datos para navegación libre y RRSS
    Verificar Bolsa Única En Plataformas De Consulta Para VPNCC PYME
