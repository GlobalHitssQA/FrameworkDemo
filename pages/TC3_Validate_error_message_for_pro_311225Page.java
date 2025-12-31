package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS (inferred based on best practices - URL did not provide access to actual application)
 */
public class ProspectSearchPage {
    
    private Page page;
    
    // Dashboard locators (inferidos)
    private Locator advisorDashboard;
    
    // Search screen locators (inferidos)
    private Locator searchScreen;
    private Locator searchInput;
    private Locator searchButton;
    
    // Results locators (inferidos)
    private Locator searchResultsList;
    private Locator searchResultItems;
    
    // Error message locators (inferidos)
    private Locator errorMessageContainer;
    private Locator errorMessageText;
    
    // Navigation locators (inferidos)
    private Locator prospectSearchMenuOption;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Dashboard - inferido
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        
        // Search screen elements - inferidos
        this.searchScreen = page.locator("[data-testid='prospect-search-screen']");
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        
        // Alternative selectors if data-testid not available - inferidos
        // this.searchInput = page.locator("input#prospect-search");
        // this.searchButton = page.locator("button.search-button, [aria-label='Buscar']");
        
        // Results list - inferidos
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        
        // Error message elements - inferidos
        this.errorMessageContainer = page.locator("[data-testid='error-message-container']");
        this.errorMessageText = page.locator("[data-testid='error-message-text']");
        
        // Alternative error selectors - inferidos
        // this.errorMessageContainer = page.locator(".error-message, .alert-error, [role='alert']");
        
        // Navigation - inferido
        this.prospectSearchMenuOption = page.locator("[data-testid='menu-prospect-search']");
    }
    
    // Navigation methods
    public void navigateToProspectSearch() {
        prospectSearchMenuOption.click();
        searchScreen.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
    
    // Validation methods
    public boolean isAdvisorDashboardVisible() {
        return advisorDashboard.isVisible();
    }
    
    public boolean isSearchScreenDisplayed() {
        return searchScreen.isVisible();
    }
    
    // Search methods
    public void enterSearchTerm(String searchTerm) {
        searchInput.clear();
        searchInput.fill(searchTerm);
    }
    
    public void clickSearchButton() {
        searchButton.click();
        // Wait for results to load
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
    
    public void searchProspect(String searchTerm) {
        enterSearchTerm(searchTerm);
        clickSearchButton();
    }
    
    // Results methods
    public boolean isProspectVisibleInResults(String prospectName) {
        Locator prospectItem = searchResultsList.locator("text=" + prospectName);
        return prospectItem.isVisible();
    }
    
    public void selectProspectFromResults(String prospectName) {
        Locator prospectItem = searchResultsList.locator("[data-testid='prospect-result-item']:has-text('" + prospectName + "')");
        prospectItem.click();
    }
    
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }
    
    // Error message methods
    public boolean isErrorMessageVisible() {
        return errorMessageContainer.isVisible();
    }
    
    public String getErrorMessageText() {
        errorMessageText.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return errorMessageText.textContent();
    }
    
    public void waitForErrorMessage() {
        errorMessageContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}