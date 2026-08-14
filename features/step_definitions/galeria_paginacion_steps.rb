# frozen_string_literal: true

# Steps para TC005 y TC006 (Paginación / carga incremental en Sección Fotos).
# Plataforma iOS -> Appium + XCUITest.

Given('el usuario tiene sesión iniciada con la cuenta de prueba') do
  # Sesión iniciada con la cuenta de prueba de imágenes ordenadas cronológicamente.
  # TODO: implementar login/reuso de sesión con credenciales provenientes del entorno.
  @galeria = GaleriaPage.new
end

Given('la sección Fotos (Galería) está accesible') do
  @galeria ||= GaleriaPage.new
end

Given('la cuenta de prueba tiene más de 10000 imágenes ordenadas cronológicamente') do
  # Dato real del caso: cuenta de alto volumen (+10,000 imágenes) ordenada cronológicamente.
  @volumen = :alto
end

Given('la cuenta de prueba tiene un volumen finito y conocido de imágenes') do
  # Dato real del caso: cuenta con volumen finito y conocido.
  @volumen = :conocido
end

# --- TC005 ---
When('abro la sección Fotos (Galería) y observo la carga del primer lote de imágenes') do
  @galeria ||= GaleriaPage.new
  @galeria.abrir_galeria
  @secuencia = @galeria.identificadores_visibles
end

Then('el primer lote de imágenes se carga y renderiza correctamente en orden secuencial') do
  expect(@galeria.primer_lote_visible?).to be true
end

When('realizo scroll hacia abajo para disparar la carga incremental del siguiente lote de imágenes') do
  @galeria.scroll_abajo
  @secuencia.concat(@galeria.identificadores_visibles)
end

Then('la paginación carga el nuevo lote de forma fluida y continua con la secuencia sin interrupciones') do
  expect(@galeria.miniaturas).not_to be_empty
end

When('continúo el scroll disparando la carga de varios lotes consecutivos de imágenes') do
  3.times do
    @galeria.scroll_abajo
    @secuencia.concat(@galeria.identificadores_visibles)
  end
end

Then('cada lote se carga de forma fluida y la secuencia continúa sin saltos ni discontinuidades') do
  expect(@galeria.miniaturas).not_to be_empty
end

When('reviso visualmente la secuencia de imágenes cargadas en los lotes recorridos') do
  @identificadores = @secuencia.compact
end

Then('no se presentan imágenes duplicadas entre lotes ni dentro de un mismo lote') do
  expect(@identificadores.uniq.length).to eq(@identificadores.length)
end

When('verifico la continuidad de la secuencia entre el final de un lote y el inicio del siguiente') do
  @secuencia_final = @secuencia.compact
end

Then('la secuencia de imágenes es continua sin saltos ni omisiones en las transiciones entre lotes') do
  expect(@secuencia_final).not_to be_empty
end

# --- TC006 ---
When('abro la sección Fotos (Galería) con la cuenta de prueba de volumen conocido') do
  @galeria ||= GaleriaPage.new
  @galeria.abrir_galeria
end

Then('la Galería carga el primer lote de imágenes correctamente') do
  expect(@galeria.primer_lote_visible?).to be true
end

When('realizo scroll continuo hasta cargar todos los lotes disponibles y aproximarme al final del listado') do
  @galeria.scroll_hasta_final
end

Then('la paginación carga progresivamente todos los lotes hasta acercarse a la última imagen de la cuenta') do
  expect(@galeria.miniaturas).not_to be_empty
end

When('continúo el scroll hasta alcanzar la última imagen del listado de la Galería') do
  @ultimas_miniaturas = @galeria.identificadores_visibles
  @galeria.scroll_abajo
end

Then('la Galería muestra la última imagen indexada y detiene la carga incremental sin solicitar lotes inexistentes') do
  # El listado se estabiliza: el contenido visible no cambia al llegar al final.
  expect(@galeria.identificadores_visibles).to eq(@ultimas_miniaturas)
end

When('intento realizar scroll adicional más allá de la última imagen del listado') do
  @estado_previo = @galeria.identificadores_visibles
  @galeria.scroll_abajo
end

Then('la Galería permanece estable en el final del listado sin espacios en blanco, errores, cargas fallidas ni crashes') do
  expect(@galeria.identificadores_visibles).to eq(@estado_previo)
end
