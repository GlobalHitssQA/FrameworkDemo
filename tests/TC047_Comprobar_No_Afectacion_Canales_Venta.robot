*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Comprobar que no hay afectación a canales de venta
    [Documentation]    ID: 47
    ...                Título: Comprobar que no hay afectación a canales de venta
    ...                Proceso: Venta
    ...                Aplicación: Canales de Venta
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que el ajuste de reglas de negocio para Paquetes Internet Amigo
    ...                no afecta el funcionamiento de los canales de venta
    ...                Tipo de Prueba: Regresión
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Canales de venta operativos; Usuario Prepago autenticado;
    ...                Paquetes Internet Amigo disponibles para venta; Sistema UPC operativo con nuevas reglas implementadas
    [Tags]    PruebaGeneradaIA    Venta    CanalesVenta    AjusteReglasNegocio    Regresion
    Given se revisa el documento de requisitos para confirmar canales no impactados
    When se realiza venta de Paquete Internet Amigo de 50 pesos desde canal Mi Telcel
    Then el canal procesa la venta correctamente sin errores ni cambios en flujo
    And el paquete se activa desde el canal completándose exitosamente
    And los canales de venta no requieren modificaciones en interfaces ni procesos
    And la información de vigencia mostrada al cliente es clara y precisa

*** Keywords ***
Se Revisa El Documento De Requisitos Para Confirmar Canales No Impactados
    Revisar Documento De Requisitos Sobre Canales Impactados
    Verificar Documento Confirma Sin Impacto En Canales

Se Realiza Venta De Paquete Internet Amigo De 50 Pesos Desde Canal Mi Telcel
    Simular Venta Paquete 50 Pesos Desde Canal Mi Telcel    ${NUMERO_LINEA_PREPAGO}

El Canal Procesa La Venta Correctamente Sin Errores Ni Cambios En Flujo
    Verificar Venta Procesada Correctamente Sin Errores

El Paquete Se Activa Desde El Canal Completándose Exitosamente
    Validar Activacion Desde Canal Completada Exitosamente

Los Canales De Venta No Requieren Modificaciones En Interfaces Ni Procesos
    Consultar Estado De Interfaces De Canales De Venta
    Verificar Canales No Requieren Modificaciones En Interfaces

La Información De Vigencia Mostrada Al Cliente Es Clara Y Precisa
    Validar Vigencia Mostrada Durante Proceso De Compra En Canal
