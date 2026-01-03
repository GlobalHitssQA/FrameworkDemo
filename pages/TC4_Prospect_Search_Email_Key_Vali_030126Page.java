package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator emailKeyFields;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.emailKeyFields = page.locator("[data-testid='prospect-email-field']");
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        // Wait for loading indicator to disappear
        if (loadingIndicator.isVisible()) {
            loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        }
        // Wait for results container to be visible
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }

    public boolean isProspectInResults(String prospectId) {
        Locator specificProspect = page.locator("[data-testid='prospect-result-item'][data-prospect-id='" + prospectId + "']");
        return specificProspect.count() > 0;
    }

    public int getResultCount() {
        return resultItems.count();
    }

    public boolean verifyAllResultsHaveEmailKeys() {
        int totalResults = resultItems.count();
        if (totalResults == 0) {
            return true; // No results means validation passes
        }
        
        int emailFieldsCount = emailKeyFields.count();
        
        // Check each email field is not empty
        for (int i = 0; i < emailFieldsCount; i++) {
            String emailValue = emailKeyFields.nth(i).textContent();
            if (emailValue == null || emailValue.trim().isEmpty()) {
                return false;
            }
        }
        
        return emailFieldsCount == totalResults;
    }
}

class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='login-username-input']");
        this.passwordInput = page.locator("[data-testid='login-password-input']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }
}

class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard-container']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }
}