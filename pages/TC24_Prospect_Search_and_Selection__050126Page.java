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
    private Locator prospectNameElements;
    private Locator prospectEmailElements;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameElements = page.locator("[data-testid='prospect-name']");
        this.prospectEmailElements = page.locator("[data-testid='prospect-email']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public boolean isProspectNameVisible(int index) {
        return prospectNameElements.nth(index).isVisible();
    }

    public boolean isProspectEmailVisible(int index) {
        return prospectEmailElements.nth(index).isVisible();
    }

    public String getProspectName(int index) {
        return prospectNameElements.nth(index).textContent();
    }

    public String getProspectEmail(int index) {
        return prospectEmailElements.nth(index).textContent();
    }

    public void selectProspect(int index) {
        searchResultItems.nth(index).click();
    }
}

class ProcessSelectionPage {
    private Page page;
    private Locator processSelectionScreen;
    private Locator selectedProspectInfo;

    public ProcessSelectionPage(Page page) {
        this.page = page;
        this.processSelectionScreen = page.locator("[data-testid='process-selection-screen']");
        this.selectedProspectInfo = page.locator("[data-testid='selected-prospect-info']");
    }

    public boolean isProcessSelectionScreenVisible() {
        return processSelectionScreen.isVisible();
    }

    public String getSelectedProspectInfo() {
        return selectedProspectInfo.textContent();
    }
}