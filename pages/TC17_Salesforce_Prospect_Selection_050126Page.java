package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboard;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateTo(String url) {
        page.navigate(url);
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsList;
    private Locator resultsItems;
    private Locator firstProspectSelectButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.resultsList = page.locator("[data-testid='search-results-list']");
        this.resultsItems = page.locator("[data-testid='search-result-item']");
        this.firstProspectSelectButton = page.locator("[data-testid='search-result-item']:first-child [data-testid='select-prospect-button']");
    }

    public void enterProspectName(String prospectName) {
        searchInput.fill(prospectName);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areResultsVisible() {
        return resultsList.isVisible();
    }

    public int getResultsCount() {
        return resultsItems.count();
    }

    public void selectFirstProspect() {
        firstProspectSelectButton.click();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProcessSelectionPage {
    private Page page;
    private Locator processSelectionContainer;
    private Locator selectedProspectLabel;

    public ProcessSelectionPage(Page page) {
        this.page = page;
        this.processSelectionContainer = page.locator("[data-testid='process-selection-container']");
        this.selectedProspectLabel = page.locator("[data-testid='selected-prospect-name']");
    }

    public boolean isProcessSelectionVisible() {
        return processSelectionContainer.isVisible();
    }

    public String getSelectedProspectName() {
        return selectedProspectLabel.textContent();
    }
}