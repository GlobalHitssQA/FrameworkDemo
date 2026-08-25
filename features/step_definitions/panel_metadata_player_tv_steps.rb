# frozen_string_literal: true

# Step definitions para los casos de esta corrida: QA-CP002, QA-CP003, QC-CP001.
# Módulo funcional: Player de TV - Panel de Metadata.
#
# Notas de diseño:
# - Las precondiciones de negocio (sesión, evento, derecho, backend) se preparan y
#   verifican de forma real contra servicios reales por variables de entorno (rules 13-15, 29).
# - Los pasos que dependen de la UI del player usan Page Objects; como la plataforma no
#   está declarada en los insumos, `require_platform!` deja el escenario en pending de forma
#   controlada antes de tocar el driver (rules 9, 16). No se inventan locators.
# - Los helpers están definidos en features/support/env.rb (World PanelMetadataSupport).

# ---------------------------------------------------------------------------
# Precondiciones (Given)
# ---------------------------------------------------------------------------

Given('el usuario cuenta con sesión iniciada en la app de TV') do
  ensure_authenticated_session
end

Given('existe un evento en vivo disponible') do
  ensure_event_selected
end

Given('existe un evento en vivo') do
  ensure_event_selected
end

Given('el usuario tiene derecho de reproducción sobre el evento en vivo') do
  entitled = entitlement_for_current_context
  expect(entitled).to eq(true)
  @entitlement = true
end

Given('el usuario no tiene derecho de reproducción sobre el evento en vivo') do
  entitled = entitlement_for_current_context
  expect(entitled).to eq(false)
  @entitlement = false
end

Given('existe un evento en vivo con derecho de reproducción') do
  entitled = entitlement_for_current_context
  expect(entitled).to eq(true)
  @entitlement = true
end

Given('el servicio de backend de metadata está disponible y devuelve datos válidos') do
  ensure_event_selected
  @backend_metadata = fetch_backend_metadata(@event[:id])
  metadata_required_fields.each do |field|
    expect(@backend_metadata).to include(field)
  end
end

# ---------------------------------------------------------------------------
# QC-CP001 (When/Then)
# ---------------------------------------------------------------------------

When('ingreso al evento en vivo desde el player de TV') do
  ensure_authenticated_session
  ensure_event_selected
  # Abre exactamente el mismo evento validado en precondiciones (rule 30).
  player_page.open_event(@event[:id])
  expect(player_page.current_event_id).to eq(@event[:id])
end

Then('el player de TV inicia la reproducción del evento en vivo sin errores') do
  # Espera explícita de una señal verificable (rule 18).
  expect(player_page.wait_until_playing).to be(true)
  expect(player_page.error_state?).to be(false)
end

Then('el nuevo panel de metadata se despliega sobre el player de TV') do
  expect(metadata_panel.wait_until_visible).to be(true)
end

Then('la metadata mostrada es consistente con la información del evento en vivo') do
  # La consistencia debe compararse contra los valores esperados reales del evento (rule 31).
  # La fuente de comparación en este escenario es la metadata del backend del mismo evento.
  expected = fetch_backend_metadata(@event[:id])
  fields = metadata_required_fields
  shown = metadata_panel.field_values(fields)
  fields.each do |field|
    expect(shown).to include(field)
    expect(shown[field]).to eq(expected[field])
  end
end

Then('el panel de metadata respeta el layout y la estructura definidos en los insumos') do
  # La estructura/orden debe derivarse de la UI realmente renderizada (rule 32) y compararse
  # contra la estructura definida por los insumos Figma. Dichos insumos (layout/orden esperado)
  # no fueron provistos a esta corrida; la comparación estructural queda pendiente de definición.
  pending('Estructura/layout esperados del panel (insumos Figma) no provistos a esta corrida. ' \
          'Comparación estructural pendiente de definición (rule 20/32).')
end

# ---------------------------------------------------------------------------
# QA-CP002 (When/Then)
# ---------------------------------------------------------------------------

When('consulto la respuesta del backend de metadata del evento en vivo') do
  ensure_event_selected
  @backend_metadata ||= fetch_backend_metadata(@event[:id])
end

Then('el backend responde con la estructura de metadata del evento en vivo') do
  expect(@backend_metadata).to be_a(Hash)
  metadata_required_fields.each do |field|
    expect(@backend_metadata).to include(field)
  end
end

When('inicio la reproducción del evento en vivo y despliego el panel de metadata') do
  ensure_event_selected
  player_page.open_event(@event[:id])
  expect(player_page.current_event_id).to eq(@event[:id])
  expect(player_page.wait_until_playing).to be(true)
  metadata_panel.open
end

Then('el panel de metadata se muestra con los datos del evento en vivo') do
  expect(metadata_panel.wait_until_visible).to be(true)
end

Then('cada campo del panel coincide exactamente con el valor provisto por el backend') do
  expect(@backend_metadata).to be_a(Hash)
  fields = metadata_required_fields
  shown = metadata_panel.field_values(fields)
  fields.each do |field|
    expect(shown).to include(field)
    expect(shown[field]).to eq(@backend_metadata[field])
  end
end

Then('los campos de metadata respetan el conteo máximo de caracteres definido sin desbordamiento') do
  limits = metadata_char_limits
  shown = metadata_panel.field_values(limits.keys)
  limits.each do |field, max_chars|
    expect(shown).to include(field)
    expect(shown[field].to_s.length).to be <= max_chars.to_i
    # No debe existir corte/desbordamiento indebido respecto al valor del backend.
    expect(metadata_panel.field_truncated?(field)).to be(false)
  end
end

# ---------------------------------------------------------------------------
# QA-CP003 (When/Then)
# ---------------------------------------------------------------------------

When('accedo al evento en vivo sin derecho de reproducción desde el player de TV') do
  ensure_authenticated_session
  ensure_event_selected
  # El derecho (false) ya fue verificado realmente en la precondición.
  expect(@entitlement).to eq(false)
  player_page.open_event(@event[:id])
  expect(player_page.current_event_id).to eq(@event[:id])
end

Then('el player de TV no inicia la reproducción del evento en vivo') do
  # Validación negativa (rule 18): primero se espera una señal positiva de que el intento
  # de acceso terminó de procesarse y luego se verifica que no haya reproducción.
  expect(player_page.wait_until_access_resolved).to be(true)
  expect(player_page.playing?).to be(false)
end

Then('el nuevo panel de metadata de evento en vivo no se despliega') do
  # Ausencia sostenida durante un intervalo acotado (rule 18/21).
  expect(metadata_panel.remains_absent?(2)).to be(true)
end

Then('el player de TV mantiene su comportamiento previo sin errores ni bloqueos indebidos') do
  expect(player_page.error_state?).to be(false)
end
