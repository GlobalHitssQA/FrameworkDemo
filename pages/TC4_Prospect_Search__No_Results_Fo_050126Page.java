package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator noResultsMessage;
    private Locator errorMessage;
    private Locator firstResultItem;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos basados en buenas prácticas y el contexto del proyecto
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.firstResultItem = page.locator("[data-testid='result-item']:first-child");
    }

    public void navigateToSearchField() {
        searchField.scrollIntoViewIfNeeded();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.clear();
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
        // Esperar a que la búsqueda se complete
        page.waitForTimeout(1000);
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessage() {
        return noResultsMessage.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public boolean hasResults() {
        return firstResultItem.isVisible();
    }

    public int getResultsCount() {
        return page.locator("[data-testid='result-item']").count();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public LoginPage(Page page) {
        this.page = page;
        // Inferidos basados en buenas prácticas
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboardIndicator = page.locator("[data-testid='dashboard-container']");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
        page.waitForLoadState();
    }

    public boolean isLoginSuccessful() {
        return dashboardIndicator.isVisible();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator navigationMenu;

    public DashboardPage(Page page) {
        this.page = page;
        // Inferidos basados en buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='dashboard-container']");
        this.navigationMenu = page.locator("[data-testid='navigation-menu']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible() && navigationMenu.isVisible();
    }
}