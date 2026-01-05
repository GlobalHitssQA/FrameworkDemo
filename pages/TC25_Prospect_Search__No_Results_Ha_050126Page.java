package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos siguiendo buenas prácticas
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator noResultsMessage;
    private Locator resultsContainer;
    private Locator newProspectLink;
    private Locator prospectList;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.prospectSearchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.newProspectLink = page.locator("[data-testid='new-prospect-link']");
        this.prospectList = page.locator("[data-testid='prospect-list']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public boolean isProspectSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        prospectSearchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    public boolean isResultsContainerVisible() {
        return resultsContainer.isVisible();
    }

    public boolean isNewProspectLinkVisible() {
        return newProspectLink.isVisible();
    }

    public void clickNewProspectLink() {
        newProspectLink.click();
        page.waitForLoadState();
    }

    public int getProspectListCount() {
        return prospectList.count();
    }
}

// Página auxiliar: LoginPage
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class LoginPage {
    private Page page;
    private Locator usernameField;
    private Locator passwordField;
    private Locator loginButton;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameField = page.locator("[data-testid='username-input']");
        this.passwordField = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net/login");
    }

    public void performLogin() {
        usernameField.fill("advisor_test_user");
        passwordField.fill("test_password");
        loginButton.click();
        page.waitForLoadState();
    }
}

// Página auxiliar: DashboardPage
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }
}

// Página auxiliar: NewProspectPage
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class NewProspectPage {
    private Page page;
    private Locator newProspectForm;

    public NewProspectPage(Page page) {
        this.page = page;
        this.newProspectForm = page.locator("[data-testid='new-prospect-form']");
    }

    public boolean isNewProspectFormVisible() {
        return newProspectForm.isVisible();
    }
}