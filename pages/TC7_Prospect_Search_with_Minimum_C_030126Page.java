package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos - siguiendo buenas prácticas de naming
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void focusSearchField() {
        searchField.click();
    }

    public void enterSearchText(String text) {
        searchField.type(text);
    }

    public void clearAndEnterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areSearchResultsVisible() {
        try {
            return searchResultsList.isVisible({ timeout: 2000 });
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchTriggered() {
        // Verifica si hay indicador de carga o resultados
        try {
            return loadingIndicator.isVisible({ timeout: 500 }) || areSearchResultsVisible();
        } catch (Exception e) {
            return areSearchResultsVisible();
        }
    }

    public int getSearchResultCount() {
        if (areSearchResultsVisible()) {
            return searchResultItems.count();
        }
        return 0;
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }
}