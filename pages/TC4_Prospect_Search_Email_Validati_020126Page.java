package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultsList;
    private Locator noResultsMessage;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='search-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
    }
    
    public void navigateToSearchField() {
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchField.click();
    }
    
    public boolean isSearchFieldDisplayed() {
        return searchField.isVisible();
    }
    
    public void searchProspect(String prospectName) {
        searchField.clear();
        searchField.fill(prospectName);
        // Wait for auto-search after typing 2+ characters
        page.waitForTimeout(500);
        if (searchButton.isVisible()) {
            searchButton.click();
        }
    }
    
    public boolean isProspectInResults(String prospectName) {
        // Check if specific prospect appears in results
        String selector = String.format("[data-testid='prospect-result']:has-text('%s')", prospectName);
        Locator prospectResult = page.locator(selector);
        return prospectResult.count() > 0;
    }
    
    public int getSearchResultsCount() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return page.locator("[data-testid='prospect-result']").count();
    }
    
    public boolean areResultsDisplayed() {
        return searchResults.isVisible() && resultsList.isVisible();
    }
    
    public String getNoResultsMessage() {
        if (noResultsMessage.isVisible()) {
            return noResultsMessage.textContent();
        }
        return "";
    }
}

class LoginPage {
    private Page page;
    private Locator usernameField;
    private Locator passwordField;
    private Locator loginButton;
    private Locator dashboardElement;
    
    public LoginPage(Page page) {
        this.page = page;
        // Locators inferidos
        this.usernameField = page.locator("[data-testid='login-username']");
        this.passwordField = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.dashboardElement = page.locator("[data-testid='advisor-dashboard']");
    }
    
    public void loginAsAdvisor(String username, String password) {
        usernameField.fill(username);
        passwordField.fill(password);
        loginButton.click();
    }
    
    public boolean isLoginSuccessful() {
        dashboardElement.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
        return dashboardElement.isVisible();
    }
}