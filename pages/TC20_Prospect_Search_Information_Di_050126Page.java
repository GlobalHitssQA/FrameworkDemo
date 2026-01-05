package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no URL válida disponible)
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectItems;
    private Locator prospectNames;
    private Locator prospectEmails;
    private Locator highlightedText;
    private Locator resultsContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Selectores inferidos siguiendo mejores prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.highlightedText = page.locator(".highlight, mark, [data-testid='highlighted-text']");
        this.resultsContainer = page.locator("[data-testid='results-container']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForResults() {
        resultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public int getResultCount() {
        return prospectItems.count();
    }

    public String getProspectName(int index) {
        return prospectNames.nth(index).textContent();
    }

    public String getProspectEmail(int index) {
        return prospectEmails.nth(index).textContent();
    }

    public boolean isProspectNameVisible(int index) {
        return prospectNames.nth(index).isVisible();
    }

    public boolean isProspectEmailVisible(int index) {
        return prospectEmails.nth(index).isVisible();
    }

    public boolean hasHighlightedText() {
        return highlightedText.count() > 0;
    }

    public boolean isScrollable() {
        String overflowY = (String) resultsContainer.evaluate("el => window.getComputedStyle(el).overflowY");
        int scrollHeight = (int) resultsContainer.evaluate("el => el.scrollHeight");
        int clientHeight = (int) resultsContainer.evaluate("el => el.clientHeight");
        return (overflowY.equals("auto") || overflowY.equals("scroll")) && scrollHeight > clientHeight;
    }
}