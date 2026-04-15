*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar venta de servicios suplementarios prepagados diferidos dentro del financiamiento en Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Venta    BES    AmigoPaguitos    ServiciosSuplementarios    Diferido    Funcional
    [Documentation]    Verificar la venta de servicios suplementarios prepagados diferidos incluidos dentro del financiamiento del equipo
    ...                en Amigo Paguitos. El sistema debe permitir seleccionar servicios diferidos, recalcular el monto total del préstamo
    ...                incluyendo los servicios, ajustar las parcialidades según el plazo seleccionado, formalizar la venta y transferir
    ...                toda la información a BES. BES debe mostrar el préstamo con el desglose del equipo y servicios suplementarios diferidos,
    ...                incluyendo el calendario de cobranza correcto y el desglose completo de parcialidades con la proporción correspondiente
    ...                al equipo y a los servicios suplementarios.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario autenticado en AP.AG; Cliente aprobado para monto de crédito que incluya servicios adicionales;
    ...                Catálogo de servicios suplementarios prepagados configurado para diferimiento; Integración entre AP.AG y BES funcionando;
    ...                Configuración de plazos y periodicidades activa en Amigo Paguitos
    Given el usuario ha iniciado el proceso de venta con evaluación crediticia hasta la etapa de oferta
    When el sistema muestra opciones de plazo y periodicidad configurables
    And el usuario selecciona agregar servicios prepagados diferidos dentro del financiamiento
    And el sistema despliega el catálogo de servicios diferidos disponibles
    And el usuario selecciona servicios y confirma su inclusión en el financiamiento
    Then el sistema recalcula el monto total incluyendo servicios y ajusta parcialidades
    And el usuario formaliza la venta con enganche y contrato
    And el sistema registra la venta completa y transfiere a BES
    And BES muestra el préstamo con el desglose de equipo y servicios diferidos
    And el calendario de cobranza refleja las parcialidades correctas
    And la pantalla 360 despliega el desglose completo con proporción de equipo y servicios

*** Keywords ***
El usuario ha iniciado el proceso de venta con evaluación crediticia hasta la etapa de oferta
    El usuario inicia el proceso de venta de equipo bajo esquema Amigo Paguitos
    El usuario completa la evaluación crediticia y llega a la etapa de oferta de financiamiento    Juan Pérez    juan.perez@telcel.com    Calle Principal 123    5551234567    ABC123456

El sistema muestra opciones de plazo y periodicidad configurables
    El sistema muestra las opciones de plazo y periodicidad configurables

El usuario selecciona agregar servicios prepagados diferidos dentro del financiamiento
    El usuario selecciona la opción de agregar servicios de oferta suplementaria prepagado diferido

El sistema despliega el catálogo de servicios diferidos disponibles
    El sistema muestra el catálogo de servicios suplementarios prepagados diferidos disponibles

El usuario selecciona servicios y confirma su inclusión en el financiamiento
    El usuario selecciona servicios suplementarios diferidos y confirma su inclusión    Seguro de Pantalla    Garantía Extendida

El sistema recalcula el monto total incluyendo servicios y ajusta parcialidades
    El sistema recalcula el monto total del préstamo y ajusta las parcialidades    12

El usuario formaliza la venta con enganche y contrato
    El usuario formaliza la venta con pago de enganche y envío de contrato

El sistema registra la venta completa y transfiere a BES
    El sistema registra la venta y transfiere información a BES    ABC123456

BES muestra el préstamo con el desglose de equipo y servicios diferidos
    El usuario verifica en BES que el préstamo refleja el monto total con servicios diferidos    ABC123456

El calendario de cobranza refleja las parcialidades correctas
    BES muestra el préstamo con desglose y calendario de cobranza correcto    12

La pantalla 360 despliega el desglose completo con proporción de equipo y servicios
    El usuario consulta en pantalla 360 el detalle de cuotas y desglose de pagos
    El sistema despliega el desglose completo con proporción de equipo y servicios
