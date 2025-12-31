package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS (inferred) - Based on best practices and semantic naming
 * No access to actual application due to authentication requirements
 */
public class ProspectSearchPage {

    private final Page page;
    
    // Advisor Dashboard Locators (inferidos)
    private final Locator advisorDashboard;
    private final Locator prospectSearchMenuItem;
    
    // Search Screen Locators (inferidos)
    private final Locator searchContainer;
    private final Locator searchField;
    private final Locator searchButton;
    private final Locator searchResultsList;
    private final Locator searchResultItems;
    private final Locator noResultsMessage;
    
    // Prospect Item Locators (inferidos)
    private final Locator prospectNames;
    private final Locator prospectEmails;
    private final Locator selectedProspectIndicator;
    
    // Action Buttons Locators (inferidos)
    private final Locator confirmSelectionButton;
    
    // Next Screen Locators (inferidos)
    private final Locator nextScreenContainer;
    private final Locator selectedProspectNameDisplay;
    private final Locator selectedProspectEmailDisplay;
    
    // Error/Validation Locators (inferidos)
    private final Locator errorMessage;
    private final Locator validationMessage;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Advisor Dashboard Locators (inferidos)
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchMenuItem = page.locator("[data-testid='menu-prospect-search']");
        
        // Search Screen Locators (inferidos)
        this.searchContainer = page.locator("[data-testid='prospect-search-container']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        
        // Prospect Item Locators (inferidos)
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.selectedProspectIndicator = page.locator("[data-testid='prospect-result-item'].selected, [data-testid='prospect-result-item'][aria-selected='true']");
        
        // Action Buttons Locators (inferidos)
        this.confirmSelectionButton = page.locator("[data-testid='confirm-prospect-selection-button']");
        
        // Next Screen Locators (inferidos)
        this.nextScreenContainer = page.locator("[data-testid='prospect-detail-container'], [data-testid='process-continuation-screen']");
        this.selectedProspectNameDisplay = page.locator("[data-testid='selected-prospect-name']");
        this.selectedProspectEmailDisplay = page.locator("[data-testid='selected-prospect-email']");
        
        // Error/Validation Locators (inferidos)
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message");
        this.validationMessage = page.locator("[data-testid='validation-message'], .validation-message");
    }

    // Navigation Methods
    public void navigateToProspectSearch() {
        prospectSearchMenuItem.click();
        searchContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Dashboard Verification Methods
    public boolean isAdvisorDashboardVisible() {
        return advisorDashboard.isVisible();
    }

    // Search Screen Verification Methods
    public boolean isSearchScreenDisplayed() {
        return searchContainer.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return searchField.isVisible() && searchField.isEnabled();
    }

    // Search Interaction Methods
    public void enterSearchTerm(String searchTerm) {
        searchField.clear();
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        // Wait for at least one result or no results message
        page.waitForSelector("[data-testid='prospect-result-item'], [data-testid='no-results-message']");
    }

    // Search Results Methods
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public boolean isProspectNameDisplayed(int index) {
        return prospectNames.nth(index).isVisible();
    }

    public boolean isProspectEmailDisplayed(int index) {
        return prospectEmails.nth(index).isVisible();
    }

    public String getProspectName(int index) {
        return prospectNames.nth(index).textContent().trim();
    }

    public String getProspectEmail(int index) {
        return prospectEmails.nth(index).textContent().trim();
    }

    public int findProspectWithEmail() {
        int count = searchResultItems.count();
        for (int i = 0; i < count; i++) {
            String email = prospectEmails.nth(i).textContent();
            if (email != null && !email.trim().isEmpty() && email.contains("@")) {
                return i;
            }
        }
        return -1;
    }

    // Selection Methods
    public void selectProspect(int index) {
        searchResultItems.nth(index).click();
    }

    public boolean isProspectSelected() {
        return selectedProspectIndicator.isVisible();
    }

    // Confirmation Methods
    public void clickConfirmSelectionButton() {
        confirmSelectionButton.click();
    }

    // Navigation Methods
    public void waitForNavigation() {
        page.waitForLoadState();
        nextScreenContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isNextScreenDisplayed() {
        return nextScreenContainer.isVisible();
    }

    // Next Screen Data Verification Methods
    public String getSelectedProspectNameOnNextScreen() {
        return selectedProspectNameDisplay.textContent().trim();
    }

    public String getSelectedProspectEmailOnNextScreen() {
        return selectedProspectEmailDisplay.textContent().trim();
    }

    // Error Handling Methods
    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    public boolean isValidationMessageDisplayed() {
        return validationMessage.isVisible();
    }

    public String getValidationMessageText() {
        return validationMessage.textContent().trim();
    }
}