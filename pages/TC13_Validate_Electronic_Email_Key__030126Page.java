package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no URL válida disponible)
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator prospectCards;
    private Locator emailKeyFields;
    private Locator dashboardContainer;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.prospectCards = page.locator("[data-testid='prospect-card']");
        this.emailKeyFields = page.locator("[data-testid='prospect-email-key']");
        this.dashboardContainer = page.locator("[data-testid='dashboard-container']");
    }
    
    public void navigateToProspectSearch() {
        Locator prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
        prospectSearchLink.click();
        page.waitForLoadState();
    }
    
    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }
    
    public void enterSearchText(String searchText) {
        searchInput.fill(searchText);
    }
    
    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }
    
    public boolean hasSearchResults() {
        searchResults.waitFor();
        return searchResults.isVisible() && prospectCards.count() > 0;
    }
    
    public boolean areEmailKeyFieldsPresent() {
        int prospectCount = prospectCards.count();
        int emailKeyCount = emailKeyFields.count();
        return emailKeyCount > 0 && emailKeyCount <= prospectCount;
    }
    
    public boolean validateEmailKeysDisplayed() {
        List<Locator> emailKeys = emailKeyFields.all();
        
        for (Locator emailKey : emailKeys) {
            if (!emailKey.isVisible()) {
                return false;
            }
            
            String emailText = emailKey.textContent().trim();
            if (emailText.isEmpty() || !emailText.contains("@")) {
                return false;
            }
        }
        
        return emailKeys.size() > 0;
    }
    
    public boolean validateMissingEmailKeyHandling() {
        int prospectCount = prospectCards.count();
        int emailKeyCount = emailKeyFields.count();
        
        // Verifica que prospectos sin email muestren indicador o no se muestren
        if (emailKeyCount < prospectCount) {
            Locator missingEmailIndicator = page.locator("[data-testid='missing-email-indicator']");
            return missingEmailIndicator.count() > 0 || emailKeyCount == prospectCount;
        }
        
        return true;
    }
}