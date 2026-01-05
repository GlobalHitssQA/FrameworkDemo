package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator dashboard;
    private Locator searchResults;
    private Locator searchResultItems;
    private Locator prospectName;
    private Locator prospectEmail;
    private Locator highlightedEmailMatch;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas y el contexto del proyecto
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.dashboard = page.locator("[data-testid='acticenter-dashboard']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.prospectName = page.locator("[data-testid='prospect-name']").first();
        this.prospectEmail = page.locator("[data-testid='prospect-email']").first();
        this.highlightedEmailMatch = page.locator("[data-testid='prospect-email'] strong").first();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
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
        return searchResults.isVisible();
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public boolean isProspectNameVisible() {
        return prospectName.isVisible();
    }

    public boolean isProspectEmailVisible() {
        return prospectEmail.isVisible();
    }

    public boolean isEmailMatchHighlighted() {
        return highlightedEmailMatch.isVisible() && 
               highlightedEmailMatch.evaluate("el => window.getComputedStyle(el).fontWeight").toString().equals("700") ||
               highlightedEmailMatch.evaluate("el => window.getComputedStyle(el).fontWeight").toString().equals("bold");
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void selectProspectFromResults(int index) {
        searchResultItems.nth(index).click();
    }

    public String getProspectNameText() {
        return prospectName.textContent();
    }

    public String getProspectEmailText() {
        return prospectEmail.textContent();
    }
}