package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Acticenter Dashboard and Prospect Search functionality.
 * LOCATORS: INFERIDOS (inferred) - No real application URL was accessible.
 * The base URL redirected to Atlassian login, not the Acticenter application.
 */
public class ProspectSearchPage {
    private Page page;
    
    // Dashboard locators (inferidos)
    private Locator dashboardContainer;
    private Locator prospectSearchMenuButton;
    
    // Search functionality locators (inferidos)
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsContainer;
    private Locator searchResultsList;
    private Locator loadingIndicator;
    
    // Error message locators (inferidos)
    private Locator errorMessageContainer;
    private Locator errorMessageText;
    
    // Prospect item locators (inferidos)
    private static final String PROSPECT_ITEM_SELECTOR = "[data-testid='prospect-item']";
    private static final String PROSPECT_NAME_SELECTOR = "[data-testid='prospect-name']";
    private static final String PROSPECT_EMAIL_SELECTOR = "[data-testid='prospect-email']";
    private static final String PROSPECT_SELECT_BUTTON_SELECTOR = "[data-testid='prospect-select-button']";
    private static final String PROSPECT_INVALID_INDICATOR_SELECTOR = "[data-testid='prospect-invalid-indicator']";
    private static final String PROSPECT_DISABLED_CLASS = "prospect-disabled";

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Dashboard locators (inferidos basados en buenas practicas)
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.prospectSearchMenuButton = page.locator("[data-testid='prospect-search-menu-button']");
        
        // Search functionality locators (inferidos)
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsContainer = page.locator("[data-testid='prospect-search-results']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
        
        // Error message locators (inferidos)
        this.errorMessageContainer = page.locator("[data-testid='error-message-container']");
        this.errorMessageText = page.locator("[data-testid='error-message-text']");
    }

    public void navigateToDashboard() {
        // URL should be configured in test configuration
        page.navigate(System.getProperty("acticenter.base.url", "https://acticenter.actinver.com"));
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void clickProspectSearchMenu() {
        prospectSearchMenuButton.click();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String searchText) {
        searchField.clear();
        searchField.fill(searchText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(30000));
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(30000));
    }

    public boolean areSearchResultsLoaded() {
        return searchResultsContainer.isVisible() && !loadingIndicator.isVisible();
    }

    public void selectProspectFromResults(String prospectName) {
        Locator prospectItem = getProspectItemByName(prospectName);
        Locator selectButton = prospectItem.locator(PROSPECT_SELECT_BUTTON_SELECTOR);
        if (selectButton.isVisible() && selectButton.isEnabled()) {
            selectButton.click();
        }
    }

    public boolean isErrorMessageVisible() {
        return errorMessageContainer.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessageText.textContent();
    }

    public boolean isProspectVisible(String prospectName) {
        Locator prospectItem = getProspectItemByName(prospectName);
        return prospectItem.isVisible();
    }

    public boolean isProspectMarkedAsInvalid(String prospectName) {
        Locator prospectItem = getProspectItemByName(prospectName);
        Locator invalidIndicator = prospectItem.locator(PROSPECT_INVALID_INDICATOR_SELECTOR);
        boolean hasInvalidIndicator = invalidIndicator.isVisible();
        boolean hasDisabledClass = prospectItem.getAttribute("class") != null && 
            prospectItem.getAttribute("class").contains(PROSPECT_DISABLED_CLASS);
        return hasInvalidIndicator || hasDisabledClass;
    }

    public boolean isProspectSelectable(String prospectName) {
        Locator prospectItem = getProspectItemByName(prospectName);
        Locator selectButton = prospectItem.locator(PROSPECT_SELECT_BUTTON_SELECTOR);
        return selectButton.isVisible() && selectButton.isEnabled();
    }

    public boolean isProspectEmailVisible(String prospectName) {
        Locator prospectItem = getProspectItemByName(prospectName);
        Locator emailField = prospectItem.locator(PROSPECT_EMAIL_SELECTOR);
        return emailField.isVisible() && !emailField.textContent().isEmpty();
    }

    public String getProspectEmail(String prospectName) {
        Locator prospectItem = getProspectItemByName(prospectName);
        Locator emailField = prospectItem.locator(PROSPECT_EMAIL_SELECTOR);
        return emailField.textContent();
    }

    public int getSearchResultsCount() {
        return searchResultsList.locator(PROSPECT_ITEM_SELECTOR).count();
    }

    public void scrollToProspect(String prospectName) {
        Locator prospectItem = getProspectItemByName(prospectName);
        prospectItem.scrollIntoViewIfNeeded();
    }

    private Locator getProspectItemByName(String prospectName) {
        return searchResultsList.locator(PROSPECT_ITEM_SELECTOR)
            .filter(new Locator.FilterOptions().setHasText(prospectName));
    }
}

// Additional Page Object for Dashboard
class ActicenterDashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchMenuButton;
    private Locator advisorProfileIndicator;

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.prospectSearchMenuButton = page.locator("[data-testid='prospect-search-menu-button']");
        this.advisorProfileIndicator = page.locator("[data-testid='advisor-profile-indicator']");
    }

    public void navigateToDashboard() {
        page.navigate(System.getProperty("acticenter.base.url", "https://acticenter.actinver.com"));
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void clickProspectSearchMenu() {
        prospectSearchMenuButton.click();
    }

    public boolean isAdvisorLoggedIn() {
        return advisorProfileIndicator.isVisible();
    }

    public String getAdvisorType() {
        return advisorProfileIndicator.getAttribute("data-advisor-type");
    }
}