package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ServiceModificationPage {
    private Page page;
    private Locator serviceModificationMenu;
    private Locator subtaskDropdown;
    private Locator prospectSearchServiceConfig;
    private Locator serviceSettingsContainer;
    private Locator searchFiltersSection;
    private Locator searchFilterDropdown;
    private Locator filterValueInput;
    private Locator fieldMappingSection;
    private Locator fieldMappingKey;
    private Locator fieldMappingValue;
    private Locator saveButton;
    private Locator confirmationMessage;

    public ServiceModificationPage(Page page) {
        this.page = page;
        this.serviceModificationMenu = page.locator("[data-testid='service-modification-menu']");
        this.subtaskDropdown = page.locator("[data-testid='subtask-dropdown']");
        this.prospectSearchServiceConfig = page.locator("[data-testid='prospect-search-service-config']");
        this.serviceSettingsContainer = page.locator("[data-testid='service-settings-container']");
        this.searchFiltersSection = page.locator("[data-testid='search-filters-section']");
        this.searchFilterDropdown = page.locator("[data-testid='search-filter-dropdown']");
        this.filterValueInput = page.locator("[data-testid='filter-value-input']");
        this.fieldMappingSection = page.locator("[data-testid='field-mapping-section']");
        this.fieldMappingKey = page.locator("[data-testid='field-mapping-key']");
        this.fieldMappingValue = page.locator("[data-testid='field-mapping-value']");
        this.saveButton = page.locator("[data-testid='save-modifications-button']");
        this.confirmationMessage = page.locator("[data-testid='confirmation-message']");
    }

    public void navigateToServiceModificationSection() {
        serviceModificationMenu.click();
    }

    public void selectSubtask(String subtaskId) {
        subtaskDropdown.click();
        page.locator("[data-testid='subtask-option-" + subtaskId + "']").click();
    }

    public void locateProspectSearchServiceConfig() {
        prospectSearchServiceConfig.scrollIntoViewIfNeeded();
        prospectSearchServiceConfig.click();
    }

    public boolean areServiceSettingsVisible() {
        return serviceSettingsContainer.isVisible();
    }

    public boolean areSearchFiltersVisible() {
        return searchFiltersSection.isVisible();
    }

    public void modifySearchFilter(String filterName, String filterValue) {
        searchFilterDropdown.selectOption(filterName);
        filterValueInput.fill(filterValue);
    }

    public void modifyFieldMapping(String key, String value) {
        fieldMappingKey.fill(key);
        fieldMappingValue.fill(value);
    }

    public void clickSaveButton() {
        saveButton.click();
    }

    public boolean isConfirmationMessageVisible() {
        return confirmationMessage.isVisible();
    }

    public String getConfirmationMessage() {
        return confirmationMessage.textContent();
    }
}

// SalesforceLoginPage.java
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class SalesforceLoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public SalesforceLoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboardIndicator = page.locator("[data-testid='dashboard-indicator']");
    }

    public void navigateToSalesforce() {
        page.navigate("https://actinver.my.salesforce.com");
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

// ProspectSearchPage.java
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchMenu;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator resultsList;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.resultsContainer = page.locator("[data-testid='results-container']");
        this.resultsList = page.locator("[data-testid='results-list']");
    }

    public void navigateToProspectSearch() {
        prospectSearchMenu.click();
    }

    public void fillSearchField(String searchTerm) {
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areResultsVisible() {
        return resultsContainer.isVisible();
    }

    public boolean areModifiedParametersApplied() {
        return page.locator("[data-testid='modified-config-indicator']").isVisible();
    }

    public boolean validateResultsMatchConfig() {
        return resultsList.count() > 0;
    }
}