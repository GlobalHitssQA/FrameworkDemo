package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator searchHistoryDropdown;
    private Locator searchHistoryItems;
    private Locator clearSearchButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.searchHistoryDropdown = page.locator("[data-testid='search-history-dropdown']");
        this.searchHistoryItems = page.locator("[data-testid='search-history-item']");
        this.clearSearchButton = page.locator("[data-testid='clear-search-button']");
    }

    public void searchProspect(String searchTerm) {
        searchField.fill(searchTerm);
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsDisplayed() {
        return searchResults.isVisible();
    }

    public void clearSearchField() {
        if (clearSearchButton.isVisible()) {
            clearSearchButton.click();
        } else {
            searchField.fill("");
        }
    }

    public void navigateToSearchField() {
        page.waitForSelector("[data-testid='prospect-search-input']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void clickSearchField() {
        searchField.click();
        page.waitForTimeout(500);
    }

    public boolean isSearchHistoryDropdownVisible() {
        return searchHistoryDropdown.isVisible();
    }

    public int getSearchHistoryCount() {
        return searchHistoryItems.count();
    }

    public String getSearchHistoryEntryText(int index) {
        return searchHistoryItems.nth(index).textContent();
    }

    public void selectSearchHistoryEntry(int index) {
        searchHistoryItems.nth(index).click();
    }
}

class LoginPage {
    private Page page;
    private Locator usernameField;
    private Locator passwordField;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public LoginPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.usernameField = page.locator("[data-testid='username-input']");
        this.passwordField = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboardIndicator = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void login(String username, String password) {
        usernameField.fill(username);
        passwordField.fill(password);
        loginButton.click();
        page.waitForLoadState();
    }

    public boolean isLoginSuccessful() {
        return dashboardIndicator.isVisible();
    }
}