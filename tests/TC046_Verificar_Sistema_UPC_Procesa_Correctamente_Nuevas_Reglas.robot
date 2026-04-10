*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Verificar Que El Sistema UPC Procesa Correctamente Las Nuevas Reglas
    [Documentation]    ID: 46
    ...                Título: Verificar que el sistema UPC procesa correctamente las nuevas reglas
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que el sistema UPC procesa y aplica correctamente las nuevas reglas de negocio
    ...                para suma de datos, vigencias, bolsa única y perfiles en Paquetes Internet Amigo
    ...                Tipo de Prueba: Integral
    ...                Complejidad: high
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Sistema UPC configurado y operativo; Acceso administrativo a UPC;
    ...                Paquetes Internet Amigo de diferentes montos disponibles; Productos BES y m2k configurados;
    ...                Conexión con plataformas de consulta activa
    [Tags]    PruebaGeneradaIA    Provisión    UPC    AjusteReglasNegocio    Integral
    Given el administrador configura el sistema UPC con las nuevas reglas de negocio
    When activa un Paquete Internet Amigo de 50 pesos a un usuario Prepago
    And activa un Paquete Internet Amigo de 100 pesos al mismo usuario
    Then UPC procesa y consolida los datos en bolsas únicas de navegación y redes sociales
    And UPC mantiene los beneficios del paquete con mayores ventajas
    And UPC aplica las mismas reglas para productos BES y m2k sin errores
    And UPC replica correctamente la información a las plataformas de consulta

*** Keywords ***
El Administrador Configura El Sistema UPC Con Las Nuevas Reglas De Negocio
    Configurar El Sistema UPC Con Las Nuevas Reglas De Negocio
    Verificar UPC Acepta Y Registra Las Nuevas Reglas

Activa Un Paquete Internet Amigo De 50 Pesos A Un Usuario Prepago
    Activar Paquete 50 Pesos En Usuario Prepago En UPC
    Verificar UPC Procesa Activacion Y Aplica Reglas Del Paquete 50

Activa Un Paquete Internet Amigo De 100 Pesos Al Mismo Usuario
    Activar Paquete 100 Pesos Al Mismo Usuario En UPC
    Verificar UPC Suma Datos Y Actualiza Vigencia Automaticamente

UPC Procesa Y Consolida Los Datos En Bolsas Únicas De Navegación Y Redes Sociales
    Verificar UPC Consolida En Bolsas Unicas De Navegacion Y RRSS

UPC Mantiene Los Beneficios Del Paquete Con Mayores Ventajas
    Verificar UPC Mantiene Beneficios Del Paquete Mayor

UPC Aplica Las Mismas Reglas Para Productos BES Y M2k Sin Errores
    Verificar UPC Aplica Reglas Para Productos BES Y M2K Sin Errores

UPC Replica Correctamente La Información A Las Plataformas De Consulta
    Verificar UPC Replica Informacion A Plataformas De Consulta
