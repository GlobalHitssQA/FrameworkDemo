# frozen_string_literal: true

require_relative 'base_page'

# SessionPage
#
# Responsable de establecer y VERIFICAR REALMENTE la sesion del usuario en la
# aplicacion de TV. La validacion de sesion se hace mediante una senal propia de
# sesion (indicador de login / perfil autenticado), NUNCA usando la visibilidad
# del player u otro componente funcional como sustituto (regla 14).
#
# Locators requeridos (accessibility id reales, provistos por entorno):
#   LOC_SESSION_INDICATOR   -> elemento exclusivo de usuario autenticado (perfil/avatar/estado login)
# Datos requeridos (provistos por entorno / insumo):
#   TV_USER, TV_PASSWORD    -> credenciales reales (solo si la sesion se establece por login en la app)
# Opcional (locators de login, solo si se debe iniciar sesion en runtime):
#   LOC_LOGIN_USER_FIELD, LOC_LOGIN_PASSWORD_FIELD, LOC_LOGIN_SUBMIT
class SessionPage < BasePage
  def session_indicator_locator
    self.class.locator('LOC_SESSION_INDICATOR')
  end

  # Senal propia de sesion: true si hay un indicador de usuario autenticado visible.
  def authenticated?
    return nil if session_indicator_locator.nil?

    !wait_until_visible(session_indicator_locator).nil?
  end

  # Establece la sesion iniciando sesion en la app con credenciales reales.
  # Solo se ejecuta cuando los locators y credenciales fueron provistos.
  def sign_in(user, password)
    user_field = self.class.locator('LOC_LOGIN_USER_FIELD')
    pass_field = self.class.locator('LOC_LOGIN_PASSWORD_FIELD')
    submit = self.class.locator('LOC_LOGIN_SUBMIT')
    return false if [user_field, pass_field, submit].any?(&:nil?) || user.nil? || password.nil?

    find(user_field).send_keys(user)
    find(pass_field).send_keys(password)
    find(submit).click
    authenticated?
  end
end
