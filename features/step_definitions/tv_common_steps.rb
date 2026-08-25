# frozen_string_literal: true

# Steps compartidos por los casos de esta corrida que operan sobre la app de TV
# (QA-CP001 y QA-CP004). Se define UNA sola vez para evitar ambigüedad/duplicidad.

Given('el usuario tiene sesión iniciada en la app de TV') do
  # Regla 14: la sesión debe verificarse con una señal REAL de autenticación
  # (token/cookie/perfil autenticado), NUNCA con la visibilidad del player u
  # otro componente funcional.
  #
  # La plataforma de UI de la app de TV (Claro Video TV) no está declarada de
  # forma explícita como Web/Android/iOS, por lo que no existe driver ni
  # mecanismo real de sesión disponible en esta corrida. Se marca pendiente de
  # forma controlada (no se simula la autenticación).
  session_token = env_value('CLAROVIDEO_TV_SESSION_TOKEN')

  if session_token.nil?
    pending(
      'Sesión no verificable: definir CLAROVIDEO_TV_SESSION_TOKEN (o cookie/' \
      'perfil real) y la plataforma de UI declarada para validar la ' \
      'autenticación mediante una señal propia de sesión antes de continuar.'
    )
  end

  # Plataforma/driver de UI no declarado: aún con token, no hay un driver real
  # sobre el cual comprobar el estado de sesión. Se deja pendiente.
  pending(
    'Plataforma/driver de UI no declarado (Web/Android/iOS): no es posible ' \
    'verificar el estado de sesión autenticada sobre la app de TV. Definir la ' \
    'plataforma real y su mecanismo de validación de sesión.'
  )
end
