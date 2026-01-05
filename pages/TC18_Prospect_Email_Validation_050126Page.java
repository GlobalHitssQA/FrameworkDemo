package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;
import java.util.stream.Collectors;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectItems;
    private Locator prospectNames;
    private Locator prospectEmails;
    private Locator highlightedEmailText;
    private Locator dashboardContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.highlightedEmailText = page.locator("[data-testid='prospect-email'] mark, [data-testid='prospect-email'] .highlight");
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchScreenVisible() {
        return searchField.isVisible() && searchButton.isVisible();
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

    public boolean isResultsListVisible() {
        return resultsList.isVisible();
    }

    public int getResultsCount() {
        return prospectItems.count();
    }

    public List<String> getAllProspectNames() {
        return prospectNames.allTextContents();
    }

    public List<String> getAllProspectEmails() {
        return prospectEmails.allTextContents();
    }

    public boolean areEmailsHighlighted() {
        return highlightedEmailText.count() > 0;
    }

    public String getProspectNameByIndex(int index) {
        return prospectNames.nth(index).textContent();
    }

    public String getProspectEmailByIndex(int index) {
        return prospectEmails.nth(index).textContent();
    }

    public void selectProspectByIndex(int index) {
        prospectItems.nth(index).click();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }
}