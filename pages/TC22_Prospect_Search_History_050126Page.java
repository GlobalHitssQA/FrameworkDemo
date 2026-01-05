package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultList;
    private Locator resultItems;
    private Locator searchHistoryDropdown;
    private Locator searchHistoryItems;
    private Locator historyEntryName;
    private Locator historyEntryEmail;
    private Locator scrollContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultList = page.locator("[data-testid='prospect-results-list']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.searchHistoryDropdown = page.locator("[data-testid='search-history-dropdown']");
        this.searchHistoryItems = page.locator("[data-testid='search-history-item']");
        this.historyEntryName = page.locator("[data-testid='history-entry-name']");
        this.historyEntryEmail = page.locator("[data-testid='history-entry-email']");
        this.scrollContainer = page.locator("[data-testid='results-scroll-container']");
    }

    public void enterSearchTerm(String searchTerm) {
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isResultListVisible() {
        return resultList.isVisible();
    }

    public boolean isSearchHistoryVisible() {
        page.waitForTimeout(500);
        return searchHistoryDropdown.isVisible();
    }

    public int getSearchHistoryCount() {
        return searchHistoryItems.count();
    }

    public int getVisibleResultsCount() {
        return Math.min(resultItems.count(), 5);
    }

    public int getTotalResultsCount() {
        return resultItems.count();
    }

    public boolean isResultListScrollable() {
        String overflowY = scrollContainer.evaluate("el => window.getComputedStyle(el).overflowY").toString();
        return overflowY.equals("scroll") || overflowY.equals("auto");
    }

    public boolean allHistoryEntriesHaveNameAndEmail() {
        int historyCount = searchHistoryItems.count();
        if (historyCount == 0) {
            return false;
        }
        
        for (int i = 0; i < historyCount; i++) {
            Locator historyItem = searchHistoryItems.nth(i);
            Locator name = historyItem.locator("[data-testid='history-entry-name']");
            Locator email = historyItem.locator("[data-testid='history-entry-email']");
            
            if (!name.isVisible() || !email.isVisible()) {
                return false;
            }
            
            if (name.textContent().trim().isEmpty() || email.textContent().trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }
}