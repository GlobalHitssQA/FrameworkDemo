# frozen_string_literal: true

# QA-CP078 — Cambio automático de audio en el Panel del Player VOD.
# Plataforma: Android (Fire TV / Android TV) con Appium UiAutomator2.

Given('que el usuario reproduce un contenido VOD con al menos dos pistas de audio') do
  ensure_appium!
  require_config!(*AudioSubtitlePanelPage::PLAYBACK_KEYS, 'VOD_CONTENT_ID')

  panel = page(AudioSubtitlePanelPage)
  expect(panel.playback_active?).to be(true), 'No hay una reproducción VOD activa'

  # La reproducción debe corresponder exactamente al contenido de prueba esperado.
  opened = panel.current_content_id
  expect(opened).to eq(TestConfig['VOD_CONTENT_ID']),
                    "El contenido en reproducción (#{opened}) no coincide con VOD_CONTENT_ID"
end

Given('que el Panel de Audio y Subtítulos está desplegado') do
  require_config!(*AudioSubtitlePanelPage::LOCATOR_KEYS)
  panel = page(AudioSubtitlePanelPage)
  expect(panel.panel_visible?).to be(true), 'El Panel de Audio y Subtítulos no está desplegado'
  # Precondición de datos: el contenido debe exponer al menos dos pistas de audio.
  expect(panel.audio_options.size).to be >= 2,
                                      'El contenido no expone al menos dos pistas de audio seleccionables'
end

When('el usuario visualiza las opciones de audio disponibles en el Panel') do
  panel = page(AudioSubtitlePanelPage)
  expect(panel.audio_options.size).to be >= 2
  @active_audio_label = panel.active_audio_label
  expect(@active_audio_label).not_to be_nil, 'No se pudo determinar la pista de audio activa'
end

When('el usuario selecciona una opción de audio distinta a la actualmente activa') do
  @selected_audio_label = page(AudioSubtitlePanelPage).select_audio_other_than_active(@active_audio_label)
  expect(@selected_audio_label).not_to eq(@active_audio_label),
                                       'La opción seleccionada no es distinta a la activa'
end

Then('el cambio de audio se aplica automáticamente sin necesidad de confirmación adicional') do
  panel = page(AudioSubtitlePanelPage)
  # No debe requerirse diálogo de confirmación adicional.
  expect(panel.confirmation_dialog_absent?).to be(true),
                                                'Apareció un diálogo de confirmación; el cambio no fue automático'
  # Espera explícita a que la nueva pista quede efectivamente aplicada.
  expect(panel.wait_audio_applied?(@selected_audio_label)).to be(true),
                                                              'El cambio de audio no se aplicó automáticamente'
end

Then('el contenido reproduce la nueva pista de audio seleccionada') do
  reproduced = page(AudioSubtitlePanelPage).current_player_audio_label
  expect(reproduced).to eq(@selected_audio_label),
                        "La pista reproducida (#{reproduced}) no es la seleccionada (#{@selected_audio_label})"
end
