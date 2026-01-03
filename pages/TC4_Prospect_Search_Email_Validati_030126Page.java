package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectSearchLink;
    private Locator dashboard;
    private Locator resultsContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferred locators based on common UI patterns and elements mentioned in metadata
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-section']");
        this.dashboard = page.locator("[data-testid='dashboard']");
        this.resultsContainer = page.locator(".results-container, [data-testid='search-results']");
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(1000);
        resultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isProspectInResults(String prospectName) {
        Locator prospectLocator = page.locator(
            String.format("[data-testid='prospect-name']:has-text('%s'), " +
                         ".prospect-name:has-text('%s')", prospectName, prospectName)
        );
        return prospectLocator.count() > 0;
    }

    public void clearSearchQuery() {
        searchInput.clear();
    }

    public String getResultsText() {
        return resultsList.textContent();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
}

class LoginPage {
    private Page page;
    private Locator emailInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public LoginPage(Page page) {
        this.page = page;
        // Inferred locators for login flow
        this.emailInput = page.locator("[data-testid='login-email'], #email, input[type='email']");
        this.passwordInput = page.locator("[data-testid='login-password'], #password, input[type='password']");
        this.loginButton = page.locator("[data-testid='login-button'], button[type='submit']");
        this.dashboardIndicator = page.locator("[data-testid='dashboard'], .dashboard-container");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void login(String email, String password) {
        emailInput.fill(email);
        passwordInput.fill(password);
        loginButton.click();
    }

    public void verifyLoginSuccess() {
        dashboardIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isLoggedIn() {
        return dashboardIndicator.isVisible();
    }
}