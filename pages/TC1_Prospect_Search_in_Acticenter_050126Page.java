package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchSection;
    private Locator prospectSearchField;
    private Locator searchIcon;
    private Locator prospectList;
    private Locator prospectItems;
    private Locator prospectSearchMenu;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchIcon = page.locator("[data-testid='prospect-search-icon']");
        this.prospectList = page.locator("[data-testid='prospect-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
    }

    public void navigateToProspectSearch() {
        prospectSearchMenu.click();
    }

    public boolean isProspectSearchSectionVisible() {
        return prospectSearchSection.isVisible();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public boolean isSearchIconVisible() {
        return searchIcon.isVisible();
    }

    public boolean isSearchIconEnabled() {
        return searchIcon.isEnabled();
    }

    public void searchProspects(String searchCriteria) {
        prospectSearchField.fill(searchCriteria);
        searchIcon.click();
        page.waitForLoadState();
    }

    public boolean isProspectListVisible() {
        return prospectList.isVisible();
    }

    public int getProspectCount() {
        return prospectItems.count();
    }

    public boolean areProspectsFromSameCell() {
        // Verifica que los prospectos mostrados contengan el atributo de misma célula
        Locator sameCellIndicator = page.locator("[data-testid='prospect-item'][data-same-cell='true']");
        return sameCellIndicator.count() > 0;
    }
}

class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='login-username']");
        this.passwordInput = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.dashboardIndicator = page.locator("[data-testid='advisor-dashboard']");
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