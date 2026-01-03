package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators inferidos basados en mejores prácticas
    private Locator searchField;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator resultsList;
    private Locator prospectNameField;
    private Locator prospectEmailField;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos con estrategia de fallback
        this.searchField = page.locator("[data-testid='prospect-search-input'], #prospectSearchInput, input[placeholder*='Search'], input[name='prospectSearch']").first();
        this.searchButton = page.locator("[data-testid='search-button'], #searchButton, button:has-text('Search'), button[type='submit']").first();
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert'], .validation-error").first();
        this.resultsList = page.locator("[data-testid='results-list'], #resultsList, .results-container, [role='list']").first();
        this.prospectNameField = page.locator("[data-testid='prospect-name'], .prospect-name").first();
        this.prospectEmailField = page.locator("[data-testid='prospect-email'], .prospect-email").first();
    }
    
    public void navigateToSearchScreen() {
        // Navegar a la pantalla de búsqueda de prospectos
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }
    
    public void enterSearchText(String text) {
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchField.fill(text);
    }
    
    public void clearSearchField() {
        searchField.clear();
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public boolean isSearchFieldVisible() {
        try {
            return searchField.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isErrorMessageVisible() {
        try {
            return errorMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getErrorMessageText() {
        return errorMessage.textContent();
    }
    
    public boolean isResultsListVisible() {
        try {
            return resultsList.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getProspectName() {
        return prospectNameField.textContent();
    }
    
    public String getProspectEmail() {
        return prospectEmailField.textContent();
    }
}