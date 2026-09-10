# frozen_string_literal: true

# Steps compartidos por los casos de esta corrida (QA-CP001, QA-CP078, QA-CP131).
# Precondición de sesión: verifica autenticación REAL mediante una señal propia
# de sesión (elemento exclusivo del usuario autenticado), no mediante el player
# ni la pantalla destino. Si falta configuración, el escenario queda pending.

Given('que el usuario está autenticado en la plataforma') do
  ensure_authenticated_session!
end
