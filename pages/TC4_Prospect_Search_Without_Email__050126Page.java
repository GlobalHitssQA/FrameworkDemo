package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - Inferidos basados en buenas prácticas
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator noResultsMessage;
    private Locator prospectSearchLink;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos con data-testid y selectores CSS semánticos
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-nav-link']");
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }

    public void waitForSearchFieldVisible() {
        prospectSearchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void enterSearchTerm(String searchTerm) {
        prospectSearchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResultsLoad() {
        // Wait for either results list or no results message
        page.waitForTimeout(1000);
        try {
            searchResultsList.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(5000));
        } catch (Exception e) {
            // If no results list appears, check for no results message
            noResultsMessage.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(2000));
        }
    }

    public boolean isProspectDisplayedInResults(String prospectName) {
        // Check if prospect appears in search results
        Locator prospectItem = page.locator(String.format("[data-testid='prospect-item']:has-text('%s')", prospectName));
        return prospectItem.isVisible();
    }

    public int getResultsCount() {
        if (searchResultsList.isVisible()) {
            return page.locator("[data-testid='prospect-item']").count();
        }
        return 0;
    }

    public boolean isNoResultsMessageDisplayed() {
        return noResultsMessage.isVisible();
    }
}

// Clase adicional: LoginPage
class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator advisorDashboard;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='login-username-input']");
        this.passwordInput = page.locator("[data-testid='login-password-input']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public void waitForDashboard() {
        advisorDashboard.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }
}