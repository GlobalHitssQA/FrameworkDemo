package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS SOURCE: INFERIDOS (inferred) - No se pudo acceder a la aplicación real
 * debido a que la URL redirige a login de Atlassian sin credenciales disponibles
 */
public class ProspectSearchPage {

    private final Page page;
    
    // ============================================
    // LOCATORS - INFERIDOS (basados en mejores prácticas)
    // ============================================
    
    // Login elements
    private final Locator usernameInput;
    private final Locator passwordInput;
    private final Locator loginButton;
    
    // Navigation elements
    private final Locator advisorDashboard;
    private final Locator prospectSearchMenuItem;
    
    // Search screen elements
    private final Locator searchField;
    private final Locator searchButton;
    private final Locator searchResultsContainer;
    private final Locator searchResultsList;
    private final Locator prospectResultItems;
    private final Locator loadingIndicator;
    private final Locator noResultsMessage;
    private final Locator errorMessage;
    
    // Prospect card elements
    private final Locator prospectName;
    private final Locator prospectEmail;
    private final Locator prospectSelectButton;

    // Base URLs
    private static final String BASE_URL = "https://acticenter.actinver.com";
    private static final String LOGIN_URL = BASE_URL + "/login";
    private static final String PROSPECT_SEARCH_URL = BASE_URL + "/advisor/prospects/search";

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Login locators - inferidos
        this.usernameInput = page.locator("[data-testid='login-username-input']");
        this.passwordInput = page.locator("[data-testid='login-password-input']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        
        // Navigation locators - inferidos
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchMenuItem = page.locator("[data-testid='menu-prospect-search']");
        
        // Search screen locators - inferidos
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsContainer = page.locator("[data-testid='prospect-search-results']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectResultItems = page.locator("[data-testid='prospect-result-item']");
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.errorMessage = page.locator("[data-testid='search-error-message']");
        
        // Prospect card locators - inferidos
        this.prospectName = page.locator("[data-testid='prospect-name']");
        this.prospectEmail = page.locator("[data-testid='prospect-email']");
        this.prospectSelectButton = page.locator("[data-testid='prospect-select-button']");
    }

    // ============================================
    // NAVIGATION METHODS
    // ============================================

    public void navigateToLogin() {
        page.navigate(LOGIN_URL);
        page.waitForLoadState();
    }

    public void loginAsAdvisor() {
        // Credentials should be provided via environment variables or test configuration
        String username = System.getenv("ADVISOR_USERNAME");
        String password = System.getenv("ADVISOR_PASSWORD");
        
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
        advisorDashboard.waitFor();
    }

    public void navigateToProspectSearch() {
        prospectSearchMenuItem.click();
        page.waitForURL("**/prospects/search**");
        searchField.waitFor();
    }

    // ============================================
    // SEARCH FIELD METHODS
    // ============================================

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isProspectSearchScreenDisplayed() {
        return page.url().contains("/prospects/search") && searchField.isVisible();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public void appendSearchText(String text) {
        searchField.press("End");
        searchField.type(text);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    // ============================================
    // SEARCH RESULTS METHODS
    // ============================================

    public boolean areSearchResultsVisible() {
        return searchResultsContainer.isVisible();
    }

    public boolean isLoadingIndicatorVisible() {
        return loadingIndicator.isVisible();
    }

    public void waitForSearchToTrigger() {
        // Wait for either loading indicator or results to appear
        page.waitForCondition(() -> 
            loadingIndicator.isVisible() || searchResultsContainer.isVisible()
        );
        
        // If loading, wait for it to complete
        if (loadingIndicator.isVisible()) {
            loadingIndicator.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.HIDDEN)
                .setTimeout(10000));
        }
    }

    public boolean isSearchTriggered() {
        return searchResultsContainer.isVisible() || 
               loadingIndicator.isVisible() || 
               noResultsMessage.isVisible();
    }

    public boolean hasProspectResults() {
        return prospectResultItems.count() > 0;
    }

    public int getResultsCount() {
        return prospectResultItems.count();
    }

    public void selectProspectByIndex(int index) {
        prospectResultItems.nth(index).click();
    }

    public void selectProspectByName(String name) {
        page.locator("[data-testid='prospect-result-item']:has-text('" + name + "')").click();
    }

    // ============================================
    // PROSPECT DATA METHODS
    // ============================================

    public String getProspectNameByIndex(int index) {
        return prospectResultItems.nth(index).locator("[data-testid='prospect-name']").textContent();
    }

    public String getProspectEmailByIndex(int index) {
        return prospectResultItems.nth(index).locator("[data-testid='prospect-email']").textContent();
    }

    // ============================================
    // VALIDATION METHODS
    // ============================================

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    // ============================================
    // UTILITY METHODS
    // ============================================

    public void waitForPageLoad() {
        page.waitForLoadState();
    }

    public void scrollResultsList() {
        searchResultsList.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}