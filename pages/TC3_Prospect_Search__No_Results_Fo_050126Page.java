package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators inferidos basados en buenas prácticas
    private Locator prospectSearchInput;
    private Locator searchButton;
    private Locator noResultsMessage;
    private Locator searchResultsList;
    private Locator prospectSearchSection;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos con selectores robustos
        this.prospectSearchInput = page.locator("[data-testid='prospect-search-input'], #prospectSearchField, input[name='prospectSearch']");
        this.searchButton = page.locator("[data-testid='prospect-search-button'], button[aria-label='Buscar prospecto'], .search-icon-button");
        this.noResultsMessage = page.locator("[data-testid='no-results-message'], .no-results-found, [role='alert']:has-text('No se encontraron')");
        this.searchResultsList = page.locator("[data-testid='search-results-list'], .prospect-results, ul.search-matches");
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section'], #prospectSearchSection, .prospect-search-container");
    }

    public void navigateToProspectSearch() {
        prospectSearchSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchInput.isVisible();
    }

    public void enterSearchQuery(String query) {
        prospectSearchInput.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(1000); // Espera para que el sistema procese la búsqueda
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessage() {
        return noResultsMessage.textContent();
    }

    public boolean hasSearchResults() {
        return searchResultsList.count() > 0;
    }
}

// LoginPage auxiliar para el paso de login
class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='login-username'], #username, input[name='username']");
        this.passwordInput = page.locator("[data-testid='login-password'], #password, input[type='password']");
        this.loginButton = page.locator("[data-testid='login-submit'], button[type='submit'], .login-button");
        this.dashboardIndicator = page.locator("[data-testid='advisor-dashboard'], .dashboard-header, h1:has-text('Dashboard')");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net/acticenter/login");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public boolean isLoginSuccessful() {
        return dashboardIndicator.isVisible();
    }
}