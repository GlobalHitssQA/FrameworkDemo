source 'https://rubygems.org'

# Stack: Gherkin + Ruby + Cucumber
gem 'cucumber'
gem 'rspec-expectations'

# NOTA DE PLATAFORMA (rule 9/11): los insumos de esta corrida NO declaran plataforma
# (Web/Android/iOS). Por ello NO se agrega ningún driver por defecto:
#   - Web     -> agregar 'selenium-webdriver' (y 'page-object' si aplica)
#   - Android -> agregar 'appium_lib' (UiAutomator2)
#   - iOS     -> agregar 'appium_lib' (XCUITest)
# El driver se agregará únicamente cuando la plataforma quede declarada, para mantener
# la consistencia entre Gemfile, env.rb, Page Objects y locators.
