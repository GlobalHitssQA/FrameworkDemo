package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Advisor Dashboard in Actinver Application
 * Locators are INFERRED based on best practices - not extracted from live application
 */
public class AdvisorDashboardPage {

    private final Page page;
    private static final String BASE_URL = "https://actinver.atlassian.net";

    // Locators - INFERIDOS (no extraídos de la aplicación real)
    private final Locator dashboardContainer;
    private final Locator prospectSearchField;
    private final Locator searchButton;
    private final Locator prospectResultsList;
    private final Locator prospectResultItems;
    private final Locator prospectWithoutEmailItem;
    private final Locator proceedButton;
    private final Locator errorMessage;
    private final Locator errorMessageText;
    private final Locator userProfileIndicator;

    public AdvisorDashboardPage(Page page) {
        this.page = page;
        
        // Dashboard elements - INFERRED locators
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.userProfileIndicator = page.locator("[data-testid='user-profile-indicator']");
        
        // Prospect search elements - INFERRED locators
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        
        // Results elements - INFERRED locators
        this.prospectResultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectWithoutEmailItem = page.locator("[data-testid='prospect-result-item'][data-has-email='false']");
        
        // Action elements - INFERRED locators
        this.proceedButton = page.locator("[data-testid='proceed-with-prospect-button']");
        
        // Error message elements - INFERRED locators
        this.errorMessage = page.locator("[data-testid='error-message-container']");
        this.errorMessageText = page.locator("[data-testid='error-message-text']");
    }

    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isUserLoggedIn() {
        return userProfileIndicator.isVisible();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isProspectSearchAvailable() {
        return prospectSearchField.isVisible() && searchButton.isVisible();
    }

    public boolean isProspectSearchEnabled() {
        return prospectSearchField.isEnabled();
    }

    public boolean isSearchButtonClickable() {
        return searchButton.isEnabled();
    }

    public void enterProspectSearchText(String searchText) {
        prospectSearchField.clear();
        prospectSearchField.fill(searchText);
        // Wait for autocomplete/search results
        page.waitForTimeout(500);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areProspectResultsVisible() {
        prospectResultsList.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(5000));
        return prospectResultsList.isVisible() && prospectResultItems.count() > 0;
    }

    public void selectProspectWithoutEmail() {
        if (prospectWithoutEmailItem.count() > 0) {
            prospectWithoutEmailItem.first().click();
        } else {
            // Fallback: click first result if specific selector not available
            prospectResultItems.first().click();
        }
    }

    public void selectProspectByIndex(int index) {
        prospectResultItems.nth(index).click();
    }

    public void clickProceedButton() {
        proceedButton.click();
    }

    public boolean isErrorMessageVisible() {
        errorMessage.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(5000));
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessageText.textContent();
    }

    public int getProspectResultsCount() {
        return prospectResultItems.count();
    }

    public void clearSearchField() {
        prospectSearchField.clear();
    }
}