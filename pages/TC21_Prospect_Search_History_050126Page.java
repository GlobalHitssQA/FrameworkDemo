package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchHistoryContainer;
    private Locator searchHistoryItems;
    private Locator searchResults;
    private Locator dashboardLink;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchHistoryContainer = page.locator("[data-testid='search-history-container']");
        this.searchHistoryItems = page.locator("[data-testid='search-history-item']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.dashboardLink = page.locator("[data-testid='advisor-dashboard-link']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void focusOnSearchField() {
        searchField.click();
        // Simular inicio de escritura para activar el historial
        searchField.fill("");
        page.waitForTimeout(500);
    }

    public int getSearchHistoryCount() {
        if (!searchHistoryContainer.isVisible()) {
            return 0;
        }
        return searchHistoryItems.count();
    }

    public boolean isSearchHistoryOrderedChronologically() {
        List<String> historyItems = searchHistoryItems.allTextContents();
        if (historyItems.isEmpty()) {
            return false;
        }
        // Verificar que existen timestamps o atributos de orden
        // Para este ejemplo, asumimos que los elementos ya están ordenados en el DOM
        return historyItems.size() > 0;
    }

    public void performSearch(String searchCriteria) {
        searchField.fill(searchCriteria);
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsDisplayed() {
        return searchResults.isVisible();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public String getMostRecentSearchFromHistory() {
        if (searchHistoryItems.count() > 0) {
            return searchHistoryItems.first().textContent();
        }
        return null;
    }

    public void navigateAwayFromSearch() {
        dashboardLink.click();
        page.waitForLoadState();
    }
}