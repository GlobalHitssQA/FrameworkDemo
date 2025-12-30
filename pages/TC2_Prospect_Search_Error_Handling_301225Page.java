package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter application.
 * LOCATORS SOURCE: INFERIDOS (inferred based on best practices - no real URL access available)
 */
public class ProspectSearchPage {

    private final Page page;
    
    // Dashboard elements - LOCATORS INFERIDOS
    private final Locator dashboardContainer;
    private final Locator advisorDashboard;
    
    // Search elements - LOCATORS INFERIDOS
    private final Locator prospectSearchScreen;
    private final Locator searchField;
    private final Locator searchButton;
    private final Locator searchResultsList;
    private final Locator searchResultItems;
    
    // Error message elements - LOCATORS INFERIDOS
    private final Locator errorMessageContainer;
    private final Locator errorMessageText;
    
    // Navigation elements - LOCATORS INFERIDOS
    private final Locator prospectSearchNavLink;
    private final Locator prospectDetailView;
    private final Locator createNewProspectButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Dashboard locators - INFERIDOS
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.advisorDashboard = page.locator("#advisor-dashboard-container");
        
        // Search locators - INFERIDOS
        this.prospectSearchScreen = page.locator("[data-testid='prospect-search-screen']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-search-results'] [data-testid='prospect-result-item']");
        
        // Error message locators - INFERIDOS
        this.errorMessageContainer = page.locator("[data-testid='error-message-container']");
        this.errorMessageText = page.locator("[data-testid='error-message-text']");
        
        // Navigation locators - INFERIDOS
        this.prospectSearchNavLink = page.locator("[data-testid='nav-prospect-search']");
        this.prospectDetailView = page.locator("[data-testid='prospect-detail-view']");
        this.createNewProspectButton = page.locator("[data-testid='create-new-prospect-button']");
    }

    // Navigation methods
    public void navigateToProspectSearch() {
        prospectSearchNavLink.click();
        prospectSearchScreen.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Search methods
    public void enterSearchQuery(String query) {
        searchField.clear();
        searchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void selectProspectByName(String prospectName) {
        Locator prospectItem = page.locator("[data-testid='prospect-result-item']:has-text('" + prospectName + "')");
        prospectItem.click();
    }

    // Verification methods
    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible() || advisorDashboard.isVisible();
    }

    public boolean isProspectSearchScreenDisplayed() {
        return prospectSearchScreen.isVisible();
    }

    public boolean areSearchResultsDisplayed() {
        return searchResultsList.isVisible() && searchResultItems.count() > 0;
    }

    public boolean isProspectVisibleInResults(String prospectName) {
        Locator prospectItem = page.locator("[data-testid='prospect-result-item']:has-text('" + prospectName + "')");
        return prospectItem.isVisible();
    }

    public boolean isEmailDisplayedForProspect(String prospectName) {
        Locator prospectItem = page.locator("[data-testid='prospect-result-item']:has-text('" + prospectName + "')");
        Locator emailField = prospectItem.locator("[data-testid='prospect-email']");
        if (!emailField.isVisible()) {
            return false;
        }
        String emailText = emailField.textContent();
        return emailText != null && !emailText.trim().isEmpty();
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessageContainer.isVisible();
    }

    public String getErrorMessageText() {
        if (errorMessageText.isVisible()) {
            return errorMessageText.textContent();
        }
        return errorMessageContainer.textContent();
    }

    public boolean hasNavigatedToProspectDetail() {
        return prospectDetailView.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return searchField.isEnabled();
    }

    public boolean areSearchResultsClickable() {
        if (searchResultItems.count() > 0) {
            return searchResultItems.first().isEnabled();
        }
        return false;
    }

    // Utility methods
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickCreateNewProspect() {
        createNewProspectButton.click();
    }
}