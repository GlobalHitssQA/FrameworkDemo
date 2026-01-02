package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos siguiendo buenas prácticas
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator loadingIndicator;
    private Locator noResultsMessage;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Prioridad: data-testid > IDs semánticos > CSS classes estables > ARIA roles
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.loadingIndicator = page.locator("[data-testid='search-loading']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
    }

    public void navigateToSearchField() {
        searchField.scrollIntoViewIfNeeded();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void typeInSearchField(String text) {
        searchField.type(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void fillSearchField(String text) {
        searchField.fill(text);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areSearchResultsDisplayed() {
        try {
            return searchResultsList.isVisible() && searchResultItems.count() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchTriggered() {
        // Verifica que se haya iniciado la búsqueda esperando el loading o resultados
        try {
            page.waitForSelector("[data-testid='search-loading']", new Page.WaitForSelectorOptions().setTimeout(2000));
            return true;
        } catch (Exception e) {
            // Si no hay loading, verifica si hay resultados directamente
            return areSearchResultsDisplayed();
        }
    }

    public int getSearchResultsCount() {
        if (areSearchResultsDisplayed()) {
            return searchResultItems.count();
        }
        return 0;
    }

    public boolean isLoadingIndicatorVisible() {
        try {
            return loadingIndicator.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isNoResultsMessageDisplayed() {
        try {
            return noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public void waitForSearchResults() {
        page.waitForSelector("[data-testid='prospect-search-results']", new Page.WaitForSelectorOptions().setTimeout(5000));
    }

    public String getResultTextByIndex(int index) {
        if (index < getSearchResultsCount()) {
            return searchResultItems.nth(index).textContent();
        }
        return "";
    }

    public void clickResultByIndex(int index) {
        if (index < getSearchResultsCount()) {
            searchResultItems.nth(index).click();
        }
    }
}