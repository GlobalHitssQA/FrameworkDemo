package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

import java.util.ArrayList;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS siguiendo mejores prácticas
    private Locator dashboardContainer;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator loadingSpinner;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators semánticos inferidos
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.loadingSpinner = page.locator("[data-testid='loading-spinner']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchField.clear();
        searchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void waitForSearchResults() {
        // Esperar a que desaparezca el spinner de carga si existe
        if (loadingSpinner.count() > 0) {
            loadingSpinner.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.HIDDEN)
                .setTimeout(10000));
        }
        
        // Esperar a que aparezcan los resultados
        searchResultsList.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public List<String> getSearchResults() {
        List<String> results = new ArrayList<>();
        int resultCount = searchResultItems.count();
        
        for (int i = 0; i < resultCount; i++) {
            String resultText = searchResultItems.nth(i).textContent();
            results.add(resultText.trim());
        }
        
        return results;
    }

    public int getSearchResultCount() {
        return searchResultItems.count();
    }

    public boolean hasSearchResults() {
        return searchResultsList.isVisible() && searchResultItems.count() > 0;
    }
}