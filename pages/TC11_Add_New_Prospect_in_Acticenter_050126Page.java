package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators (inferidos según buenas prácticas)
    private Locator prospectSearchInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator noResultsMessage;
    private Locator addNewProspectButton;
    private Locator prospectMatchesList;
    private Locator selectedProspectItem;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos usando selectores semánticos
        this.prospectSearchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.addNewProspectButton = page.locator("[data-testid='add-new-prospect-button']");
        this.prospectMatchesList = page.locator("[data-testid='prospect-matches-list']");
        this.selectedProspectItem = page.locator("[data-testid='selected-prospect-item']");
    }

    public void searchProspect(String searchTerm) {
        prospectSearchInput.fill(searchTerm);
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean isSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    public boolean isAddNewProspectButtonVisible() {
        return addNewProspectButton.isVisible();
    }

    public boolean isAddNewProspectButtonEnabled() {
        return addNewProspectButton.isEnabled();
    }

    public void clickAddNewProspect() {
        addNewProspectButton.click();
        page.waitForLoadState();
    }

    public int getProspectMatchesCount() {
        return prospectMatchesList.locator("[data-testid='prospect-match-item']").count();
    }

    public void selectProspectByIndex(int index) {
        prospectMatchesList.locator("[data-testid='prospect-match-item']").nth(index).click();
    }

    public boolean isProspectSelected() {
        return selectedProspectItem.isVisible();
    }

    public void clearSearch() {
        prospectSearchInput.clear();
    }
}

// Archivo adicional: LoginPage.java
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
        this.usernameInput = page.locator("[data-testid='login-username-input']");
        this.passwordInput = page.locator("[data-testid='login-password-input']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.dashboardIndicator = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net/acticenter/login");
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

// Archivo adicional: DashboardPage.java
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardHeader;
    private Locator advisorName;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardHeader = page.locator("[data-testid='dashboard-header']");
        this.advisorName = page.locator("[data-testid='advisor-name']");
    }

    public boolean isDashboardVisible() {
        return dashboardHeader.isVisible();
    }

    public String getAdvisorName() {
        return advisorName.textContent();
    }
}

// Archivo adicional: NewProspectPage.java
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class NewProspectPage {
    private Page page;
    private Locator newProspectForm;
    private Locator firstNameInput;
    private Locator lastNameInput;
    private Locator emailInput;
    private Locator phoneInput;
    private Locator submitButton;

    public NewProspectPage(Page page) {
        this.page = page;
        this.newProspectForm = page.locator("[data-testid='new-prospect-form']");
        this.firstNameInput = page.locator("[data-testid='prospect-firstname-input']");
        this.lastNameInput = page.locator("[data-testid='prospect-lastname-input']");
        this.emailInput = page.locator("[data-testid='prospect-email-input']");
        this.phoneInput = page.locator("[data-testid='prospect-phone-input']");
        this.submitButton = page.locator("[data-testid='prospect-submit-button']");
    }

    public boolean isNewProspectFormVisible() {
        return newProspectForm.isVisible();
    }

    public boolean isFormFieldsVisible() {
        return firstNameInput.isVisible() && 
               lastNameInput.isVisible() && 
               emailInput.isVisible();
    }

    public void fillProspectForm(String firstName, String lastName, String email, String phone) {
        firstNameInput.fill(firstName);
        lastNameInput.fill(lastName);
        emailInput.fill(email);
        phoneInput.fill(phone);
    }

    public void submitForm() {
        submitButton.click();
        page.waitForLoadState();
    }
}