package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator noResultsMessage;
    private Locator searchResults;
    private Locator prospectSearchSection;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.prospectSearchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.errorMessage = page.locator("[data-testid='search-error-message']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
    }

    public void navigateToProspectSearch() {
        prospectSearchSection.click();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public void enterSearchQuery(String query) {
        prospectSearchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResponse() {
        page.waitForTimeout(2000);
    }

    public boolean isErrorMessageVisible() {
        try {
            return errorMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isNoResultsMessageVisible() {
        try {
            return noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getErrorMessageText() {
        if (isErrorMessageVisible()) {
            return errorMessage.textContent();
        } else if (isNoResultsMessageVisible()) {
            return noResultsMessage.textContent();
        }
        return "";
    }

    public void clearSearchField() {
        prospectSearchField.clear();
    }

    public boolean isSearchResultsVisible() {
        try {
            return searchResults.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}

// LoginPage class for authentication
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class LoginPage {
    private Page page;
    private Locator usernameField;
    private Locator passwordField;
    private Locator loginButton;
    private Locator advisorDashboard;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameField = page.locator("[data-testid='username-input']");
        this.passwordField = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public void login(String username, String password) {
        usernameField.fill(username);
        passwordField.fill(password);
        loginButton.click();
    }

    public boolean isDashboardVisible() {
        try {
            advisorDashboard.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
            return advisorDashboard.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}