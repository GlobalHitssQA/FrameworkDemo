package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;
import java.util.stream.Collectors;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator dashboardMenu;
    private Locator prospectSearchMenu;
    private Locator loadingSpinner;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.dashboardMenu = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.loadingSpinner = page.locator("[data-testid='loading-spinner']");
    }

    public void navigateToProspectSearch() {
        dashboardMenu.click();
        prospectSearchMenu.click();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchField.isVisible() && searchButton.isVisible();
    }

    public void executeSearch() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        loadingSpinner.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }

    public boolean hasSearchResults() {
        return resultItems.count() > 0;
    }

    public boolean allProspectsBelongToCell(String cellId) {
        int totalResults = resultItems.count();
        for (int i = 0; i < totalResults; i++) {
            Locator prospectItem = resultItems.nth(i);
            String prospectCellId = prospectItem.getAttribute("data-cell-id");
            if (prospectCellId == null || !prospectCellId.equals(cellId)) {
                return false;
            }
        }
        return true;
    }

    public boolean hasProspectsFromOtherCells(String advisorCellId) {
        int totalResults = resultItems.count();
        for (int i = 0; i < totalResults; i++) {
            Locator prospectItem = resultItems.nth(i);
            String prospectCellId = prospectItem.getAttribute("data-cell-id");
            if (prospectCellId != null && !prospectCellId.equals(advisorCellId)) {
                return true;
            }
        }
        return false;
    }
}

class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator userProfile;
    private Locator cellAssignment;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.userProfile = page.locator("[data-testid='user-profile']");
        this.cellAssignment = page.locator("[data-testid='advisor-cell-id']");
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
        return userProfile.isVisible();
    }

    public String getAssignedCellId() {
        return cellAssignment.getAttribute("data-value");
    }
}