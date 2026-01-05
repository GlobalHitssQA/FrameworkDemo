package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchIcon;
    private Locator searchResults;
    private Locator validationMessage;
    private Locator prospectList;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchIcon = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.validationMessage = page.locator("[data-testid='search-validation-message']");
        this.prospectList = page.locator("[data-testid='prospect-list-container']");
    }

    public void navigateToProspectSearch() {
        page.locator("[data-testid='prospect-search-menu']").click();
    }

    public boolean isSearchFieldDisplayed() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public void clickSearchIcon() {
        searchIcon.click();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void pressEnterKey() {
        searchField.press("Enter");
    }

    public boolean areResultsDisplayed() {
        try {
            return searchResults.isVisible() || prospectList.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isValidationMessageDisplayed() {
        try {
            return validationMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public int getResultsCount() {
        if (!areResultsDisplayed()) {
            return 0;
        }
        return prospectList.locator("[data-testid='prospect-item']").count();
    }

    public String getValidationMessageText() {
        if (isValidationMessageDisplayed()) {
            return validationMessage.textContent();
        }
        return "";
    }
}

public class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardElement;

    public LoginPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboardElement = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net/login");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public boolean isLoginSuccessful() {
        try {
            page.waitForSelector("[data-testid='advisor-dashboard']", new Page.WaitForSelectorOptions().setTimeout(10000));
            return dashboardElement.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}