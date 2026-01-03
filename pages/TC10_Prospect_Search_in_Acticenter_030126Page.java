package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator resultItems;
    private Locator resultNames;
    private Locator resultEmails;
    private Locator highlightedMatches;
    private Locator advisorDashboard;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.resultNames = page.locator("[data-testid='prospect-result-name']");
        this.resultEmails = page.locator("[data-testid='prospect-result-email']");
        this.highlightedMatches = page.locator("[data-testid='prospect-result-name'] strong, [data-testid='prospect-result-name'] b");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToProspectSearch() {
        advisorDashboard.click();
        prospectSearchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public void enterProspectName(String prospectName) {
        prospectSearchField.fill(prospectName);
    }

    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areResultsVisible() {
        return searchResultsList.isVisible();
    }

    public int getResultsCount() {
        return resultItems.count();
    }

    public boolean resultsContainNameAndEmail() {
        int namesCount = resultNames.count();
        int emailsCount = resultEmails.count();
        return namesCount > 0 && emailsCount > 0;
    }

    public boolean areMatchesHighlighted() {
        return highlightedMatches.count() > 0;
    }
}

public class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator userProfile;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='login-username']");
        this.passwordInput = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.userProfile = page.locator("[data-testid='user-profile']");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public boolean isAuthenticated() {
        userProfile.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return userProfile.isVisible();
    }
}