package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no se pudo acceder a URL real)
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator prospectNames;
    private Locator prospectEmails;
    private Locator prospectListItems;
    private Locator dashboard;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.prospectListItems = page.locator("[data-testid='prospect-item']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.dashboard = page.locator("[data-testid='dashboard']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchScreenVisible() {
        return searchField.isVisible() && searchButton.isVisible();
    }

    public void enterSearchText(String searchText) {
        searchField.clear();
        searchField.fill(searchText);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsVisible() {
        return searchResults.isVisible();
    }

    public int getResultsCount() {
        return prospectListItems.count();
    }

    public boolean allProspectsHaveNames() {
        int resultsCount = getResultsCount();
        int namesCount = prospectNames.count();
        return resultsCount > 0 && resultsCount == namesCount;
    }

    public boolean allProspectsHaveEmail() {
        int resultsCount = getResultsCount();
        int emailsCount = prospectEmails.count();
        return resultsCount > 0 && resultsCount == emailsCount;
    }

    public boolean areProspectNamesVisible() {
        if (prospectNames.count() == 0) {
            return false;
        }
        return prospectNames.first().isVisible();
    }

    public boolean areEmailAddressesVisible() {
        if (prospectEmails.count() == 0) {
            return false;
        }
        return prospectEmails.first().isVisible();
    }

    public String getProspectNameByIndex(int index) {
        return prospectNames.nth(index).textContent();
    }

    public String getProspectEmailByIndex(int index) {
        return prospectEmails.nth(index).textContent();
    }
}