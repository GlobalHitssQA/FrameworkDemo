package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 * Page Object for API Request Counter functionality
 * Locators: INFERIDOS - La aplicación de búsqueda de perfiles GitHub descrita
 * en la metadata no está disponible en la URL proporcionada (github.com es la
 * página principal de GitHub, no la aplicación personalizada de búsqueda)
 */
public class ApiRequestCounterPage {

    private Page page;
    
    // Locators inferidos basados en buenas prácticas y elementos UI descritos
    private Locator apiRequestCounter;
    private Locator apiCounterConsumed;
    private Locator apiCounterLimit;
    private Locator mainContainer;

    // URL base de la aplicación (inferida del contexto)
    private static final String BASE_URL = "https://github.com";
    
    // Patrón para validar formato X/Y
    private static final Pattern COUNTER_PATTERN = Pattern.compile("^(\\d+)/(\\d+)$");

    public ApiRequestCounterPage(Page page) {
        this.page = page;
        // Locators inferidos - usando data-testid y selectores semánticos
        this.apiRequestCounter = page.locator("[data-testid='api-request-counter']");
        this.apiCounterConsumed = page.locator("[data-testid='api-counter-consumed']");
        this.apiCounterLimit = page.locator("[data-testid='api-counter-limit']");
        this.mainContainer = page.locator("[data-testid='app-container'], #app, .app-container");
    }

    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isApplicationLoaded() {
        return mainContainer.isVisible();
    }

    public boolean isApiCounterPresent() {
        return apiRequestCounter.count() > 0;
    }

    public boolean isApiCounterVisible() {
        return apiRequestCounter.isVisible();
    }

    public String getApiCounterText() {
        return apiRequestCounter.textContent().trim();
    }

    public boolean isCounterFormatValid() {
        String counterText = getApiCounterText();
        Matcher matcher = COUNTER_PATTERN.matcher(counterText);
        return matcher.matches();
    }

    public boolean areCounterValuesPositiveIntegers() {
        String counterText = getApiCounterText();
        Matcher matcher = COUNTER_PATTERN.matcher(counterText);
        
        if (!matcher.matches()) {
            return false;
        }
        
        try {
            int consumed = Integer.parseInt(matcher.group(1));
            int limit = Integer.parseInt(matcher.group(2));
            return consumed >= 0 && limit > 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public int getConsumedRequests() {
        String counterText = getApiCounterText();
        Matcher matcher = COUNTER_PATTERN.matcher(counterText);
        
        if (matcher.matches()) {
            return Integer.parseInt(matcher.group(1));
        }
        return -1;
    }

    public int getTotalLimit() {
        String counterText = getApiCounterText();
        Matcher matcher = COUNTER_PATTERN.matcher(counterText);
        
        if (matcher.matches()) {
            return Integer.parseInt(matcher.group(2));
        }
        return -1;
    }
}