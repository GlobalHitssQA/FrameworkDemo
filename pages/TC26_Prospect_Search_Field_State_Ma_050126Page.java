package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator firstSearchResult;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos: selectores basados en buenas prácticas y semántica común
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-search-result-item']");
        this.firstSearchResult = page.locator("[data-testid='prospect-search-result-item']").first();
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public void enterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
        page.waitForTimeout(500);
    }

    public boolean areSearchResultsVisible() {
        try {
            searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
            return searchResultsList.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public int getSearchResultsCount() {
        if (areSearchResultsVisible()) {
            return searchResultItems.count();
        }
        return 0;
    }

    public void selectFirstProspect() {
        firstSearchResult.click();
        page.waitForLoadState();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProcessSelectionPage {
    private Page page;
    private Locator processSelectionContainer;
    private Locator processSelectionTitle;

    public ProcessSelectionPage(Page page) {
        this.page = page;
        // Inferidos: selectores para pantalla de selección de proceso (AGAS-43)
        this.processSelectionContainer = page.locator("[data-testid='process-selection-container']");
        this.processSelectionTitle = page.locator("[data-testid='process-selection-title']");
    }

    public boolean isProcessSelectionScreenVisible() {
        try {
            return processSelectionContainer.isVisible() || processSelectionTitle.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}