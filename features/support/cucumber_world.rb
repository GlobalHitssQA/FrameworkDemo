# frozen_string_literal: true

module ClaroVideo
  # Helpers del World de Cucumber: configuración pendiente controlada, driver Appium,
  # cliente de servicios, Page Objects y verificación real de precondiciones de negocio.
  module CucumberWorld
    DRIVER_CONFIG_KEYS = %w[
      APPIUM_SERVER_URL
      ANDROID_DEVICE_NAME
      ANDROID_APP_PACKAGE
      ANDROID_APP_ACTIVITY
    ].freeze

    API_CONFIG_KEYS = %w[
      CLAROVIDEO_API_BASE_URL
      CLAROVIDEO_USER_TOKEN
      BLOCKED_CHANNEL_GROUP_ID
    ].freeze

    # Marca el escenario como pendiente (controlado) si falta configuración/dato real.
    def config_or_pending!(*keys)
      missing = ClaroVideo::Config.missing(*keys)
      return if missing.empty?

      pending("Configuración pendiente (TODO). Defina las variables de entorno: #{missing.join(', ')}")
    end

    # --- Infraestructura -------------------------------------------------------

    def appium_driver
      @appium_driver ||= begin
        config_or_pending!(*DRIVER_CONFIG_KEYS)
        ClaroVideo::DriverFactory.build
      end
    end

    def api
      @api ||= begin
        config_or_pending!(*API_CONFIG_KEYS)
        ClaroVideo::ApiClient.new(
          base_url: ClaroVideo::Config.fetch('CLAROVIDEO_API_BASE_URL'),
          user_token: ClaroVideo::Config.fetch('CLAROVIDEO_USER_TOKEN')
        )
      end
    end

    def group_id
      config_or_pending!('BLOCKED_CHANNEL_GROUP_ID')
      ClaroVideo::Config.fetch('BLOCKED_CHANNEL_GROUP_ID')
    end

    # --- Page Objects ----------------------------------------------------------

    def epg_page
      @epg_page ||= EpgPage.new(appium_driver)
    end

    def pin_page
      @pin_page ||= PinPage.new(appium_driver)
    end

    def event_page
      @event_page ||= EventPlaybackPage.new(appium_driver)
    end

    def options_page
      @options_page ||= ProgramOptionsPage.new(appium_driver)
    end

    # --- Datos de prueba reales (desde entorno) --------------------------------

    def configured_pin
      config_or_pending!('CLAROVIDEO_SECURITY_PIN')
      pin = ClaroVideo::Config.fetch('CLAROVIDEO_SECURITY_PIN')
      unless (4..6).cover?(pin.length)
        pending("El PIN de seguridad configurado debe tener de 4 a 6 caracteres (TODO revisar dato de prueba)")
      end
      pin
    end

    def invalid_pin
      config_or_pending!('CLAROVIDEO_SECURITY_PIN_INVALID')
      ClaroVideo::Config.fetch('CLAROVIDEO_SECURITY_PIN_INVALID')
    end

    def expected_event_title
      config_or_pending!('EXPECTED_EVENT_TITLE')
      ClaroVideo::Config.fetch('EXPECTED_EVENT_TITLE')
    end

    # --- Verificación real de precondiciones de negocio ------------------------

    # Envuelve una consulta de servicio y convierte lo "no determinable" en pendiente.
    def determinable
      yield
    rescue ClaroVideo::ApiClient::Undeterminable => e
      pending("No fue posible determinar la precondición vía servicio (TODO configurar entorno): #{e.message}")
    end

    # Sesión autenticada real: se usa la validez del user_token frente al servicio
    # (HTTP 200 = sesión válida; 401/403 = sesión no autenticada) como señal de sesión.
    def verify_authenticated_session!
      res = determinable { api.channels_check(group_id) }
      if [401, 403].include?(res.status)
        raise "El usuario no tiene una sesión autenticada válida (HTTP #{res.status})"
      end

      expect(res.status).to(eq(200), "No se pudo confirmar la sesión autenticada (HTTP #{res.status})")
      @session_verified = true
    end

    # Canal bloqueado real: channels_check == true (booleano estricto).
    def verify_channel_locked!
      res = determinable { api.channels_check(group_id) }
      unless res.status == 200
        pending("channels/check no respondió 200 (HTTP #{res.status}); estado del canal no determinable")
      end

      body = res.body
      unless body.is_a?(Hash) && body.key?('channels_check')
        pending('Respuesta malformada de channels/check: campo channels_check ausente')
      end

      value = body['channels_check']
      unless [true, false].include?(value)
        pending("channels_check no es un booleano real: #{value.inspect}")
      end

      expect(value).to(be(true), "El canal group_id=#{group_id} no está bloqueado (channels_check=#{value})")
      @channel_locked = true
    end

    # Valida contra el servicio que el PIN indicado es correcto (is_valid == true estricto).
    def verify_pin_service_valid!(pin)
      res = determinable { api.pin_check(pin: pin, group_id: group_id) }
      unless res.status == 200
        pending("controlpin/check no respondió 200 (HTTP #{res.status}); validez del PIN no determinable")
      end

      body = res.body
      unless body.is_a?(Hash) && body.key?('is_valid')
        pending('Respuesta malformada de controlpin/check: campo is_valid ausente')
      end

      value = body['is_valid']
      unless [true, false].include?(value)
        pending("is_valid no es un booleano real: #{value.inspect}")
      end

      expect(value).to(be(true), 'El servicio de validación no reconoció el PIN como válido (is_valid=false)')
    end
  end
end
