package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator noResultsMessage;
    private Locator recentSearchesList;
    private Locator recentSearchItems;
    
    private static final String BASE_URL = "https://actinver.atlassian.net";

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.recentSearchesList = page.locator("[data-testid='recent-searches-list']");
        this.recentSearchItems = page.locator("[data-testid='recent-search-item']");
    }

    public void navigateToProspectSearch() {
        page.navigate(BASE_URL + "/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchFieldVisible() {
        try {
            return searchField.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public void enterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchTriggered() {
        try {
            // Verificar si se realizó alguna petición de búsqueda
            // o si cambiaron los elementos en pantalla indicando búsqueda activa
            page.waitForTimeout(500);
            return resultsContainer.count() > 0 && resultsContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean areResultsDisplayed() {
        try {
            return resultsContainer.isVisible() && resultsContainer.locator("[data-testid='result-item']").count() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isNoResultsMessageVisible() {
        try {
            return noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    public boolean isRecentSearchesVisible() {
        try {
            return recentSearchesList.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public int getRecentSearchesCount() {
        return recentSearchItems.count();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }
}