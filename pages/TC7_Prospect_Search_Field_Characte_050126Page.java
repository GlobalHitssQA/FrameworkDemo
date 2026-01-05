package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator dashboardMenu;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.dashboardMenu = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void performLogin() {
        usernameInput.waitFor();
        usernameInput.fill("advisor@test.com");
        passwordInput.fill("password123");
        loginButton.click();
        dashboardMenu.waitFor();
    }

    public void navigateToProspectSearch() {
        prospectSearchField.waitFor();
        assertTrue("Prospect search field should be visible", prospectSearchField.isVisible());
    }

    public void typeInSearchField(String text) {
        prospectSearchField.fill(text);
    }

    public void clearSearchField() {
        prospectSearchField.clear();
    }

    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    private void assertTrue(String message, boolean condition) {
        if (!condition) {
            throw new AssertionError(message);
        }
    }
}