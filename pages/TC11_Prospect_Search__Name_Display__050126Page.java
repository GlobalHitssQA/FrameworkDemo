package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no se pudo acceder a la URL real)
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator prospectNameFields;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos siguiendo buenas prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameFields = page.locator("[data-testid='prospect-name-field']");
    }
    
    public void navigateToProspectSearch() {
        // Navigate to prospect search section if needed
        // This could be a click on a menu item or direct URL navigation
    }
    
    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }
    
    public void enterProspectName(String prospectName) {
        prospectSearchField.fill(prospectName);
    }
    
    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }
    
    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }
    
    public int getSearchResultCount() {
        return searchResultItems.count();
    }
    
    public boolean isProspectNameVisibleInResult(int index) {
        Locator resultItem = searchResultItems.nth(index);
        Locator nameField = resultItem.locator("[data-testid='prospect-name-field']");
        return nameField.isVisible();
    }
    
    public String getProspectNameFromResult(int index) {
        Locator resultItem = searchResultItems.nth(index);
        Locator nameField = resultItem.locator("[data-testid='prospect-name-field']");
        return nameField.textContent();
    }
}