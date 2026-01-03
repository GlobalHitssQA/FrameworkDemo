package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator prospectNameFields;
    private Locator prospectEmailFields;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos usando data-testid y selectores semánticos
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectNameFields = page.locator("[data-testid='prospect-name']");
        this.prospectEmailFields = page.locator("[data-testid='prospect-email']");
        this.loadingIndicator = page.locator("[data-testid='search-loading']");
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        // Esperar a que desaparezca el indicador de carga
        if (loadingIndicator.isVisible()) {
            loadingIndicator.waitFor(new Locator.WaitForOptions().setState(com.microsoft.playwright.options.WaitForSelectorState.HIDDEN).setTimeout(10000));
        }
        // Esperar a que aparezcan los resultados
        searchResultsList.waitFor(new Locator.WaitForOptions().setTimeout(10000));
    }

    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public boolean areProspectNamesDisplayed() {
        return prospectNameFields.count() > 0;
    }

    public boolean validateProspectNamesFormatting() {
        int count = prospectNameFields.count();
        if (count == 0) {
            return false;
        }
        
        for (int i = 0; i < count; i++) {
            Locator nameField = prospectNameFields.nth(i);
            if (!nameField.isVisible()) {
                return false;
            }
            String nameText = nameField.textContent();
            if (nameText == null || nameText.trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public int getProspectCount() {
        return prospectNameFields.count();
    }

    public String getProspectNameByIndex(int index) {
        return prospectNameFields.nth(index).textContent();
    }

    public boolean isProspectNameVisible(int index) {
        return prospectNameFields.nth(index).isVisible();
    }
}