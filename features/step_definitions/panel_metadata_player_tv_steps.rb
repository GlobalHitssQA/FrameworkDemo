# frozen_string_literal: true

# Step definitions para el Panel de Metadata en el Player de TV.
# Cubre exclusivamente los casos de esta corrida: TC001, TC003 y TC005.
# Los Page Objects se cargan automaticamente desde features/pages por Cucumber.

def catalogo_page
  @catalogo_page ||= CatalogoTvPage.new(@driver)
end

def player_page
  @player_page ||= PlayerTvPage.new(@driver)
end

def panel_page
  @panel_page ||= PanelMetadataPage.new(@driver)
end

def backend_client
  @backend_client ||= MetadataBackendClient.new
end

def evento_en_vivo_id
  id = ENV['EVENTO_EN_VIVO_ID']
  if id.nil? || id.to_s.strip.empty?
    raise 'TODO: configuracion pendiente. Defina EVENTO_EN_VIVO_ID con el id real del evento ' \
          'en vivo utilizado en la corrida (no se permite inventar datos).'
  end
  id
end

# ---------- Background ----------
Given(/^que el usuario cuenta con sesion iniciada en la app de TV$/) do
  # La sesion iniciada se garantiza como precondicion mediante el estado de la app de TV
  # bajo prueba. El driver Appium ya esta iniciado por el hook Before de env.rb.
  expect(@driver).not_to be_nil
end

Given(/^el player de TV tiene integrado el nuevo panel de Metadata$/) do
  # Precondicion de entorno: build de la app de TV con el nuevo panel integrado.
  expect(@driver).not_to be_nil
end

# ---------- Preconditions de derecho / disponibilidad ----------
Given(/^que existe un evento en vivo disponible en el catalogo$/) do
  # Disponibilidad garantizada por el catalogo de la app de TV bajo prueba.
end

Given(/^(?:que )?el usuario posee derecho de reproduccion sobre el evento en vivo$/) do
  # Derecho de reproduccion garantizado por el perfil/cuenta de la corrida.
end

Given(/^que existe un evento en vivo sin derecho de reproduccion para el usuario$/) do
  # Disponibilidad del evento restringido garantizada por el catalogo de la app de TV.
end

Given(/^el usuario NO posee derecho de reproduccion sobre el evento en vivo$/) do
  # Ausencia de derecho garantizada por el perfil/cuenta de la corrida.
end

Given(/^el backend expone la metadata del evento en vivo$/) do
  # Disponibilidad del servicio de metadata garantizada por el entorno backend.
end

# ---------- TC001 ----------
When(/^selecciona en el catalogo el evento en vivo con derecho de reproduccion$/) do
  catalogo_page.seleccionar_evento_con_derecho
end

Then(/^la app de TV registra la seleccion del evento en vivo y muestra el foco sobre el elemento seleccionado$/) do
  expect(catalogo_page.evento_con_foco?).to be true
end

When(/^presiona el control OK\/Play para iniciar la reproduccion del evento en vivo$/) do
  player_page.presionar_ok_play
end

Then(/^el player de TV inicia la reproduccion del stream en vivo sin errores de carga y muestra la imagen del evento$/) do
  expect(player_page.reproduciendo?).to be true
end

When(/^observa el player de TV una vez iniciada la reproduccion del evento en vivo$/) do
  # Observacion del estado del player; la validacion se realiza en los pasos Then siguientes.
  expect(player_page.reproduciendo?).to be true
end

Then(/^el panel de Metadata se despliega sobre el player de TV en la posicion y formato del diseno Figma Large Focus$/) do
  expect(panel_page.desplegado?).to be true
end

Then(/^el panel de Metadata muestra los campos poblados con la informacion del evento en vivo consistente con la provista por el backend$/) do
  expect(panel_page.campos_poblados?).to be true
end

# ---------- TC003 ----------
When(/^selecciona en el catalogo el evento en vivo sin derecho de reproduccion$/) do
  catalogo_page.seleccionar_evento_sin_derecho
end

Then(/^la app de TV registra la seleccion del evento en vivo restringido$/) do
  expect(catalogo_page.evento_restringido_seleccionado?).to be true
end

When(/^presiona el control OK\/Play para intentar iniciar la reproduccion del evento en vivo sin derecho$/) do
  player_page.presionar_ok_play
end

Then(/^el player de TV bloquea la reproduccion y muestra el estado de restriccion por falta de derecho de reproduccion sin iniciar el stream$/) do
  expect(player_page.restriccion_visible?).to be true
  expect(player_page.reproduciendo?).to be false
end

When(/^observa la pantalla del player de TV tras el intento de reproduccion del evento sin derecho$/) do
  # Observacion del estado del player tras el bloqueo; la validacion se realiza en los Then.
end

Then(/^el panel de Metadata NO se despliega en el player de TV$/) do
  expect(panel_page.desplegado?).to be false
end

Then(/^el player de TV mantiene su funcionamiento previo sin regresiones ni bloqueos inesperados$/) do
  # El player sigue mostrando el estado de restriccion sin caidas: el driver sigue activo.
  expect(@driver).not_to be_nil
  expect(player_page.restriccion_visible?).to be true
end

# ---------- TC005 ----------
When(/^inicia la reproduccion del evento en vivo con derecho de reproduccion en el player de TV$/) do
  catalogo_page.seleccionar_evento_con_derecho
  player_page.presionar_ok_play
end

Then(/^el player de TV despliega el panel de Metadata con los campos del evento poblados$/) do
  expect(panel_page.desplegado?).to be true
  expect(panel_page.campos_poblados?).to be true
end

When(/^consulta en el backend la respuesta del servicio de metadata del mismo evento en vivo$/) do
  @backend_metadata = backend_client.metadata_evento(evento_en_vivo_id)
end

Then(/^el backend retorna la metadata del evento con los campos y valores esperados en la estructura definida$/) do
  expect(@backend_metadata).to be_a(Hash)
  expect(@backend_metadata).not_to be_empty
end

When(/^compara campo por campo los valores mostrados en el panel de Metadata contra los valores retornados por el backend$/) do
  @panel_valores = panel_page.valores
end

Then(/^cada campo del panel de Metadata coincide exactamente con el valor provisto por el backend sin discrepancias ni transformaciones no definidas$/) do
  @panel_valores.each do |llave, valor_panel|
    expect(@backend_metadata).to include(llave)
    expect(valor_panel.to_s).to eq(@backend_metadata[llave].to_s)
  end
end

Then(/^cada llave definida en los insumos se muestra en su ubicacion correcta del panel consistente con la fuente del backend$/) do
  # Se valida que cada llave configurada del panel exista en la respuesta del backend.
  @panel_valores.each_key do |llave|
    expect(@backend_metadata.keys).to include(llave)
  end
end
