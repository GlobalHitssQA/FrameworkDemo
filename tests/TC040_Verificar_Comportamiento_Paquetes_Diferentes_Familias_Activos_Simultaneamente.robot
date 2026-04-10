*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345690

*** Test Cases ***
Verificar Comportamiento Con Paquetes De Diferentes Familias Activos Simultáneamente
    [Documentation]    ID: 40
    ...                Título: Verificar comportamiento con paquetes de diferentes familias activos simultáneamente
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar el comportamiento del sistema cuando hay Paquetes Internet Amigo
    ...                junto con paquetes de otras familias activos simultáneamente
    ...                Tipo de Prueba: Integral
    ...                Complejidad: high
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Usuario prepago autenticado; Paquetes de diferentes familias disponibles
    ...                (Sin Límite, Internet Amigo); Sistema UPC disponible
    [Tags]    PruebaGeneradaIA    Postventa    UPC    PaquetesInternetAmigo    PaquetesSinLimite    Integral    DiferentesFamilias
    Given se activa un Paquete Sin Límite en una línea prepago
    When se activa un Paquete Internet Amigo de 100 pesos en la misma línea
    Then ambas familias de paquetes coexisten sin conflictos
    When se activa un segundo Paquete Internet Amigo de 50 pesos
    Then los Paquetes Internet Amigo se suman entre sí sin afectar el Paquete Sin Límite
    When se consultan las plataformas para visualización de paquetes
    Then los paquetes se muestran claramente separados por familia
    When se realiza consumo de datos
    Then el orden de débito entre familias se mantiene sin alteraciones

*** Keywords ***
Se Activa Un Paquete Sin Límite En Una Línea Prepago
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}
    Activar Paquete Sin Limite En Linea Prepago
    Verificar Paquete Sin Limite Registrado Con Reglas Propias

Se Activa Un Paquete Internet Amigo De 100 Pesos En La Misma Línea
    Activar Paquete Internet Amigo En Misma Linea    PAQ_AMIGO_100
    Verificar Paquete Internet Amigo Registrado Sin Interferir Con Sin Limite

Ambas Familias De Paquetes Coexisten Sin Conflictos
    Verificar Coexistencia De Familias Sin Conflictos

Se Activa Un Segundo Paquete Internet Amigo De 50 Pesos
    Activar Segundo Paquete Internet Amigo En Misma Familia    PAQ_AMIGO_50

Los Paquetes Internet Amigo Se Suman Entre Sí Sin Afectar El Paquete Sin Límite
    Verificar Suma De Paquetes Internet Amigo Sin Afectar Sin Limite

Se Consultan Las Plataformas Para Visualización De Paquetes
    Actualizar Consulta De Vigencia

Los Paquetes Se Muestran Claramente Separados Por Familia
    Verificar Separacion Visual De Familias En Plataformas

Se Realiza Consumo De Datos
    Realizar Consumo De Datos Del Usuario    50

El Orden De Débito Entre Familias Se Mantiene Sin Alteraciones
    Verificar Orden Debito Entre Familias Sin Alteraciones
