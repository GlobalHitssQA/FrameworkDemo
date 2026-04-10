*** Settings ***
Documentation     Test Case ID: 30
...               Título: Validar que se suman correctamente los MB de navegación libre
...               Proceso: Venta
...               Aplicación: UPC
...               Funcionalidad: Suma de Paquetes Internet Amigo
...
...               Escenario: Verificar que los MB de navegación libre se sumen correctamente
...               en una sola bolsa al activar múltiples paquetes Internet Amigo
...
...               Tipo de Prueba: Funcional
...               Complejidad: Medium
...               Técnica ISTQB: Particiones de equivalencia

Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_TEST}          5512345678
${PAQUETE_PRIMERO}            PAQ_1GB_30D
${PAQUETE_SEGUNDO}            PAQ_2GB_60D

*** Test Cases ***
Validar Que Se Suman Correctamente Los MB De Navegación Libre
    [Documentation]    Verifica que al activar múltiples paquetes Internet Amigo,
    ...                los MB de navegación libre se sumen correctamente en una única bolsa
    ...                y que la suma sea consistente en todas las plataformas de consulta
    [Tags]    PruebaGeneradaIA    SumaPaquetes    InternetAmigo    NavegacionLibre

    Given el usuario Amigo sin paquetes activos accede al módulo de Paquetes Internet Amigo
    When activa un primer paquete Internet Amigo y registra los MB de navegación libre asignados
    And activa un segundo paquete Internet Amigo diferente y registra sus MB de navegación libre
    And calcula manualmente la suma esperada de MB de navegación libre de ambos paquetes
    Then consulta la bolsa de datos de navegación libre del usuario en el sistema
    And el sistema muestra una única bolsa de MB de navegación libre
    And los MB mostrados por el sistema coinciden exactamente con la suma calculada manualmente
    And las diferentes plataformas de consulta muestran la misma cantidad de MB sumados correctamente

*** Keywords ***
El Usuario Amigo Sin Paquetes Activos Accede Al Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Buscar Usuario Amigo Sin Paquetes Activos    ${NUMERO_LINEA_TEST}

Activa Un Primer Paquete Internet Amigo Y Registra Los MB De Navegación Libre Asignados
    Activar Paquete Por ID Y Registrar MB Navegacion Libre    ${PAQUETE_PRIMERO}

Activa Un Segundo Paquete Internet Amigo Diferente Y Registra Sus MB De Navegación Libre
    Activar Segundo Paquete Y Registrar MB Navegacion Libre    ${PAQUETE_SEGUNDO}

Calcula Manualmente La Suma Esperada De MB De Navegación Libre De Ambos Paquetes
    Calcular Suma Esperada De MB Navegacion Libre

Consulta La Bolsa De Datos De Navegación Libre Del Usuario En El Sistema
    Consultar Datos Disponibles En Plataformas

El Sistema Muestra Una Única Bolsa De MB De Navegación Libre
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas

Los MB Mostrados Por El Sistema Coinciden Exactamente Con La Suma Calculada Manualmente
    Verificar MB Navegacion Libre Coinciden Con Suma Calculada

Las Diferentes Plataformas De Consulta Muestran La Misma Cantidad De MB Sumados Correctamente
    Verificar Consistencia De MB Navegacion Libre En Todas Las Plataformas
