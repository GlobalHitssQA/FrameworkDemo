*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_MIXTO_M2K}    5519998877

*** Test Cases ***
Comprobar Funcionamiento En Productos Legados M2K Para Mixtos
    [Documentation]    ID: 14
    ...                Título: Comprobar funcionamiento en productos legados m2k para Mixtos
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que las reglas de suma de datos y vigencias funcionan en usuarios mixtos
    ...                con productos legados m2k
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario mixto activo; Productos legados m2k configurados; Sistema UPC operativo;
    ...                Plataforma 360 disponible
    [Tags]    PruebaGeneradaIA    Provision    PaquetesInternetAmigo    UPC    Funcional    M2K    UsuarioMixto
    Given el usuario mixto con productos legados m2k está identificado en el sistema
    When activa un Paquete Internet Amigo de 20 pesos
    And activa un segundo Paquete Internet Amigo de 100 pesos
    Then el sistema suma los datos de ambos paquetes
    And el sistema muestra la vigencia del paquete de 100 pesos
    And el sistema mantiene los beneficios de redes sociales del paquete de 100 pesos
    And la plataforma 360 muestra una sola bolsa unificada de datos

*** Keywords ***
El Usuario Mixto Con Productos Legados M2K Está Identificado En El Sistema
    Acceder A Módulo De Paquetes Internet Amigo
    Identificar Usuario Mixto Con Productos Legados M2K    ${NUMERO_LINEA_MIXTO_M2K}

Activa Un Paquete Internet Amigo De 20 Pesos
    Activar Paquete Internet Amigo 20 Pesos

Activa Un Segundo Paquete Internet Amigo De 100 Pesos
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 100 Pesos En Usuario Mixto M2K

El Sistema Suma Los Datos De Ambos Paquetes
    Verificar Suma De Datos De Ambos Paquetes En Usuario M2K

El Sistema Muestra La Vigencia Del Paquete De 100 Pesos
    Verificar Vigencia Mostrada Es Del Paquete De 100 Pesos

El Sistema Mantiene Los Beneficios De Redes Sociales Del Paquete De 100 Pesos
    Verificar Beneficios Aplicados Son Del Paquete De 100 Pesos

La Plataforma 360 Muestra Una Sola Bolsa Unificada De Datos
    Verificar Bolsa Unificada De Datos En Plataforma 360
