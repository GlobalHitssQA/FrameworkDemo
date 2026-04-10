*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Validar que no hay impacto en facturación del cliente
    [Documentation]    ID: 45
    ...                Título: Validar que no hay impacto en facturación del cliente
    ...                Proceso: Facturación
    ...                Aplicación: Sistema de Facturación
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que el ajuste de reglas de negocio para Paquetes Internet Amigo
    ...                no genera cambios ni impactos en la facturación del cliente
    ...                Tipo de Prueba: Regresión
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario Prepago autenticado; Sistema de facturación operativo;
    ...                Acceso a registros de cobros y facturación; Nuevas reglas de negocio implementadas en UPC
    [Tags]    PruebaGeneradaIA    Facturacion    SistemaFacturacion    UPC    Regresion
    Given el usuario prepago está en el módulo de Paquetes Internet Amigo y se confirma sin cambio en facturación
    When activa un Paquete Internet Amigo de 50 pesos y registra el cobro exacto aplicado
    And activa un segundo Paquete Internet Amigo de 100 pesos y verifica el cobro independiente
    Then el sistema muestra ambos cobros sin alteraciones en montos conceptos ni estructura
    And no se observan diferencias en el formato ni contenido de la facturación
    And el orden de débito de los paquetes se mantiene sin alteraciones

*** Keywords ***
El Usuario Prepago Está En El Módulo De Paquetes Internet Amigo Y Se Confirma Sin Cambio En Facturación
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}
    Revisar Documento De Requisitos Para Confirmar Sin Cambio En Facturacion

Activa Un Paquete Internet Amigo De 50 Pesos Y Registra El Cobro Exacto Aplicado
    Activar Paquete Amigo 50 Y Registrar Cobro Aplicado
    Verificar Sistema Cobra Monto Exacto De 50 Pesos

Activa Un Segundo Paquete Internet Amigo De 100 Pesos Y Verifica El Cobro Independiente
    Activar Paquete Amigo 100 Y Registrar Segundo Cobro
    Verificar Sistema Cobra Monto Exacto De 100 Pesos De Forma Independiente

El Sistema Muestra Ambos Cobros Sin Alteraciones En Montos Conceptos Ni Estructura
    Consultar Detalle De Facturacion Despues De Aplicar Nuevas Reglas
    Verificar Cobros Sin Alteraciones En Montos Conceptos Y Estructura
    Registrar Formato Y Contenido De Facturacion Antes De Ajuste

No Se Observan Diferencias En El Formato Ni Contenido De La Facturación
    Comparar Formato Y Contenido Facturacion Antes Y Despues

El Orden De Débito De Los Paquetes Se Mantiene Sin Alteraciones
    Validar Orden De Debito Sin Alteraciones Despues De Ajuste
