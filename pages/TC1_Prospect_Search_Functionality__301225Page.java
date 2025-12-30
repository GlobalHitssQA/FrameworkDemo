package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación Acticenter real.
 * La URL proporcionada (actinver.atlassian.net) redirige a login de Atlassian,
 * no a la plataforma Acticenter con funcionalidad de búsqueda de prospectos.
 */
public class ProspectSearchPage {

    private final Page page;
    
    // Locators - INFERIDOS basados en mejores prácticas y convenciones
    private final Locator dashboardContainer;
    private final Locator prospectSearchField;
    private final Locator recentSearchesSection;
    private final Locator recentSearchItems;
    private final Locator recentSearchName;
    private final Locator recentSearchEmail;
    private final Locator searchResultsContainer;
    private final Locator searchResultItems;
    private final Locator searchLoadingIndicator;
    private final Locator noResultsMessage;
    private final Locator errorMessage;

    // URLs - INFERIDAS
    private static final String BASE_URL = "https://acticenter.actinver.com";
    private static final String DASHBOARD_URL = BASE_URL + "/advisor/dashboard";
    private static final String LOGIN_URL = BASE_URL + "/login";

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Dashboard elements - Locators INFERIDOS
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        
        // Search field elements - Locators INFERIDOS
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        
        // Recent searches elements - Locators INFERIDOS
        this.recentSearchesSection = page.locator("[data-testid='recent-searches-section']");
        this.recentSearchItems = page.locator("[data-testid='recent-search-item']");
        this.recentSearchName = page.locator("[data-testid='recent-search-name']");
        this.recentSearchEmail = page.locator("[data-testid='recent-search-email']");
        
        // Search results elements - Locators INFERIDOS
        this.searchResultsContainer = page.locator("[data-testid='search-results-container']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.searchLoadingIndicator = page.locator("[data-testid='search-loading-indicator']");
        
        // Message elements - Locators INFERIDOS
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation methods
    public void navigateToActicenter() {
        page.navigate(DASHBOARD_URL);
    }

    public void loginAsAdvisor() {
        // Login logic would be implemented here
        // This is a placeholder as credentials are not provided
        Locator usernameField = page.locator("[data-testid='login-username']");
        Locator passwordField = page.locator("[data-testid='login-password']");
        Locator loginButton = page.locator("[data-testid='login-submit-button']");
        
        if (usernameField.isVisible()) {
            usernameField.fill("advisor@actinver.com");
            passwordField.fill("password");
            loginButton.click();
            page.waitForURL("**/dashboard**");
        }
    }

    // Dashboard verification methods
    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isProspectSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    // Search field interaction methods
    public void clickProspectSearchField() {
        prospectSearchField.click();
    }

    public boolean isSearchFieldActivated() {
        return prospectSearchField.evaluate("el => document.activeElement === el").equals(true);
    }

    public void typeInSearchField(String text) {
        prospectSearchField.pressSequentially(text, new Locator.PressSequentiallyOptions().setDelay(100));
    }

    public void clearSearchField() {
        prospectSearchField.clear();
    }

    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }

    // Recent searches methods
    public boolean isRecentSearchesSectionVisible() {
        return recentSearchesSection.isVisible();
    }

    public int getRecentSearchesCount() {
        return recentSearchItems.count();
    }

    public boolean allRecentSearchesHaveNameAndEmail() {
        int count = recentSearchItems.count();
        for (int i = 0; i < count; i++) {
            Locator item = recentSearchItems.nth(i);
            Locator name = item.locator("[data-testid='recent-search-name']");
            Locator email = item.locator("[data-testid='recent-search-email']");
            if (!name.isVisible() || !email.isVisible()) {
                return false;
            }
        }
        return true;
    }

    public boolean allRecentSearchesHaveName() {
        int count = recentSearchItems.count();
        for (int i = 0; i < count; i++) {
            Locator item = recentSearchItems.nth(i);
            Locator name = item.locator("[data-testid='recent-search-name']");
            if (!name.isVisible() || name.textContent().trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean allRecentSearchesHaveEmail() {
        int count = recentSearchItems.count();
        for (int i = 0; i < count; i++) {
            Locator item = recentSearchItems.nth(i);
            Locator email = item.locator("[data-testid='recent-search-email']");
            if (!email.isVisible() || email.textContent().trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public String getRecentSearchNameAt(int index) {
        return recentSearchItems.nth(index).locator("[data-testid='recent-search-name']").textContent();
    }

    public String getRecentSearchEmailAt(int index) {
        return recentSearchItems.nth(index).locator("[data-testid='recent-search-email']").textContent();
    }

    // Search trigger and results methods
    public boolean isSearchTriggered() {
        // Search is triggered when either loading indicator appears or results are shown
        return searchLoadingIndicator.isVisible() || searchResultsContainer.isVisible();
    }

    public boolean areSearchResultsDisplayed() {
        return searchResultsContainer.isVisible() && searchResultItems.count() > 0;
    }

    public boolean waitForSearchToComplete() {
        try {
            // Wait for loading indicator to appear and then disappear
            if (searchLoadingIndicator.isVisible()) {
                searchLoadingIndicator.waitFor(new Locator.WaitForOptions()
                    .setState(WaitForSelectorState.HIDDEN)
                    .setTimeout(10000));
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    // Error and no results methods
    public boolean isNoResultsMessageDisplayed() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Utility methods
    public void waitForDashboardToLoad() {
        dashboardContainer.waitFor(new Locator.WaitForOptions().setTimeout(10000));
    }

    public void selectRecentSearchAt(int index) {
        recentSearchItems.nth(index).click();
    }

    public void selectSearchResultAt(int index) {
        searchResultItems.nth(index).click();
    }
}