package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;

/**
 * Page Object for Pitchbook Prospect Search functionality
 * LOCATORS: INFERIDOS - No se pudo acceder a la plataforma real (URL redirige a login de Atlassian)
 */
public class PitchbookSearchPage {

    private Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas y convenciones semánticas
    private Locator searchField;
    private Locator searchButton;
    private Locator searchHistoryDropdown;
    private Locator searchHistoryItems;
    private Locator prospectNameElements;
    private Locator prospectEmailElements;
    private Locator searchResultsContainer;
    private Locator prospectInfoSection;
    private Locator processFlowIndicator;

    public PitchbookSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Campo de búsqueda de prospectos - INFERIDO
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        
        // Botón de búsqueda/lupa - INFERIDO
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        
        // Dropdown de historial de búsquedas - INFERIDO
        this.searchHistoryDropdown = page.locator("[data-testid='search-history-dropdown']");
        
        // Items individuales del historial - INFERIDO
        this.searchHistoryItems = page.locator("[data-testid='search-history-item']");
        
        // Nombres de prospectos en el historial - INFERIDO
        this.prospectNameElements = page.locator("[data-testid='search-history-item'] [data-testid='prospect-name']");
        
        // Emails de prospectos en el historial - INFERIDO
        this.prospectEmailElements = page.locator("[data-testid='search-history-item'] [data-testid='prospect-email']");
        
        // Contenedor de resultados de búsqueda - INFERIDO
        this.searchResultsContainer = page.locator("[data-testid='search-results-container']");
        
        // Sección de información del prospecto seleccionado - INFERIDO
        this.prospectInfoSection = page.locator("[data-testid='prospect-info-section']");
        
        // Indicador de flujo del proceso - INFERIDO
        this.processFlowIndicator = page.locator("[data-testid='process-flow-indicator']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return searchField.isEnabled();
    }

    public void clickSearchField() {
        searchField.click();
    }

    public void typeInSearchField(String text) {
        searchField.fill(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchHistoryDropdownVisible() {
        return searchHistoryDropdown.isVisible();
    }

    public int getSearchHistoryCount() {
        return searchHistoryItems.count();
    }

    public boolean allHistoryItemsHaveProspectName() {
        int itemCount = searchHistoryItems.count();
        int nameCount = prospectNameElements.count();
        
        if (itemCount == 0 || nameCount != itemCount) {
            return false;
        }
        
        for (int i = 0; i < nameCount; i++) {
            String name = prospectNameElements.nth(i).textContent();
            if (name == null || name.trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean allHistoryItemsHaveEmail() {
        int itemCount = searchHistoryItems.count();
        int emailCount = prospectEmailElements.count();
        
        if (itemCount == 0 || emailCount != itemCount) {
            return false;
        }
        
        for (int i = 0; i < emailCount; i++) {
            String email = prospectEmailElements.nth(i).textContent();
            if (email == null || email.trim().isEmpty() || !email.contains("@")) {
                return false;
            }
        }
        return true;
    }

    public void selectFirstSearchHistoryItem() {
        searchHistoryItems.first().click();
    }

    public void selectSearchHistoryItemByIndex(int index) {
        searchHistoryItems.nth(index).click();
    }

    public void selectSearchHistoryItemByName(String prospectName) {
        page.locator("[data-testid='search-history-item']:has-text('" + prospectName + "')").click();
    }

    public boolean isSearchResultsVisible() {
        return searchResultsContainer.isVisible();
    }

    public boolean isProspectInfoPopulated() {
        return prospectInfoSection.isVisible() && 
               !prospectInfoSection.textContent().trim().isEmpty();
    }

    public boolean isProcessFlowContinued() {
        return processFlowIndicator.isVisible();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public List<String> getSearchHistoryProspectNames() {
        return prospectNameElements.allTextContents();
    }

    public List<String> getSearchHistoryEmails() {
        return prospectEmailElements.allTextContents();
    }

    public void waitForSearchHistoryToLoad() {
        searchHistoryDropdown.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void waitForSearchResults() {
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}

// ============================================================================
// ARCHIVO ADICIONAL: ActicenterDashboardPage.java
// ============================================================================

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for Acticenter Dashboard
 * LOCATORS: INFERIDOS - No se pudo acceder a la plataforma real
 */
public class ActicenterDashboardPage {

    private Page page;
    private static final String ACTICENTER_URL = "https://acticenter.actinver.com";
    
    // Locators - INFERIDOS
    private Locator dashboardContainer;
    private Locator pitchbookMenuLink;
    private Locator advisorWelcomeMessage;

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Dashboard principal - INFERIDO
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        
        // Link al módulo Pitchbook - INFERIDO
        this.pitchbookMenuLink = page.locator("[data-testid='pitchbook-menu-link']");
        
        // Mensaje de bienvenida del asesor - INFERIDO
        this.advisorWelcomeMessage = page.locator("[data-testid='advisor-welcome-message']");
    }

    public void navigateToActicenter() {
        page.navigate(ACTICENTER_URL);
    }

    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }

    public void navigateToPitchbook() {
        pitchbookMenuLink.click();
    }

    public String getWelcomeMessage() {
        return advisorWelcomeMessage.textContent();
    }

    public boolean isAdvisorLoggedIn() {
        return advisorWelcomeMessage.isVisible();
    }
}